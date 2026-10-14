import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import F1Car from './F1Car.jsx'

// Bouton d'activation du Mode Piste (+ raccourci clavier P).
// Le jeu (DriveMode) est chargé en lazy : il ne pèse rien tant qu'on ne joue pas.
const DriveMode = lazy(() => import('./DriveMode.jsx'))

const STRINGS = {
  fr: { on: 'Quitter la piste', off: 'Mode piste', title: 'Mode piste (touche P) : conduis une F1 sur le portfolio' },
  en: { on: 'Leave the track', off: 'Track mode', title: 'Track mode (P key): drive an F1 car over the portfolio' },
}

export default function DriveToggle() {
  const [active, setActive] = useState(false)
  const closeReq = useRef(null) // sortie fluide déclenchée par DriveMode
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
        e.key.toLowerCase() === 'p' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) &&
        !e.metaKey && !e.ctrlKey && !e.altKey
      ) {
        // quand le jeu tourne, c'est lui qui gère P (sortie animée) — on n'agit qu'à l'ouverture
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
        className="fixed bottom-5 left-5 z-[90] hidden cursor-pointer items-center gap-2.5 rounded-lg sm:pointer-fine:flex border border-line bg-panel px-3.5 py-2 text-xs font-medium text-gray-300 backdrop-blur transition-colors hover:border-f1/60 hover:text-white"
      >
        <F1Car className="h-4 w-auto" />
        {active ? L.on : L.off}
        <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-gray-500">P</kbd>
      </button>

      {active && (
        <Suspense fallback={null}>
          <DriveMode
            onClose={() => setActive(false)}
            registerClose={(fn) => (closeReq.current = fn)}
          />
        </Suspense>
      )}
    </>
  )
}
