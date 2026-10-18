import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

// Progression du scroll : une ligne fine dont la tête est une petite comète
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })
  const left = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-f1/70 to-f1"
      />
      <motion.span
        style={{ left }}
        className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,74,61,0.7)]"
      />
    </div>
  )
}
