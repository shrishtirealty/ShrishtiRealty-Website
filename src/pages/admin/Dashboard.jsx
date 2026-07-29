import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiExternalLink } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminApi } from '../../utils/adminApi'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [deletingSlug, setDeletingSlug] = useState(null)

  const load = () => {
    setLoading(true)
    adminApi('blogs')
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const filtered = useMemo(() => {
    const sorted = [...posts].sort((a, b) => new Date(b.updatedAt || b.publishedAt) - new Date(a.updatedAt || a.publishedAt))
    if (filter === 'all') return sorted
    return sorted.filter((p) => p.status === filter)
  }, [posts, filter])

  const remove = async (slug) => {
    if (!window.confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeletingSlug(slug)
    try {
      await adminApi('delete', { method: 'POST', body: { slug } })
      setPosts((prev) => prev.filter((p) => p.slug !== slug))
    } catch (err) {
      alert('Delete failed: ' + err.message)
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <AdminLayout
      title="All Posts"
      actions={
        <Link to="/admin/new" className="flex items-center gap-2 px-4 py-2 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors">
          <FiPlus size={14} /> New Post
        </Link>
      }
    >
      <div className="flex items-center gap-2 mb-6">
        {['all', 'published', 'draft'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[0.7rem] font-medium uppercase tracking-wide border transition-colors ${filter === f ? 'bg-dark-green text-white border-dark-green' : 'border-gray-200 text-gray-500 hover:border-gold hover:text-gold'}`}>
            {f}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No posts yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[0.68rem] uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Status</th>
                <th className="px-5 py-3 font-medium hidden lg:table-cell">Updated</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.slug} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-800">{post.title}</div>
                    <div className="text-[0.72rem] text-gray-400">/{post.slug}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase ${post.status === 'published' ? 'bg-green-pale text-green' : 'bg-gray-100 text-gray-500'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-[0.8rem]">
                    {new Date(post.updatedAt || post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" title="Preview"
                        className="w-8 h-8 rounded-lg grid place-items-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <FiEye size={14} />
                      </a>
                      <Link to={`/admin/edit/${post.slug}`} title="Edit"
                        className="w-8 h-8 rounded-lg grid place-items-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <FiEdit2 size={14} />
                      </Link>
                      <button onClick={() => remove(post.slug)} disabled={deletingSlug === post.slug} title="Delete"
                        className="w-8 h-8 rounded-lg grid place-items-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <a href="/blog" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 text-[0.78rem] text-gray-400 hover:text-gold transition-colors">
        View public blog <FiExternalLink size={12} />
      </a>
    </AdminLayout>
  )
}
