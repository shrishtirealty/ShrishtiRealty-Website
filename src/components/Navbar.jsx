import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const sLinks = [
  { to: '/services/real-estate-development', label: 'Real Estate Development' },
  { to: '/services/interior-design', label: 'Interior Design & Turnkey' },
  { to: '/services/architecture-planning', label: 'Architecture Planning' },
  { to: '/services/project-management', label: 'Project Management' },
  { to: '/services/global-consultancy', label: 'Global Consultancy' },
  { to: '/services/3d-visualization', label: '3D Visualization & VR Studio' },
  { to: '/services/smart-portable-cabins', label: 'Smart Portable Cabins' },
]
const pLinks = [
  { to: '/projects/residential', label: 'Residential' },
  { to: '/projects/commercial', label: 'Commercial' },
  { to: '/projects/hospitality-retail', label: 'Hospitality & Retail' },
]

export default function Navbar({ onConsultationClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mob, setMob] = useState(false)
  const [dd, setDd] = useState(null)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setMob(false); setDd(null) }, [loc])

  const isHome = loc.pathname === '/'

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)]'
          : `py-4 ${isHome ? 'bg-transparent' : 'bg-dark-green'}`
      }`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className={`w-10 h-10 rounded-full border-2 grid place-items-center font-display text-lg font-bold transition-colors duration-300 ${
            scrolled ? 'border-gold/40 text-gold' : 'border-gold/60 text-gold'
          }`}>S</div>
          <div className="hidden sm:block leading-[1.15]">
            <div className={`text-[0.95rem] font-bold tracking-wide transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              SHRISHTI <span className="text-gold">REALTY</span>
            </div>
            <div className={`text-[0.45rem] tracking-[0.35em] uppercase transition-colors duration-300 ${scrolled ? 'text-gray-400' : 'text-white/40'}`}>
              Luxury Redefined
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-0.5">
          <NL to="/" scrolled={scrolled} isHome={isHome} active={loc.pathname === '/'}>Home</NL>
          <NL to="/about" scrolled={scrolled} isHome={isHome} active={loc.pathname === '/about'}>About Us</NL>
          <DD label="Services" scrolled={scrolled} isHome={isHome} active={loc.pathname.startsWith('/services')} open={dd === 's'} onEnter={() => setDd('s')} onLeave={() => setDd(null)}>
            <Link to="/services" className="block px-5 py-2 text-[0.78rem] font-semibold text-green hover:bg-green-100 transition-colors">All Services &rarr;</Link>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            {sLinks.map(l => <Link key={l.to} to={l.to} className="block px-5 py-2 text-[0.78rem] text-gray-500 hover:text-dark-green hover:bg-green-100/50 hover:pl-6 transition-all duration-200">{l.label}</Link>)}
          </DD>
          <DD label="Projects" scrolled={scrolled} isHome={isHome} active={loc.pathname.startsWith('/projects')} open={dd === 'p'} onEnter={() => setDd('p')} onLeave={() => setDd(null)}>
            {pLinks.map(l => <Link key={l.to} to={l.to} className="block px-5 py-2.5 text-[0.78rem] text-gray-500 hover:text-dark-green hover:bg-green-100/50 hover:pl-6 transition-all duration-200">{l.label}</Link>)}
          </DD>
          <NL to="/contact" scrolled={scrolled} isHome={isHome} active={loc.pathname === '/contact'}>Contact Us</NL>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a href="tel:+917498388944" className={`w-9 h-9 rounded-full border grid place-items-center transition-all duration-300 ${scrolled ? 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold' : 'border-white/20 text-white/60 hover:border-gold hover:text-gold'}`} aria-label="Call"><FiPhone size={13} /></a>
          <a href="https://wa.me/7498388944" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full border grid place-items-center transition-all duration-300 ${scrolled ? 'border-gray-200 text-gray-400 hover:border-green hover:text-green' : 'border-white/20 text-white/60 hover:border-green-light hover:text-green-light'}`} aria-label="WhatsApp"><FaWhatsapp size={14} /></a>
          <button onClick={onConsultationClick}
            className="ml-2 px-6 py-2.5 bg-gold text-white text-[0.68rem] font-bold tracking-[0.15em] uppercase rounded hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20 transition-all duration-300">
            Book A Consultation
          </button>
        </div>

        {/* Mobile */}
        <button className={`lg:hidden p-2 z-[101] ${scrolled || !isHome ? 'text-gray-800' : 'text-white'}`} onClick={() => setMob(!mob)} aria-label="Menu">
          {mob ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mob && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-[98]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMob(false)} />
            <motion.div className="fixed top-0 right-0 w-[85%] max-w-[380px] h-screen bg-white z-[99] shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }}>
              <div className="pt-20 px-6 pb-8 h-full overflow-y-auto">
                {['/', '/about', '/contact'].map(p => (
                  <Link key={p} to={p} className="block py-3.5 text-[0.9rem] text-gray-600 hover:text-dark-green border-b border-gray-100 transition-colors">
                    {p === '/' ? 'Home' : p === '/about' ? 'About Us' : 'Contact Us'}
                  </Link>
                ))}
                <MDD label="Services" open={dd === 's'} toggle={() => setDd(dd === 's' ? null : 's')}>
                  <Link to="/services" className="block py-2 text-[0.82rem] text-green font-medium">All Services</Link>
                  {sLinks.map(l => <Link key={l.to} to={l.to} className="block py-2 text-[0.82rem] text-gray-400 hover:text-gray-700">{l.label}</Link>)}
                </MDD>
                <MDD label="Projects" open={dd === 'p'} toggle={() => setDd(dd === 'p' ? null : 'p')}>
                  {pLinks.map(l => <Link key={l.to} to={l.to} className="block py-2 text-[0.82rem] text-gray-400 hover:text-gray-700">{l.label}</Link>)}
                </MDD>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button onClick={onConsultationClick} className="w-full py-3 bg-gold text-white text-[0.75rem] font-bold tracking-[0.15em] uppercase rounded hover:bg-gold-dark transition-colors">Book A Consultation</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NL({ to, scrolled, isHome, active, children }) {
  const base = scrolled
    ? (active ? 'text-dark-green' : 'text-gray-500 hover:text-dark-green')
    : (active ? 'text-gold' : (isHome ? 'text-white/80 hover:text-white' : 'text-white/70 hover:text-white'))
  return (
    <Link to={to} className={`relative px-4 py-2 text-[0.75rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300 group ${base}`}>
      {children}
      <span className={`absolute bottom-0 left-4 right-4 h-[2px] transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} ${scrolled ? 'bg-dark-green' : 'bg-gold'}`} />
    </Link>
  )
}

function DD({ label, scrolled, isHome, active, open, onEnter, onLeave, children }) {
  const base = scrolled
    ? (active ? 'text-dark-green' : 'text-gray-500 hover:text-dark-green')
    : (active ? 'text-gold' : (isHome ? 'text-white/80 hover:text-white' : 'text-white/70 hover:text-white'))
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className={`flex items-center gap-1 px-4 py-2 text-[0.75rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300 ${base}`}>
        {label} <FiChevronDown className={`text-[0.6rem] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl py-2 shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-gray-100">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MDD({ label, open, toggle, children }) {
  return (
    <div>
      <button onClick={toggle} className="w-full flex items-center justify-between py-3.5 text-[0.9rem] text-gray-600 border-b border-gray-100">
        {label} <FiChevronDown className={`text-xs transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>{open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4">{children}</motion.div>
      )}</AnimatePresence>
    </div>
  )
}
