import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// Bouton retour en haut façon "PIT STOP" F1
export default function PitButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="PIT — retourner en haut de la page"
          className="btn-uiverse fixed right-5 bottom-5 z-50 flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border border-f1/60 bg-panel/80 px-4 py-3 backdrop-blur [--glow:var(--color-f1)]"
        >
          <ArrowUp size={17} className="text-f1" />
          <span className="text-[10px] font-bold tracking-widest text-gray-300">PIT</span>
          <span className="checkered absolute inset-x-0 bottom-0 h-1 rounded-b-2xl opacity-80" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
