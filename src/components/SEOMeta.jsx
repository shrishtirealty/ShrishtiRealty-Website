import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Module-level cache so every SEOMeta instance shares a single fetch of the
// admin-managed page-meta.json instead of re-requesting it per page.
let metaPromise = null
function loadPageMeta() {
  if (!metaPromise) {
    metaPromise = fetch('/content/page-meta.json')
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
  }
  return metaPromise
}

function setMetaTag(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) { tag = document.createElement('meta'); tag.name = name; document.head.appendChild(tag) }
  tag.content = content
}

function setOgTag(property, content) {
  if (!content) return
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag) }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  if (!href) return
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
  link.setAttribute('href', href)
}

/**
 * SEOMeta — updates document <title>, meta description/keywords, OG tags and
 * canonical link per page. Props are the defaults; any entry for the current
 * path in the admin-managed public/content/page-meta.json takes precedence.
 * Usage: <SEOMeta title="Page Title | Shrishti Realty" description="..." />
 */
export default function SEOMeta({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    let cancelled = false

    loadPageMeta().then((all) => {
      if (cancelled) return
      const override = all?.[location.pathname]
      const finalTitle = override?.title || title
      const finalDescription = override?.description || description

      if (finalTitle) document.title = finalTitle
      setMetaTag('description', finalDescription)
      setMetaTag('keywords', override?.keywords)
      setOgTag('og:title', override?.ogTitle || finalTitle)
      setOgTag('og:description', override?.ogDescription || finalDescription)
      setOgTag('og:image', override?.ogImage)
      setCanonical(override?.canonical)
    })

    return () => {
      cancelled = true
      document.title = 'Shrishti Realty | Luxury Redefined'
    }
  }, [title, description, location.pathname])

  return null
}
