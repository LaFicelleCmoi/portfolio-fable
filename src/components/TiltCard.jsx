import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Carte 3D qui suit la souris + reflet (inspiré de reactbits.dev/components/tilted-card)
export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']), { stiffness: 250, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']), { stiffness: 250, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  )
}
