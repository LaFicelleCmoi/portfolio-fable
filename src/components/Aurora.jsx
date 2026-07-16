// Fond "aurora" en blobs flous animés (inspiré de reactbits.dev/backgrounds/aurora)
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-neon/25 blur-[120px]" />
      <div className="animate-float absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan/20 blur-[130px]" style={{ animationDelay: '-2s' }} />
      <div className="animate-float absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-pink/15 blur-[120px]" style={{ animationDelay: '-4s' }} />
    </div>
  )
}
