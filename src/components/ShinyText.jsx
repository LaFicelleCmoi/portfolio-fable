// Texte avec reflet brillant qui balaie (inspiré de reactbits.dev/text-animations/shiny-text)
export default function ShinyText({ children, className = '' }) {
  return <span className={`animate-shine ${className}`}>{children}</span>
}
