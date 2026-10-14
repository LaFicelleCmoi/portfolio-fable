// Silhouette de monoplace vue de profil (nez à droite), dessinée en currentColor.
export default function F1Car({ className = '' }) {
  return (
    <svg viewBox="0 0 48 16" className={className} fill="currentColor" aria-hidden>
      {/* aileron arrière, coque, halo, aileron avant */}
      <path d="M2 3h6v2H6v3h3l3-3h9l3-2h5l2 2h6l6 4h3v2H40l-2 2H17l-2-2H4V5H2z" />
      <circle cx="11" cy="12" r="3.2" className="fill-ink" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="37" cy="12" r="3.2" className="fill-ink" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
