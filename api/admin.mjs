import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import fs from 'node:fs/promises'
import path from 'node:path'

// Blog posts + cover images + tags occasionally push past Vercel's default (~1MB)
// body limit. Raise it so publish/upload don't crash before the handler runs.
export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}

const GITHUB_API = 'https://api.github.com'
const ROOT = process.cwd()

function usingGithub() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO)
}

// ── CORS / auth ──

function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') { res.status(200).end(); return true }
  return false
}

function verifyToken(req) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) throw new Error('No token')
  return jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
}

// ── GitHub Contents API helpers ──

async function ghError(r, verb, filePath) {
  let detail = ''
  try {
    const body = await r.text()
    try { detail = JSON.parse(body)?.message || '' } catch { detail = body.slice(0, 150) }
  } catch {}
  const suffix = detail ? ` — ${detail}` : ''
  return new Error(`GitHub ${verb} ${filePath} → ${r.status}${suffix}`)
}

async function ghGet(filePath) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH || 'main'}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  })
  if (!r.ok) { if (r.status === 404) return null; throw await ghError(r, 'GET', filePath) }
  const data = await r.json()
  return { text: Buffer.from(data.content, 'base64').toString('utf-8'), sha: data.sha }
}

async function ghPut(filePath, contentString, message, sha) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env
  const body = { message, content: Buffer.from(contentString).toString('base64'), branch: GITHUB_BRANCH || 'main' }
  if (sha) body.sha = sha
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw await ghError(r, 'PUT', filePath)
  return r.json()
}

async function ghPutBinary(filePath, base64Content, message) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: base64Content, branch: GITHUB_BRANCH || 'main' }),
  })
  if (!r.ok) throw await ghError(r, 'PUT binary', filePath)
  return r.json()
}

async function ghDelete(filePath, sha, message) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${filePath}`, {
    method: 'DELETE',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH || 'main' }),
  })
  if (!r.ok) throw await ghError(r, 'DELETE', filePath)
  return r.json()
}

// ── Local filesystem fallback (dev mode — GITHUB_TOKEN/GITHUB_REPO unset) ──
// Mirrors the ghGet/ghPut/ghPutBinary/ghDelete shapes so callers stay backend-agnostic.

async function fsGet(filePath) {
  try {
    const text = await fs.readFile(path.join(ROOT, filePath), 'utf-8')
    return { text, sha: 'local' }
  } catch (err) {
    if (err.code === 'ENOENT') return null
    throw err
  }
}

async function fsPut(filePath, contentString) {
  const full = path.join(ROOT, filePath)
  await fs.mkdir(path.dirname(full), { recursive: true })
  await fs.writeFile(full, contentString, 'utf-8')
  return { content: { sha: 'local' } }
}

async function fsPutBinary(filePath, base64Content) {
  const full = path.join(ROOT, filePath)
  await fs.mkdir(path.dirname(full), { recursive: true })
  await fs.writeFile(full, Buffer.from(base64Content, 'base64'))
  return { content: { sha: 'local' } }
}

async function fsDelete(filePath) {
  try { await fs.unlink(path.join(ROOT, filePath)) } catch (err) { if (err.code !== 'ENOENT') throw err }
  return { ok: true }
}

// ── Backend-agnostic file operations ──

async function readFile(filePath) {
  return usingGithub() ? ghGet(filePath) : fsGet(filePath)
}

async function writeFile(filePath, contentString, message, sha) {
  return usingGithub() ? ghPut(filePath, contentString, message, sha) : fsPut(filePath, contentString)
}

async function writeBinary(filePath, base64Content, message) {
  return usingGithub() ? ghPutBinary(filePath, base64Content, message) : fsPutBinary(filePath, base64Content)
}

async function deleteFile(filePath, sha, message) {
  return usingGithub() ? ghDelete(filePath, sha, message) : fsDelete(filePath)
}

async function readJson(filePath) {
  const file = await readFile(filePath)
  if (!file) return null
  return { data: JSON.parse(file.text), sha: file.sha }
}

// ── Credentials ──

async function getCredentials() {
  try {
    const file = await readFile('content/admin-credentials.json')
    if (file) return JSON.parse(file.text)
  } catch {}
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'Shrishti@2026',
    email: process.env.ADMIN_EMAIL || '',
  }
}

// ── Email (OTP) — reuses the project's existing Gmail SMTP setup ──

async function sendOtpEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  const html = `
    <div style="max-width:480px;margin:0 auto;font-family:sans-serif;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#1a3c2a;padding:22px 30px;">
        <h1 style="margin:0;color:#c9a84c;font-family:Georgia,serif;font-size:20px;font-weight:normal;letter-spacing:1px;">SHRISHTI <span style="color:#ffffff;">REALTY</span></h1>
        <p style="margin:5px 0 0;color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:3px;text-transform:uppercase;">Admin Verification</p>
      </div>
      <div style="padding:28px 30px;background:#ffffff;">
        <p style="font-size:15px;color:#333;margin:0 0 16px;">Your one-time password:</p>
        <div style="background:#f6f4f0;padding:20px;text-align:center;margin:0 0 16px;border-radius:6px;">
          <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#1a3c2a;">${otp}</span>
        </div>
        <p style="font-size:13px;color:#999;margin:0;">Expires in 5 minutes. If you didn't request this, ignore this email.</p>
      </div>
    </div>`
  await transporter.sendMail({
    from: `"Shrishti Realty Admin" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Shrishti Realty Admin — OTP',
    html,
  })
}

// ── Action handlers ──

async function handleLogin(req, res) {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' })
  const creds = await getCredentials()
  if (username !== creds.username) return res.status(401).json({ error: 'Invalid credentials' })
  const valid = creds.passwordHash ? bcrypt.compareSync(password, creds.passwordHash) : password === creds.password
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' })
  res.status(200).json({ token, username })
}

async function handleListBlogs(req, res) {
  const idx = await readJson('public/content/blog-index.json')
  res.status(200).json(idx?.data || [])
}

async function handleGetBlog(req, res) {
  const { slug } = req.query
  if (!slug) return res.status(400).json({ error: 'Slug required' })
  const blog = await readJson(`public/content/blogs/${slug}.json`)
  if (!blog) return res.status(404).json({ error: 'Not found' })
  res.status(200).json(blog.data)
}

async function handlePublish(req, res) {
  const { title, slug, excerpt, content, coverImage, author, status, tags, metaTitle, metaDescription, type, htmlContent, htmlFileName } = req.body
  const isHtml = type === 'html'
  if (!title || !slug) return res.status(400).json({ error: 'Title and slug required' })
  if (!isHtml && !content) return res.status(400).json({ error: 'Content required' })
  if (isHtml && !htmlContent) return res.status(400).json({ error: 'HTML file required' })

  const now = new Date().toISOString()
  const existing = await readJson(`public/content/blogs/${slug}.json`)
  const existingBlog = existing?.data || null

  const blogData = {
    title, slug, excerpt: excerpt || '', content: isHtml ? '' : content, coverImage: coverImage || '',
    author: author || 'Admin', publishedAt: existingBlog?.publishedAt || now, updatedAt: now,
    status: status || 'published', tags: tags || [], metaTitle: metaTitle || '', metaDescription: metaDescription || '',
  }

  if (isHtml) {
    blogData.type = 'html'
    blogData.htmlFileName = htmlFileName || `${slug}.html`
    const existingHtml = await readFile(`public/content/blogs/${slug}.html`)
    await writeFile(`public/content/blogs/${slug}.html`, htmlContent, `HTML: ${title}`, existingHtml?.sha)
  }

  await writeFile(`public/content/blogs/${slug}.json`, JSON.stringify(blogData, null, 2), existingBlog ? `Update: ${title}` : `Create: ${title}`, existing?.sha)

  const idx = await readJson('public/content/blog-index.json')
  const index = idx?.data || []
  const entry = { title, slug, excerpt: blogData.excerpt, coverImage: blogData.coverImage, author: blogData.author, publishedAt: blogData.publishedAt, updatedAt: now, status: blogData.status, tags: blogData.tags }
  if (isHtml) entry.type = 'html'
  const i = index.findIndex((b) => b.slug === slug)
  if (i >= 0) index[i] = entry; else index.unshift(entry)
  await writeFile('public/content/blog-index.json', JSON.stringify(index, null, 2), `Index: ${title}`, idx?.sha)

  res.status(200).json({ success: true, blog: blogData })
}

async function handleDelete(req, res) {
  const { slug } = req.body
  if (!slug) return res.status(400).json({ error: 'Slug required' })
  const file = await readFile(`public/content/blogs/${slug}.json`)
  if (!file) return res.status(404).json({ error: 'Not found' })

  try {
    const blogData = JSON.parse(file.text)
    if (blogData.type === 'html') {
      const htmlFile = await readFile(`public/content/blogs/${slug}.html`)
      if (htmlFile) await deleteFile(`public/content/blogs/${slug}.html`, htmlFile.sha, `Delete HTML: ${slug}`)
    }
  } catch {}

  await deleteFile(`public/content/blogs/${slug}.json`, file.sha, `Delete: ${slug}`)

  const idx = await readJson('public/content/blog-index.json')
  if (idx) {
    const index = idx.data.filter((b) => b.slug !== slug)
    await writeFile('public/content/blog-index.json', JSON.stringify(index, null, 2), `Remove: ${slug}`, idx.sha)
  }
  res.status(200).json({ success: true })
}

async function handleUpload(req, res) {
  const { filename, data } = req.body
  if (!filename || !data) return res.status(400).json({ error: 'Filename and data required' })
  const date = new Date().toISOString().split('T')[0]
  const clean = filename.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
  const finalName = `${date}-${clean}`
  await writeBinary(`public/blog-images/${finalName}`, data, `Upload: ${finalName}`)
  res.status(200).json({ success: true, url: `/blog-images/${finalName}` })
}

async function handleSendOtp(req, res) {
  const creds = await getCredentials()
  const email = creds.email || process.env.ADMIN_EMAIL
  if (!email) return res.status(400).json({ error: 'No admin email configured' })
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return res.status(500).json({ error: 'Server email config missing' })
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpToken = jwt.sign({ otp, purpose: 'password-change' }, process.env.JWT_SECRET, { expiresIn: '5m' })
  await sendOtpEmail(email, otp)
  const parts = email.split('@')
  res.status(200).json({ otpToken, maskedEmail: `${parts[0].slice(0, 2)}***@${parts[1]}` })
}

async function handleChangePassword(req, res) {
  const { otp, otpToken, newUsername, newPassword } = req.body
  if (!otp || !otpToken || !newPassword) return res.status(400).json({ error: 'OTP and new password required' })
  let decoded
  try { decoded = jwt.verify(otpToken, process.env.JWT_SECRET) } catch { return res.status(400).json({ error: 'OTP expired' }) }
  if (decoded.purpose !== 'password-change' || decoded.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' })
  const creds = await getCredentials()
  const newCreds = { username: newUsername || creds.username, passwordHash: bcrypt.hashSync(newPassword, 10), email: creds.email || process.env.ADMIN_EMAIL || '' }
  const existing = await readFile('content/admin-credentials.json')
  await writeFile('content/admin-credentials.json', JSON.stringify(newCreds, null, 2), 'Update credentials', existing?.sha)
  res.status(200).json({ success: true, message: usingGithub() ? 'Updated. Takes effect after redeployment (~60s).' : 'Updated.' })
}

async function handleGetPageMeta(req, res) {
  const meta = await readJson('public/content/page-meta.json')
  res.status(200).json(meta?.data || {})
}

async function handleSavePageMeta(req, res) {
  const { pages } = req.body
  if (!pages || typeof pages !== 'object') return res.status(400).json({ error: 'Pages object required' })
  const existing = await readFile('public/content/page-meta.json')
  await writeFile('public/content/page-meta.json', JSON.stringify(pages, null, 2), 'Update page meta tags', existing?.sha)
  res.status(200).json({ success: true })
}

// ── Main router ──

export default async function handler(req, res) {
  if (cors(req, res)) return

  const action = req.query.action || req.body?.action

  try {
    if (!process.env.JWT_SECRET) {
      console.error('[admin] JWT_SECRET is not set')
      return res.status(500).json({ error: 'Server misconfigured: JWT_SECRET is not set' })
    }

    // GitHub env is only required when actually targeting GitHub — in dev mode
    // (no GITHUB_TOKEN/GITHUB_REPO) every action falls back to local fs writes.

    if (action === 'login') return await handleLogin(req, res)

    try { verifyToken(req) } catch { return res.status(401).json({ error: 'Unauthorized' }) }

    switch (action) {
      case 'blogs':           return await handleListBlogs(req, res)
      case 'blog':            return await handleGetBlog(req, res)
      case 'publish':         return await handlePublish(req, res)
      case 'delete':          return await handleDelete(req, res)
      case 'upload':          return await handleUpload(req, res)
      case 'send-otp':        return await handleSendOtp(req, res)
      case 'change-password': return await handleChangePassword(req, res)
      case 'page-meta':       return await handleGetPageMeta(req, res)
      case 'save-page-meta':  return await handleSavePageMeta(req, res)
      default:                return res.status(400).json({ error: 'Invalid action' })
    }
  } catch (error) {
    console.error(`[admin] ${action} failed:`, error)
    const msg = error?.message || String(error) || 'Internal error'
    if (!res.headersSent) res.status(500).json({ error: msg })
  }
}
