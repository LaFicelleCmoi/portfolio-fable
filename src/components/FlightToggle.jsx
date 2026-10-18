import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import Spaceship from './Spaceship.jsx'

// Bouton d'activation du Mode vol (+ raccourci clavier V).
// Le jeu (FlightMode) est chargé en lazy : il ne pèse rien tant qu'on ne joue pas.
const FlightMode = lazy(() => import('./FlightMode.jsx'))

const STRINGS = {
  fr: { on: 'Atterrir', off: 'Mode vol', title: 'Mode vol (touche V) : pilote un vaisseau au-dessus du portfolio' },
  en: { on: 'Land', off: 'Flight mode', title: 'Flight mode (V key): fly a spaceship over the portfolio' },
}

export default function FlightToggle() {
  const [active, setActive] = useState(false)
  const closeReq = useRef(null) // sortie fluide déclenchée par FlightMode
  const { lang } = useLang()
  const L = STRINGS[lang]

  const toggle = () => {
    if (active) {
      // fermeture douce si le jeu est prêt, brutale sinon
      closeReq.current ? closeReq.current() : setActive(false)
    } else {
      setActive(true)
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key.toLowerCase() === 'v' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) &&
        !e.metaKey && !e.ctrlKey && !e.altKey
      ) {
        // quand le jeu tourne, c'est lui qui gère V (sortie animée) — on n'agit qu'à l'ouverture
        setActive((a) => (a ? a : true))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        onClick={toggle}
        aria-pressed={active}
        title={L.title}
        className="fixed bottom-5 left-5 z-[90] hidden cursor-pointer items-center gap-2.5 rounded-lg sm:pointer-fine:flex border border-line bg-panel px-3.5 py-2 text-xs font-medium text-gray-300 backdrop-blur transition-colors hover:border-gray-500 hover:text-white"
      >
        <Spaceship className="h-5 w-auto" />
        {active ? L.on : L.off}
        <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-gray-500">V</kbd>
      </button>

      {active && (
        <Suspense fallback={null}>
          <FlightMode
            onClose={() => setActive(false)}
            registerClose={(fn) => (closeReq.current = fn)}
          />
        </Suspense>
      )}
    </>
  )
}
