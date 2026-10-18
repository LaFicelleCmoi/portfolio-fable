// Séparateur entre les sections : un arc d'orbite très fin avec un petit astre posé dessus
export default function OrbitDivider() {
  return (
    <div aria-hidden className="flex justify-center">
      <svg viewBox="0 0 320 24" className="h-6 w-full max-w-xs text-gray-600">
        <path d="M2 20 Q160 -6 318 20" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 5" strokeLinecap="round" />
        <circle cx="214" cy="9.6" r="2.4" className="fill-f1" />
        <circle cx="214" cy="9.6" r="5" className="fill-f1" opacity="0.15" />
      </svg>
    </div>
  )
}
