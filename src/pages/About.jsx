import { Link } from 'react-router-dom'
import { FiArrowRight, FiAward, FiGlobe, FiHeart, FiStar } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'

export default function About() {
  return (
    <>
      <PageBanner label="Who We Are" title="About Us" subtitle="Trusted Luxury Property Developers in Mumbai"
        img="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80" />

      {/* ── Story - Side by Side with overlapping images ── */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">
            <Reveal direction="left">
              <div className="relative">
                {/* Main image */}
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" alt="Design studio" className="w-[85%] h-[420px] object-cover rounded-2xl shadow-2xl" />
                {/* Overlapping smaller image */}
                <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80" alt="Luxury interior" className="absolute -bottom-6 -right-4 lg:right-0 w-[55%] h-[240px] object-cover rounded-2xl shadow-2xl border-4 border-white hidden sm:block" />
                {/* Stats floating card */}
                <div className="absolute top-6 -right-2 lg:right-8 bg-dark-green text-white py-4 px-6 rounded-xl shadow-xl">
                  <div className="font-display text-3xl font-bold text-gold">500+</div>
                  <div className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/50">Projects Completed</div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4 block">Our Story</span>
              <h2 className="font-display text-3xl lg:text-[2.6rem] font-bold text-gray-900 leading-[1.15] mb-5">
                From Boutique Design to <span className="italic text-green">Global Brand</span>
              </h2>
              <div className="w-14 h-[2px] bg-gold mb-6" />
              <p className="text-gray-500 leading-[1.9] mb-5">
                What began as a boutique interior design practice in Thane has evolved into a globally
                recognized multi-disciplinary design-build brand. From bespoke residential interiors to
                large-scale architectural, commercial and real estate developments across Mumbai, Dubai
                and Doha — our foundation is built on creative precision and craftsmanship.
              </p>
              <p className="text-gray-500 leading-[1.9] mb-8">
                Each project reflects a seamless blend of artistic vision, functional innovation and
                cultural relevance. At Shrishti Realty, Design is not decoration — it's dialogue.
              </p>
              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4">
                {[['15+','Years'],['4','Countries'],['100%','Satisfaction']].map(([v,l],i) => (
                  <div key={i} className="text-center p-3 bg-cream rounded-xl">
                    <div className="font-display text-xl font-bold text-dark-green">{v}</div>
                    <div className="text-[0.6rem] font-medium tracking-wide uppercase text-gray-400">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Philosophy - Full width image with text overlay ── */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold/70 mb-5 block">Design Philosophy</span>
            <h2 className="font-display text-3xl lg:text-[2.8rem] font-bold text-white leading-snug mb-5">
              Design is not decoration — it's <span className="text-gold italic">dialogue</span>
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-8" />
            <p className="text-white/50 text-[0.95rem] leading-[2] max-w-xl mx-auto">
              Inspired by contextual minimalism and sustainability-driven design philosophy, we blend
              environmental mindfulness with aesthetic excellence. Every line we draw is intentional;
              every material, chosen for meaning and longevity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values - Icon Cards ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Core Values</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900">What Drives Us</h2>
          </Reveal>

          <Stagger gap={0.1} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { icon: FiStar, title: 'Creative Precision', desc: 'Every line we draw is intentional; every material, chosen for meaning and longevity.', color: 'bg-gold/10 text-gold' },
              { icon: FiHeart, title: 'Contextual Minimalism', desc: 'Sustainability-driven philosophy blending environmental mindfulness with aesthetic excellence.', color: 'bg-green-pale text-green' },
              { icon: FiGlobe, title: 'Cultural Relevance', desc: 'Each project reflects artistic vision, functional innovation and cultural sensitivity.', color: 'bg-gold-50 text-gold-dark' },
              { icon: FiAward, title: 'Global Excellence', desc: 'Cross-border experience with deep understanding of global trends and local relevance.', color: 'bg-green-pale text-dark-green' },
            ].map((v, i) => (
              <StaggerChild key={i}>
                <div className="group text-center p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gold/5 hover:border-gold/20 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 rounded-2xl ${v.color} grid place-items-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-400`}>
                    <v.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Vision & Mission - Asymmetric layout with images ── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          {/* Vision */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <Reveal direction="left">
              <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" alt="Architecture" className="w-full h-[380px] object-cover rounded-2xl" />
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full mb-5">Vision</span>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-5 leading-snug">
                To inspire a world where design becomes a way of life
              </h3>
              <p className="text-gray-500 leading-[1.9]">
                Shaping how we live, feel and connect. Architecture that uplifts communities, interiors
                that nurture wellbeing, environments that unlock human potential. Spaces that are
                intelligent, emotionally resonant, and crafted with conscience.
              </p>
            </Reveal>
          </div>

          {/* Mission - Reversed */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left" className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 bg-green-pale text-green text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full mb-5">Mission</span>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-5 leading-snug">
                To transform ideas into spaces that enrich every moment
              </h3>
              <p className="text-gray-500 leading-[1.9]">
                We combine global expertise with local sensitivity. We embrace advanced technology,
                craftsmanship excellence, and deep understanding of the people we build for. We exist
                to build places where visions become experiences and dreams become destinations.
              </p>
            </Reveal>
            <Reveal direction="right" delay={0.15} className="order-1 lg:order-2">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Interior" className="w-full h-[380px] object-cover rounded-2xl" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="font-display text-[5rem] text-gold/12 leading-none block -mb-8 select-none">&ldquo;</span>
            <blockquote className="font-display text-xl lg:text-2xl italic text-gray-600 leading-[1.8]">
              We design for the soul, engineer for the future and build with intention. Luxury is
              not about excess — it is about authenticity, comfort, and enduring beauty. We don't
              just deliver projects — we craft environments that tell stories and create belonging.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <div className="relative text-center max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-[1.15]">
              Let's Create Something Extraordinary Together
            </h2>
            <p className="text-white/50 mb-10 max-w-md mx-auto">Schedule a consultation and take the first step towards your dream space.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="group flex items-center gap-2 px-9 py-4 bg-gold text-dark-green text-[0.72rem] font-bold tracking-[0.13em] uppercase hover:bg-gold-light transition-all duration-300">
                Get In Touch <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="px-9 py-4 border border-white/20 text-white/70 text-[0.72rem] font-semibold tracking-[0.13em] uppercase hover:bg-white/10 transition-all duration-300">
                Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
