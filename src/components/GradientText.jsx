// Texte en dégradé animé (inspiré de reactbits.dev/text-animations/gradient-text)
export default function GradientText({ children, className = '' }) {
  return (
    <span
      className={`animate-gradient-x bg-gradient-to-r from-neon via-cyan to-pink bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}
