import { useRef } from 'react'

// Carte "spotlight" : un halo lumineux suit la souris à l'intérieur
// (inspiré de reactbits.dev/components/spotlight-card)
export default function SpotlightCard({ children, className = '', color = 'rgba(124, 58, 237, 0.22)' }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--sy', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-panel/70 backdrop-blur transition-colors hover:border-neon/40 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), ${color}, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
