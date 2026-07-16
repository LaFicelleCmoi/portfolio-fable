import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

// Barre de progression du scroll façon circuit F1 :
// la piste se remplit et une monoplace file vers la ligne d'arrivée 🏁
export default function RaceProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })
  const left = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1.5" aria-hidden>
      {/* la piste */}
      <div className="absolute inset-0 bg-line/60" />
      {/* la trajectoire parcourue */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-f1 via-orange-500 to-cyan"
      />
      {/* la monoplace */}
      <motion.span style={{ left }} className="absolute -top-[13px] -translate-x-full text-base leading-none">
        <span className="inline-block -scale-x-100 drop-shadow-[0_0_6px_rgba(225,6,0,0.8)]">🏎️</span>
      </motion.span>
      {/* drapeau d'arrivée */}
      <span className="absolute -top-[15px] right-1 text-sm">🏁</span>
    </div>
  )
}
