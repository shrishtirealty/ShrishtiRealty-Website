import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const presets = {
  up:    { hidden: { opacity: 0, y: 60 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 },  visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
}

export default function Reveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '', once = true, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.12 })
  const v = presets[direction] || presets.up
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className = '', gap = 0.08, delay = 0, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function StaggerChild({ children, className = '', direction = 'up', ...props }) {
  const v = presets[direction] || presets.up
  return (
    <motion.div variants={v} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className} {...props}>
      {children}
    </motion.div>
  )
}
