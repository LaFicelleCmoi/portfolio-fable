import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Compteur animé au scroll (inspiré de reactbits.dev/text-animations/count-up)
export default function CountUp({ to, duration = 1.6, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / (duration * 1000), 1)
      // easing out-expo pour un finish tout en douceur
      setValue(Math.round(to * (1 - Math.pow(2, -10 * p))))
      if (p < 1) raf = requestAnimationFrame(step)
      else setValue(to)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  )
}
