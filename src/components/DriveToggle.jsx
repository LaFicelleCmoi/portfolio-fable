import { lazy, Suspense, useEffect, useState } from 'react'

// Bouton d'activation du Mode Piste (+ raccourci clavier P).
// Le jeu (DriveMode) est chargé en lazy : il ne pèse rien tant qu'on ne joue pas.
const DriveMode = lazy(() => import('./DriveMode.jsx'))

export default function DriveToggle() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key.toLowerCase() === 'p' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) &&
        !e.metaKey && !e.ctrlKey && !e.altKey
      ) {
        setActive((a) => !a)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        onClick={() => setActive((a) => !a)}
        aria-pressed={active}
        title="Mode piste (touche P) : conduis une F1 sur le portfolio"
        className="btn-uiverse fixed bottom-5 left-5 z-[90] hidden cursor-pointer items-center gap-2 overflow-hidden rounded-2xl border border-line bg-panel/80 px-4 py-2.5 text-xs font-semibold text-gray-200 backdrop-blur transition-colors [--glow:var(--color-f1)] hover:border-f1/60 sm:flex"
      >
        <span className="-scale-x-100 text-sm" aria-hidden>🏎️</span>
        {active ? 'Quitter la piste' : 'Mode piste'}
        <kbd className="rounded border border-line bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">P</kbd>
        <span className="checkered absolute inset-x-0 bottom-0 h-0.5 opacity-70" />
      </button>

      {active && (
        <Suspense fallback={null}>
          <DriveMode onClose={() => setActive(false)} />
        </Suspense>
      )}
    </>
  )
}
