import GradientText from './GradientText.jsx'
import ScrollReveal from './ScrollReveal.jsx'

// En-tête de section façon télémétrie F1 : chaque section est un "secteur" du circuit
export default function SectionHeader({ sector, kicker, title, children }) {
  return (
    <ScrollReveal>
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-f1/70" />
        <span className="font-mono text-[11px] tracking-[0.3em] text-gray-500">
          SECTEUR {sector}
        </span>
        <span className="text-xs uppercase tracking-[0.35em] text-cyan">{kicker}</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-f1/70" />
      </div>
      <h2 className="mb-4 text-center text-4xl font-bold">
        <GradientText>{title}</GradientText>
      </h2>
      {children && (
        <p className="mx-auto mb-14 max-w-2xl text-center text-sm text-gray-400">{children}</p>
      )}
    </ScrollReveal>
  )
}
