import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiFileText, FiPlusCircle, FiSearch, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { clearAdminSession, getAdminUser } from '../../utils/adminApi'

const NAV = [
  { to: '/admin', label: 'All Posts', icon: FiFileText, exact: true },
  { to: '/admin/new', label: 'New Post', icon: FiPlusCircle },
  { to: '/admin/seo', label: 'SEO Meta Tags', icon: FiSearch },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
]

function SidebarContent({ pathname, onNavigate, onLogout }) {
  const isActive = (item) => (item.exact ? pathname === item.to : pathname.startsWith(item.to))
  return (
    <>
      <Link to="/admin" className="flex items-center gap-2 px-6 py-6 mb-2">
        <img src="/srlogo_icon.png" alt="Shrishti Realty" className="h-8 w-auto" />
        <span className="font-display text-white text-sm tracking-wide">Admin Studio</span>
      </Link>
      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link key={item.to} to={item.to} onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[0.82rem] font-medium transition-colors duration-300 ${active ? 'bg-gold/15 text-gold' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}>
              <Icon size={15} /> {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/8">
        <div className="px-4 py-2 text-[0.7rem] text-white/30">Signed in as <span className="text-white/60 font-medium">{getAdminUser()}</span></div>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[0.82rem] font-medium text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors duration-300">
          <FiLogOut size={15} /> Logout
        </button>
      </div>
    </>
  )
}

export default function AdminLayout({ title, actions, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    clearAdminSession()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#f6f4f0] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-dark-green fixed inset-y-0 left-0">
        <SidebarContent pathname={location.pathname} onLogout={logout} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-dark-green flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-4 text-white/60"><FiX size={20} /></button>
            <SidebarContent pathname={location.pathname} onNavigate={() => setMobileOpen(false)} onLogout={logout} />
          </div>
        </div>
      )}

      <div className="flex-1 lg:ml-60">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-black/[0.05] px-5 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-gray-500" onClick={() => setMobileOpen(true)}><FiMenu size={20} /></button>
            <h1 className="font-display text-lg text-gray-900">{title}</h1>
          </div>
          {actions}
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
