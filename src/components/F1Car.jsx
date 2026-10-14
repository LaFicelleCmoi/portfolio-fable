// Monoplace vue de profil (nez à droite), assortie à celle du Mode piste :
// coque rouge, fond plat et ailerons carbone, halo, casque bleu-blanc-rouge.
// `mono` la dessine d'une seule couleur (currentColor) pour les tout petits formats.
export default function F1Car({ className = '', mono = false }) {
  const red = mono ? 'currentColor' : '#e10600'
  const carbon = mono ? 'currentColor' : '#1a1a1d'
  return (
    <svg viewBox="0 0 64 20" className={className} aria-hidden>
      {/* aileron arrière : dérive + plan principal */}
      <path d="M3 3h7v1.6H6.4V11H4.6V4.6H3z" fill={carbon} />
      <rect x="2" y="2" width="9" height="1.6" rx="0.5" fill={red} />
      {/* fond plat */}
      <path d="M8 14.2h47l4 1.3H8z" fill={carbon} />
      {/* coque : capot moteur, ponton, cockpit, nez effilé */}
      <path
        d="M7 11.2c0-1.6 1.2-2.4 3-2.6l9-.8c1.6-1.9 4-3.1 6.6-3.1h1.6l2.2 2.4 6.6.4 4.2 1.2 13.4 2.3c1.6.3 2.8 1 3.4 2.1l.3 1H7z"
        fill={red}
      />
      {/* arête claire sur la coque */}
      {!mono && <path d="M19 8.2l6.8-.6h4.6l6.4.4 4 1.1" stroke="#ff5a4f" strokeWidth="0.5" fill="none" />}
      {/* halo + casque */}
      <path d="M27.4 4.6c2.6-.6 5.6-.4 7.6.8l1.2 2" stroke={carbon} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {!mono && (
        <g>
          <circle cx="30" cy="6.4" r="1.9" fill="#f2f4f8" />
          <path d="M28.1 6.4a1.9 1.9 0 0 1 .8-1.6h2.2a1.9 1.9 0 0 1 .8 1.6z" fill="#0055a4" />
          <path d="M28.1 6.4h3.8a1.9 1.9 0 0 1-.8 1.5h-2.2a1.9 1.9 0 0 1-.8-1.5z" fill="#ef4135" />
        </g>
      )}
      {/* aileron avant */}
      <path d="M53.5 14.6h9l.8 1.6h-10.4z" fill={carbon} />
      <rect x="61.6" y="11.6" width="1.6" height="4.6" rx="0.4" fill={red} />
      {/* roues : gomme + jante */}
      {[14, 49].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="14" r="5" fill={mono ? 'currentColor' : '#0b0b0c'} />
          <circle cx={cx} cy="14" r="2.6" fill="none" stroke={mono ? 'var(--color-ink)' : '#3a3a40'} strokeWidth="1" />
          {!mono && <circle cx={cx} cy="14" r="4.3" fill="none" stroke={red} strokeWidth="0.35" opacity="0.8" />}
        </g>
      ))}
    </svg>
  )
}
