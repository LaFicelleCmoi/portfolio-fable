import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

// Compteur à rouleaux — adapté de reactbits.dev/components/counter.
// Chaque chiffre est une colonne 0–9 qui défile jusqu'à sa valeur, comme un afficheur mécanique.
// Adaptations : framer-motion au lieu de motion/react, fondus haut/bas en option.

function Numeral({ mv, n, height }) {
  const y = useTransform(mv, (latest) => {
    const offset = (10 + n - (latest % 10)) % 10
    return (offset > 5 ? offset - 10 : offset) * height
  })
  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {n}
    </motion.span>
  )
}

function Digit({ place, value, height }) {
  const rounded = Math.floor(value / place)
  const mv = useSpring(rounded, { stiffness: 90, damping: 20 })
  useEffect(() => {
    mv.set(rounded)
  }, [mv, rounded])

  return (
    <span className="relative inline-flex overflow-hidden tabular-nums" style={{ height, width: '1ch' }}>
      {Array.from({ length: 10 }, (_, n) => (
        <Numeral key={n} mv={mv} n={n} height={height} />
      ))}
    </span>
  )
}

// `digits` fixe le nombre de colonnes (sinon déduit de la valeur) : utile quand on anime depuis 0.
export default function Counter({ value, digits, fontSize = 24, className = '' }) {
  const count = digits ?? String(Math.trunc(value)).length
  const places = Array.from({ length: count }, (_, i) => 10 ** (count - i - 1))
  return (
    <span aria-hidden className={`inline-flex leading-none ${className}`} style={{ fontSize }}>
      {places.map((place) => (
        <Digit key={place} place={place} value={value} height={fontSize} />
      ))}
    </span>
  )
}
