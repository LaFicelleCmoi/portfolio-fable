// Spinner orbital néon (style uiverse.io)
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-label="Chargement">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon" />
        <div className="absolute inset-1.5 animate-spin rounded-full border-2 border-transparent border-t-cyan [animation-duration:1.6s] [animation-direction:reverse]" />
        <div className="absolute inset-3 animate-spin rounded-full border-2 border-transparent border-t-pink [animation-duration:2.2s]" />
      </div>
    </div>
  )
}
