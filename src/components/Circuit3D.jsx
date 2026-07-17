import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { X } from 'lucide-react'

// ── CIRCUIT 3D ────────────────────────────────────────────────────────────
// La version "vraie 3D" du Mode Piste, inspirée de bruno-simon.com :
// un monde nocturne néon, une piste avec vibreurs et arche damier, la
// monoplace tricolore pilotable, et des panneaux 3D qui téléportent vers
// les sections du portfolio (touche E à proximité).
// Chargé en lazy : three.js ne pèse rien tant qu'on n'entre pas sur le circuit.

const TRACK_R = 30 // rayon médian de la piste (m)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const fmtTime = (ms) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const d = Math.floor((ms % 1000) / 100)
  return `${m}:${String(s).padStart(2, '0')}.${d}`
}

// panneaux de navigation plantés autour de la piste
const PANELS = [
  { id: 'apropos', label: 'À PROPOS', theta: 0.9 },
  { id: 'experience', label: 'ALTERNANCE', theta: 2.0 },
  { id: 'competences', label: 'COMPÉTENCES', theta: 3.1 },
  { id: 'projets', label: 'PROJETS', theta: 4.3 },
  { id: 'contact', label: 'CONTACT', theta: 5.4 },
].map((p) => ({ ...p, x: 44 * Math.cos(p.theta), z: 44 * Math.sin(p.theta) }))

// texte → texture (pas besoin de police 3D : un canvas suffit)
function makeLabel(text, accent = '#22d3ee') {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 224
  const g = c.getContext('2d')
  g.fillStyle = '#0b0d1a'
  g.fillRect(0, 0, 512, 224)
  g.strokeStyle = accent
  g.lineWidth = 10
  g.strokeRect(10, 10, 492, 204)
  g.fillStyle = '#f2f4f8'
  g.font = 'bold 64px "Space Grotesk", sans-serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(text, 256, 104)
  g.fillStyle = accent
  g.font = '28px "Space Grotesk", sans-serif'
  g.fillText('[ E ] pour entrer', 256, 176)
  const t = new THREE.CanvasTexture(c)
  t.anisotropy = 4
  return t
}

function makeChecker(cols = 10, rows = 2) {
  const c = document.createElement('canvas')
  c.width = cols * 32
  c.height = rows * 32
  const g = c.getContext('2d')
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      g.fillStyle = (i + j) % 2 ? '#0a0a0a' : '#f2f4f8'
      g.fillRect(i * 32, j * 32, 32, 32)
    }
  return new THREE.CanvasTexture(c)
}

function makeBanner() {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 160
  const g = c.getContext('2d')
  g.fillStyle = '#0b0d1a'
  g.fillRect(0, 0, 1024, 160)
  for (let i = 0; i < 32; i++) {
    g.fillStyle = i % 2 ? '#0a0a0a' : '#f2f4f8'
    g.fillRect(i * 32, 0, 32, 24)
    g.fillRect(i * 32, 136, 32, 24)
  }
  g.fillStyle = '#f2f4f8'
  g.font = 'bold 72px "Space Grotesk", sans-serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText('LOÏS GP', 512, 80)
  return new THREE.CanvasTexture(c)
}

// la monoplace tricolore 🇫🇷 (les mêmes couleurs que le mode 2D)
function CarBody({ frontLeft, frontRight, wheels }) {
  return (
    <group>
      {/* cellule blanche */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[1.35, 0.34, 3.1]} />
        <meshStandardMaterial color="#e8ecf4" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* museau bleu */}
      <mesh position={[0, 0.4, 1.95]}>
        <boxGeometry args={[0.66, 0.26, 1.1]} />
        <meshStandardMaterial color="#0055a4" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* capot moteur rouge */}
      <mesh position={[0, 0.52, -1.15]}>
        <boxGeometry args={[1.1, 0.36, 1.0]} />
        <meshStandardMaterial color="#ef4135" roughness={0.4} />
      </mesh>
      {/* aileron avant (bleu) */}
      <mesh position={[0, 0.18, 2.45]}>
        <boxGeometry args={[2.0, 0.07, 0.55]} />
        <meshStandardMaterial color="#0055a4" />
      </mesh>
      {/* aileron arrière (rouge) sur ses dérives */}
      <mesh position={[0, 1.05, -1.95]}>
        <boxGeometry args={[1.85, 0.08, 0.5]} />
        <meshStandardMaterial color="#ef4135" />
      </mesh>
      <mesh position={[-0.8, 0.75, -1.95]}>
        <boxGeometry args={[0.06, 0.55, 0.45]} />
        <meshStandardMaterial color="#ef4135" />
      </mesh>
      <mesh position={[0.8, 0.75, -1.95]}>
        <boxGeometry args={[0.06, 0.55, 0.45]} />
        <meshStandardMaterial color="#ef4135" />
      </mesh>
      {/* cockpit + casque bleu */}
      <mesh position={[0, 0.62, -0.15]} scale={[1, 0.55, 1.4]}>
        <sphereGeometry args={[0.42, 16, 12]} />
        <meshStandardMaterial color="#141821" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.78, -0.2]}>
        <sphereGeometry args={[0.2, 16, 12]} />
        <meshStandardMaterial color="#0055a4" emissive="#0055a4" emissiveIntensity={0.35} />
      </mesh>
      {/* lueur néon sous la voiture, très portfolio */}
      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.2, 4.4]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.16} />
      </mesh>
      {/* roues : avant directrices */}
      <group ref={frontLeft} position={[-0.85, 0.4, 1.45]}>
        <mesh ref={(m) => m && wheels.current.push(m)} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.4, 0.4, 0.42, 18]} />
          <meshStandardMaterial color="#0c0c0e" roughness={0.9} />
        </mesh>
      </group>
      <group ref={frontRight} position={[0.85, 0.4, 1.45]}>
        <mesh ref={(m) => m && wheels.current.push(m)} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.4, 0.4, 0.42, 18]} />
          <meshStandardMaterial color="#0c0c0e" roughness={0.9} />
        </mesh>
      </group>
      <mesh ref={(m) => m && wheels.current.push(m)} position={[-0.9, 0.45, -1.45]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.46, 0.46, 0.5, 18]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.9} />
      </mesh>
      <mesh ref={(m) => m && wheels.current.push(m)} position={[0.9, 0.45, -1.45]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.46, 0.46, 0.5, 18]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.9} />
      </mesh>
    </group>
  )
}

// physique + caméra + chrono : le cœur du jeu
function CarRig({ input, onHud, nearRef, exitTo }) {
  const group = useRef()
  const frontLeft = useRef()
  const frontRight = useRef()
  const wheels = useRef([])
  const sim = useRef({
    angle: 0,
    speed: 0,
    steerVisual: 0,
    prevZ: 1,
    lapStart: performance.now(),
    best: null,
    lastHud: 0,
  })

  // colliders : pieds des panneaux + piliers de l'arche
  const colliders = useMemo(
    () => [
      ...PANELS.map((p) => ({ x: p.x, z: p.z, r: 3 })),
      { x: 24, z: 0, r: 1.2 },
      { x: 36, z: 0, r: 1.2 },
    ],
    []
  )

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const s = sim.current
    const k = input.current
    const g = group.current
    if (!g) return

    // reset au stand
    if (k.reset) {
      k.reset = false
      g.position.set(TRACK_R, 0, 0)
      s.angle = 0
      s.speed = 0
      s.lapStart = performance.now()
    }

    // accélération / freins / frottements
    if (k.up) s.speed += 26 * dt
    if (k.down) s.speed -= 42 * dt
    s.speed *= 1 - (k.brake ? 2.4 : 1.1) * dt
    s.speed = clamp(s.speed, -11, 41)

    // direction (mord avec la vitesse, élargie au frein à main = dérive)
    const steer = (k.left ? -1 : 0) + (k.right ? 1 : 0)
    s.steerVisual += (steer - s.steerVisual) * Math.min(1, 10 * dt)
    const grip = clamp(s.speed / 13, -1.4, 1.4)
    s.angle -= steer * 2.2 * dt * grip * (k.brake ? 1.55 : 1)

    // avance
    const fx = Math.sin(s.angle)
    const fz = Math.cos(s.angle)
    g.position.x += fx * s.speed * dt
    g.position.z += fz * s.speed * dt
    g.rotation.y = s.angle
    // léger roulis en virage
    g.rotation.z = s.steerVisual * clamp(Math.abs(s.speed) / 40, 0, 1) * 0.09

    // roues
    for (const w of wheels.current) w.rotation.x += (s.speed * dt) / 0.42
    if (frontLeft.current) frontLeft.current.rotation.y = -s.steerVisual * 0.45
    if (frontRight.current) frontRight.current.rotation.y = -s.steerVisual * 0.45

    // limites du monde + obstacles
    const len = Math.hypot(g.position.x, g.position.z)
    if (len > 95) {
      g.position.multiplyScalar(95 / len)
      s.speed *= 0.4
    }
    for (const c of colliders) {
      const dx = g.position.x - c.x
      const dz = g.position.z - c.z
      const d = Math.hypot(dx, dz)
      if (d < c.r + 1.1 && d > 0.001) {
        const push = (c.r + 1.1 - d) / d
        g.position.x += dx * push
        g.position.z += dz * push
        s.speed *= 0.45
      }
    }

    // chrono : la ligne damier est à θ = 0 (x > 0, on passe de z<0 à z≥0)
    const now = performance.now()
    if (s.prevZ < 0 && g.position.z >= 0 && g.position.x > 18 && s.speed > 2) {
      const lap = now - s.lapStart
      if (lap > 8000) s.best = s.best === null ? lap : Math.min(s.best, lap)
      s.lapStart = now
    }
    s.prevZ = g.position.z

    // panneau le plus proche → invite "E"
    let near = null
    for (const p of PANELS) {
      if (Math.hypot(g.position.x - p.x, g.position.z - p.z) < 10) {
        near = p
        break
      }
    }
    nearRef.current = near

    // caméra poursuite
    const cam = state.camera
    const target = new THREE.Vector3(
      g.position.x - fx * 8.5,
      4.4 + Math.abs(s.speed) * 0.02,
      g.position.z - fz * 8.5
    )
    cam.position.lerp(target, 1 - Math.exp(-4.5 * dt))
    cam.lookAt(g.position.x + fx * 2, 1.1, g.position.z + fz * 2)

    // télémétrie React ~8 fois/s
    if (now - s.lastHud > 120) {
      s.lastHud = now
      onHud({
        kmh: Math.round(Math.abs(s.speed) * 3.6),
        lap: fmtTime(now - s.lapStart),
        best: s.best !== null ? fmtTime(s.best) : '—',
        near: near?.label ?? null,
      })
    }

    // touche E près d'un panneau → on sort et on file à la section
    if (k.action && near) {
      k.action = false
      exitTo(near.id)
    }
    k.action = false
  })

  return (
    <group ref={group} position={[TRACK_R, 0, 0]}>
      <CarBody frontLeft={frontLeft} frontRight={frontRight} wheels={wheels} />
    </group>
  )
}

// vibreurs instanciés (rouge/blanc) sur les deux bords de piste
function Kerbs() {
  const ref = useRef()
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    const red = new THREE.Color('#ef4135')
    const white = new THREE.Color('#f2f4f8')
    let i = 0
    for (const r of [24.4, 35.6]) {
      for (let n = 0; n < 56; n++) {
        const theta = (n / 56) * Math.PI * 2
        dummy.position.set(r * Math.cos(theta), 0.06, r * Math.sin(theta))
        dummy.rotation.set(0, -(theta + Math.PI / 2), 0)
        dummy.updateMatrix()
        ref.current.setMatrixAt(i, dummy.matrix)
        ref.current.setColorAt(i, n % 2 ? red : white)
        i++
      }
    }
    ref.current.instanceMatrix.needsUpdate = true
    ref.current.instanceColor.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[null, null, 112]}>
      <boxGeometry args={[2.4, 0.14, 1.0]} />
      <meshStandardMaterial roughness={0.6} />
    </instancedMesh>
  )
}

function World() {
  const checker = useMemo(() => {
    const t = makeChecker(12, 3)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    return t
  }, [])
  const banner = useMemo(() => makeBanner(), [])
  const labels = useMemo(() => PANELS.map((p) => makeLabel(p.label)), [])

  return (
    <>
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#05060f', 50, 165]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[35, 40, -20]} intensity={0.9} color="#cdd6ff" />
      <pointLight position={[-45, 16, -30]} intensity={900} color="#7c3aed" />
      <pointLight position={[50, 14, 40]} intensity={800} color="#22d3ee" />

      {/* sol + grille néon */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.05}>
        <circleGeometry args={[130, 48]} />
        <meshStandardMaterial color="#070912" roughness={1} />
      </mesh>
      <gridHelper args={[240, 70, '#4433aa', '#141a33']} position-y={0.01} />

      {/* asphalte de la piste */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <ringGeometry args={[25, 35, 96]} />
        <meshStandardMaterial color="#141726" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <Kerbs />

      {/* ligne de départ damier + arche */}
      <mesh rotation-x={-Math.PI / 2} position={[30, 0.04, 0]} rotation-z={0}>
        <planeGeometry args={[10, 2.2]} />
        <meshBasicMaterial map={checker} />
      </mesh>
      <mesh position={[24, 2.6, 0]}>
        <boxGeometry args={[0.6, 5.2, 0.6]} />
        <meshStandardMaterial color="#1c2033" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[36, 2.6, 0]}>
        <boxGeometry args={[0.6, 5.2, 0.6]} />
        <meshStandardMaterial color="#1c2033" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[30, 5.8, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[13, 2]} />
        <meshBasicMaterial map={banner} side={THREE.DoubleSide} />
      </mesh>

      {/* panneaux de navigation vers les sections */}
      {PANELS.map((p, i) => {
        const rotY = Math.atan2(-p.x, -p.z)
        return (
          <group key={p.id} position={[p.x, 0, p.z]} rotation-y={rotY}>
            <mesh position={[-2.6, 1.6, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 3.2, 10]} />
              <meshStandardMaterial color="#1c2033" />
            </mesh>
            <mesh position={[2.6, 1.6, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 3.2, 10]} />
              <meshStandardMaterial color="#1c2033" />
            </mesh>
            <mesh position={[0, 3.6, 0]}>
              <planeGeometry args={[7, 3.06]} />
              <meshBasicMaterial map={labels[i]} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      })}
    </>
  )
}

export default function Circuit3D({ onClose }) {
  const input = useRef({ up: false, down: false, left: false, right: false, brake: false, action: false, reset: false })
  const nearRef = useRef(null)
  const [hud, setHud] = useState({ kmh: 0, lap: '0:00.0', best: '—', near: null })

  const exitTo = (id) => {
    onClose()
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const map = {
      ArrowUp: 'up', z: 'up', w: 'up',
      ArrowDown: 'down', s: 'down',
      ArrowLeft: 'left', q: 'left', a: 'left',
      ArrowRight: 'right', d: 'right',
      ' ': 'brake',
    }
    const onKey = (down) => (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (down && e.key === 'Escape') return onClose()
      if (down && e.key.toLowerCase() === 'e') input.current.action = true
      if (down && e.key.toLowerCase() === 'r') input.current.reset = true
      const dir = map[e.key.length === 1 ? e.key.toLowerCase() : e.key]
      if (dir) {
        input.current[dir] = down
        e.preventDefault()
      }
    }
    const kd = onKey(true)
    const ku = onKey(false)
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[85] bg-ink">
      <Canvas dpr={[1, 1.75]} camera={{ fov: 62, position: [TRACK_R, 4.5, -9], near: 0.1, far: 400 }}>
        <World />
        <CarRig input={input} onHud={setHud} nearRef={nearRef} exitTo={exitTo} />
      </Canvas>

      {/* HUD télémétrie */}
      <div className="absolute top-4 left-4 rounded-2xl border border-line bg-ink/85 px-4 py-3 font-mono text-xs text-gray-300 backdrop-blur">
        <p className="mb-1 tracking-[0.25em] text-f1">🏁 CIRCUIT 3D — LOÏS GP 🇫🇷</p>
        <p>
          <span className="text-gray-500">VITESSE</span>{' '}
          <span className="text-lg font-bold text-white">{hud.kmh}</span> km/h
        </p>
        <p>
          <span className="text-gray-500">TOUR</span> <span className="text-cyan">{hud.lap}</span>
          <span className="ml-3 text-gray-500">MEILLEUR</span>{' '}
          <span className="text-[#b455ff]">{hud.best}</span>
        </p>
        <p className="mt-2 text-[10px] text-gray-500">↑↓←→ / ZQSD conduire · Espace dérive · R stand · Échap quitter</p>
        <p className="text-[10px] text-gray-500">Approche un panneau et appuie sur E pour ouvrir la section</p>
      </div>

      {/* invite panneau */}
      {hud.near && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-2xl border border-cyan/60 bg-ink/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur">
          <kbd className="mr-2 rounded border border-line bg-panel px-1.5 py-0.5 font-mono text-xs text-cyan">E</kbd>
          Ouvrir la section {hud.near}
        </div>
      )}

      <button
        onClick={onClose}
        aria-label="Quitter le circuit 3D"
        className="absolute top-4 right-4 cursor-pointer rounded-xl border border-line bg-ink/85 p-2 text-gray-400 backdrop-blur transition-colors hover:border-f1/60 hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  )
}
