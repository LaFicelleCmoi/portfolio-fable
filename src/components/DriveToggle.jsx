import { lazy, Suspense, useEffect, useState } from 'react'

// Boutons d'activation des modes de conduite (+ raccourcis P et G).
// Les deux jeux sont chargés en lazy : ils ne pèsent rien tant qu'on ne joue pas.
const DriveMode = lazy(() => import('./DriveMode.jsx'))
const Circuit3D = lazy(() => import('./Circuit3D.jsx'))

function LoadingChip({ label }) {
  return (
    <div className="fixed bottom-20 left-5 z-[95] flex items-center gap-2 rounded-2xl border border-line bg-ink/90 px-4 py-2.5 font-mono text-xs text-gray-300 backdrop-blur">
      <span className="h-2 w-2 animate-ping rounded-full bg-f1" />
      {label}
    </div>
  )
}

export default function DriveToggle() {
  const [mode, setMode] = useState(null) // null | '2d' | '3d'
  const toggle = (m) => setMode((cur) => (cur === m ? null : m))

  useEffect(() => {
    const onKey = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (k === 'p') toggle('2d')
      if (k === 'g') toggle('3d')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const btn =
    'btn-uiverse relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-2xl border border-line bg-panel/80 px-4 py-2.5 text-xs font-semibold text-gray-200 backdrop-blur transition-colors [--glow:var(--color-f1)] hover:border-f1/60'

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[90] hidden flex-col gap-2 sm:flex">
        <button
          onClick={() => toggle('3d')}
          aria-pressed={mode === '3d'}
          title="Circuit 3D (touche G) : pilote la monoplace sur un vrai circuit"
          className={btn}
        >
          <span aria-hidden>🏁</span>
          {mode === '3d' ? 'Quitter le circuit' : 'Circuit 3D'}
          <kbd className="rounded border border-line bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">G</kbd>
          <span className="checkered absolute inset-x-0 bottom-0 h-0.5 opacity-70" />
        </button>
        <button
          onClick={() => toggle('2d')}
          aria-pressed={mode === '2d'}
          title="Mode piste (touche P) : conduis une F1 sur le portfolio"
          className={btn}
        >
          <span className="-scale-x-100" aria-hidden>🏎️</span>
          {mode === '2d' ? 'Quitter la piste' : 'Mode piste'}
          <kbd className="rounded border border-line bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">P</kbd>
          <span className="checkered absolute inset-x-0 bottom-0 h-0.5 opacity-70" />
        </button>
      </div>

      {mode === '2d' && (
        <Suspense fallback={<LoadingChip label="Chauffe des pneus…" />}>
          <DriveMode onClose={() => setMode(null)} />
        </Suspense>
      )}
      {mode === '3d' && (
        <Suspense fallback={<LoadingChip label="Chargement du circuit 3D…" />}>
          <Circuit3D onClose={() => setMode(null)} />
        </Suspense>
      )}
    </>
  )
}
