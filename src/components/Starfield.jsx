import { useEffect, useRef } from 'react'

// Fond « ciel profond », clin d'œil à Unistellar : un vrai ciel plutôt qu'un effet.
// - trois plans d'étoiles en parallaxe au scroll (les proches défilent plus vite)
// - une Voie lactée en diagonale : bande d'étoiles serrées + très léger halo
// - quelques étoiles qui scintillent, et de temps en temps une étoile filante
// Un seul canvas fixe derrière la page, ~30 i/s, en pause onglet caché ;
// image fixe (sans scintillement ni étoile filante) si l'OS réduit les animations.

const LAYERS = [
  { density: 1 / 5200, size: [0.25, 0.7], alpha: [0.25, 0.6], parallax: 0.02 },
  { density: 1 / 14000, size: [0.5, 1.05], alpha: [0.35, 0.8], parallax: 0.05 },
  { density: 1 / 52000, size: [0.9, 1.6], alpha: [0.6, 1], parallax: 0.1 },
]
// teintes d'étoiles réelles : majoritairement blanches, quelques bleutées et orangées
const TINTS = ['255,255,255', '255,255,255', '255,255,255', '205,222,255', '255,236,214', '255,214,190']
const FRAME_MS = 1000 / 30

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (list) => list[(Math.random() * list.length) | 0]

// étoiles réparties sur une tuile de la taille de l'écran, répétée verticalement au scroll
function makeStars(w, h) {
  const stars = []
  LAYERS.forEach((layer, depth) => {
    const count = Math.round(w * h * layer.density)
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(...layer.size),
        a: rand(...layer.alpha),
        tint: pick(TINTS),
        depth,
        twinkle: Math.random() < 0.12 ? rand(0.6, 1.8) : 0, // vitesse de scintillement
        phase: Math.random() * Math.PI * 2,
      })
    }
  })
  // Voie lactée : bande diagonale, densité qui décroît en gaussienne depuis son axe
  const band = Math.round((w * h) / 2600)
  const angle = -0.42
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  for (let i = 0; i < band; i++) {
    const along = rand(-0.7, 0.7) * Math.hypot(w, h)
    const across = (Math.random() + Math.random() + Math.random() - 1.5) * h * 0.09
    const x = w / 2 + along * cos - across * sin
    const y = h * 0.55 + along * sin + across * cos
    if (x < 0 || x > w || y < 0 || y > h) continue
    stars.push({ x, y, r: rand(0.2, 0.55), a: rand(0.15, 0.45), tint: pick(TINTS), depth: 0, twinkle: 0, phase: 0 })
  }
  return stars
}

export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let stars = []
    let glow = null
    let shooting = null
    let nextShot = performance.now() + rand(4000, 9000)
    let raf = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = makeStars(w, h)
      // halo de la Voie lactée, pré-rendu une fois (dégradé très discret)
      glow = document.createElement('canvas')
      glow.width = w
      glow.height = h
      const g = glow.getContext('2d')
      g.translate(w / 2, h * 0.55)
      g.rotate(-0.42)
      const grad = g.createLinearGradient(0, -h * 0.22, 0, h * 0.22)
      grad.addColorStop(0, 'rgba(120,140,200,0)')
      grad.addColorStop(0.5, 'rgba(150,160,210,0.045)')
      grad.addColorStop(1, 'rgba(120,140,200,0)')
      g.fillStyle = grad
      g.fillRect(-w, -h * 0.22, w * 2, h * 0.44)
      draw(performance.now())
    }

    const draw = (now) => {
      const scroll = window.scrollY
      ctx.clearRect(0, 0, w, h)
      // le halo suit le plan le plus lointain
      const gy = -((scroll * LAYERS[0].parallax) % h)
      ctx.drawImage(glow, 0, gy)
      ctx.drawImage(glow, 0, gy + h)

      for (const s of stars) {
        let y = (s.y - scroll * LAYERS[s.depth].parallax) % h
        if (y < 0) y += h
        let a = s.a
        if (s.twinkle && !still) a *= 0.55 + 0.45 * Math.sin(now / 1000 * s.twinkle * Math.PI + s.phase)
        ctx.globalAlpha = a
        ctx.fillStyle = `rgb(${s.tint})`
        if (s.r < 0.8) {
          ctx.fillRect(s.x, y, s.r * 1.6, s.r * 1.6) // les toutes petites : un pixel suffit
        } else {
          ctx.beginPath()
          ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // étoile filante : une traînée qui s'éteint en ~0,9 s
      if (!still) {
        if (!shooting && now > nextShot) {
          const angle = rand(0.35, 0.6)
          shooting = { x: rand(w * 0.1, w * 0.9), y: rand(0, h * 0.45), angle, born: now, speed: rand(700, 1000) }
        }
        if (shooting) {
          const t = (now - shooting.born) / 1000
          if (t > 0.9) {
            shooting = null
            nextShot = now + rand(7000, 15000)
          } else {
            const len = 90
            const hx = shooting.x + Math.cos(shooting.angle) * shooting.speed * t
            const hy = shooting.y + Math.sin(shooting.angle) * shooting.speed * t
            const tx = hx - Math.cos(shooting.angle) * len
            const ty = hy - Math.sin(shooting.angle) * len
            const trail = ctx.createLinearGradient(tx, ty, hx, hy)
            const fade = 1 - t / 0.9
            trail.addColorStop(0, 'rgba(255,255,255,0)')
            trail.addColorStop(1, `rgba(255,255,255,${0.75 * fade})`)
            ctx.strokeStyle = trail
            ctx.lineWidth = 1.1
            ctx.beginPath()
            ctx.moveTo(tx, ty)
            ctx.lineTo(hx, hy)
            ctx.stroke()
          }
        }
      }
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (now - last < FRAME_MS) return
      last = now
      draw(now)
    }

    resize()
    const onScroll = () => still && draw(performance.now()) // parallaxe même en mode figé
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !still) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (!still) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
