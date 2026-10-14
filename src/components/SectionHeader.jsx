import ScrollReveal from './ScrollReveal.jsx'

// En-tête de section, aligné à gauche : numéro de secteur en mono, titre, chapeau.
export default function SectionHeader({ sector, kicker, title, children }) {
  return (
    <ScrollReveal className="mb-12 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs text-gray-500">
        <span className="text-accent">{sector}</span>
        <span className="h-px w-6 bg-line" />
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-[15px] leading-relaxed text-gray-400">{children}</p>}
    </ScrollReveal>
  )
}
