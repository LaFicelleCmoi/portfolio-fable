import { useState } from 'react'
import { motion } from 'framer-motion'

// Donut SVG animé, sans dépendance. Palette validée (bande de luminosité,
// chroma, séparation daltonisme, contraste) — voir la section Data.
// Anneau fin, 2px d'écart entre segments, tooltip au survol via le centre,
// légende texte complète : l'identité ne repose jamais sur la couleur seule.
const R = 74
const C = 2 * Math.PI * R
const GAP = 3

export default function DonutChart({ data, centerLabel, centerSub, ariaLabel }) {
  const [active, setActive] = useState(null)
  const total = data.reduce((s, d) => s + d.value, 0)

  let acc = 0
  const segments = data.map((d) => {
    const frac = d.value / total
    const len = Math.max(frac * C - GAP, 0.5)
    const seg = { ...d, frac, len, start: acc }
    acc += frac * C
    return seg
  })

  const current = active !== null ? segments[active] : null

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
      <div className="relative h-48 w-48 shrink-0" role="img" aria-label={ariaLabel}>
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          {segments.map((s, i) => (
            <motion.circle
              key={s.label}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={active === i ? 20 : 15}
              strokeDasharray={`${s.len} ${C - s.len}`}
              strokeDashoffset={-s.start}
              strokeLinecap="butt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: active === null || active === i ? 1 : 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'pointer', transition: 'stroke-width 0.2s, opacity 0.3s' }}
            />
          ))}
        </svg>
        {/* centre : total par défaut, détail du segment au survol */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {current ? (
            <>
              <span className="text-2xl font-bold text-white">{Math.round(current.frac * 100)}%</span>
              <span className="max-w-[7rem] text-xs text-gray-400">{current.label}</span>
            </>
          ) : (
            <>
              <span className="text-3xl font-bold text-white">{centerLabel}</span>
              <span className="text-xs text-gray-400">{centerSub}</span>
            </>
          )}
        </div>
      </div>

      {/* légende complète : identité + valeurs en texte */}
      <ul className="w-full space-y-2">
        {segments.map((s, i) => (
          <li
            key={s.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`flex cursor-default items-center gap-3 rounded-lg px-2 py-1 text-sm transition-colors ${
              active === i ? 'bg-line/40' : ''
            }`}
          >
            <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: s.color }} />
            <span className="flex-1 text-gray-300">{s.label}</span>
            <span className="font-mono text-xs text-gray-400">{s.value}</span>
            <span className="w-10 text-right font-mono text-xs text-gray-500">
              {Math.round(s.frac * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
