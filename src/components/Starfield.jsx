import { useEffect, useRef } from 'react'

// Fond « ciel profond », clin d'œil à Unistellar et à son Enhanced Vision : le télescope
// empile des poses pour faire apparaître ce que l'œil ne voit pas. Ici, la pose s'allonge
// avec le scroll — plus on descend, plus la nébuleuse et les étoiles faibles se révèlent.
// - trois plans d'étoiles en parallaxe (scroll + pointeur), teintes stellaires réelles
// - aigrettes de diffraction sur les étoiles les plus brillantes, comme en astrophoto
// - nébuleuse (Hα rouge, OIII turquoise, bandes de poussière) générée en bruit fractal
// - Saturne près du Hero, galaxie spirale au milieu de la page (révélée elle aussi)
// - traînées de vitesse quand on défile vite, satellite qui passe avec un reflet solaire
// - Voie lactée en diagonale, scintillement, étoile filante de temps en temps
// Un seul canvas fixe, ~30 i/s, en pause onglet caché ; image figée (mais toujours
// révélée au scroll) si l'OS réduit les animations.

const LAYERS = [
  { density: 1 / 5200, size: [0.25, 0.7], alpha: [0.25, 0.6], parallax: 0.02, sway: 4 },
  { density: 1 / 14000, size: [0.5, 1.05], alpha: [0.35, 0.8], parallax: 0.05, sway: 9 },
  { density: 1 / 52000, size: [0.9, 1.7], alpha: [0.6, 1], parallax: 0.1, sway: 16 },
]
// étoiles faibles : invisibles en haut de page, elles « sortent » avec la pose
const DEEP = { density: 1 / 2600, size: [0.2, 0.5], alpha: [0.2, 0.5] }
const TINTS = ['255,255,255', '255,255,255', '255,255,255', '205,222,255', '255,236,214', '255,214,190']
const FRAME_MS = 1000 / 30
const NEBULA_PARALLAX = 0.035

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (list) => list[(Math.random() * list.length) | 0]
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// ── bruit fractal (value noise + fbm) pour la nébuleuse ──
const hash = (x, y, s) => {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)
  n = Math.imul(n ^ (n >>> 13), 1274126177)
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295
}
const fade = (t) => t * t * (3 - 2 * t)
const noise = (x, y, s) => {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const u = fade(x - xi)
  const v = fade(y - yi)
  const a = hash(xi, yi, s)
  const b = hash(xi + 1, yi, s)
  const c = hash(xi, yi + 1, s)
  const d = hash(xi + 1, yi + 1, s)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
const fbm = (x, y, s) => {
  let total = 0
  let amp = 0.5
  let f = 1
  for (let i = 0; i < 5; i++) {
    total += amp * noise(x * f, y * f, s + i * 17)
    f *= 2
    amp *= 0.5
  }
  return total
}

// Nébuleuse rendue une fois en basse résolution puis agrandie (le flou est gratuit).
// Deux nuages, l'un en haut à droite, l'autre plus bas à gauche ; volutes par domain warping.
function makeNebula(w, h, seed) {
  const scale = w < 700 ? 5 : 4
  const cw = Math.ceil(w / scale)
  const ch = Math.ceil(h / scale)
  const img = new ImageData(cw, ch)
  const blobs = [
    { x: 0.8, y: 0.22, r: 0.42 },
    { x: 0.12, y: 0.68, r: 0.36 },
  ]
  const k = 3.2 / cw // fréquence de base du bruit
  for (let py = 0; py < ch; py++) {
    for (let px = 0; px < cw; px++) {
      let mask = 0
      for (const b of blobs) {
        const dx = px / cw - b.x
        const dy = ((py / ch - b.y) * ch) / cw
        mask = Math.max(mask, Math.exp(-(dx * dx + dy * dy) / (b.r * b.r)))
      }
      if (mask < 0.02) continue
      const u = px * k
      const v = py * k
      const qx = fbm(u, v, seed + 1)
      const qy = fbm(u + 5.2, v + 1.3, seed + 2)
      const red = clamp01((fbm(u + 1.8 * qx, v + 1.8 * qy, seed + 3) - 0.42) * 2.4) ** 1.6 * mask
      const teal = clamp01((fbm(u * 1.3 + 3, v * 1.3, seed + 7) - 0.5) * 2.6) ** 2 * mask * 0.85
      const dust = clamp01((fbm(u * 2.2, v * 2.2, seed + 9) - 0.52) * 3)
      const alpha = Math.min(1, (red + teal) * 0.85) * (1 - dust * 0.75)
      const i = (py * cw + px) * 4
      img.data[i] = 255 * Math.min(1, 0.95 * red + 0.12 * teal)
      img.data[i + 1] = 255 * Math.min(1, 0.22 * red + 0.7 * teal)
      img.data[i + 2] = 255 * Math.min(1, 0.42 * red + 0.78 * teal)
      img.data[i + 3] = 255 * alpha
    }
  }
  const small = document.createElement('canvas')
  small.width = cw
  small.height = ch
  small.getContext('2d').putImageData(img, 0, 0)
  const full = document.createElement('canvas')
  full.width = w
  full.height = h
  const g = full.getContext('2d')
  g.imageSmoothingQuality = 'high'
  g.drawImage(small, 0, 0, w, h)
  return full
}

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
        twinkle: Math.random() < 0.12 ? rand(0.6, 1.8) : 0,
        phase: Math.random() * Math.PI * 2,
      })
    }
  })
  // aigrettes de diffraction : seulement les plus brillantes, pour rester rare
  stars
    .filter((s) => s.depth === 2 && s.r > 1.25)
    .slice(0, Math.max(3, Math.round((w * h) / 160000)))
    .forEach((s) => (s.spike = rand(5, 9)))
  // Voie lactée : bande diagonale, densité gaussienne autour de son axe
  const band = Math.round((w * h) / 2600)
  const angle = -0.42
  for (let i = 0; i < band; i++) {
    const along = rand(-0.7, 0.7) * Math.hypot(w, h)
    const across = (Math.random() + Math.random() + Math.random() - 1.5) * h * 0.09
    const x = w / 2 + along * Math.cos(angle) - across * Math.sin(angle)
    const y = h * 0.55 + along * Math.sin(angle) + across * Math.cos(angle)
    if (x < 0 || x > w || y < 0 || y > h) continue
    stars.push({ x, y, r: rand(0.2, 0.55), a: rand(0.15, 0.45), tint: pick(TINTS), depth: 0, twinkle: 0, phase: 0 })
  }
  const deep = []
  const deepCount = Math.round(w * h * DEEP.density)
  for (let i = 0; i < deepCount; i++) {
    deep.push({ x: Math.random() * w, y: Math.random() * h, r: rand(...DEEP.size), a: rand(...DEEP.alpha), tint: pick(TINTS) })
  }
  return { stars, deep }
}

// halo de la Voie lactée, peint directement à chaque image (pas de tuile pré-rendue :
// une tuile répétée laisserait une arête nette à sa jonction)
function drawMilkyWay(ctx, w, h, cy) {
  ctx.save()
  ctx.translate(w / 2, cy)
  ctx.rotate(-0.42)
  const grad = ctx.createLinearGradient(0, -h * 0.22, 0, h * 0.22)
  grad.addColorStop(0, 'rgba(120,140,200,0)')
  grad.addColorStop(0.5, 'rgba(150,160,210,0.05)')
  grad.addColorStop(1, 'rgba(120,140,200,0)')
  ctx.fillStyle = grad
  ctx.fillRect(-w * 1.5, -h * 0.22, w * 3, h * 0.44)
  ctx.restore()
}

// ── objets du ciel profond, pré-rendus une fois ──
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5

// Saturne : globe ombré à bandes, anneaux A et B séparés par la division de Cassini.
// La moitié arrière des anneaux passe derrière le globe, la moitié avant devant.
function makeSaturn(R) {
  const c = document.createElement('canvas')
  c.width = Math.ceil(R * 5)
  c.height = Math.ceil(R * 2.8)
  const g = c.getContext('2d')
  g.translate(c.width / 2, c.height / 2)
  g.rotate(-0.36)
  const RINGS = [
    [1.24, 1.5, 'rgba(190,170,135,0.28)'], // anneau C, sombre et translucide
    [1.52, 1.94, 'rgba(232,212,170,0.85)'], // anneau B, le plus brillant
    [2.02, 2.26, 'rgba(210,190,150,0.6)'], // anneau A (après Cassini)
    [2.29, 2.33, 'rgba(200,180,140,0.35)'],
  ]
  const rings = (front) => {
    for (const [r0, r1, color] of RINGS) {
      g.save()
      g.scale(1, 0.3)
      g.beginPath()
      g.arc(0, 0, R * r1, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2)
      g.arc(0, 0, R * r0, front ? Math.PI : Math.PI * 2, front ? 0 : Math.PI, true)
      g.closePath()
      g.fillStyle = color
      g.fill()
      g.restore()
    }
  }
  rings(false)
  // globe
  g.save()
  g.beginPath()
  g.arc(0, 0, R, 0, Math.PI * 2)
  g.clip()
  const body = g.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.1, 0, 0, R)
  body.addColorStop(0, '#f4e4bd')
  body.addColorStop(0.55, '#d9b97f')
  body.addColorStop(0.9, '#9a7444')
  body.addColorStop(1, '#5a4120')
  g.fillStyle = body
  g.fillRect(-R, -R, R * 2, R * 2)
  // bandes nuageuses
  for (const [y, hgt, a] of [[-0.62, 0.1, 0.22], [-0.35, 0.16, 0.16], [-0.05, 0.08, 0.12], [0.22, 0.14, 0.18], [0.5, 0.1, 0.2]]) {
    g.fillStyle = `rgba(120,82,40,${a})`
    g.fillRect(-R, y * R, R * 2, hgt * R)
  }
  // ombre de la nuit + ombre des anneaux sur le globe
  const night = g.createLinearGradient(-R * 0.4, -R * 0.4, R, R)
  night.addColorStop(0, 'rgba(0,0,0,0)')
  night.addColorStop(1, 'rgba(0,0,8,0.78)')
  g.fillStyle = night
  g.fillRect(-R, -R, R * 2, R * 2)
  g.fillStyle = 'rgba(0,0,0,0.35)'
  g.fillRect(-R, R * 0.12, R * 2, R * 0.08)
  g.restore()
  rings(true)
  return c
}

// Galaxie spirale vue de biais, façon Andromède : bulbe chaud, bras bleutés,
// quelques régions HII rosées. Points en mode additif, puis aplatie et inclinée.
function makeGalaxy(S) {
  const disc = document.createElement('canvas')
  disc.width = disc.height = S
  const d = disc.getContext('2d')
  d.translate(S / 2, S / 2)
  d.globalCompositeOperation = 'lighter'
  const core = d.createRadialGradient(0, 0, 0, 0, 0, S * 0.16)
  core.addColorStop(0, 'rgba(255,236,205,0.75)')
  core.addColorStop(0.35, 'rgba(255,215,170,0.22)')
  core.addColorStop(1, 'rgba(255,200,160,0)')
  d.fillStyle = core
  d.fillRect(-S / 2, -S / 2, S, S)
  const dots = Math.round(S * 14)
  for (let i = 0; i < dots; i++) {
    const t = Math.random() ** 0.85
    const arm = i % 2
    const theta = arm * Math.PI + t * 4.4 + (gauss() * 0.45) / (t + 0.35)
    const rad = t * S * 0.46
    const x = rad * Math.cos(theta) + gauss() * S * 0.018
    const y = rad * Math.sin(theta) + gauss() * S * 0.018
    const roll = Math.random()
    d.fillStyle = t < 0.22 ? 'rgb(255,226,185)' : roll < 0.04 ? 'rgb(255,140,170)' : 'rgb(175,198,255)'
    d.globalAlpha = rand(0.08, 0.3) * (1 - t * 0.5)
    const sz = rand(0.6, 1.5)
    d.fillRect(x, y, sz, sz)
  }
  for (let i = 0; i < S * 4; i++) {
    d.fillStyle = 'rgb(255,230,195)'
    d.globalAlpha = rand(0.1, 0.35)
    d.fillRect(gauss() * S * 0.06, gauss() * S * 0.06, 1, 1)
  }
  const c = document.createElement('canvas')
  c.width = S
  c.height = Math.ceil(S * 0.62)
  const g = c.getContext('2d')
  g.translate(S / 2, c.height / 2)
  g.rotate(-0.45)
  g.scale(1, 0.4)
  g.drawImage(disc, -S / 2, -S / 2)
  return c
}

export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const seed = (Math.random() * 1000) | 0
    let w = 0
    let h = 0
    let field = { stars: [], deep: [] }
    let nebula = null
    let nebulaTimer = 0
    let saturn = null
    let galaxy = null
    let satellite = null
    let nextSat = performance.now() + rand(12000, 22000)
    // vitesse de scroll lissée : au-delà d'un seuil, les étoiles s'étirent en traînées
    let lastScroll = window.scrollY
    let vel = 0
    let shooting = null
    let nextShot = performance.now() + rand(4000, 9000)
    let raf = 0
    let last = 0
    // pointeur : cible et position lissée, dans [-1, 1]
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 }

    const exposure = () => {
      const max = document.documentElement.scrollHeight - h
      return max > 0 ? clamp01(window.scrollY / max) : 0
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      field = makeStars(w, h)
      saturn = makeSaturn(w < 768 ? 24 : 44)
      galaxy = makeGalaxy(Math.round(Math.min(440, Math.max(260, w * 0.3))))
      // la nébuleuse coûte quelques dizaines de ms : on la calcule hors du chemin critique
      clearTimeout(nebulaTimer)
      nebulaTimer = setTimeout(() => {
        nebula = makeNebula(w, Math.round(h * 1.8), seed)
        draw(performance.now())
      }, 300)
      draw(performance.now())
    }

    const draw = (now) => {
      const scroll = window.scrollY
      const e = exposure()
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      ctx.clearRect(0, 0, w, h)
      const dv = scroll - lastScroll
      lastScroll = scroll
      vel = still ? 0 : vel + (dv - vel) * 0.35
      const streak = Math.abs(vel) > 6

      // nébuleuse : discrète en haut de page, pleinement révélée en bas
      if (nebula) {
        const travel = nebula.height - h
        const ny = -Math.min(travel, scroll * NEBULA_PARALLAX)
        ctx.globalAlpha = 0.4 + 0.6 * e
        ctx.drawImage(nebula, mouse.x * -3, ny + mouse.y * -3)
      }
      ctx.globalAlpha = 1
      // même parallaxe et même répétition que les étoiles de la bande
      const gy = -((scroll * LAYERS[0].parallax) % h)
      drawMilkyWay(ctx, w, h, h * 0.55 + gy)
      drawMilkyWay(ctx, w, h, h * 0.55 + gy + h)

      // galaxie : au milieu de la page, révélée elle aussi par la pose
      if (galaxy) {
        const anchor = (document.documentElement.scrollHeight - h) * 0.42
        const gyc = h * 0.5 + (anchor - scroll) * 0.12 - mouse.y * 6
        // dans la marge gauche, à cheval sur le bord de l'écran comme sur une photo cadrée serré
        const margin = Math.max(0, (w - 1152) / 2)
        const gx = (margin > 90 ? margin * 0.45 + galaxy.width * 0.05 : w * 0.3) - mouse.x * 6
        if (gyc > -galaxy.height && gyc < h + galaxy.height) {
          ctx.globalAlpha = 0.25 + 0.75 * e
          ctx.drawImage(galaxy, gx - galaxy.width / 2, gyc - galaxy.height / 2)
          ctx.globalAlpha = 1
        }
      }

      // étoiles faibles : elles apparaissent à mesure que la pose s'allonge
      if (e > 0.02) {
        for (const s of field.deep) {
          let y = (s.y - scroll * 0.015) % h
          if (y < 0) y += h
          ctx.globalAlpha = s.a * e
          ctx.fillStyle = `rgb(${s.tint})`
          ctx.fillRect(s.x, y, s.r * 1.6, s.r * 1.6)
        }
      }

      for (const s of field.stars) {
        const layer = LAYERS[s.depth]
        let y = (s.y - scroll * layer.parallax - mouse.y * layer.sway) % h
        if (y < 0) y += h
        const x = s.x - mouse.x * layer.sway
        let a = s.a
        if (s.twinkle && !still) a *= 0.55 + 0.45 * Math.sin((now / 1000) * s.twinkle * Math.PI + s.phase)
        ctx.globalAlpha = a
        ctx.fillStyle = `rgb(${s.tint})`
        if (streak) {
          // traînée de vitesse : plus l'étoile est proche, plus elle s'étire
          const len = Math.max(-55, Math.min(55, vel * layer.parallax * 10))
          ctx.globalAlpha = a * 0.7
          ctx.strokeStyle = `rgb(${s.tint})`
          ctx.lineWidth = Math.max(0.5, s.r * 1.1)
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + len)
          ctx.stroke()
          continue
        }
        if (s.r < 0.8) {
          ctx.fillRect(x, y, s.r * 1.6, s.r * 1.6)
          continue
        }
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (s.spike) {
          // aigrettes en croix : deux traits fins qui s'estompent vers l'extérieur
          ctx.strokeStyle = `rgba(${s.tint},${0.55 * a})`
          ctx.lineWidth = 0.6
          for (const [dx, dy] of [[1, 0], [0, 1]]) {
            const g = ctx.createLinearGradient(x - dx * s.spike, y - dy * s.spike, x + dx * s.spike, y + dy * s.spike)
            g.addColorStop(0, `rgba(${s.tint},0)`)
            g.addColorStop(0.5, `rgba(${s.tint},${0.7 * a})`)
            g.addColorStop(1, `rgba(${s.tint},0)`)
            ctx.strokeStyle = g
            ctx.beginPath()
            ctx.moveTo(x - dx * s.spike, y - dy * s.spike)
            ctx.lineTo(x + dx * s.spike, y + dy * s.spike)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Saturne, dans le vide à droite du Hero ; elle file vers le haut plus vite que les étoiles
      if (saturn) {
        const sx = (w >= 1024 ? w * 0.76 : w * 0.8) - mouse.x * 22
        const sy = h * (w >= 1024 ? 0.4 : 0.16) - scroll * 0.22 - mouse.y * 22
        if (sy > -saturn.height) {
          ctx.globalAlpha = w >= 1024 ? 1 : 0.75
          ctx.drawImage(saturn, sx - saturn.width / 2, sy - saturn.height / 2)
          ctx.globalAlpha = 1
        }
      }

      if (still) return

      // satellite : un point qui ne scintille pas, traverse en ~16 s, avec un reflet de
      // panneau solaire (« flare ») à mi-parcours
      if (!satellite && now > nextSat) {
        const fromLeft = Math.random() < 0.5
        satellite = { x0: fromLeft ? -10 : w + 10, y0: rand(h * 0.05, h * 0.5), dx: (fromLeft ? 1 : -1) * (w + 20), dy: rand(-0.15, 0.25) * h, born: now }
      }
      if (satellite) {
        const t = (now - satellite.born) / 16000
        if (t >= 1) {
          satellite = null
          nextSat = now + rand(25000, 45000)
        } else {
          const x = satellite.x0 + satellite.dx * t
          const y = satellite.y0 + satellite.dy * t
          const flare = Math.max(0, 1 - Math.abs(t - 0.55) / 0.035)
          ctx.globalAlpha = 0.65 + 0.35 * flare
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(x, y, 0.9 + flare * 1.6, 0, Math.PI * 2)
          ctx.fill()
          if (flare > 0) {
            const halo = ctx.createRadialGradient(x, y, 0, x, y, 14 * flare)
            halo.addColorStop(0, `rgba(255,255,255,${0.5 * flare})`)
            halo.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.fillStyle = halo
            ctx.fillRect(x - 14, y - 14, 28, 28)
          }
          ctx.globalAlpha = 1
        }
      }

      // étoile filante : une traînée qui s'éteint en ~0,9 s
      if (!shooting && now > nextShot) {
        shooting = { x: rand(w * 0.1, w * 0.9), y: rand(0, h * 0.45), angle: rand(0.35, 0.6), born: now, speed: rand(700, 1000) }
      }
      if (!shooting) return
      const t = (now - shooting.born) / 1000
      if (t > 0.9) {
        shooting = null
        nextShot = now + rand(7000, 15000)
        return
      }
      const len = 90
      const hx = shooting.x + Math.cos(shooting.angle) * shooting.speed * t
      const hy = shooting.y + Math.sin(shooting.angle) * shooting.speed * t
      const tx = hx - Math.cos(shooting.angle) * len
      const ty = hy - Math.sin(shooting.angle) * len
      const trail = ctx.createLinearGradient(tx, ty, hx, hy)
      trail.addColorStop(0, 'rgba(255,255,255,0)')
      trail.addColorStop(1, `rgba(255,255,255,${0.75 * (1 - t / 0.9)})`)
      ctx.strokeStyle = trail
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.moveTo(tx, ty)
      ctx.lineTo(hx, hy)
      ctx.stroke()
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (now - last < FRAME_MS) return
      last = now
      draw(now)
    }

    resize()
    const redraw = () => still && draw(performance.now()) // en mode figé, on ne redessine qu'au besoin
    const onMouse = (ev) => {
      mouse.tx = (ev.clientX / w) * 2 - 1
      mouse.ty = (ev.clientY / h) * 2 - 1
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !still) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', redraw, { passive: true })
    if (finePointer && !still) window.addEventListener('pointermove', onMouse, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (!still) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(nebulaTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', redraw)
      window.removeEventListener('pointermove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
