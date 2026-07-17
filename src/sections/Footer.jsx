import GradientText from '../components/GradientText.jsx'
import { useLang } from '../i18n.jsx'

const STRINGS = {
  fr: {
    made: '— fait avec React, TailwindCSS & Framer Motion.',
    sync: 'Projets synchronisés automatiquement depuis GitHub 🚀 — propulsé à fond, comme en F1 🏁',
  },
  en: {
    made: '— built with React, TailwindCSS & Framer Motion.',
    sync: 'Projects auto-synced from GitHub 🚀 — flat out, like in F1 🏁',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const L = STRINGS[lang]
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-gray-300">
      <p>
        © {new Date().getFullYear()} <GradientText className="font-semibold">Loïs</GradientText> {L.made}
      </p>
      <p className="mt-1 text-xs text-gray-400">{L.sync}</p>
    </footer>
  )
}
