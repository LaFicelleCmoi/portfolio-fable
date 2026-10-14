import { motion } from 'framer-motion'

// Wrapper : fondu + léger glissement à l'entrée dans le viewport (une seule fois)
export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const offset = { up: { y: 16 }, down: { y: -16 }, left: { x: 16 }, right: { x: -16 } }[direction]
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
