import { Github, Linkedin, Mail, ArrowUp, Heart, RefreshCw } from 'lucide-react'
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
    tagline: 'Développeur mobile en alternance chez Unistellar, étudiant à Epitech.',
    nav: 'Navigation',
    social: 'Liaisons',
    backTop: 'Retour au pas de tir',
    made: (heart) => <>Fait avec {heart} — React, Tailwind CSS & Framer Motion.</>,
    sync: 'Projets synchronisés automatiquement depuis GitHub',
  },
  en: {
    tagline: 'Mobile developer apprentice at Unistellar, Epitech student.',
    nav: 'Navigation',
    social: 'The pits',
    backTop: 'Back to the launch pad',
    made: (heart) => <>Made with {heart} — React, Tailwind CSS & Framer Motion.</>,
    sync: 'Projects auto-synced from GitHub',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
        {/* signature */}
        <div>
          <p className="mb-2 text-lg font-semibold text-white">
            Loïs Clerc
          </p>
          <p className="text-sm leading-relaxed text-gray-400">{L.tagline}</p>
        </div>

        {/* liens de sections */}
        <nav aria-label={L.nav}>
          <p className="mb-3 font-mono text-[11px] tracking-[0.15em] text-gray-500">{L.nav.toUpperCase()}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-sm text-gray-400 transition-colors hover:text-accent">
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* réseaux */}
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.15em] text-gray-500">{L.social.toUpperCase()}</p>
          <div className="flex gap-3">
              <a
                href="https://github.com/LaFicelleCmoi"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-gray-400 hover:text-accent"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFs-clerc-a46583386/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-gray-400 hover:text-accent"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:lois.clerc@epitech.eu"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-gray-400 hover:text-accent"
              >
                <Mail size={17} />
              </a>
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
          {L.made(<Heart size={13} className="inline text-f1" fill="currentColor" aria-label="amour" />)}
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <RefreshCw size={12} className="text-accent" /> {L.sync}
        </p>
      </div>
    </footer>
  )
}
