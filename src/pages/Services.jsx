import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { BsBuildings, BsPalette, BsHouseDoor, BsGrid, BsGlobe2, BsCameraVideo, BsBox } from 'react-icons/bs'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { DotGrid, CornerArc, FloatingCircle, DiagonalLines, DiamondSeparator } from '../components/Decorations'

const services = [
  { icon: BsBuildings, title: 'Real Estate Development', desc: 'Curated experience, not just construction. We develop boutique residences, signature villas, high-end apartments and commercial spaces across Thane, Mumbai, Dubai and Doha.', to: '/services/real-estate-development', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { icon: BsPalette, title: 'Interior Design & Turnkey', desc: 'We create immersive environments that balance aesthetic richness with everyday usability. From furniture customization to art curation.', to: '/services/interior-design', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { icon: BsHouseDoor, title: 'Architecture & Planning', desc: 'Creativity, climate-responsiveness and cultural sensitivity combined for residential, commercial, hospitality and mixed-use developments.', to: '/services/architecture-planning', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80' },
  { icon: BsGrid, title: 'Project Management', desc: 'Schedule control, procurement coordination, vendor management, budgeting and quality assurance for India and overseas.', to: '/services/project-management', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { icon: BsGlobe2, title: 'Global Consultancy', desc: 'Strategic design and development advisory for India, GCC and international markets with cross-border experience.', to: '/services/global-consultancy', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { icon: BsCameraVideo, title: '3D Visualization & VR Studio', desc: 'Hyper-realistic visual experiences — photorealistic renderings, VR walkthroughs, 360-degree tours and AR previews.', to: '/services/3d-visualization', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80' },
  { icon: BsBox, title: 'Smart Portable Cabins', desc: 'Move-in ready modular solutions — prefab homes, luxury villas, commercial pods and specialized structures.', to: '/services/smart-portable-cabins', img: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80' },
]

export default function Services() {
  return (
    <>
      <PageBanner label="Our Expertise" title="Our Services" subtitle="Why Partner With Us" img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" />

      {/* Intro */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={300} />
        <FloatingCircle size={400} bottom="-8%" left="-5%" color="gold" opacity={0.03} />

        <div className="relative max-w-3xl mx-auto px-5 text-center mb-20">
          <Reveal>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-gray-900 mb-5">A Full-Spectrum Design-Build Brand</h2>
            <p className="text-gray-600 leading-[1.9]">From concept to completion, we deliver excellence across seven core verticals — each powered by decades of expertise, global perspective, and an unwavering commitment to craftsmanship.</p>
          </Reveal>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 space-y-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <Link to={s.to} className={`group grid md:grid-cols-[1fr_1.5fr] gap-0 rounded-2xl overflow-hidden border border-black/[0.04] bg-white/70 backdrop-blur-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 card-glow ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className="relative h-[220px] md:h-auto md:min-h-[260px] overflow-hidden">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="absolute inset-0 bg-dark-green/15 group-hover:bg-dark-green/5 transition-all" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center"><span className="font-display text-sm font-bold text-dark-green">0{i + 1}</span></div>
                </div>
                <div className={`p-8 lg:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-green-pale grid place-items-center mb-5 group-hover:bg-gold/10 transition-colors"><s.icon className="text-green text-lg group-hover:text-gold transition-colors" /></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-dark-green transition-colors">{s.title}</h3>
                  <p className="text-[0.9rem] text-gray-600 leading-[1.8] mb-5">{s.desc}</p>
                  <div className="flex items-center gap-2 text-dark-green text-[0.72rem] font-bold tracking-[0.1em] uppercase group-hover:text-gold group-hover:gap-3 transition-all duration-300">Explore Service <FiArrowRight size={13} /></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
