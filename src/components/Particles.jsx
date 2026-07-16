import { useEffect, useRef } from 'react'

// Fond de particules interactif (inspiré de reactbits.dev/backgrounds/particles).
// Optimisé mobile : l'animation se met en pause quand le canvas sort de l'écran
// ou quand l'onglet passe en arrière-plan, le nombre de particules baisse sur
// petit écran, et prefers-reduced-motion est respecté (rendu statique).
export default function Particles({ count = 90, className = '' }) {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches
    const effectiveCount = isSmallScreen ? Math.min(count, 40) : count

    let raf = 0
    let particles = []
    let inView = true

    const spawn = () => {
      particles = Array.from({ length: effectiveCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        hue: Math.random() > 0.5 ? 265 : 190,
      }))
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      spawn()
      if (reducedMotion) drawFrame()
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        if (!reducedMotion) {
          // légère attraction vers la souris
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140) {
            p.vx += dx / dist * 0.02
            p.vy += dy / dist * 0.02
          }
          p.vx = Math.max(-0.8, Math.min(0.8, p.vx))
          p.vy = Math.max(-0.8, Math.min(0.8, p.vy))
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.8)`
        ctx.fill()
      }
      // lignes de connexion entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `hsla(230, 80%, 70%, ${0.14 * (1 - d / 110)})`
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      drawFrame()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!raf && !reducedMotion && inView && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // pause quand le hero sort de l'écran
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        inView ? start() : stop()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // pause quand l'onglet passe en arrière-plan
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    if (reducedMotion) drawFrame()
    else start()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden />
}
