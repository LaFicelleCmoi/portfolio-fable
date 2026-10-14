import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import F1Car from './F1Car.jsx'

// Progression du scroll : une ligne fine et la monoplace qui avance avec elle.
export default function RaceProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })
  const left = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden>
      <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-f1" />
      <motion.span style={{ left }} className="absolute top-0.5 -translate-x-full text-f1">
        <F1Car className="h-2.5 w-auto" />
      </motion.span>
    </div>
  )
}
