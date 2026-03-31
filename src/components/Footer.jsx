import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiArrowUp, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp, FaYoutube } from 'react-icons/fa'
import Reveal from './Reveal'

export default function Footer({ onConsultationClick }) {
  return (
    <footer>
      {/* Gold CTA Strip */}
      <div className="bg-gold">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-dark-green italic">
            Let's design your next chapter of luxury
          </h3>
          <button onClick={onConsultationClick} className="group flex items-center gap-2 px-7 py-3 text-[0.68rem] font-bold tracking-[0.18em] uppercase border-2 border-dark-green text-dark-green hover:bg-dark-green hover:text-white transition-all duration-300 whitespace-nowrap">
            Book A Private Consultation <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Footer - Dark Green */}
      <div className="bg-dark-green relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full border border-gold/30 grid place-items-center font-display text-sm font-bold text-gold">S</div>
                <span className="text-sm font-bold tracking-wide text-white">SHRISHTI <span className="text-gold">REALTY</span></span>
              </div>
              <p className="text-[0.48rem] tracking-[0.3em] uppercase text-white/25 mb-3">Luxury Redefined</p>
              <p className="text-[0.82rem] text-white/40 leading-relaxed mb-5 max-w-[280px]">
                From Mumbai to Dubai, Doha to London, we redefine luxury through innovation, detail and soul.
              </p>
              <div className="flex gap-2">
                {[{ Icon: FaWhatsapp, href: 'https://wa.me/7498388944' }, { Icon: FaYoutube, href: 'https://youtube.com/@shrishtirealty' }].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white/30 hover:border-gold/40 hover:text-gold transition-all duration-300">
                    <s.Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2"><FH>Services</FH>
              <ul className="space-y-2">{[['Real Estate Development','/services/real-estate-development'],['Interior Design & Turnkey','/services/interior-design'],['Architecture Planning','/services/architecture-planning'],['Project Management','/services/project-management'],['Global Consultancy','/services/global-consultancy'],['3D Visualization','/services/3d-visualization'],['Smart Portable Cabins','/services/smart-portable-cabins']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2"><FH>Quick Links</FH>
              <ul className="space-y-2 mb-6">{[['Home','/'],['About Us','/about'],['Services','/services'],['Refer & Earn','/refer-and-earn'],['Connect','/connect'],['Contact Us','/contact']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
              <FH>Projects</FH>
              <ul className="space-y-2">{[['Residential','/projects/residential'],['Commercial','/projects/commercial'],['Hospitality & Retail','/projects/hospitality-retail']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4"><FH>Contact</FH>
              <ul className="space-y-3.5 mb-6">
                <li className="flex items-center gap-3"><FiPhone className="text-gold/40 shrink-0" size={13} /><a href="tel:+917498388944" className="text-[0.82rem] text-white/35 hover:text-gold transition-colors">+91-7498388944</a></li>
                <li className="flex items-center gap-3"><FaWhatsapp className="text-gold/40 shrink-0" size={13} /><a href="https://wa.me/7498388944" target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-white/35 hover:text-gold transition-colors">Connect on WhatsApp</a></li>
                <li className="flex items-center gap-3"><FiMail className="text-gold/40 shrink-0" size={13} /><a href="mailto:info@shrishtirealty.com" className="text-[0.82rem] text-white/35 hover:text-gold transition-colors">info@shrishtirealty.com</a></li>
                <li className="flex items-center gap-3"><FiMapPin className="text-gold/40 shrink-0" size={13} /><span className="text-[0.82rem] text-white/35">Mumbai, MH India</span></li>
              </ul>
              <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/20 mb-2.5">Global Presence</p>
              <div className="flex flex-wrap gap-1.5">
                {['Mumbai','Dubai','Doha','London'].map(c=><span key={c} className="px-3 py-1 text-[0.62rem] rounded-full border border-white/8 text-white/25">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-5 border-t border-white/8 text-center">
            <p className="text-[0.72rem] text-white/20">&copy; {new Date().getFullYear()} shrishtirealty.com | All Rights Reserved</p>
          </div>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-dark-green text-white grid place-items-center shadow-lg hover:bg-gold hover:scale-110 transition-all duration-300" aria-label="Top"><FiArrowUp size={16} /></button>
    </footer>
  )
}

function FH({ children }) { return <h4 className="text-[0.62rem] font-bold tracking-[0.25em] uppercase text-white/50 mb-4 pb-2 border-b border-white/8 inline-block">{children}</h4> }
function FL({ to, children }) { return <Link to={to} className="text-[0.8rem] text-white/30 hover:text-gold hover:pl-1 transition-all duration-300 block">{children}</Link> }
