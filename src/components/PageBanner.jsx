import { motion } from 'framer-motion'

export default function PageBanner({ label, title, subtitle, img }) {
  return (
    <section className="relative min-h-[45vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {img ? (
        <>
          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-green/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-dark-green" />
      )}
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 text-center px-5 py-28">
        {label && (
          <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="h-px w-8 bg-gold/40" />
            <span className="text-[0.6rem] font-semibold tracking-[0.35em] uppercase text-gold/70">{label}</span>
            <div className="h-px w-8 bg-gold/40" />
          </motion.div>
        )}
        <div className="overflow-hidden">
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            {title}
          </motion.h1>
        </div>
        {subtitle && (
          <motion.p className="text-sm md:text-base text-white/50 mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            {subtitle}
          </motion.p>
        )}
        <motion.div className="w-14 h-[2px] bg-gold/50 mx-auto mt-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
      </div>
    </section>
  )
}
