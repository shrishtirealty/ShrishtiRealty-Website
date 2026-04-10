import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import { DotGrid, CornerArc, FloatingCircle, DiagonalLines } from '../components/Decorations'
import PageBanner from '../components/PageBanner'
import Reveal, { Stagger, StaggerChild } from '../components/Reveal'

const bannerImgs = {
  residential: '/images/residential.jpg',
  commercial: '/images/commercial.jpg',
  'hospitality-retail': '/images/hopitality.jpg',
}

const projectData = {
  residential: {
    title: 'Residential Projects',
    subtitle: 'Boutique residences and signature villas crafted with precision and soul.',
    categories: [
      { name: 'Residence 01', images: ['/images/R1-768x1152.jpg', '/images/R2-768x1152.jpg', '/images/R3-768x1152.jpg', '/images/R4-768x1152.jpg', '/images/R5-768x1152.jpg', '/images/R6-768x1152.jpg', '/images/R7-768x1152.jpg'] },
      { name: 'Residence 02', images: ['/images/R2-1-768x1152.jpg', '/images/R2-2-1024x683.jpg', '/images/R2-3-768x1152.jpg', '/images/R2-4-768x1152.jpg', '/images/R2-5-1024x683.jpg', '/images/R2-6-1024x683.jpg', '/images/R2-7-1024x683.jpg', '/images/R2-8-1024x683.jpg', '/images/R2-9-1024x683.jpg', '/images/R2-10-1024x683.jpg'] },
      { name: 'Residence 03', images: ['/images/R3-1-768x1024.jpg', '/images/R3-2-768x1024.jpg', '/images/R3-3-768x1024.jpg', '/images/R3-4-768x1024.jpg', '/images/R3-5-768x1024.jpg', '/images/R3-7-768x1024.jpg', '/images/R3-8-768x1024.jpg', '/images/R3-9-768x1024.jpg'] },
      { name: 'Residence 04', images: ['/images/R4-1-768x576.jpg', '/images/R4-2-768x576.jpg', '/images/R4-3-768x576.jpg', '/images/R4-4-768x576.jpg', '/images/R4-5-768x576.jpg', '/images/R4-6-768x576.jpg', '/images/R4-7-200x300.jpg', '/images/R4-8-768x576.jpg', '/images/R4-9-768x576.jpg'] },
    ],
  },
  commercial: {
    title: 'Commercial Projects',
    subtitle: 'Modern workspaces and commercial destinations designed for success.',
    categories: [
      { name: 'Commercial 01', images: ['/images/C1-1024x563.jpg', '/images/C3-1024x676.jpg', '/images/C4-1024x682.jpg', '/images/C5-1024x653.jpg', '/images/C6-1024x648.jpg', '/images/C7-1024x608.jpg', '/images/C8-1024x689.jpg'] },
      { name: 'Commercial 02', images: ['/images/C2-1-1024x683.jpg', '/images/C2-2-1024x683.jpg', '/images/C2-3-1024x682.jpg', '/images/C2-4-1024x681.jpg', '/images/C2-5-1024x683.jpg', '/images/C2-6-1024x683.jpg', '/images/C2-7-1536x712.jpg', '/images/C2-8-1024x683.jpg', '/images/C2-10-1024x683.jpg', '/images/C2-11-1024x694.jpg', '/images/C2-12-1024x503.jpg'] },
      { name: 'Commercial 03', images: ['/images/C3-1-1024x768.jpg', '/images/C3-2-1024x768.jpg', '/images/C3-3-1024x768.jpg', '/images/C3-4-1024x768.jpg', '/images/C3-5-1024x768.jpg'] },
    ],
  },
  'hospitality-retail': {
    title: 'Hospitality & Retail Projects',
    subtitle: 'Immersive hospitality and retail experiences that captivate.',
    categories: [
      { name: 'Hospitality Retail 01', images: ['/images/H1-1024x576.jpg', '/images/H2-1024x576.jpg', '/images/H3-1024x576.jpg', '/images/H4-1024x576.jpg', '/images/H5-1024x576.jpg', '/images/H6-1024x576.jpg', '/images/H7-1024x576.jpg', '/images/H8-1024x576.jpg', '/images/H9-1024x576.jpg', '/images/H10-1024x576.jpg'] },
      { name: 'Hospitality Retail 02', images: ['/images/H2-1-1024x576.png', '/images/H2-2-1024x576.png', '/images/H2-3-768x432.jpg', '/images/H2-4-1024x576.png', '/images/H2-5-1024x576.png'] },
    ],
  },
}

const otherCategories = {
  residential: [{ to:'/projects/commercial', label:'Commercial' },{ to:'/projects/hospitality-retail', label:'Hospitality & Retail' }],
  commercial: [{ to:'/projects/residential', label:'Residential' },{ to:'/projects/hospitality-retail', label:'Hospitality & Retail' }],
  'hospitality-retail': [{ to:'/projects/residential', label:'Residential' },{ to:'/projects/commercial', label:'Commercial' }],
}

export default function Projects() {
  const { category } = useParams()
  const project = projectData[category]
  const [lb, setLb] = useState({ open:false, imgs:[], idx:0 })

  if (!project) return <div className="min-h-screen flex items-center justify-center bg-white"><h1 className="font-display text-3xl text-gray-900">Projects Not Found</h1></div>

  return (
    <>
      <PageBanner label="Our Portfolio" title={project.title} subtitle={project.subtitle} img={bannerImgs[category]} />

      {/* Category navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-[60px] z-40">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            {Object.entries(projectData).map(([key, val]) => (
              <Link key={key} to={`/projects/${key}`}
                className={`px-5 py-2 text-[0.72rem] font-semibold tracking-[0.08em] uppercase rounded-full whitespace-nowrap transition-all duration-300 ${
                  key === category ? 'bg-dark-green text-white' : 'text-gray-400 hover:text-dark-green hover:bg-section-cream'
                }`}>
                {val.title.replace(' Projects', '')}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Project galleries */}
      <section className="relative py-28 lg:py-36 bg-[#f6f4f0] overflow-hidden">
        <DotGrid />
        <CornerArc position="top-right" size={350} />
        <FloatingCircle size={400} bottom="-5%" left="-5%" color="gold" opacity={0.025} />
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          {project.categories.map((cat, i) => (
            <Reveal key={i} delay={i * 0.06} className="mb-24 last:mb-0">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gold/10 grid place-items-center shrink-0">
                  <span className="font-display text-lg font-bold text-gold">0{i + 1}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">{cat.name}</h2>
                  <div className="w-10 h-[2px] bg-gold mt-2" />
                </div>
              </div>

              {cat.images.length > 0 ? (
                <Stagger gap={0.05} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.images.map((img, j) => (
                    <StaggerChild key={j}>
                      <motion.div whileHover={{ scale: 1.02 }} onClick={() => setLb({ open:true, imgs:cat.images, idx:j })}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-500">
                        <img src={img} alt={`${cat.name} ${j + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-dark-green/0 group-hover:bg-dark-green/40 transition-all duration-400 flex items-center justify-center">
                          <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white opacity-0 group-hover:opacity-100 border border-white/50 px-5 py-2 rounded transition-opacity">View</span>
                        </div>
                      </motion.div>
                    </StaggerChild>
                  ))}
                </Stagger>
              ) : (
                <div className="bg-section-cream rounded-2xl p-8 lg:p-12">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[1,2,3,4].map(n => (
                      <div key={n} className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-3 hover:border-gold/30 transition-colors">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-gray-200">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-[0.65rem] text-gray-400 font-medium">Image {n}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.85rem] text-gray-400 italic text-center">Project images coming soon</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Browse other categories */}
      <section className="relative py-24 bg-[#f0ece6] overflow-hidden">
        <DiagonalLines />
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <Reveal className="text-center mb-12">
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-gold mb-3 block">More Projects</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Explore Other Categories</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            {otherCategories[category]?.map((cat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Link to={cat.to} className="group flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-xl border border-black/[0.04] hover:border-gold/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-400">
                  <span className="text-[0.82rem] font-bold text-gray-700 group-hover:text-dark-green transition-colors">{cat.label} Projects</span>
                  <FiArrowRight className="text-gray-400 group-hover:text-gold group-hover:translate-x-1 transition-all" size={14} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lb.open && lb.imgs.length > 0 && (
          <motion.div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setLb({...lb, open:false})}>
            <button onClick={() => setLb({...lb, open:false})} className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 grid place-items-center text-white hover:bg-white/20 transition z-10"><FiX size={18}/></button>
            <button onClick={e=>{e.stopPropagation();setLb(p=>({...p,idx:(p.idx-1+p.imgs.length)%p.imgs.length}))}} className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 grid place-items-center text-white hover:bg-white/20 transition z-10"><FiChevronLeft size={18}/></button>
            <motion.img key={lb.idx} src={lb.imgs[lb.idx]} alt="" className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} onClick={e=>e.stopPropagation()} />
            <button onClick={e=>{e.stopPropagation();setLb(p=>({...p,idx:(p.idx+1)%p.imgs.length}))}} className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 grid place-items-center text-white hover:bg-white/20 transition z-10"><FiChevronRight size={18}/></button>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/30">{lb.idx+1} / {lb.imgs.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
