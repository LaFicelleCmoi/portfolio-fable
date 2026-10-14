import { motion } from 'framer-motion'
import { ArrowDown, FileDown, Github } from 'lucide-react'
import Button from '../components/Button.jsx'
import { useLang } from '../i18n.jsx'

// Pour passer à une vraie photo : dépose-la dans public/ (ex. public/photo.jpg)
// et remplace la valeur ci-dessous par '/photo.jpg'.
const PHOTO = 'https://avatars.githubusercontent.com/u/232385998?v=4'

// Les chiffres clés, présentés comme une ligne de chrono (secteurs S1–S3)
const STATS = [
  { value: '30+', fr: 'projets GitHub', en: 'GitHub projects' },
  { value: '6', fr: 'langages', en: 'languages' },
  { value: '3+', fr: "années d'études", en: 'years of study' },
]

const STRINGS = {
  fr: {
    badge: 'Alternance chez Unistellar · Marseille',
    role: 'Développeur mobile & full-stack',
    tagline: "Étudiant à Epitech, je développe des apps mobiles iOS et Android en alternance chez Unistellar — et, à côté, des projets web, data et IA que je mène de l'idée à la mise en ligne.",
    cv: 'Télécharger mon CV',
    github: 'Mon GitHub',
    scrollAria: 'Descendre vers la section À propos',
    photoAlt: 'Photo de profil de Loïs',
  },
  en: {
    badge: 'Apprentice at Unistellar · Marseille',
    role: 'Mobile & full-stack developer',
    tagline: 'Epitech student building iOS and Android apps as an apprentice at Unistellar — and, on the side, web, data and AI projects I take from idea to production.',
    cv: 'Download my resume',
    github: 'My GitHub',
    scrollAria: 'Scroll down to the About section',
    photoAlt: "Loïs's profile picture",
  },
}

// Apparition en cascade : chaque bloc arrive 80 ms après le précédent
const rise = (i) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section id="accueil" className="relative flex min-h-[100svh] items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20">
        <motion.div {...rise(0)} className="mb-10 flex items-center gap-4">
          <img
            src={PHOTO}
            alt={L.photoAlt}
            className="h-14 w-14 rounded-full border border-line object-cover grayscale-[0.2]"
            width="56"
            height="56"
          />
          <p className="flex items-center gap-2 font-mono text-xs text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-f1" aria-hidden />
            {L.badge}
          </p>
        </motion.div>

        <motion.h1
          {...rise(1)}
          className="text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Loïs Clerc
        </motion.h1>
        <motion.p {...rise(2)} className="mt-3 text-2xl font-medium tracking-tight text-gray-500 sm:text-4xl">
          {L.role}
        </motion.p>

        <motion.p {...rise(3)} className="mt-8 max-w-xl text-[15px] leading-relaxed text-gray-400 sm:text-base">
          {L.tagline}
        </motion.p>

        <motion.div {...rise(4)} className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/cv-lois.pdf" download>
            <FileDown size={16} /> {L.cv}
          </Button>
          <Button href="https://github.com/LaFicelleCmoi" target="_blank" rel="noreferrer" variant="ghost">
            <Github size={16} /> {L.github}
          </Button>
        </motion.div>

        <motion.dl {...rise(5)} className="mt-16 grid max-w-xl grid-cols-3 border-t border-line">
          {STATS.map((s, i) => (
            <div key={s.en} className="pt-4 pr-4">
              <dt className="font-mono text-[11px] text-gray-500">S{i + 1}</dt>
              <dd className="mt-1 text-2xl font-semibold text-white tabular-nums">{s.value}</dd>
              <dd className="text-xs text-gray-500">{s[lang]}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <a
        href="#apropos"
        aria-label={L.scrollAria}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 transition-colors hover:text-white"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
