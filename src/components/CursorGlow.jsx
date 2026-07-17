import { useEffect, useRef } from 'react'

// Halo lumineux discret qui suit le curseur sur toute la page (desktop
// uniquement, désactivé si prefers-reduced-motion). Le rAF ne tourne que
// pendant le mouvement : zéro coût à l'arrêt.
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let raf = 0
    let running = false

    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x - 210}px, ${y - 210}px)`
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.4) {
        raf = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }
    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[5] h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-700"
      style={{
        background:
          'radial-gradient(circle, rgba(124, 58, 237, 0.1), rgba(34, 211, 238, 0.05) 42%, transparent 70%)',
      }}
    />
  )
}
