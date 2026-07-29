import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiCalendar, FiLinkedin, FiLink, FiCheck } from 'react-icons/fi'
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ConsultationModal from '../components/ConsultationModal'
import { DiamondSeparator } from '../components/Decorations'
import SEOMeta from '../components/SEOMeta'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function readTime(html) {
  const words = (html || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

// Builds a TOC from <h2> tags, injecting ids where missing. Falls back to
// bold-only paragraphs (common when authors skip explicit headings).
function processContent(html) {
  if (typeof window === 'undefined' || !html) return { html, headings: [] }
  const container = document.createElement('div')
  container.innerHTML = html
  let nodes = [...container.querySelectorAll('h2')]
  if (nodes.length === 0) {
    nodes = [...container.querySelectorAll('p')].filter((p) => {
      const strong = p.querySelector('strong')
      return strong && strong.textContent.trim() === p.textContent.trim()
    })
  }
  const headings = nodes.map((node, i) => {
    const text = node.textContent.trim()
    const id = `section-${i}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`
    node.id = id
    return { id, text }
  })
  return { html: container.innerHTML, headings }
}

function ShareButtons({ url, title, variant = 'inline' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const btn = variant === 'block'
    ? 'w-11 h-11 rounded-full border border-gray-200 grid place-items-center text-gray-500 hover:border-gold hover:text-gold transition-colors duration-300'
    : 'w-8 h-8 rounded-full border border-gray-200 grid place-items-center text-gray-400 hover:border-gold hover:text-gold transition-colors duration-300'
  return (
    <div className="flex items-center gap-2">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on LinkedIn"><FiLinkedin size={variant === 'block' ? 16 : 13} /></a>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X"><FaXTwitter size={variant === 'block' ? 15 : 12} /></a>
      <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on WhatsApp"><FaWhatsapp size={variant === 'block' ? 16 : 13} /></a>
      <button onClick={copy} className={btn} aria-label="Copy link">{copied ? <FiCheck size={variant === 'block' ? 16 : 13} /> : <FiLink size={variant === 'block' ? 16 : 13} />}</button>
    </div>
  )
}

function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id) })
      },
      { rootMargin: '-100px 0px -55% 0px' }
    )
    headings.forEach((h) => { const el = document.getElementById(h.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="border-l border-gray-100 pl-5">
      <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">On This Page</span>
      <ul className="space-y-2.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={`text-[0.82rem] leading-snug transition-colors duration-300 block ${activeId === h.id ? 'text-dark-green font-semibold' : 'text-gray-400 hover:text-gray-600'}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[110]">
      <div className="h-full bg-gradient-to-r from-gold to-gold-light transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [htmlPage, setHtmlPage] = useState('')
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)

  useEffect(() => {
    // Reset view state for the new slug before the fetch resolves, so a
    // client-side navigation between two posts doesn't flash stale content.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setNotFound(false)
    fetch(`/content/blogs/${slug}.json`)
      .then((r) => { if (!r.ok) throw new Error('not found'); return r.json() })
      .then((data) => {
        setBlog(data)
        if (data.type === 'html') {
          return fetch(`/content/blogs/${slug}.html`).then((r) => (r.ok ? r.text() : '')).then(setHtmlPage)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!blog) return
    fetch('/content/blog-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((all) => {
        const pool = (Array.isArray(all) ? all : []).filter((p) => p.status === 'published' && p.slug !== slug)
        const sameTag = pool.filter((p) => (p.tags || []).some((t) => (blog.tags || []).includes(t)))
        setRelated((sameTag.length ? sameTag : pool).slice(0, 3))
      })
      .catch(() => setRelated([]))
  }, [blog, slug])

  const processed = useMemo(() => (blog?.type === 'html' ? { html: '', headings: [] } : processContent(blog?.content)), [blog])
  const url = typeof window !== 'undefined' ? window.location.href : ''

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-gray-400 text-sm">Loading article…</div>
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen grid place-items-center text-center px-5">
        <div>
          <p className="text-gray-400 mb-4">Article not found.</p>
          <Link to="/blog" className="text-gold hover:text-gold-dark text-sm font-medium">&larr; Back to Journal</Link>
        </div>
      </div>
    )
  }

  // HTML-authored posts render full-page in a sandboxed iframe — no site chrome.
  if (blog.type === 'html') {
    return (
      <div className="fixed inset-0 bg-white z-[50]">
        <SEOMeta title={blog.metaTitle || blog.title} description={blog.metaDescription || blog.excerpt} />
        <Link to="/blog" className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 rounded-full bg-dark-green/90 backdrop-blur-sm text-white text-[0.7rem] font-medium tracking-wide uppercase hover:bg-dark-green transition-colors">
          <FiArrowLeft size={13} /> Back
        </Link>
        <iframe title={blog.title} srcDoc={htmlPage} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin allow-popups" />
      </div>
    )
  }

  return (
    <>
      <SEOMeta title={blog.metaTitle || `${blog.title} | Shrishti Realty`} description={blog.metaDescription || blog.excerpt} />
      <ReadingProgress />
      <Navbar onConsultationClick={() => setConsultationOpen(true)} />

      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 bg-dark-green overflow-hidden">
          <img src={blog.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/85 to-dark-green/60" />
          <div className="relative max-w-3xl mx-auto px-5 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold/80 hover:text-gold mb-6 transition-colors">
              <FiArrowLeft size={12} /> Back to Journal
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              {(blog.tags || []).map((t) => <span key={t} className="px-3 py-1 rounded-full text-[0.62rem] font-semibold tracking-[0.1em] uppercase bg-white/10 text-gold">{t}</span>)}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-6">{blog.title}</h1>
            <div className="flex items-center justify-center gap-5 text-white/50 text-[0.8rem]">
              <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {formatDate(blog.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><FiClock size={13} /> {readTime(blog.content)} min read</span>
              <span>By {blog.author}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="relative py-16 lg:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 grid lg:grid-cols-[220px_1fr_240px] gap-10 xl:gap-14">
            {/* TOC sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 max-h-[70vh] overflow-y-auto">
                <TableOfContents headings={processed.headings} />
              </div>
            </aside>

            {/* Article */}
            <article>
              <div
                className="blog-prose prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-[1.9] prose-a:text-dark-green prose-blockquote:border-gold prose-blockquote:text-gray-500 prose-blockquote:italic prose-strong:text-gray-800 prose-li:text-gray-600 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: processed.html }}
              />

              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gray-400">Share This Article</span>
                <ShareButtons url={url} title={blog.title} variant="block" />
              </div>

              {/* Lead CTA */}
              <div className="mt-14 rounded-3xl bg-[#f6f4f0] p-8 lg:p-10 text-center">
                <DiamondSeparator className="mb-6" />
                <h3 className="font-display text-2xl text-gray-900 mb-3">Considering a project of your own?</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Speak with our design and development team about bringing your vision to life.</p>
                <button onClick={() => setConsultationOpen(true)} className="px-8 py-3 bg-dark-green text-white text-[0.7rem] font-bold tracking-[0.15em] uppercase rounded hover:bg-green transition-colors">
                  Book A Consultation
                </button>
              </div>
            </article>

            {/* About / meta sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-100 p-5">
                <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">About This Post</span>
                <ul className="space-y-2 text-[0.82rem] text-gray-500">
                  <li className="flex items-center gap-2"><FiClock size={13} className="text-gold" /> {readTime(blog.content)} min read</li>
                  <li className="flex items-center gap-2"><FiCalendar size={13} className="text-gold" /> {formatDate(blog.publishedAt)}</li>
                  <li>By <span className="text-gray-700 font-medium">{blog.author}</span></li>
                </ul>
              </div>
              {blog.tags?.length > 0 && (
                <div className="rounded-2xl border border-gray-100 p-5">
                  <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">Topics</span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full text-[0.68rem] bg-green-pale text-green">{t}</span>)}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="relative py-20 bg-[#f6f4f0]">
            <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
              <div className="text-center mb-12">
                <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-3 block">Continue Reading</span>
                <h2 className="font-display text-2xl lg:text-3xl text-gray-900">Related Articles</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group card-glow relative block bg-white rounded-2xl overflow-hidden border border-black/[0.04]">
                    <div className="h-44 overflow-hidden">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-gold mb-2 block">{formatDate(post.publishedAt)}</span>
                      <h3 className="font-display text-base text-gray-900 leading-snug group-hover:text-dark-green transition-colors">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer onConsultationClick={() => setConsultationOpen(true)} />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  )
}
