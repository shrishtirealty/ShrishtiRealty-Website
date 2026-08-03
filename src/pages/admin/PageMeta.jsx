import { useEffect, useState } from 'react'
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminApi } from '../../utils/adminApi'

const EMPTY_ENTRY = { label: '', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' }

export default function AdminPageMeta() {
  const [pages, setPages] = useState({})
  const [activePath, setActivePath] = useState(null)
  const [newPath, setNewPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi('page-meta')
      .then((data) => {
        setPages(data || {})
        setActivePath(Object.keys(data || {})[0] || null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const updateEntry = (field, value) => {
    setPages((prev) => ({ ...prev, [activePath]: { ...(prev[activePath] || EMPTY_ENTRY), [field]: value } }))
  }

  const addPath = () => {
    const path = newPath.trim()
    if (!path || !path.startsWith('/')) { alert('Path must start with /'); return }
    setPages((prev) => ({ ...prev, [path]: { ...EMPTY_ENTRY, label: path } }))
    setActivePath(path)
    setNewPath('')
  }

  const removePath = (path) => {
    if (!window.confirm(`Remove SEO overrides for "${path}"?`)) return
    setPages((prev) => {
      const next = { ...prev }
      delete next[path]
      return next
    })
    if (activePath === path) setActivePath(null)
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await adminApi('save-page-meta', { method: 'POST', body: { pages } })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const entry = pages[activePath] || EMPTY_ENTRY

  if (loading) return <AdminLayout title="SEO Meta Tags"><div className="text-gray-400 text-sm">Loading…</div></AdminLayout>

  return (
    <AdminLayout
      title="SEO Meta Tags"
      actions={
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
          <FiSave size={14} /> {saving ? 'Saving…' : 'Save'}
        </button>
      }
    >
      {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg mb-5">{error}</p>}

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex gap-2 mb-3">
            <input value={newPath} onChange={(e) => setNewPath(e.target.value)} placeholder="/new-route"
              className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-[0.8rem] focus:outline-none focus:border-gold/50" />
            <button type="button" onClick={addPath} className="w-9 h-9 shrink-0 rounded-lg bg-dark-green text-white grid place-items-center hover:bg-green transition-colors"><FiPlus size={14} /></button>
          </div>
          <div className="space-y-1">
            {Object.keys(pages).length === 0 && <p className="text-gray-400 text-[0.8rem] px-2 py-3">No routes yet.</p>}
            {Object.keys(pages).map((path) => (
              <div key={path} className={`group flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors ${activePath === path ? 'bg-gold/10 text-dark-green' : 'text-gray-500 hover:bg-gray-50'}`} onClick={() => setActivePath(path)}>
                <div className="text-[0.8rem] truncate">
                  <div className="font-medium">{pages[path]?.label || path}</div>
                  <div className="text-[0.7rem] text-gray-400">{path}</div>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); removePath(path) }} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity"><FiTrash2 size={13} /></button>
              </div>
            ))}
          </div>
        </div>

        {activePath ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gray-400 block">{activePath}</span>
            <Field label="Label (admin display name)"><input value={entry.label} onChange={(e) => updateEntry('label', e.target.value)} className="input" /></Field>
            <Field label="Title Tag"><input value={entry.title} onChange={(e) => updateEntry('title', e.target.value)} className="input" /></Field>
            <Field label="Meta Description"><textarea value={entry.description} onChange={(e) => updateEntry('description', e.target.value)} rows={2} className="input resize-none" /></Field>
            <Field label="Keywords"><input value={entry.keywords} onChange={(e) => updateEntry('keywords', e.target.value)} className="input" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="OG Title"><input value={entry.ogTitle} onChange={(e) => updateEntry('ogTitle', e.target.value)} className="input" /></Field>
              <Field label="OG Description"><input value={entry.ogDescription} onChange={(e) => updateEntry('ogDescription', e.target.value)} className="input" /></Field>
            </div>
            <Field label="OG Image URL"><input value={entry.ogImage} onChange={(e) => updateEntry('ogImage', e.target.value)} className="input" /></Field>
            <Field label="Canonical URL"><input value={entry.canonical} onChange={(e) => updateEntry('canonical', e.target.value)} className="input" /></Field>

            {/* Google-style preview */}
            <div className="mt-2 pt-4 border-t border-gray-100">
              <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gray-400 block mb-2">Search Preview</span>
              <div className="max-w-md">
                <div className="text-[#1a0dab] text-lg truncate">{entry.title || 'Page title'}</div>
                <div className="text-[#006621] text-sm truncate">{entry.canonical || 'https://www.shrishtirealty.com' + activePath}</div>
                <div className="text-gray-600 text-sm line-clamp-2">{entry.description || 'Meta description preview...'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">Select or add a route to edit its SEO tags.</div>
        )}
      </div>

      <style>{`.input { width: 100%; padding: 0.625rem 1rem; border-radius: 0.5rem; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 0.875rem; } .input:focus { outline: none; border-color: rgba(201,168,76,0.5); }`}</style>
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
