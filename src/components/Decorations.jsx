/* Reusable decorative elements for section backgrounds */

/* Dot grid pattern */
export function DotGrid({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
  )
}

/* Diagonal lines */
export function DiagonalLines({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`}
      style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1a3c2a 0, #1a3c2a 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
  )
}

/* Large corner arcs */
export function CornerArc({ position = 'top-right', size = 300, color = 'gold' }) {
  const pos = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }[position]

  const borderSide = {
    'top-right': 'border-b border-l rounded-bl-full',
    'top-left': 'border-b border-r rounded-br-full',
    'bottom-right': 'border-t border-l rounded-tl-full',
    'bottom-left': 'border-t border-r rounded-tr-full',
  }[position]

  const c = color === 'gold' ? 'border-gold/[0.08]' : 'border-green/[0.06]'

  return (
    <div className={`absolute ${pos} pointer-events-none`} style={{ width: size, height: size }}>
      <div className={`w-full h-full ${borderSide} ${c}`} />
    </div>
  )
}

/* Floating decorative circles */
export function FloatingCircle({ size = 400, top, left, right, bottom, color = 'gold', opacity = 0.04 }) {
  const style = { width: size, height: size }
  if (top !== undefined) style.top = top
  if (left !== undefined) style.left = left
  if (right !== undefined) style.right = right
  if (bottom !== undefined) style.bottom = bottom

  const bg = color === 'gold' ? `rgba(201,168,76,${opacity})` : `rgba(45,90,63,${opacity})`

  return (
    <div className="absolute rounded-full blur-[100px] pointer-events-none" style={{ ...style, background: bg }} />
  )
}

/* Horizontal gold line accent */
export function GoldLine({ width = 'w-20', className = '' }) {
  return <div className={`h-px ${width} bg-gradient-to-r from-gold/30 via-gold/10 to-transparent ${className}`} />
}

/* Grid crosshair pattern (for dark sections) */
export function GridPattern({ dark = false }) {
  const c = dark ? 'rgba(255,255,255,0.025)' : 'rgba(26,60,42,0.02)'
  return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
  )
}

/* Vertical dashed accent line */
export function DashedLine({ height = 120, className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg width="2" height={height} viewBox={`0 0 2 ${height}`}>
        <line x1="1" y1="0" x2="1" y2={height} stroke="#c9a84c" strokeWidth="1" strokeDasharray="6 6" opacity="0.15" />
      </svg>
    </div>
  )
}

/* Diamond shape separator */
export function DiamondSeparator({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/20" />
      <div className="w-2 h-2 rotate-45 border border-gold/25" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/20" />
    </div>
  )
}
