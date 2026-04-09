import { Link } from 'react-router-dom'
import { FiArrowRight, FiAward, FiGlobe, FiHeart, FiStar } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'
import { DotGrid, CornerArc, FloatingCircle, DiagonalLines, DiamondSeparator, GridPattern } from '../components/Decorations'

export default function About() {
  return (
    <>
      <PageBanner label="Who We Are" title="About Us" subtitle="Trusted Luxury Property Developers in Mumbai" img="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80" />

      {/* Story */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={350} />
        <FloatingCircle size={450} bottom="-10%" left="-5%" color="green" opacity={0.025} />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal direction="left">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" alt="" className="w-[85%] h-[420px] object-cover rounded-2xl shadow-2xl" />
                <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80" alt="" className="absolute -bottom-6 -right-4 lg:right-0 w-[55%] h-[240px] object-cover rounded-2xl shadow-2xl border-4 border-[#f6f4f0] hidden sm:block" />
                <div className="absolute top-6 -right-2 lg:right-8 bg-dark-green text-white py-4 px-6 rounded-xl shadow-xl"><div className="font-display text-3xl font-normal text-gold">500+</div><div className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/50">Projects Completed</div></div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl lg:text-[2.6rem] font-normal text-gray-900 leading-[1.2] mb-5">From Boutique Design to <span className="italic text-green">Global Brand</span></h2>
              <div className="w-14 h-[1.5px] bg-gold mb-6" />
              <p className="text-gray-600 leading-[1.95] mb-5">What began as a boutique interior design practice in Thane has evolved into a globally recognized multi-disciplinary design-build brand. From bespoke residential interiors to large-scale developments across Mumbai, Dubai and Doha — our foundation is built on creative precision and craftsmanship.</p>
              <p className="text-gray-600 leading-[1.95] mb-8">Each project reflects a seamless blend of artistic vision, functional innovation and cultural relevance. At Shrishti Realty, Design is not decoration — it's dialogue.</p>
              <div className="grid grid-cols-3 gap-4">
                {[['15+','Years'],['4','Countries'],['100%','Satisfaction']].map(([v,l],i) => (
                  <div key={i} className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-black/[0.04]"><div className="font-display text-xl font-bold text-dark-green">{v}</div><div className="text-[0.6rem] font-medium tracking-wide uppercase text-gray-400">{l}</div></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <GridPattern dark />
        <CornerArc position="top-left" size={200} color="gold" />
        <CornerArc position="bottom-right" size={250} color="gold" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold/70 mb-5 block">Design Philosophy</span>
            <h2 className="font-display text-3xl lg:text-[2.8rem] font-normal text-white leading-snug mb-5">Design is not decoration — it's <span className="text-gold italic">dialogue</span></h2>
            <div className="w-12 h-[1.5px] bg-gold mx-auto mb-8" />
            <p className="text-white/55 text-[0.95rem] leading-[2] max-w-xl mx-auto">Inspired by contextual minimalism and sustainability-driven design philosophy, we blend environmental mindfulness with aesthetic excellence. Every line we draw is intentional; every material, chosen for meaning and longevity.</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-28 lg:py-36 bg-[#f0ece6] overflow-hidden">
        <DiagonalLines />
        <CornerArc position="bottom-left" size={300} color="green" />
        <FloatingCircle size={400} top="-5%" right="-5%" color="gold" opacity={0.03} />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="text-[0.62rem] font-semibold tracking-[0.35em] uppercase text-gold mb-3 block">Core Values</span>
            <h2 className="font-display text-3xl lg:text-5xl font-normal text-gray-900">What Drives Us</h2>
          </Reveal>
          <Stagger gap={0.1} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { icon: FiStar, title: 'Creative Precision', desc: 'Every line we draw is intentional; every material, chosen for meaning and longevity.', color: 'bg-gold/10 text-gold' },
              { icon: FiHeart, title: 'Contextual Minimalism', desc: 'Sustainability-driven philosophy blending environmental mindfulness with aesthetic excellence.', color: 'bg-green-pale text-green' },
              { icon: FiGlobe, title: 'Cultural Relevance', desc: 'Each project reflects artistic vision, functional innovation and cultural sensitivity.', color: 'bg-gold-50 text-gold-dark' },
              { icon: FiAward, title: 'Global Excellence', desc: 'Cross-border experience with deep understanding of global trends and local relevance.', color: 'bg-green-pale text-dark-green' },
            ].map((v, i) => (
              <StaggerChild key={i}>
                <div className="group text-center p-8 rounded-2xl border border-black/[0.04] bg-white/70 backdrop-blur-sm hover:shadow-xl hover:shadow-gold/[0.04] hover:border-gold/20 hover:-translate-y-2 transition-all duration-500 h-full card-glow">
                  <div className={`w-16 h-16 rounded-2xl ${v.color} grid place-items-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-400`}><v.icon size={24} /></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      <DiamondSeparator className="py-6 bg-[#f6f4f0]" />

      {/* Vision & Mission */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={280} />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <Reveal direction="left"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" alt="" className="w-full h-[380px] object-cover rounded-2xl" /></Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-[0.62rem] font-bold tracking-[0.2em] uppercase rounded-full mb-5">Vision</span>
              <h3 className="font-display text-2xl lg:text-3xl font-normal text-gray-900 mb-5 leading-snug">To inspire a world where design becomes a way of life</h3>
              <p className="text-gray-600 leading-[1.9]">Shaping how we live, feel and connect. Architecture that uplifts communities, interiors that nurture wellbeing, environments that unlock human potential.</p>
            </Reveal>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left" className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 bg-green-pale text-green text-[0.62rem] font-bold tracking-[0.2em] uppercase rounded-full mb-5">Mission</span>
              <h3 className="font-display text-2xl lg:text-3xl font-normal text-gray-900 mb-5 leading-snug">To transform ideas into spaces that enrich every moment</h3>
              <p className="text-gray-600 leading-[1.9]">We combine global expertise with local sensitivity. We exist to build places where visions become experiences and dreams become destinations.</p>
            </Reveal>
            <Reveal direction="right" delay={0.15} className="order-1 lg:order-2"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="" className="w-full h-[380px] object-cover rounded-2xl" /></Reveal>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-28 lg:py-36 bg-[#f0ece6] overflow-hidden">
        <DiagonalLines />
        <FloatingCircle size={300} bottom="10%" left="-3%" color="gold" opacity={0.025} />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="font-display text-[5rem] text-gold/12 leading-none block -mb-8 select-none">&ldquo;</span>
            <blockquote className="font-display text-xl lg:text-2xl italic text-gray-600 leading-[1.8]">We design for the soul, engineer for the future and build with intention. Luxury is not about excess — it is about authenticity, comfort, and enduring beauty.</blockquote>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <GridPattern dark />
        <div className="relative text-center max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-5 max-w-2xl mx-auto leading-[1.15]">Let's Create Something Extraordinary Together</h2>
            <p className="text-white/50 mb-10 max-w-md mx-auto">Schedule a consultation and take the first step towards your dream space.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="group flex items-center gap-2 px-9 py-4 bg-gold text-dark-green text-[0.72rem] font-bold tracking-[0.13em] uppercase hover:bg-gold-light transition-all duration-300">Get In Touch <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
              <Link to="/services" className="px-9 py-4 border border-white/20 text-white/70 text-[0.72rem] font-semibold tracking-[0.13em] uppercase hover:bg-white/10 transition-all duration-300">Our Services</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
