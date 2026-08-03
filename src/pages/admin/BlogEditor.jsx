import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiUpload, FiX, FiImage } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import RichTextEditor from '../../components/admin/RichTextEditor'
import { adminApi } from '../../utils/adminApi'

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', coverImage: '', author: '', status: 'published',
  tags: '', metaTitle: '', metaDescription: '',
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Any inline pasted image ends up as a base64 data URI in the Tiptap HTML,
// which can blow past Vercel's body-size limit. Upload each one separately
// and swap it for the hosted URL before the publish payload is built.
async function extractAndUploadEmbeddedImages(html) {
  const regex = /src="(data:image\/[a-zA-Z]+;base64,[^"]+)"/g
  const uploaded = new Map()
  let match
  let result = html
  while ((match = regex.exec(html)) !== null) {
    const dataUri = match[1]
    if (uploaded.has(dataUri)) continue
    const base64 = dataUri.split(',')[1]
    const ext = dataUri.match(/data:image\/([a-zA-Z]+);/)?.[1] || 'png'
    const res = await adminApi('upload', { method: 'POST', body: { filename: `pasted-${Date.now()}.${ext}`, data: base64 } })
    uploaded.set(dataUri, res.url)
  }
  uploaded.forEach((url, dataUri) => { result = result.split(dataUri).join(url) })
  return result
}

export default function AdminBlogEditor() {
  const { slug: editingSlug } = useParams()
  const isEditing = Boolean(editingSlug)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [mode, setMode] = useState('richtext') // 'richtext' | 'html'
  const [htmlContent, setHtmlContent] = useState('')
  const [htmlFileName, setHtmlFileName] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [coverUploading, setCoverUploading] = useState(false)

  useEffect(() => {
    if (!isEditing) return
    adminApi('blog', { params: { slug: editingSlug } })
      .then((data) => {
        setForm({
          title: data.title || '', slug: data.slug || '', excerpt: data.excerpt || '', content: data.content || '',
          coverImage: data.coverImage || '', author: data.author || '', status: data.status || 'published',
          tags: (data.tags || []).join(', '), metaTitle: data.metaTitle || '', metaDescription: data.metaDescription || '',
        })
        setSlugTouched(true)
        if (data.type === 'html') {
          setMode('html')
          setHtmlFileName(data.htmlFileName || `${data.slug}.html`)
          fetch(`/content/blogs/${data.slug}.html`).then((r) => (r.ok ? r.text() : '')).then(setHtmlContent)
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isEditing, editingSlug])

  const updateField = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && !slugTouched && !isEditing) next.slug = slugify(value)
      return next
    })
  }

  const uploadCover = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setCoverUploading(true)
    try {
      const data = await fileToBase64(file)
      const res = await adminApi('upload', { method: 'POST', body: { filename: file.name, data } })
      updateField('coverImage', res.url)
    } catch (err) {
      alert('Cover upload failed: ' + err.message)
    } finally {
      setCoverUploading(false)
    }
  }

  const uploadHtmlFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const text = await file.text()
    setHtmlContent(text)
    setHtmlFileName(file.name)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.slug) { setError('Title and slug are required.'); return }
    if (mode === 'richtext' && !form.content) { setError('Content is required.'); return }
    if (mode === 'html' && !htmlContent) { setError('Please upload an HTML file.'); return }

    setSaving(true)
    try {
      let content = form.content
      if (mode === 'richtext') content = await extractAndUploadEmbeddedImages(content)

      const payload = {
        title: form.title, slug: form.slug, excerpt: form.excerpt, coverImage: form.coverImage,
        author: form.author, status: form.status, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        metaTitle: form.metaTitle, metaDescription: form.metaDescription,
        ...(mode === 'html' ? { type: 'html', htmlContent, htmlFileName: htmlFileName || `${form.slug}.html` } : { content }),
      }

      const payloadSize = new Blob([JSON.stringify(payload)]).size
      if (payloadSize > 4_000_000 && !window.confirm('This post is quite large (>4MB) and may fail to publish. Continue anyway?')) {
        setSaving(false)
        return
      }

      await adminApi('publish', { method: 'POST', body: payload })
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout title="Loading…"><div className="text-gray-400 text-sm">Loading post…</div></AdminLayout>

  return (
    <AdminLayout
      title={isEditing ? 'Edit Post' : 'New Post'}
      actions={
        <button onClick={submit} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
          <FiSave size={14} /> {saving ? 'Saving…' : 'Publish'}
        </button>
      }
    >
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-5">
          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>}

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <Field label="Title">
              <input value={form.title} onChange={(e) => updateField('title', e.target.value)} required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="Slug">
              <input value={form.slug} onChange={(e) => { setSlugTouched(true); updateField('slug', slugify(e.target.value)) }} required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="Excerpt">
              <textarea value={form.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50 resize-none" />
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <button type="button" onClick={() => setMode('richtext')} className={`px-4 py-1.5 rounded-full text-[0.7rem] font-medium uppercase tracking-wide border transition-colors ${mode === 'richtext' ? 'bg-dark-green text-white border-dark-green' : 'border-gray-200 text-gray-500'}`}>Rich Text Editor</button>
              <button type="button" onClick={() => setMode('html')} className={`px-4 py-1.5 rounded-full text-[0.7rem] font-medium uppercase tracking-wide border transition-colors ${mode === 'html' ? 'bg-dark-green text-white border-dark-green' : 'border-gray-200 text-gray-500'}`}>Upload HTML</button>
            </div>

            {mode === 'richtext' ? (
              <RichTextEditor content={form.content} onChange={(html) => updateField('content', html)} />
            ) : (
              <div className="space-y-3">
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-gold/40 transition-colors text-gray-400 text-sm">
                  <FiUpload size={16} /> {htmlFileName || 'Choose an .html file'}
                  <input type="file" accept=".html" hidden onChange={uploadHtmlFile} />
                </label>
                {htmlContent && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 h-[420px]">
                    <iframe title="HTML preview" srcDoc={htmlContent} className="w-full h-full border-0" sandbox="allow-scripts" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gray-400 block">SEO</span>
            <Field label="Meta Title">
              <input value={form.metaTitle} onChange={(e) => updateField('metaTitle', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="Meta Description">
              <textarea value={form.metaDescription} onChange={(e) => updateField('metaDescription', e.target.value)} rows={2}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50 resize-none" />
            </Field>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <Field label="Status">
              <select value={form.status} onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Field>
            <Field label="Author">
              <input value={form.author} onChange={(e) => updateField('author', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="Tags (comma separated)">
              <input value={form.tags} onChange={(e) => updateField('tags', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gray-400 block mb-3">Cover Image</span>
            {form.coverImage ? (
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img src={form.coverImage} alt="" className="w-full h-40 object-cover" />
                <button type="button" onClick={() => updateField('coverImage', '')} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70">
                  <FiX size={13} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-gold/40 transition-colors text-gray-400 text-sm mb-3">
                <FiImage size={20} />
                {coverUploading ? 'Uploading…' : 'Upload cover image'}
                <input type="file" accept="image/*" hidden onChange={uploadCover} disabled={coverUploading} />
              </label>
            )}
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[0.7rem] font-medium text-gray-500 mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
