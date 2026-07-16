import { motion } from 'framer-motion'

// Texte animé lettre par lettre (inspiré de reactbits.dev/text-animations/split-text)
export default function SplitText({ text, className = '', delay = 0 }) {
  const letters = Array.from(text)
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      aria-label={text}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -90 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 14, stiffness: 200 } },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
