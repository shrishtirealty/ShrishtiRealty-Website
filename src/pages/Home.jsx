import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { BsBuildings, BsPalette, BsHouseDoor, BsGrid, BsGlobe2, BsCameraVideo, BsBox } from 'react-icons/bs'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'
import { DotGrid, CornerArc, FloatingCircle, GridPattern, DiamondSeparator, DashedLine, DiagonalLines } from '../components/Decorations'

const services = [
  { icon: BsBuildings, title: 'Real Estate Development', desc: 'Boutique residences, signature villas, and high-end commercial spaces.', to: '/services/real-estate-development', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { icon: BsPalette, title: 'Interior Design & Turnkey', desc: 'Immersive environments balancing aesthetics with everyday usability.', to: '/services/interior-design', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  { icon: BsHouseDoor, title: 'Architecture Planning', desc: 'Creativity, climate-responsiveness, and cultural sensitivity.', to: '/services/architecture-planning', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' },
  { icon: BsGrid, title: 'Project Management', desc: 'Schedule control, procurement, vendor management & quality assurance.', to: '/services/project-management', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { icon: BsGlobe2, title: 'Global Consultancy', desc: 'Strategic advisory for India, GCC, and international markets.', to: '/services/global-consultancy', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
  { icon: BsCameraVideo, title: '3D Visualization & VR', desc: 'Hyper-realistic visual experiences with cutting-edge technology.', to: '/services/3d-visualization', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80' },
  { icon: BsBox, title: 'Smart Portable Cabins', desc: 'Modular, move-in ready spaces built fast, delivered anywhere.', to: '/services/smart-portable-cabins', img: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=600&q=80' },
]

export default function Home({ onConsultationClick }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <motion.div style={{ y: textY, opacity }} className="relative z-10 h-full max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-gold" /><span className="text-[0.65rem] font-medium tracking-[0.35em] uppercase text-gold">Welcome to Shrishti Realty</span>
            </motion.div>
            <motion.h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-none tracking-[-0.02em] text-white mb-3" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Luxury</motion.h1>
            <motion.h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-none tracking-[-0.02em] text-gold italic pb-3 mb-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Redefined</motion.h1>
            <motion.p className="text-[1.05rem] text-white/65 font-light leading-[1.9] max-w-md mb-10" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Every line drawn and every material chosen tells a story of design that transcends function. From Mumbai to Dubai, Doha to London.</motion.p>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <button onClick={onConsultationClick} className="group flex items-center gap-2 px-8 py-4 bg-gold text-dark-green text-[0.7rem] font-bold tracking-[0.15em] uppercase hover:bg-gold-light hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-500">Book A Consultation <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
              <Link to="/projects/residential" className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-500 backdrop-blur-sm">View Projects</Link>
            </motion.div>
          </div>
        </motion.div>
        {/* Stats */}
        <motion.div className="absolute bottom-0 inset-x-0 z-20" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}>
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <div className="glass-dark rounded-t-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
                {[['4','Global Offices'],['500+','Projects Delivered'],['15+','Years Experience'],['100%','Client Satisfaction']].map(([v,l],i)=>(
                  <div key={i} className="py-6 px-6 text-center"><div className="font-display text-2xl lg:text-3xl font-normal text-white">{v}</div><div className="text-[0.58rem] font-medium tracking-[0.18em] uppercase text-white/35 mt-1.5">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-dark-green py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-8 px-4">
              {['Real Estate Development','Interior Design','Architecture','Project Management','Global Consultancy','3D Visualization','Portable Cabins'].map((t, i) => (
                <span key={i} className="flex items-center gap-8"><span className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-white/30">{t}</span><span className="text-gold/40">&#9670;</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={350} />
        <CornerArc position="bottom-left" size={250} color="green" />
        <FloatingCircle size={500} top="-10%" right="-10%" color="gold" opacity={0.03} />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal direction="left">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="" className="w-full h-[520px] object-cover rounded-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-dark-green p-6 rounded-xl shadow-2xl hidden lg:block">
                  <div className="font-display text-3xl font-normal text-gold">15+</div>
                  <div className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/50">Years of Excellence</div>
                </div>
                <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl hidden lg:block" />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">Our Philosophy</span>
              <h2 className="font-display text-3xl lg:text-[2.6rem] font-normal text-gray-900 leading-[1.2] mb-5">We believe luxury is not about excess, but about <span className="italic text-green">balance</span></h2>
              <div className="w-14 h-[1.5px] bg-gold mb-7" />
              <p className="text-gray-600 leading-[1.95] mb-5">Between art and architecture, form and feeling, concept and craft. Our mission is to craft environments that inspire, endure and elevate everyday living.</p>
              <p className="text-gray-600 leading-[1.95] mb-8">At Shrishti Realty, Design is not decoration — it's dialogue. Inspired by contextual minimalism and sustainability-driven design philosophy.</p>
              <Link to="/about" className="group inline-flex items-center gap-2 text-dark-green text-[0.72rem] font-bold tracking-[0.12em] uppercase hover:gap-3 transition-all duration-400">Discover Our Story <FiArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="relative py-28 lg:py-36 bg-[#f0ece6] overflow-hidden">
        <DiagonalLines />
        <CornerArc position="top-left" size={300} />
        <FloatingCircle size={400} bottom="-5%" left="-5%" color="green" opacity={0.03} />
        <DashedLine height={160} className="absolute top-0 left-1/2 -translate-x-1/2 hidden lg:block" />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <Reveal>
              <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-3 block">What We Do</span>
              <h2 className="font-display text-3xl lg:text-5xl font-normal text-gray-900 tracking-[-0.02em]">Why Partner With Us</h2>
            </Reveal>
            <Reveal delay={0.1}><p className="text-gray-600 max-w-md lg:text-right leading-relaxed">A full-spectrum design-build brand delivering excellence across seven core verticals.</p></Reveal>
          </div>

          <Stagger gap={0.08} className="grid md:grid-cols-3 gap-5 mb-5">
            {services.slice(0, 3).map((s, i) => (
              <StaggerChild key={i}>
                <Link to={s.to} className="group block relative h-[400px] rounded-2xl overflow-hidden card-glow">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-5 left-5"><div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md grid place-items-center border border-white/10"><s.icon className="text-white text-lg" /></div></div>
                  <div className="absolute bottom-0 inset-x-0 p-7">
                    <h3 className="text-[1.1rem] font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-[0.8rem] text-white/55 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex items-center gap-2 text-gold text-[0.62rem] font-semibold tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">Learn More <FiArrowRight size={11} /></div>
                  </div>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>

          <Stagger gap={0.06} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {services.slice(3).map((s, i) => (
              <StaggerChild key={i}>
                <Link to={s.to} className="group block bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-black/[0.04] hover:border-gold/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full card-glow">
                  <div className="w-11 h-11 rounded-lg bg-green-pale grid place-items-center mb-4 group-hover:bg-gold/10 transition-colors duration-500"><s.icon className="text-green text-lg group-hover:text-gold transition-colors duration-500" /></div>
                  <h3 className="text-[0.88rem] font-semibold text-gray-900 mb-2 group-hover:text-dark-green transition-colors">{s.title}</h3>
                  <p className="text-[0.78rem] text-gray-500 leading-relaxed">{s.desc}</p>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>

          <Reveal className="text-center mt-14">
            <Link to="/services" className="group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 bg-dark-green text-white text-[0.7rem] font-bold tracking-[0.15em] uppercase rounded transition-all duration-400">
              <span className="relative z-10 flex items-center gap-2">Explore All Services <FiArrowRight size={13} /></span>
              <span className="absolute inset-0 bg-green scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </Link>
          </Reveal>
        </div>
      </section>

      <DiamondSeparator className="py-6 bg-[#f6f4f0]" />

      {/* ═══ FEATURED PROJECTS ═══ */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="bottom-right" size={400} />
        <FloatingCircle size={450} top="10%" left="-8%" color="gold" opacity={0.025} />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <Reveal>
              <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-3 block">Portfolio</span>
              <h2 className="font-display text-3xl lg:text-5xl font-normal text-gray-900 tracking-[-0.02em]">Featured Design &<br/>Build Projects</h2>
            </Reveal>
            <Reveal delay={0.15}><p className="text-gray-600 max-w-md lg:text-right leading-relaxed">Explore our curated collection of luxury residences, commercial spaces, and hospitality projects.</p></Reveal>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { to: '/projects/residential', title: 'Residential Projects', desc: 'Boutique residences and signature villas', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
              { to: '/projects/commercial', title: 'Commercial Projects', desc: 'Modern workspaces and retail destinations', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
              { to: '/projects/hospitality-retail', title: 'Hospitality & Retail', desc: 'Immersive experiences that captivate', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <Link to={p.to} className="group block relative h-[500px] rounded-2xl overflow-hidden card-glow">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-8">
                    <span className="text-[0.58rem] font-semibold tracking-[0.3em] uppercase text-gold mb-2 block">Explore</span>
                    <h3 className="font-display text-2xl font-normal text-white mb-2">{p.title}</h3>
                    <p className="text-[0.82rem] text-white/55 mb-5">{p.desc}</p>
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gold text-dark-green grid place-items-center group-hover:translate-x-2 transition-transform duration-400"><FiArrowRight size={15} /></div></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL PRESENCE ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-[#0f1f16]/90" />
        <GridPattern dark />
        <CornerArc position="top-left" size={250} color="gold" />
        <CornerArc position="bottom-right" size={300} color="gold" />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold/70 mb-3 block">Global Reach</span>
            <h2 className="font-display text-3xl lg:text-5xl font-normal text-white mb-4">Our Global Presence</h2>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">We redefine luxury through innovation, detail and soul — from Mumbai to Dubai, Doha to London.</p>
          </Reveal>
          <Stagger gap={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { city: 'Mumbai', country: 'India', role: 'Headquarters', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80' },
              { city: 'Dubai', country: 'UAE', role: 'GCC Operations', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
              { city: 'Doha', country: 'Qatar', role: 'Regional Office', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80' },
              { city: 'London', country: 'UK', role: 'European Hub', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
            ].map((loc, i) => (
              <StaggerChild key={i}>
                <div className="group relative rounded-2xl overflow-hidden h-[280px] lg:h-[320px]">
                  <img src={loc.img} alt={loc.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                  <div className="absolute top-5 right-5"><div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(201,168,76,0.5)]" /></div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h4 className="text-lg font-semibold text-white mb-0.5">{loc.city}</h4>
                    <p className="text-[0.75rem] text-white/45 mb-2">{loc.country}</p>
                    <span className="inline-block px-3 py-1 bg-gold/15 text-gold text-[0.55rem] font-semibold tracking-[0.15em] uppercase rounded-full border border-gold/20">{loc.role}</span>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <FloatingCircle size={350} top="20%" right="-5%" color="gold" opacity={0.025} />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="font-display text-[5rem] text-gold/12 leading-none block -mb-8 select-none">&ldquo;</span>
            <blockquote className="font-display text-xl lg:text-[1.6rem] italic text-gray-600 leading-[1.85] font-normal">We design for the soul, engineer for the future and build with intention. Luxury is not about excess — it is about authenticity, comfort, and enduring beauty.</blockquote>
            <div className="w-12 h-[1.5px] bg-gold mx-auto mt-8 mb-4" />
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-gray-400">Shrishti Realty</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 text-center">
          <Reveal>
            <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold/60 mb-6 block">Let's Build Together</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[3.2rem] font-normal text-white mb-5 max-w-2xl mx-auto leading-[1.15]">Ready to Transform Your Vision Into Reality?</h2>
            <p className="text-white/50 mb-10 max-w-md mx-auto">Schedule a consultation with our design experts and take the first step towards your dream space.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={onConsultationClick} className="group flex items-center gap-2 px-9 py-4 bg-gold text-dark-green text-[0.7rem] font-bold tracking-[0.15em] uppercase hover:bg-gold-light hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-500">Book A Consultation <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
              <Link to="/contact" className="px-9 py-4 border border-white/15 text-white/70 text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-500 backdrop-blur-sm">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
