import { motion } from 'framer-motion'

export default function PageBanner({ label, title, subtitle, img }) {
  return (
    <section className="relative min-h-[48vh] lg:min-h-[52vh] flex items-center justify-center overflow-hidden">
      {img ? (
        <>
          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          {/* Strong overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </>
      ) : (
        <div className="absolute inset-0 bg-dark-green" />
      )}

      <div className="relative z-10 text-center px-5 py-28">
        {label && (
          <motion.div className="flex items-center justify-center gap-3 mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="h-px w-8 bg-gold/60" />
            <span className="text-[0.62rem] font-semibold tracking-[0.4em] uppercase text-gold">{label}</span>
            <div className="h-px w-8 bg-gold/60" />
          </motion.div>
        )}
        <div className="overflow-hidden">
          <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] drop-shadow-lg"
            initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            {title}
          </motion.h1>
        </div>
        {subtitle && (
          <motion.p className="text-sm md:text-base text-white/80 mt-4 max-w-lg mx-auto font-light tracking-wide drop-shadow-md"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            {subtitle}
          </motion.p>
        )}
        <motion.div className="w-14 h-[1.5px] bg-gold mx-auto mt-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
      </div>
    </section>
  )
}
