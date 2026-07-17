import { Github, Linkedin, Mail, ArrowUp, Heart, Zap } from 'lucide-react'
import GradientText from '../components/GradientText.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { useLang } from '../i18n.jsx'

const LINKS = [
  { id: 'apropos', fr: 'À propos', en: 'About' },
  { id: 'experience', fr: 'Alternance', en: 'Apprenticeship' },
  { id: 'competences', fr: 'Compétences', en: 'Skills' },
  { id: 'projets', fr: 'Projets', en: 'Projects' },
  { id: 'horspiste', fr: 'Hors piste', en: 'Off track' },
  { id: 'contact', fr: 'Contact', en: 'Contact' },
]

const STRINGS = {
  fr: {
    tagline: 'Développeur full-stack en apprentissage chez EZdrive — et pilote de ce portfolio.',
    nav: 'Le circuit',
    social: 'Les stands',
    backTop: 'Retour à la grille de départ',
    made: (heart) => <>Fait avec {heart} et beaucoup de ⚡ — React, TailwindCSS & Framer Motion.</>,
    sync: 'Projets synchronisés automatiquement depuis GitHub 🚀 — propulsé à fond, comme en F1 🏁',
  },
  en: {
    tagline: 'Full-stack developer apprenticing at EZdrive — and driver of this portfolio.',
    nav: 'The circuit',
    social: 'The pits',
    backTop: 'Back to the starting grid',
    made: (heart) => <>Made with {heart} and plenty of ⚡ — React, TailwindCSS & Framer Motion.</>,
    sync: 'Projects auto-synced from GitHub 🚀 — flat out, like in F1 🏁',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      {/* bande damier d'arrivée */}
      <div className="checkered h-1.5 w-full opacity-60" />

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
        {/* signature */}
        <div>
          <p className="mb-2 text-2xl font-bold">
            <GradientText>Loïs</GradientText> <span aria-hidden>⚡</span>
          </p>
          <p className="text-sm leading-relaxed text-gray-400">{L.tagline}</p>
        </div>

        {/* liens de sections */}
        <nav aria-label={L.nav}>
          <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-gray-500">{L.nav.toUpperCase()}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm text-gray-400 transition-colors hover:text-cyan">
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* réseaux */}
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-gray-500">{L.social.toUpperCase()}</p>
          <div className="flex gap-3">
            <Magnetic>
              <a
                href="https://github.com/LaFicelleCmoi"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="btn-uiverse flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 hover:text-cyan"
              >
                <Github size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFs-clerc-a46583386/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn-uiverse flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 hover:text-cyan"
              >
                <Linkedin size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:lois.clerc@epitech.eu"
                aria-label="Email"
                className="btn-uiverse flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 hover:text-cyan"
              >
                <Mail size={17} />
              </a>
            </Magnetic>
          </div>
          <a
            href="#accueil"
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-white"
          >
            <ArrowUp size={13} /> {L.backTop}
          </a>
        </div>
      </div>

      <div className="border-t border-line/60 py-5 text-center">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()}{' '}
          {L.made(<Heart size={13} className="inline animate-pulse text-f1" fill="currentColor" aria-label="amour" />)}
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Zap size={12} className="text-cyan" /> {L.sync}
        </p>
      </div>
    </footer>
  )
}
