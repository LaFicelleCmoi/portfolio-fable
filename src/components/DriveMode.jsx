import { useEffect, useRef, useState } from 'react'

// ── MODE PISTE ────────────────────────────────────────────────────────────
// Easter egg inspiré de bruno-simon.com : une monoplace pilotable aux
// flèches roule PAR-DESSUS le portfolio. La page défile pour suivre la
// voiture, les pneus laissent des traces, les cartes vibrent au passage,
// et le bas de page fait office de ligne d'arrivée chronométrée.
// Chargé en lazy uniquement quand on l'active : zéro impact au chargement.

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const fmtTime = (ms) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const d = Math.floor((ms % 1000) / 100)
  return `${m}:${String(s).padStart(2, '0')}.${d}`
}

export default function DriveMode({ onClose }) {
  const canvasRef = useRef(null)
  const [hud, setHud] = useState({ speed: 0, time: '0:00.0', dist: 0 })
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // la voiture vit en coordonnées DOCUMENT (elle traverse toute la page)
    const car = {
      x: window.innerWidth / 2,
      y: window.scrollY + window.innerHeight / 2,
      angle: Math.PI / 2, // face à la suite de la page
      speed: 0,
      steerVisual: 0,
    }
    const keys = { up: false, down: false, left: false, right: false }
    const trail = [] // traces de pneus {x, y, life, w}
    const sparks = [] // étincelles d'échappement {x, y, vx, vy, life}
    const t0 = performance.now()
    let started = t0
    let dist = 0
    let armed = true
    let lastBump = 0
    let lastHud = 0
    let raf = 0
    let last = t0

    const onKey = (down) => (e) => {
      const k = e.key
      if (down && k === 'Escape') return onClose()
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return // on laisse le clavier au formulaire
      const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
      if (map[k]) {
        keys[map[k]] = down
        e.preventDefault() // la page ne défile plus aux flèches : c'est la voiture qui la conduit
      }
    }
    const kd = onKey(true)
    const ku = onKey(false)

    // secoue la carte que la monoplace percute
    const bump = (now, vx, vy) => {
      if (now - lastBump < 180 || Math.abs(car.speed) < 260) return
      const els = document.elementsFromPoint(
        clamp(car.x, 0, window.innerWidth - 1),
        clamp(car.y - window.scrollY, 0, window.innerHeight - 1)
      )
      const target = els.find((el) => el !== canvas && el.className?.includes?.('rounded-3xl'))
      if (target && !target.classList.contains('car-bump')) {
        target.classList.add('car-bump')
        setTimeout(() => target.classList.remove('car-bump'), 450)
        lastBump = now
      }
    }

    const drawCar = (cx, cy) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(car.angle)
      // ombre
      ctx.fillStyle = 'rgba(0,0,0,0.35)'
      ctx.beginPath()
      ctx.ellipse(1, 3, 26, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      // pneus (les avants braquent)
      ctx.fillStyle = '#111'
      const wheel = (wx, wy, rot) => {
        ctx.save()
        ctx.translate(wx, wy)
        ctx.rotate(rot)
        ctx.fillRect(-5, -3, 10, 6)
        ctx.restore()
      }
      wheel(-15, -11, 0)
      wheel(-15, 11, 0)
      wheel(14, -10, car.steerVisual * 0.5)
      wheel(14, 10, car.steerVisual * 0.5)
      // livrée tricolore 🇫🇷 : bleu à l'avant, blanc au centre, rouge à l'arrière
      // aileron arrière — rouge
      ctx.fillStyle = '#ef4135'
      ctx.fillRect(-24, -11, 5, 22)
      // corps effilé — blanc
      ctx.fillStyle = '#f2f4f8'
      ctx.beginPath()
      ctx.moveTo(-20, -7)
      ctx.lineTo(4, -5)
      ctx.lineTo(24, -2)
      ctx.lineTo(24, 2)
      ctx.lineTo(4, 5)
      ctx.lineTo(-20, 7)
      ctx.closePath()
      ctx.fill()
      // arrière du corps — rouge
      ctx.fillStyle = '#ef4135'
      ctx.beginPath()
      ctx.moveTo(-20, -7)
      ctx.lineTo(-10, -6.4)
      ctx.lineTo(-10, 6.4)
      ctx.lineTo(-20, 7)
      ctx.closePath()
      ctx.fill()
      // museau — bleu de France
      ctx.fillStyle = '#0055a4'
      ctx.beginPath()
      ctx.moveTo(8, -4.6)
      ctx.lineTo(24, -2)
      ctx.lineTo(24, 2)
      ctx.lineTo(8, 4.6)
      ctx.closePath()
      ctx.fill()
      // aileron avant — bleu
      ctx.fillStyle = '#0055a4'
      ctx.fillRect(22, -9, 3, 18)
      // cockpit + casque bleu
      ctx.fillStyle = '#1a1a1a'
      ctx.beginPath()
      ctx.ellipse(-2, 0, 6, 3.5, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#0055a4'
      ctx.beginPath()
      ctx.arc(-2, 0, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const docH = document.documentElement.scrollHeight

      // ── physique ──
      if (keys.up) car.speed += 950 * dt
      if (keys.down) car.speed -= 1300 * dt
      car.speed *= 1 - 1.4 * dt // frottements
      car.speed = clamp(car.speed, -260, 950)

      const steerInput = (keys.left ? -1 : 0) + (keys.right ? 1 : 0)
      car.steerVisual += (steerInput - car.steerVisual) * Math.min(1, 10 * dt)
      const grip = clamp(car.speed / 320, -1.6, 1.6)
      car.angle += steerInput * 2.4 * dt * grip

      const vx = Math.cos(car.angle) * car.speed
      const vy = Math.sin(car.angle) * car.speed
      car.x += vx * dt
      car.y += vy * dt
      dist += Math.abs(car.speed) * dt

      // murs : rebond amorti
      if (car.x < 24 || car.x > window.innerWidth - 24) {
        car.x = clamp(car.x, 24, window.innerWidth - 24)
        car.angle = Math.PI - car.angle
        car.speed *= 0.55
      }
      if (car.y < 24 || car.y > docH - 24) {
        car.y = clamp(car.y, 24, docH - 24)
        car.angle = -car.angle
        car.speed *= 0.55
      }

      // la page suit la monoplace
      const targetScroll = clamp(car.y - window.innerHeight / 2, 0, docH - window.innerHeight)
      window.scrollTo({ top: targetScroll, behavior: 'instant' })

      // traces de pneus (plus marquées en dérive)
      if (Math.abs(car.speed) > 90) {
        const skid = Math.abs(steerInput) * clamp(Math.abs(car.speed) / 500, 0, 1)
        const w = 2 + skid * 2.5
        const off = 10
        trail.push(
          { x: car.x - Math.cos(car.angle + 0.5) * off, y: car.y - Math.sin(car.angle + 0.5) * off, life: 0.55 + skid * 0.4, w },
          { x: car.x - Math.cos(car.angle - 0.5) * off, y: car.y - Math.sin(car.angle - 0.5) * off, life: 0.55 + skid * 0.4, w }
        )
        if (trail.length > 900) trail.splice(0, trail.length - 900)
      }
      // étincelles à l'accélération
      if (keys.up && Math.abs(car.speed) > 150) {
        sparks.push({
          x: car.x - Math.cos(car.angle) * 26,
          y: car.y - Math.sin(car.angle) * 26,
          vx: -vx * 0.15 + (Math.random() - 0.5) * 60,
          vy: -vy * 0.15 + (Math.random() - 0.5) * 60,
          life: 0.5,
        })
      }

      bump(now, vx, vy)

      // ── ligne d'arrivée : le bas de page ──
      if (armed && car.y > docH * 0.94) {
        armed = false
        const lap = fmtTime(now - started)
        setBanner(`🏁 Ligne d'arrivée — tour en ${lap} ! Remonte tout en haut pour relancer un tour.`)
        setTimeout(() => setBanner(null), 6000)
      }
      if (!armed && car.y < docH * 0.12) {
        armed = true
        started = now
        setBanner('🟢 Nouveau tour lancé — fonce !')
        setTimeout(() => setBanner(null), 2500)
      }

      // ── rendu ──
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const sy = window.scrollY
      for (const t of trail) {
        t.life -= dt * 0.22
        if (t.life <= 0) continue
        ctx.globalAlpha = clamp(t.life, 0, 0.5)
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(t.x - t.w / 2, t.y - sy - t.w / 2, t.w, t.w)
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life -= dt * 1.6
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        s.x += s.vx * dt
        s.y += s.vy * dt
        ctx.globalAlpha = s.life
        ctx.fillStyle = ['#0055a4', '#f2f4f8', '#ef4135'][(Math.random() * 3) | 0]
        ctx.fillRect(s.x - 1.5, s.y - sy - 1.5, 3, 3)
      }
      ctx.globalAlpha = 1
      for (let i = trail.length - 1; i >= 0; i--) if (trail[i].life <= 0) trail.splice(i, 1)

      drawCar(car.x, car.y - sy)

      // HUD rafraîchi ~8 fois/s
      if (now - lastHud > 120) {
        lastHud = now
        setHud({
          speed: Math.round(Math.abs(car.speed) * 0.38),
          time: fmtTime(now - started),
          dist: Math.round(dist * 0.02),
        })
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
      window.removeEventListener('resize', resize)
      document.querySelectorAll('.car-bump').forEach((el) => el.classList.remove('car-bump'))
    }
  }, [onClose])

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* HUD télémétrie */}
      <div className="absolute top-20 left-4 rounded-2xl border border-line bg-ink/85 px-4 py-3 font-mono text-xs text-gray-300 backdrop-blur">
        <p className="mb-1 tracking-[0.25em] text-f1">🏎️ MODE PISTE 🇫🇷</p>
        <p>
          <span className="text-gray-500">VITESSE</span>{' '}
          <span className="text-lg font-bold text-white">{hud.speed}</span> km/h
        </p>
        <p>
          <span className="text-gray-500">TOUR</span> <span className="text-cyan">{hud.time}</span>
          <span className="ml-3 text-gray-500">DIST.</span> {hud.dist} m
        </p>
        <p className="mt-2 text-[10px] text-gray-500">↑ ↓ ← → conduire · Échap quitter</p>
        <p className="text-[10px] text-gray-500">La ligne d'arrivée est en bas de page 🏁</p>
      </div>

      {/* annonces de course */}
      {banner && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 rounded-2xl border border-f1/60 bg-ink/90 px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_0_30px_rgba(225,6,0,0.4)] backdrop-blur">
          {banner}
        </div>
      )}
    </div>
  )
}
