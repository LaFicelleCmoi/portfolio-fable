import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'

// ── MODE VOL ──────────────────────────────────────────────────────────────
// Easter egg inspiré de bruno-simon.com : un vaisseau pilotable aux flèches
// vole PAR-DESSUS le portfolio. Physique spatiale : inertie, poussée, rétrofusées,
// rotation par propulseurs d'orientation. La page suit le vaisseau, les cartes
// tremblent quand il les frôle à pleine vitesse, et rejoindre le bas de page
// boucle la mission, chronométrée. Chargé en lazy : zéro impact au chargement.

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const fmtTime = (ms) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const d = Math.floor((ms % 1000) / 100)
  return `${m}:${String(s).padStart(2, '0')}.${d}`
}

const HUD_STRINGS = {
  fr: {
    title: 'MODE VOL',
    speed: 'VITESSE',
    time: 'T+',
    dist: 'DIST.',
    keys: '↑ poussée · ↓ rétrofusées · ← → orientation · Échap quitter',
    goal: 'Objectif : rejoindre le bas de la page',
    finish: (t) => `Mission accomplie en ${t} ! Remonte tout en haut pour une nouvelle mission.`,
    newRun: 'Nouvelle mission — décollage !',
  },
  en: {
    title: 'FLIGHT MODE',
    speed: 'SPEED',
    time: 'T+',
    dist: 'DIST.',
    keys: '↑ thrust · ↓ retro-rockets · ← → attitude · Esc to quit',
    goal: 'Objective: reach the bottom of the page',
    finish: (t) => `Mission accomplished in ${t}! Head back to the top for a new mission.`,
    newRun: 'New mission — lift-off!',
  },
}

// constantes de vol (px, s)
const THRUST = 820
const RETRO = 1100
const MAX_SPEED = 900
const DRAG = 0.55 // léger amortissement, sinon le vaisseau devient impilotable dans une page
const SPIN_ACCEL = 14
const SPIN_DAMP = 6
const MAX_SPIN = 4.2

export default function FlightMode({ onClose, registerClose }) {
  const { lang } = useLang()
  const T = HUD_STRINGS[lang]
  const tRef = useRef(T)
  tRef.current = T
  const canvasRef = useRef(null)
  const [hud, setHud] = useState({ speed: '0.0', time: '0:00.0', dist: '0.0' })
  const [banner, setBanner] = useState(null)
  // entrée/sortie : fondu du calque + saut en hyperespace du vaisseau
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)
  // callbacks stabilisés : le jeu ne doit pas redémarrer si le parent re-render
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const registerCloseRef = useRef(registerClose)
  registerCloseRef.current = registerClose

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

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

    // le vaisseau vit en coordonnées DOCUMENT (il traverse toute la page).
    // Il sort de l'hyperespace par la gauche puis se stabilise : entrée en scène.
    const ship = {
      x: -60,
      y: window.scrollY + window.innerHeight / 2,
      vx: 1500,
      vy: 0,
      angle: 0, // nez vers l'est
      spin: 0,
    }
    const born = performance.now()
    let entered = false
    const keys = { up: false, down: false, left: false, right: false }
    const ions = [] // traînée des réacteurs {x, y, vx, vy, life, hot}
    const puffs = [] // bouffées des propulseurs {x, y, vx, vy, life}
    const shields = [] // impacts de bouclier sur les bords {x, y, life}
    const t0 = performance.now()
    let started = t0
    let dist = 0
    let armed = true
    let lastBump = 0
    let lastHud = 0
    let raf = 0
    let last = t0

    // sortie : le vaisseau repasse en hyperespace pendant le fondu
    const beginExit = () => {
      if (closingRef.current) return
      closingRef.current = true
      setClosing(true)
      setTimeout(() => onCloseRef.current(), 560)
    }
    registerCloseRef.current?.(beginExit)

    const typing = (e) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
    const onKey = (down) => (e) => {
      if (typing(e)) return // on laisse le clavier au formulaire
      const k = e.key
      if (down && (k === 'Escape' || k.toLowerCase() === 'v')) return beginExit()
      const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
      if (map[k]) {
        keys[map[k]] = down
        e.preventDefault() // la page ne défile plus aux flèches : c'est le vaisseau qui la pilote
      }
    }
    const kd = onKey(true)
    const ku = onKey(false)

    // fait trembler la carte survolée à pleine vitesse
    const bump = (now, speed) => {
      if (now - lastBump < 200 || speed < 420) return
      const els = document.elementsFromPoint(
        clamp(ship.x, 0, window.innerWidth - 1),
        clamp(ship.y - window.scrollY, 0, window.innerHeight - 1)
      )
      const target = els.find((el) => el !== canvas && el.classList?.contains('rounded-2xl') && el.classList.contains('border'))
      if (target && !target.classList.contains('car-bump')) {
        target.classList.add('car-bump')
        setTimeout(() => target.classList.remove('car-bump'), 450)
        lastBump = now
      }
    }

    // ── le vaisseau, vu de dessus (nez vers +x) ──
    // Coque claire à ailes delta, cockpit vitré, deux nacelles de réacteur, liserés rouges.
    const path = (pts) => {
      const p2 = new Path2D()
      pts.forEach(([x, y], i) => (i ? p2.lineTo(x, y) : p2.moveTo(x, y)))
      p2.closePath()
      return p2
    }
    const mirrored = (half) => path([...half, ...half.slice().reverse().map(([x, y]) => [x, -y])])
    const WINGS = mirrored([[-16, -3], [-20, -17], [-14, -18], [2, -6], [10, -3]])
    const HULL = mirrored([[-19, -4.2], [-8, -5.6], [6, -4.6], [16, -2.6], [24, -0.8], [26, 0]])
    const NACELLE = new Path2D()
    NACELLE.roundRect(-21, -3, 12, 6, 2.5)
    const CANOPY = new Path2D()
    CANOPY.ellipse(8, 0, 6.5, 2.6, 0, 0, Math.PI * 2)

    const flame = (ex, ey, power, flicker) => {
      const len = 10 + 26 * power * flicker
      const g = ctx.createLinearGradient(ex, ey, ex - len, ey)
      g.addColorStop(0, 'rgba(255,255,255,0.95)')
      g.addColorStop(0.25, 'rgba(150,210,255,0.85)')
      g.addColorStop(0.7, 'rgba(70,120,255,0.35)')
      g.addColorStop(1, 'rgba(70,120,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(ex, ey - 2.4)
      ctx.quadraticCurveTo(ex - len * 0.45, ey - 3, ex - len, ey)
      ctx.quadraticCurveTo(ex - len * 0.45, ey + 3, ex, ey + 2.4)
      ctx.closePath()
      ctx.fill()
    }

    const drawShip = (cx, cy, now, thrusting, braking, turning) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(ship.angle)
      ctx.scale(1.25, 1.25)

      // halo des réacteurs projeté sous le vaisseau
      if (thrusting) {
        const glow = ctx.createRadialGradient(-24, 0, 0, -24, 0, 28)
        glow.addColorStop(0, 'rgba(120,170,255,0.35)')
        glow.addColorStop(1, 'rgba(120,170,255,0)')
        ctx.fillStyle = glow
        ctx.fillRect(-52, -28, 56, 56)
      }

      // flammes : deux réacteurs, longueur qui vacille
      const flick = 0.75 + Math.random() * 0.25
      const idle = closingRef.current ? 1.4 : thrusting ? 1 : 0.18
      for (const ey of [-5.5, 5.5]) flame(-21, ey, idle, flick)

      // ailes delta, avec liseré rouge au bord d'attaque
      ctx.fillStyle = '#c9ccd3'
      ctx.fill(WINGS)
      ctx.strokeStyle = '#e10600'
      ctx.lineWidth = 1.1
      ctx.beginPath()
      for (const s of [-1, 1]) {
        ctx.moveTo(2, s * 6)
        ctx.lineTo(-14, s * 18)
      }
      ctx.stroke()
      // panneaux sombres sur les ailes
      ctx.fillStyle = 'rgba(20,22,28,0.55)'
      for (const s of [-1, 1]) ctx.fillRect(-15, s > 0 ? 9 : -13, 7, 4)

      // nacelles de réacteur
      for (const s of [-1, 1]) {
        ctx.save()
        ctx.translate(0, s * 5.5)
        ctx.fillStyle = '#2a2d35'
        ctx.fill(NACELLE)
        ctx.fillStyle = thrusting ? '#bfe1ff' : '#5a6b8c'
        ctx.fillRect(-21.5, -2, 1.5, 4)
        ctx.restore()
      }

      // coque : dégradé pour l'arête éclairée
      const hull = ctx.createLinearGradient(0, -6, 0, 6)
      hull.addColorStop(0, '#9da2ad')
      hull.addColorStop(0.42, '#f4f5f7')
      hull.addColorStop(0.6, '#d9dce2')
      hull.addColorStop(1, '#7d828e')
      ctx.fillStyle = hull
      ctx.fill(HULL)
      // bande rouge dorsale
      ctx.fillStyle = '#e10600'
      ctx.beginPath()
      ctx.moveTo(-17, -1)
      ctx.lineTo(2, -1.3)
      ctx.lineTo(2, 1.3)
      ctx.lineTo(-17, 1)
      ctx.closePath()
      ctx.fill()

      // cockpit vitré avec reflet
      const glass = ctx.createLinearGradient(4, -3, 12, 3)
      glass.addColorStop(0, '#0b1a33')
      glass.addColorStop(0.5, '#2b5a9a')
      glass.addColorStop(1, '#0b1a33')
      ctx.fillStyle = glass
      ctx.fill(CANOPY)
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.beginPath()
      ctx.ellipse(9.5, -1, 2.6, 0.7, -0.15, 0, Math.PI * 2)
      ctx.fill()

      // feux de position : rouge à gauche, vert à droite, clignotement façon aviation
      const blink = Math.floor(now / 600) % 2 === 0
      ctx.fillStyle = blink ? '#ff3b30' : '#5a1210'
      ctx.fillRect(-15, -18.4, 1.6, 1.6)
      ctx.fillStyle = blink ? '#30d158' : '#103a1c'
      ctx.fillRect(-15, 16.8, 1.6, 1.6)

      // rétrofusées : petites flammes vers l'avant quand on freine
      if (braking) {
        ctx.fillStyle = 'rgba(190,225,255,0.8)'
        for (const s of [-1, 1]) {
          ctx.beginPath()
          ctx.moveTo(14, s * 3)
          ctx.lineTo(21 + Math.random() * 3, s * 4.5)
          ctx.lineTo(14, s * 4.2)
          ctx.fill()
        }
      }
      // propulseurs d'orientation : bouffée en bout d'aile opposé au virage
      if (turning) {
        const s = turning > 0 ? -1 : 1
        ctx.fillStyle = 'rgba(220,235,255,0.75)'
        ctx.beginPath()
        ctx.arc(-14, s * 19.5, 1.4 + Math.random(), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    // traînées de l'hyperespace autour du vaisseau (entrée et sortie)
    const drawWarp = (cx, cy, strength) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(ship.angle)
      for (let i = 0; i < 14; i++) {
        const y = (Math.random() - 0.5) * 70
        const len = 60 + Math.random() * 180 * strength
        const x = -20 - Math.random() * 40
        const g = ctx.createLinearGradient(x, y, x - len, y)
        g.addColorStop(0, `rgba(200,225,255,${0.6 * strength})`)
        g.addColorStop(1, 'rgba(200,225,255,0)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - len, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const docH = document.documentElement.scrollHeight
      const exiting = closingRef.current
      const age = now - born

      // ── physique ──
      const turn = exiting ? 0 : (keys.left ? -1 : 0) + (keys.right ? 1 : 0)
      ship.spin += turn * SPIN_ACCEL * dt
      ship.spin *= 1 - Math.min(1, SPIN_DAMP * dt * (turn ? 0.35 : 1))
      ship.spin = clamp(ship.spin, -MAX_SPIN, MAX_SPIN)
      ship.angle += ship.spin * dt

      const thrusting = exiting || keys.up
      const braking = keys.down && !exiting
      if (exiting) {
        // saut : forte accélération droit devant
        ship.vx += Math.cos(ship.angle) * 4200 * dt
        ship.vy += Math.sin(ship.angle) * 4200 * dt
      } else {
        if (keys.up) {
          ship.vx += Math.cos(ship.angle) * THRUST * dt
          ship.vy += Math.sin(ship.angle) * THRUST * dt
        }
        let speed = Math.hypot(ship.vx, ship.vy)
        if (braking && speed > 0) {
          const k = Math.max(0, speed - RETRO * dt) / speed
          ship.vx *= k
          ship.vy *= k
        }
        // après le saut d'entrée, on revient à une vitesse de croisière pilotable
        const drag = age < 900 ? 3.2 : DRAG
        ship.vx *= 1 - drag * dt
        ship.vy *= 1 - drag * dt
        speed = Math.hypot(ship.vx, ship.vy)
        if (speed > MAX_SPEED && age > 900) {
          ship.vx *= MAX_SPEED / speed
          ship.vy *= MAX_SPEED / speed
        }
      }
      ship.x += ship.vx * dt
      ship.y += ship.vy * dt
      const speed = Math.hypot(ship.vx, ship.vy)
      dist += speed * dt

      // bords : le bouclier encaisse et renvoie le vaisseau — désactivés à l'entrée et à la sortie
      if (!entered && ship.x > 40) entered = true
      if (entered && !exiting) {
        const hitX = ship.x < 26 || ship.x > window.innerWidth - 26
        const hitY = ship.y < 26 || ship.y > docH - 26
        if (hitX) {
          ship.x = clamp(ship.x, 26, window.innerWidth - 26)
          ship.vx *= -0.6
        }
        if (hitY) {
          ship.y = clamp(ship.y, 26, docH - 26)
          ship.vy *= -0.6
        }
        if ((hitX || hitY) && speed > 120) shields.push({ x: ship.x, y: ship.y, life: 1 })
      }

      // la page suit le vaisseau
      const targetScroll = clamp(ship.y - window.innerHeight / 2, 0, docH - window.innerHeight)
      window.scrollTo({ top: targetScroll, behavior: 'instant' })

      // traînée ionique des deux réacteurs
      const power = thrusting ? 1 : 0.25
      if (Math.random() < 0.35 + power * 0.65) {
        for (const s of [-1, 1]) {
          const ox = -27 * Math.cos(ship.angle) - s * 6.9 * Math.sin(ship.angle)
          const oy = -27 * Math.sin(ship.angle) + s * 6.9 * Math.cos(ship.angle)
          ions.push({
            x: ship.x + ox,
            y: ship.y + oy,
            vx: ship.vx * 0.35 - Math.cos(ship.angle) * 120 * power + (Math.random() - 0.5) * 30,
            vy: ship.vy * 0.35 - Math.sin(ship.angle) * 120 * power + (Math.random() - 0.5) * 30,
            life: 0.5 + power * 0.5,
            hot: thrusting,
          })
        }
        if (ions.length > 500) ions.splice(0, ions.length - 500)
      }
      if (braking && Math.random() < 0.6) {
        puffs.push({
          x: ship.x + Math.cos(ship.angle) * 26,
          y: ship.y + Math.sin(ship.angle) * 26,
          vx: Math.cos(ship.angle) * 90 + (Math.random() - 0.5) * 50,
          vy: Math.sin(ship.angle) * 90 + (Math.random() - 0.5) * 50,
          life: 0.5,
        })
      }

      if (!exiting) bump(now, speed)

      // ── mission : rejoindre le bas de page ──
      if (armed && !exiting && ship.y > docH * 0.94) {
        armed = false
        setBanner(tRef.current.finish(fmtTime(now - started)))
        setTimeout(() => setBanner(null), 6000)
      }
      if (!armed && ship.y < docH * 0.12) {
        armed = true
        started = now
        setBanner(tRef.current.newRun)
        setTimeout(() => setBanner(null), 2500)
      }

      // ── rendu ──
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const sy = window.scrollY
      ctx.globalCompositeOperation = 'lighter'
      for (let i = ions.length - 1; i >= 0; i--) {
        const p = ions[i]
        p.life -= dt * 1.1
        if (p.life <= 0) {
          ions.splice(i, 1)
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        ctx.globalAlpha = clamp(p.life, 0, 1) * (p.hot ? 0.8 : 0.4)
        ctx.fillStyle = p.hot ? (p.life > 0.7 ? '#e8f3ff' : '#6fa8ff') : '#5b7cc4'
        const r = p.hot ? 1.6 : 1.1
        ctx.fillRect(p.x - r, p.y - sy - r, r * 2, r * 2)
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i]
        p.life -= dt * 2
        if (p.life <= 0) {
          puffs.splice(i, 1)
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        ctx.globalAlpha = p.life * 0.6
        ctx.fillStyle = '#d6e6ff'
        ctx.beginPath()
        ctx.arc(p.x, p.y - sy, 1.5 + (0.5 - p.life) * 6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      // impacts de bouclier : un hexagone d'énergie qui s'étend et s'éteint
      for (let i = shields.length - 1; i >= 0; i--) {
        const s = shields[i]
        s.life -= dt * 2.2
        if (s.life <= 0) {
          shields.splice(i, 1)
          continue
        }
        ctx.globalAlpha = s.life * 0.8
        ctx.strokeStyle = '#8fc4ff'
        ctx.lineWidth = 1.4
        ctx.beginPath()
        const r = 22 + (1 - s.life) * 26
        for (let k = 0; k <= 6; k++) {
          const a = (k / 6) * Math.PI * 2 + Math.PI / 6
          const px = s.x + Math.cos(a) * r
          const py = s.y - sy + Math.sin(a) * r
          k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // hyperespace : à l'arrivée (qui s'estompe) et pendant le départ
      const warp = exiting ? 1 : clamp(1 - age / 700, 0, 1)
      if (warp > 0) drawWarp(ship.x, ship.y - sy, warp)
      drawShip(ship.x, ship.y - sy, now, thrusting, braking, turn)

      // HUD rafraîchi ~8 fois/s
      if (now - lastHud > 120) {
        lastHud = now
        setHud({
          speed: (speed * 0.012).toFixed(1),
          time: fmtTime(now - started),
          dist: (dist * 0.001).toFixed(1),
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
      registerCloseRef.current?.(null)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
      window.removeEventListener('resize', resize)
      document.querySelectorAll('.car-bump').forEach((el) => el.classList.remove('car-bump'))
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80] transition-opacity duration-500 ease-out"
      style={{ opacity: visible && !closing ? 1 : 0 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* HUD de vol */}
      <motion.div
        initial={{ opacity: 0, y: -18, scale: 0.95 }}
        animate={closing ? { opacity: 0, y: -18, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 18, stiffness: 220 }}
        className="absolute top-20 left-4 rounded-2xl border border-line bg-ink/85 px-4 py-3 font-mono text-xs text-gray-300 backdrop-blur"
      >
        <p className="mb-1 tracking-[0.25em] text-accent">{T.title}</p>
        <p>
          <span className="text-gray-500">{T.speed}</span>{' '}
          <span className="text-lg font-bold text-white tabular-nums">{hud.speed}</span> km/s
        </p>
        <p className="tabular-nums">
          <span className="text-gray-500">{T.time}</span> <span className="text-accent">{hud.time}</span>
          <span className="ml-3 text-gray-500">{T.dist}</span> {hud.dist} Mkm
        </p>
        <p className="mt-2 text-[10px] text-gray-500">{T.keys}</p>
        <p className="text-[10px] text-gray-500">{T.goal}</p>
      </motion.div>

      {/* annonces de mission */}
      {banner && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 rounded-2xl border border-line bg-ink/90 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur">
          {banner}
        </div>
      )}
    </div>
  )
}
