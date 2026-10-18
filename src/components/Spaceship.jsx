// Le vaisseau du Mode vol, vu de dessus (nez à droite), en petit format pour l'interface
export default function Spaceship({ className = '' }) {
  return (
    <svg viewBox="0 0 56 40" className={className} aria-hidden>
      {/* flammes des réacteurs */}
      <path d="M8 14.5 L1 15.5 L8 16.5Z M8 23.5 L1 24.5 L8 25.5Z" fill="#8fc4ff" />
      {/* ailes delta */}
      <path d="M12 17 L8 3 L14 2 L30 14 L38 17 L38 23 L30 26 L14 38 L8 37 L12 23Z" fill="#c9ccd3" />
      <path d="M30 14 L14 2 M30 26 L14 38" stroke="#e10600" strokeWidth="1.6" />
      {/* nacelles */}
      <rect x="7" y="13" width="12" height="5" rx="2.2" fill="#2a2d35" />
      <rect x="7" y="22" width="12" height="5" rx="2.2" fill="#2a2d35" />
      {/* coque, bande dorsale, cockpit */}
      <path d="M9 15.8 L20 14.4 L34 15.4 L44 17.4 L52 19.2 L54 20 L52 20.8 L44 22.6 L34 24.6 L20 25.6 L9 24.2Z" fill="#eceef1" />
      <rect x="11" y="19" width="19" height="2" fill="#e10600" />
      <ellipse cx="36" cy="20" rx="6.5" ry="2.6" fill="#2b5a9a" />
    </svg>
  )
}
