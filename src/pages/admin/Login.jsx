import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import { adminApi, setAdminSession, getAdminToken } from '../../utils/adminApi'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (getAdminToken()) navigate('/admin', { replace: true })
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminApi('login', { method: 'POST', body: { username, password } })
      setAdminSession(res.token, res.username)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-green flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
      <div className="relative w-full max-w-sm bg-white rounded-2xl p-8 lg:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <img src="/srlogo_icon.png" alt="Shrishti Realty" className="h-10 w-auto mx-auto mb-4" />
          <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold block mb-1">Admin Studio</span>
          <h1 className="font-display text-xl text-gray-900">Sign in to continue</h1>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-gold/50 transition-colors" />
          </div>

          {error && <p className="text-[0.8rem] text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-dark-green text-white text-[0.75rem] font-bold tracking-[0.15em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
            {loading ? 'Signing in…' : <>Sign In <FiArrowRight size={13} /></>}
          </button>
        </form>
      </div>
    </div>
  )
}
