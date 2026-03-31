import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { BsBuildings, BsPalette, BsHouseDoor, BsGrid, BsGlobe2, BsCameraVideo, BsBox } from 'react-icons/bs'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'

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
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Luxury interior" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/60 to-dark-green/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-green/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ y: textY, opacity }} className="relative z-10 h-full max-w-[1400px] mx-auto px-5 lg:px-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-gold" />
              <span className="text-[0.65rem] font-semibold tracking-[0.35em] uppercase text-gold">Welcome to Shrishti Realty</span>
            </motion.div>

            <motion.h1
              className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-none tracking-tight text-white mb-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Luxury
            </motion.h1>
            <motion.h1
              className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-none tracking-tight text-gold italic pb-3 mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Redefined
            </motion.h1>

            <motion.p className="text-base lg:text-lg text-white/60 font-light leading-[1.8] max-w-md mb-10"
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              Every line drawn and every material chosen tells a story of design
              that transcends function. From Mumbai to Dubai, Doha to London.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
              <button onClick={onConsultationClick}
                className="group flex items-center gap-2 px-8 py-4 bg-gold text-dark-green text-[0.72rem] font-bold tracking-[0.13em] uppercase hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 transition-all duration-300">
                Book A Consultation <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/projects/residential"
                className="flex items-center gap-2 px-8 py-4 border border-white/25 text-white/80 text-[0.72rem] font-semibold tracking-[0.13em] uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                View Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div className="absolute bottom-0 inset-x-0 z-20"
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <div className="bg-white/10 backdrop-blur-xl rounded-t-2xl border-t border-x border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                {[['4','Global Offices'],['500+','Projects Delivered'],['15+','Years Experience'],['100%','Client Satisfaction']].map(([val,label],i)=>(
                  <div key={i} className="py-5 px-6 text-center">
                    <div className="font-display text-2xl lg:text-3xl font-bold text-white">{val}</div>
                    <div className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/40 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ ABOUT SNIPPET ═══════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal direction="left">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="Interior" className="w-full h-[500px] object-cover rounded-2xl" />
                <div className="absolute -bottom-8 -right-8 bg-gold p-6 rounded-xl shadow-xl hidden lg:block">
                  <div className="font-display text-3xl font-bold text-dark-green">15+</div>
                  <div className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-dark-green/70">Years of Excellence</div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4 block">Our Philosophy</span>
              <h2 className="font-display text-3xl lg:text-[2.6rem] font-bold text-gray-900 leading-[1.15] mb-5">
                We believe luxury is not about excess, but about{' '}
                <span className="italic text-green">balance</span>
              </h2>
              <div className="w-14 h-[2px] bg-gold mb-6" />
              <p className="text-gray-500 leading-[1.9] mb-5">
                Between art and architecture, form and feeling, concept and craft. Our mission is to
                craft environments that inspire, endure and elevate everyday living.
              </p>
              <p className="text-gray-500 leading-[1.9] mb-8">
                At Shrishti Realty, Design is not decoration — it's dialogue. Inspired by contextual
                minimalism and sustainability-driven design philosophy.
              </p>
              <Link to="/about" className="group inline-flex items-center gap-2 text-dark-green text-[0.75rem] font-bold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300">
                Discover Our Story <FiArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES - Image Card Grid ═══════════ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <Reveal>
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">What We Do</span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900">Why Partner With Us</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 max-w-md lg:text-right">
                A full-spectrum design-build brand delivering excellence across seven core verticals.
              </p>
            </Reveal>
          </div>

          {/* Top row: 3 large cards with images */}
          <Stagger gap={0.08} className="grid md:grid-cols-3 gap-5 mb-5">
            {services.slice(0, 3).map((s, i) => (
              <StaggerChild key={i}>
                <Link to={s.to} className="group block relative h-[380px] rounded-2xl overflow-hidden">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />
                  <div className="absolute top-5 left-5">
                    <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md grid place-items-center">
                      <s.icon className="text-white text-lg" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-[0.8rem] text-white/60 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex items-center gap-2 text-gold text-[0.65rem] font-semibold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                      Learn More <FiArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>

          {/* Bottom row: 4 compact cards */}
          <Stagger gap={0.06} className="grid grid-cols-2 xl:grid-cols-4 gap-5">
            {services.slice(3).map((s, i) => (
              <StaggerChild key={i}>
                <Link to={s.to} className="group block bg-white p-6 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 h-full">
                  <div className="w-11 h-11 rounded-xl bg-green-pale grid place-items-center mb-4 group-hover:bg-gold/10 transition-colors duration-400">
                    <s.icon className="text-green text-lg group-hover:text-gold transition-colors duration-400" />
                  </div>
                  <h3 className="text-[0.88rem] font-bold text-gray-900 mb-2 group-hover:text-dark-green transition-colors">{s.title}</h3>
                  <p className="text-[0.78rem] text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold tracking-wide uppercase text-gray-400 group-hover:text-gold transition-colors">
                    Learn More <FiArrowRight size={10} />
                  </span>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>

          <Reveal className="text-center mt-14">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.13em] uppercase rounded hover:bg-green hover:shadow-lg transition-all duration-300">
              Explore All Services <FiArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FEATURED PROJECTS ═══════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <Reveal>
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Portfolio</span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900">Featured Design &<br/>Build Projects</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-gray-500 max-w-md lg:text-right">
                Explore our curated collection of luxury residences, commercial spaces, and hospitality projects.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { to: '/projects/residential', title: 'Residential Projects', desc: 'Boutique residences and signature villas', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
              { to: '/projects/commercial', title: 'Commercial Projects', desc: 'Modern workspaces and retail destinations', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
              { to: '/projects/hospitality-retail', title: 'Hospitality & Retail', desc: 'Immersive experiences that captivate', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <Link to={p.to} className="group block relative h-[480px] rounded-2xl overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-8">
                    <span className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase text-gold mb-2 block">Explore</span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-[0.82rem] text-white/60 mb-4">{p.desc}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold text-dark-green grid place-items-center group-hover:translate-x-2 transition-transform duration-400">
                        <FiArrowRight size={15} />
                      </div>
                      <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-white/40 group-hover:text-white/70 transition-colors">View Projects</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GLOBAL PRESENCE ═══════════ */}
      <section className="relative py-28 lg:py-36 bg-dark-green overflow-hidden">
        {/* Background image of city skyline */}
        <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-green/90 via-dark-green/80 to-dark-green/95" />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Global Reach</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Our Global Presence</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We redefine luxury through innovation, detail and soul — from Mumbai to Dubai, Doha to London.
            </p>
          </Reveal>

          {/* Location cards */}
          <Stagger gap={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { city: 'Mumbai', country: 'India', role: 'Headquarters', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80' },
              { city: 'Dubai', country: 'UAE', role: 'GCC Operations', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
              { city: 'Doha', country: 'Qatar', role: 'Regional Office', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80' },
              { city: 'London', country: 'UK', role: 'European Hub', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
            ].map((loc, i) => (
              <StaggerChild key={i}>
                <div className="group relative rounded-2xl overflow-hidden h-[260px] lg:h-[300px]">
                  <img src={loc.img} alt={loc.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  {/* Gold dot */}
                  <div className="absolute top-5 right-5">
                    <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h4 className="text-lg font-bold text-white mb-0.5">{loc.city}</h4>
                    <p className="text-[0.75rem] text-white/50 mb-2">{loc.country}</p>
                    <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-[0.58rem] font-semibold tracking-[0.12em] uppercase rounded-full">{loc.role}</span>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ QUOTE ═══════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="font-display text-[5rem] text-gold/15 leading-none block -mb-8 select-none">&ldquo;</span>
            <blockquote className="font-display text-xl lg:text-2xl italic text-gray-600 leading-[1.8]">
              We design for the soul, engineer for the future and build with intention.
              Luxury is not about excess — it is about authenticity, comfort, and enduring beauty.
            </blockquote>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-8 mb-4" />
            <p className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-gray-400">Shrishti Realty</p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="Luxury villa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 text-center">
          <Reveal>
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold/60 mb-6 block">Let's Build Together</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-[1.15]">
              Ready to Transform Your Vision Into Reality?
            </h2>
            <p className="text-white/50 mb-10 max-w-md mx-auto">
              Schedule a consultation with our design experts and take the first step towards your dream space.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={onConsultationClick}
                className="group flex items-center gap-2 px-9 py-4 bg-gold text-dark-green text-[0.72rem] font-bold tracking-[0.13em] uppercase hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30 transition-all duration-300">
                Book A Consultation <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/contact" className="px-9 py-4 border border-white/20 text-white/70 text-[0.72rem] font-semibold tracking-[0.13em] uppercase hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
