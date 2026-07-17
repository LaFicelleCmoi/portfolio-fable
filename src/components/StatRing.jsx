import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from './CountUp.jsx'

// Jauge circulaire animée : un pourcentage réel, calculé en direct
const R = 40
const C = 2 * Math.PI * R

export default function StatRing({ pct, label, sub, color = '#22d3ee' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const target = C * (1 - Math.min(pct, 100) / 100)

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-line)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: target } : {}}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            <CountUp to={Math.round(pct)} suffix="%" />
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-200">{label}</p>
        <p className="font-mono text-[11px] text-gray-500">{sub}</p>
      </div>
    </div>
  )
}
