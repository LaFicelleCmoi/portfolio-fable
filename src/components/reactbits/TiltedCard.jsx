import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Carte qui s'incline en 3D sous le pointeur, avec une étiquette qui suit le curseur —
// adaptée de reactbits.dev/components/tilted-card. Adaptations : enveloppe n'importe quel
// contenu (ici une affiche cliquable) au lieu d'une seule image, framer-motion au lieu de
// motion/react, pas de message « mobile », et inclinaison coupée si l'OS réduit les animations.
const SPRING = { damping: 30, stiffness: 100, mass: 2 }

export default function TiltedCard({ children, caption, rotateAmplitude = 10, scaleOnHover = 1.05, className = '' }) {
  const ref = useRef(null)
  const lastY = useRef(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, SPRING)
  const rotateY = useSpring(0, SPRING)
  const scale = useSpring(1, SPRING)
  const opacity = useSpring(0)
  const rotateCaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 })
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    if (!still) {
      rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
      rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
      rotateCaption.set(-(offsetY - lastY.current) * 0.6)
    }
    lastY.current = offsetY
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }
  const onEnter = () => {
    if (!still) scale.set(scaleOnHover)
    opacity.set(1)
  }
  const onLeave = () => {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateCaption.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative [perspective:800px] hover:z-30 ${className}`}
    >
      <motion.div style={{ rotateX, rotateY, scale }} className="[transform-style:preserve-3d]">
        {children}
      </motion.div>
      {caption && (
        <motion.span
          aria-hidden
          style={{ x, y, opacity, rotate: rotateCaption }}
          className="pointer-events-none absolute top-0 left-0 z-20 mt-4 ml-3 hidden rounded bg-white px-2 py-1 text-[10px] whitespace-nowrap text-ink sm:block"
        >
          {caption}
        </motion.span>
      )}
    </div>
  )
}
