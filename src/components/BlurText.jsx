import { motion } from 'framer-motion'

// Texte qui apparaît mot par mot en se défloutant (inspiré de reactbits.dev/text-animations/blur-text)
export default function BlurText({ text, className = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.3em] inline-block"
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
