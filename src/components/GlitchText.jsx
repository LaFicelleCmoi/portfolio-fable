// Texte "glitch" au survol (inspiré de reactbits.dev/text-animations/glitch-text)
// Les couches décalées sont dessinées par ::before / ::after (voir index.css)
export default function GlitchText({ children, className = '' }) {
  return (
    <span data-text={children} className={`glitch relative inline-block ${className}`}>
      {children}
    </span>
  )
}
