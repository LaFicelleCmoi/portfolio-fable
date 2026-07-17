import { motion } from 'framer-motion'
import { ArrowDown, FileDown, Github } from 'lucide-react'
import Particles from '../components/Particles.jsx'
import Aurora from '../components/Aurora.jsx'
import SplitText from '../components/SplitText.jsx'
import GradientText from '../components/GradientText.jsx'
import Typewriter from '../components/Typewriter.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Magnetic from '../components/Magnetic.jsx'
import CountUp from '../components/CountUp.jsx'

// chaque stat porte la couleur d'un secteur de chrono F1 (S1 jaune, S2 vert, S3 violet)
// Pour passer à une vraie photo : dépose-la dans public/ (ex. public/photo.jpg)
// et remplace la valeur ci-dessous par '/photo.jpg'.
const PHOTO = 'https://avatars.githubusercontent.com/u/232385998?v=4'

const STATS = [
  { value: 30, suffix: '+', label: 'Projets GitHub', sector: 'S1', color: '#ffd700' },
  { value: 6, suffix: '', label: 'Langages maîtrisés', sector: 'S2', color: '#00d26a' },
  { value: 3, suffix: '+', label: "Années d'études", sector: 'S3', color: '#b455ff' },
]

export default function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Aurora />
      <Particles />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* photo de profil */}
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, delay: 0.15 }}
          className="mx-auto mb-8 w-fit"
        >
          <Magnetic strength={0.25}>
            <div className="animate-pulse-glow rounded-full bg-gradient-to-r from-neon to-cyan p-[3px]">
              <img
                src={PHOTO}
                alt="Photo de profil de Loïs"
                className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
                width="144"
                height="144"
              />
            </div>
          </Magnetic>
        </motion.div>

        {/* badge alternance */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-f1/50 bg-f1/10 px-4 py-1.5 text-xs font-semibold text-orange-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f1 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-f1" />
          </span>
          En apprentissage chez EzDrive ⚡ — Transformation Numérique & Data
        </motion.p>

        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan">Bonjour, moi c'est</p>

        <h1 className="mb-4 text-5xl font-bold sm:text-7xl">
          <SplitText text="Loïs" delay={0.4} />{' '}
          <GradientText>
            <SplitText text="⚡" delay={0.7} />
          </GradientText>
        </h1>

        {/* accroche */}
        <p className="mb-2 text-xl text-gray-300 sm:text-2xl">
          Je transforme des idées en{' '}
          <GradientText className="font-semibold">code qui marche</GradientText>.
        </p>
        <p className="mb-10 h-8 text-lg text-gray-400">
          <Typewriter
            phrases={[
              'Développeur Full-Stack en alternance',
              'React · Python · Java · TypeScript',
              'DevOps : Docker, Kubernetes, CI/CD',
              'Fan de F1 : vite, mais sans bug 🏁',
            ]}
          />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="/cv-lois.pdf" download>
            <FileDown size={17} /> Télécharger mon CV
          </GlowButton>
          <GlowButton href="https://github.com/LaFicelleCmoi" target="_blank" rel="noreferrer" variant="ghost">
            <Github size={17} /> Mon GitHub
          </GlowButton>
        </div>

        {/* stats animées */}
        <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="relative overflow-hidden rounded-2xl border border-line bg-panel/50 p-4 backdrop-blur">
              <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <div className="mb-1 font-mono text-[10px] tracking-widest" style={{ color: s.color }}>{s.sector}</div>
              <div className="text-3xl font-bold text-white">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#apropos"
        aria-label="Descendre vers la section À propos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-cyan"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ArrowDown />
      </motion.a>
    </section>
  )
}
