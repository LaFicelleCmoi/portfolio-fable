import { motion } from 'framer-motion'

// Wrapper : révèle son contenu au scroll avec un léger slide
export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const offset = { up: { y: 48 }, down: { y: -48 }, left: { x: 48 }, right: { x: -48 } }[direction]
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
