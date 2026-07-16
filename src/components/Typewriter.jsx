import { useEffect, useState } from 'react'

// Effet machine à écrire qui boucle sur plusieurs phrases
export default function Typewriter({ phrases, className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index % phrases.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, deleting ? 35 : 75)
    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases])

  return (
    <span className={className}>
      {text}
      <span className="animate-blink text-cyan">▌</span>
    </span>
  )
}
