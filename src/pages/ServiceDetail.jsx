import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiArrowUpRight } from 'react-icons/fi'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'
import { DotGrid, CornerArc, FloatingCircle, DiagonalLines, GridPattern } from '../components/Decorations'

const data = {
  'real-estate-development': { title:'Real Estate Development', subtitle:'From land to landmark — we turn possibilities into properties you will be proud of.', description:'At Shrishti Realty, real estate development is a curated experience, not just construction. We develop boutique residences, signature villas, high-end apartments and commercial spaces across Thane, Mumbai, Dubai and Doha — each one a benchmark in luxury and livability.', expertise:['Land sourcing, research & feasibility analysis','Site planning & master layout design','Government approvals & regulatory compliance','Residential & commercial development','Eco-friendly & green building practices','Value engineering & cost optimization'], differentiators:['Experienced, detail-driven team','Concept to completion support','Future-ready designs','Timely delivery & high craftsmanship'], quote:"We don't just develop properties — we build destinations.", img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  'interior-design': { title:'Interior Design & Turnkey Execution', subtitle:'Design that speaks, spaces that inspire.', description:'We create immersive environments that balance aesthetic richness with everyday usability. From furniture customization and lighting design to automation integration and art curation — every element is considered to create spaces that are both beautiful and functional.', expertise:['Residential & commercial interior design','Space planning & layout optimization','Custom furniture design & fabrication','Mood boards & material selection','3D visualization & design previews','Lighting design & ambiance creation','On-site execution & project supervision','Styling & final finishing'], turnkey:['Civil construction & interior execution','Material procurement & logistics','Vendor management & coordination','Skilled labour handling & supervision','Architect coordination & design review','Quality checks at every milestone','Clean handover — move-in ready'], turnkeyTagline:'You imagine. We execute. You move in — worry-free.', quote:'We transform visions into immersive living experiences.', img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
  'architecture-planning': { title:'Architecture Planning', subtitle:'Where creativity meets engineering. Where functionality becomes art.', description:'Our architectural approach combines creativity, climate-responsiveness and cultural sensitivity. We design residential, commercial, hospitality and mixed-use developments that stand the test of time and define skylines.', expertise:['Concept design & schematic planning','2D/3D architectural drawings','Urban planning & zoning analysis','Landscaping & outdoor spatial planning','Structural coordination & MEP planning','Vastu-aligned planning','Sustainable & green architecture'], quote:"We design buildings that aren't just seen — they're experienced.", img:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80' },
  'project-management': { title:'Project Management', subtitle:'Every project needs a steady hand. We become that hand for you.', description:'From schedule control and procurement coordination to vendor management, budgeting and quality assurance — we ensure flawless execution for projects both in India and overseas with full transparency.', expertise:['Detailed scheduling & milestone planning','Cost estimation, budgeting & resource optimization','Contractor & vendor coordination','Quality control & safety monitoring','Progress reports & transparent updates','Risk management & issue resolution'], quote:'We deliver projects on time, on budget, and beyond expectations.', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' },
  'global-consultancy': { title:'Global Consultancy', subtitle:'Your gateway to world-class development insights and global execution.', description:'Strategic design and development advisory services for India, GCC and international markets. Our cross-border experience ensures global quality with local relevance for every project we touch.', expertise:['Project feasibility & market insights','Architectural & interior design review','Space, budget & efficiency optimization','International material sourcing & vendor connections','Compliance advisory & regulation guidance','Independent audits & project analysis'], differentiators:['Cross-border experience','Proven technical & creative capabilities','Deep understanding of global trends','Blending international quality with local relevance'], quote:'We help transform global ambitions into successful realities.', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80' },
  '3d-visualization': { title:'3D Visualization & Virtual Experience Studio', subtitle:"See your space designed before it's built.", description:'Hyper-realistic visual experiences using cutting-edge technology. We bring designs to life before a single brick is laid, allowing you to walk through your future space and make informed decisions.', expertise:['Photorealistic 3D renderings','3D floor plans & elevations','VR walkthroughs & immersive tours','360-degree panoramic tours','Animated flythrough videos','AR previews & on-site overlays','Lighting, texture & material simulation','Real-time design revisions'], audiences:['Developers & builders','Interior designers','Architects & planners','Contractors','Marketing & sales teams','Homeowners'], quote:'Experience your future space today.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80' },
  'smart-portable-cabins': { title:'Smart Portable Cabins & Prefabricated Structures', subtitle:'Move-in ready spaces — designed smart, built fast, delivered anywhere.', description:'Modular, prefabricated solutions built with high-grade steel, thermal insulation, fire-resistant materials, modern interiors, and eco-friendly construction practices for rapid deployment.', expertise:['Prefab homes & luxury villas','Portable guest houses','Portable penthouse & rooftop cabins','Site offices & modular workspaces','Coworking pods & security cabins','Portable creche facilities','Portable toilets & sanitation units','Custom structures for clinics, cafes, retail kiosks, classrooms & labs'], audiences:['Developers & builders','Corporates & enterprises','Construction firms','Educational institutions','Farm owners & resorts','Event organizers','Government projects','Startups & entrepreneurs','Homeowners'], quote:'Smart structures for a smarter future.', img:'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=1920&q=80', sideImg:'https://images.unsplash.com/photo-1587381420270-4e9c552a12?w=800&q=80' },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = data[slug]
  if (!s) return <div className="min-h-screen flex items-center justify-center bg-white"><h1 className="font-display text-3xl text-gray-900">Service Not Found</h1></div>

  return (
    <>
      <PageBanner label="Our Services" title={s.title} subtitle={s.subtitle} img={s.img} />

      {/* Overview with image */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={320} />
        <FloatingCircle size={400} bottom="-8%" left="-5%" color="green" opacity={0.025} />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <Reveal direction="left">
              <img src={s.sideImg} alt={s.title} className="w-full h-[420px] object-cover rounded-2xl shadow-lg" />
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-4 block">Overview</span>
              <h2 className="font-display text-3xl lg:text-[2.5rem] font-bold text-gray-900 leading-snug mb-5">{s.subtitle}</h2>
              <div className="w-14 h-[2px] bg-gold mb-6" />
              <p className="text-gray-600 leading-[1.9] text-[0.95rem] mb-8">{s.description}</p>
              <Link to="/contact" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.12em] uppercase rounded hover:bg-green hover:shadow-lg transition-all duration-300">
                Get A Quote <FiArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="relative py-28 lg:py-36 bg-[#f0ece6] overflow-hidden">
        <DiagonalLines />
        <CornerArc position="bottom-left" size={280} color="green" />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="mb-14">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">
              {slug === 'interior-design' ? 'Design Services' : 'Our Expertise'}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-normal text-gray-900">What We Deliver</h2>
          </Reveal>
          <Stagger gap={0.05} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.expertise.map((item, i) => (
              <StaggerChild key={i}>
                <div className="group flex items-start gap-4 p-5 bg-white/90 backdrop-blur-sm rounded-xl border border-black/[0.04] hover:border-gold/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 h-full">
                  <div className="w-8 h-8 rounded-lg bg-green-pale grid place-items-center shrink-0 mt-0.5 group-hover:bg-gold/10 transition-colors">
                    <FiCheck className="text-green group-hover:text-gold transition-colors" size={14} />
                  </div>
                  <p className="text-[0.9rem] text-gray-700 leading-relaxed">{item}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Turnkey timeline */}
      {s.turnkey && (
        <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
          <DotGrid />
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <Reveal className="mb-14">
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Turnkey Execution</span>
              <h2 className="font-display text-3xl lg:text-4xl font-normal text-gray-900">{s.turnkeyTagline}</h2>
            </Reveal>
            <Stagger gap={0.06} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {s.turnkey.map((item, i) => (
                <StaggerChild key={i}>
                  <div className="group relative p-6 bg-section-cream rounded-xl border border-gray-100 hover:border-gold/30 hover:bg-white hover:shadow-lg transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                    <span className="font-display text-2xl font-bold text-gold/20 block mb-2">0{i + 1}</span>
                    <p className="text-[0.9rem] text-gray-700 leading-relaxed">{item}</p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Differentiators */}
      {s.differentiators?.length > 0 && (
        <section className={`relative py-24 lg:py-32 overflow-hidden ${s.turnkey ? 'bg-[#f0ece6]' : 'bg-[#f6f4f0]'}`}>
          <DiagonalLines />
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <Reveal className="text-center mb-14">
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Why Choose Us</span>
              <h2 className="font-display text-3xl lg:text-4xl font-normal text-gray-900">What Sets Us Apart</h2>
            </Reveal>
            <Stagger gap={0.1} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {s.differentiators.map((item, i) => (
                <StaggerChild key={i}>
                  <div className="group text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-black/[0.04] hover:border-gold/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                    <div className="w-14 h-14 rounded-full bg-gold/10 grid place-items-center mx-auto mb-5 group-hover:bg-gold group-hover:scale-110 transition-all duration-400">
                      <span className="font-display text-lg font-bold text-gold group-hover:text-white transition-colors">0{i + 1}</span>
                    </div>
                    <p className="text-[0.95rem] font-semibold text-gray-700 group-hover:text-dark-green transition-colors">{item}</p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Audiences */}
      {s.audiences && (
        <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
          <DotGrid />
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <Reveal className="mb-10">
              <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">Who We Serve</span>
              <h2 className="font-display text-3xl lg:text-4xl font-normal text-gray-900">Built For</h2>
            </Reveal>
            <Stagger gap={0.04} className="flex flex-wrap gap-3">
              {s.audiences.map((a, i) => (
                <StaggerChild key={i}>
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 border border-gray-100 text-[0.85rem] text-gray-700 hover:border-gold/30 hover:bg-gold/5 hover:text-dark-green transition-all duration-300 cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {a}
                  </span>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Quote */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-green/85" />
        <GridPattern dark />
        <CornerArc position="top-left" size={200} color="gold" />
        <CornerArc position="bottom-right" size={250} color="gold" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <Reveal>
            <span className="font-display text-[5rem] text-gold/20 leading-none block -mb-8 select-none">&ldquo;</span>
            <blockquote className="font-display text-2xl lg:text-3xl font-medium italic text-white leading-snug">{s.quote}</blockquote>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 lg:py-36 bg-[#f0ece6] text-center overflow-hidden">
        <DiagonalLines />
        <FloatingCircle size={350} top="20%" right="-5%" color="gold" opacity={0.03} />
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-gray-900 mb-5">Interested in {s.title}?</h2>
            <p className="text-gray-600 mb-10">Let's discuss how we can bring your vision to life.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="group flex items-center gap-2 px-9 py-4 bg-gold text-dark-green text-[0.72rem] font-bold tracking-[0.13em] uppercase rounded hover:bg-gold-light hover:shadow-lg transition-all duration-300">
                Get In Touch <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="px-9 py-4 border border-gray-200 text-gray-600 text-[0.72rem] font-semibold tracking-[0.13em] uppercase rounded hover:border-gold/40 hover:text-dark-green transition-all duration-300">
                All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
