// Feux de départ F1 : les 5 feux s'allument, puis s'éteignent — lights out!
export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 py-16" role="status" aria-label="Chargement">
      <div className="flex gap-2.5 rounded-2xl border border-line bg-panel/80 px-4 py-3 shadow-xl shadow-black/40">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="start-light h-4 w-4 rounded-full sm:h-5 sm:w-5"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
      <p className="font-mono text-[11px] tracking-[0.3em] text-gray-500">FORMATION LAP…</p>
    </div>
  )
}
