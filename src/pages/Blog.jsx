import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiLinkedin, FiLink, FiCheck } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'
import { DotGrid, DiamondSeparator } from '../components/Decorations'
import SEOMeta from '../components/SEOMeta'

const TOP_TAGS = 10

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function CardShare({ url }) {
  const [copied, setCopied] = useState(false)
  const share = (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    if (action === 'copy') {
      navigator.clipboard?.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
    }
  }
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={(e) => share(e, 'linkedin')} aria-label="Share on LinkedIn"
        className="w-7 h-7 rounded-full border border-gray-200 grid place-items-center text-gray-400 hover:border-gold hover:text-gold transition-colors duration-300">
        <FiLinkedin size={12} />
      </button>
      <button onClick={(e) => share(e, 'copy')} aria-label="Copy link"
        className="w-7 h-7 rounded-full border border-gray-200 grid place-items-center text-gray-400 hover:border-gold hover:text-gold transition-colors duration-300">
        {copied ? <FiCheck size={12} /> : <FiLink size={12} />}
      </button>
    </div>
  )
}

function BlogCard({ post, index }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return (
    <StaggerChild direction="up">
      <Reveal delay={index * 0.04}>
        <Link to={`/blog/${post.slug}`} className="group card-glow relative block bg-white rounded-2xl overflow-hidden border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500 h-full flex flex-col">
          <div className="relative h-56 overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {post.tags?.[0] && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.62rem] font-semibold tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-dark-green">{post.tags[0]}</span>
            )}
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-gold mb-2">{formatDate(post.publishedAt)}</span>
            <h3 className="font-display text-xl text-gray-900 leading-snug mb-3 group-hover:text-dark-green transition-colors">{post.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-[0.75rem] text-gray-400">{post.author}</span>
              <CardShare url={`${origin}/blog/${post.slug}`} title={post.title} />
            </div>
          </div>
        </Link>
      </Reveal>
    </StaggerChild>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [showAllTags, setShowAllTags] = useState(false)

  useEffect(() => {
    fetch('/content/blog-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const published = (Array.isArray(data) ? data : [])
          .filter((p) => p.status === 'published')
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        setPosts(published)
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const rankedTags = useMemo(() => {
    const counts = new Map()
    posts.forEach((p) => (p.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
  }, [posts])

  const visibleTags = showAllTags ? rankedTags : rankedTags.slice(0, TOP_TAGS)

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesTag = !activeTag || (p.tags || []).includes(activeTag)
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
  }, [posts, activeTag, query])

  const [featured, ...rest] = filtered

  return (
    <>
      <SEOMeta
        title="Blog | Shrishti Realty — Insights on Luxury Real Estate & Design"
        description="Perspectives on luxury real estate, interior design and architecture from the Shrishti Realty studio."
      />
      <PageBanner label="Insights" title="The Journal" subtitle="Perspectives on luxury real estate, design and craft" img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" />

      <section className="relative py-20 lg:py-28 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          {/* Search + tag filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-14">
            <div className="relative w-full lg:max-w-sm">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/[0.06] text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            {rankedTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setActiveTag(null)}
                  className={`px-4 py-1.5 rounded-full text-[0.68rem] font-medium tracking-wide uppercase border transition-colors duration-300 ${!activeTag ? 'bg-dark-green text-white border-dark-green' : 'border-gray-200 text-gray-500 hover:border-gold hover:text-gold'}`}>
                  All
                </button>
                {visibleTags.map((tag) => (
                  <button key={tag} onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`px-4 py-1.5 rounded-full text-[0.68rem] font-medium tracking-wide uppercase border transition-colors duration-300 ${activeTag === tag ? 'bg-dark-green text-white border-dark-green' : 'border-gray-200 text-gray-500 hover:border-gold hover:text-gold'}`}>
                    {tag}
                  </button>
                ))}
                {rankedTags.length > TOP_TAGS && (
                  <button onClick={() => setShowAllTags(!showAllTags)} className="px-4 py-1.5 text-[0.68rem] font-medium tracking-wide uppercase text-gold hover:text-gold-dark transition-colors">
                    {showAllTags ? 'Show less' : `+${rankedTags.length - TOP_TAGS} more`}
                  </button>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-32 text-center text-gray-400 text-sm">Loading articles…</div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-gray-400 text-sm mb-2">No articles found.</p>
              {(query || activeTag) && (
                <button onClick={() => { setQuery(''); setActiveTag(null) }} className="text-gold text-sm hover:text-gold-dark transition-colors">Clear filters</button>
              )}
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && !query && !activeTag && (
                <Reveal className="mb-16">
                  <Link to={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-3xl overflow-hidden border border-black/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                    <div className="relative h-72 lg:h-full lg:min-h-[380px] overflow-hidden">
                      <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8 lg:p-10 lg:pr-14">
                      <span className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-gold mb-4 block">Latest Feature</span>
                      <h2 className="font-display text-2xl lg:text-3xl text-gray-900 leading-tight mb-4 group-hover:text-dark-green transition-colors">{featured.title}</h2>
                      <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-dark-green">
                        Read Article <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )}

              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(featured && !query && !activeTag ? rest : filtered).map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </Stagger>
            </>
          )}

          <DiamondSeparator className="mt-24" />
        </div>
      </section>
    </>
  )
}
