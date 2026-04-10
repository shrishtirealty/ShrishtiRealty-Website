import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiArrowUp, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp, FaYoutube } from 'react-icons/fa'

export default function Footer({ onConsultationClick }) {
  return (
    <footer>
      {/* Gold CTA Strip */}
      <div className="bg-gold">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="font-display text-xl md:text-2xl font-normal text-dark-green italic tracking-wide">
            Let's design your next chapter of luxury
          </h3>
          <button onClick={onConsultationClick} className="group flex items-center gap-2 px-7 py-3 text-[0.65rem] font-bold tracking-[0.2em] uppercase border-2 border-dark-green text-dark-green hover:bg-dark-green hover:text-white transition-all duration-400 whitespace-nowrap">
            Book A Private Consultation <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0f1f16] relative overflow-hidden">
        {/* Brand watermark */}
        <div className="absolute bottom-0 right-0 font-display text-[12rem] lg:text-[18rem] font-bold text-white/[0.015] leading-none select-none pointer-events-none tracking-tight">SR</div>
        {/* Subtle grid */}
        <div className="absolute inset-0 pattern-grid-light" />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full border border-gold/25 grid place-items-center font-display text-sm font-bold text-gold">S</div>
                <span className="text-sm font-semibold tracking-wide text-white">SHRISHTI <span className="text-gold">REALTY</span></span>
              </div>
              <p className="text-[0.48rem] tracking-[0.35em] uppercase text-white/20 mb-3">Luxury Redefined</p>
              <p className="text-[0.8rem] text-white/35 leading-relaxed mb-4">
                From Mumbai to Dubai, Doha to London, we redefine luxury through innovation, detail and soul.
              </p>
              <div className="flex gap-2">
                {[{ Icon: FaWhatsapp, href: 'https://wa.me/7498388944' }, { Icon: FaYoutube, href: 'https://youtube.com/@shrishtirealty' }].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/8 grid place-items-center text-white/25 hover:border-gold/30 hover:text-gold transition-all duration-400">
                    <s.Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div><FH>Services</FH>
              <ul className="space-y-1.5">{[['Real Estate Development','/services/real-estate-development'],['Interior Design & Turnkey','/services/interior-design'],['Architecture Planning','/services/architecture-planning'],['Project Management','/services/project-management'],['Global Consultancy','/services/global-consultancy'],['3D Visualization','/services/3d-visualization'],['Smart Portable Cabins','/services/smart-portable-cabins']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
            </div>

            {/* Quick Links + Projects together */}
            <div><FH>Quick Links</FH>
              <ul className="space-y-1.5 mb-5">{[['Home','/'],['About Us','/about'],['Services','/services'],['Refer & Earn','/refer-and-earn'],['Connect','/connect'],['Contact Us','/contact']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
              <FH>Projects</FH>
              <ul className="space-y-1.5">{[['Residential','/projects/residential'],['Commercial','/projects/commercial'],['Hospitality & Retail','/projects/hospitality-retail']].map(([l,t])=><li key={t}><FL to={t}>{l}</FL></li>)}</ul>
            </div>

            {/* Contact - spans 2 cols */}
            <div className="lg:col-span-2">
              <FH>Contact</FH>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><FiPhone className="text-gold/40 shrink-0" size={13} /><a href="tel:+917498388944" className="text-[0.8rem] text-white/35 hover:text-gold transition-colors duration-300">+91-7498388944</a></li>
                  <li className="flex items-center gap-3"><FaWhatsapp className="text-gold/40 shrink-0" size={13} /><a href="https://wa.me/7498388944" target="_blank" rel="noopener noreferrer" className="text-[0.8rem] text-white/35 hover:text-gold transition-colors duration-300">Connect on WhatsApp</a></li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><FiMail className="text-gold/40 shrink-0" size={13} /><a href="mailto:info@shrishtirealty.com" className="text-[0.8rem] text-white/35 hover:text-gold transition-colors duration-300">info@shrishtirealty.com</a></li>
                  <li className="flex items-center gap-3"><FiMapPin className="text-gold/40 shrink-0" size={13} /><span className="text-[0.8rem] text-white/35">Mumbai, MH India</span></li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {['Mumbai','Dubai','Doha','London'].map(c=><span key={c} className="px-2.5 py-0.5 text-[0.58rem] rounded-full border border-white/8 text-white/20">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-5 border-t border-white/6 text-center">
            <p className="text-[0.72rem] text-white/18 tracking-wide">&copy; {new Date().getFullYear()} shrishtirealty.com | All Rights Reserved</p>
          </div>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-dark-green text-white grid place-items-center shadow-lg hover:bg-gold hover:text-dark-green hover:scale-110 transition-all duration-400" aria-label="Top"><FiArrowUp size={16} /></button>
    </footer>
  )
}

function FH({ children }) { return <h4 className="text-[0.58rem] font-bold tracking-[0.3em] uppercase text-white/40 mb-4 pb-2 border-b border-white/6 inline-block">{children}</h4> }
function FL({ to, children }) { return <Link to={to} className="text-[0.8rem] text-white/25 hover:text-gold hover:pl-1 transition-all duration-400 block">{children}</Link> }
