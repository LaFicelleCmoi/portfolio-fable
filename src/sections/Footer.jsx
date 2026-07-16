import GradientText from '../components/GradientText.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-gray-300">
      <p>
        © {new Date().getFullYear()} <GradientText className="font-semibold">Loïs</GradientText> — fait avec React,
        TailwindCSS & Framer Motion.
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Projets synchronisés automatiquement depuis GitHub 🚀 — propulsé à fond, comme en F1 🏁
      </p>
    </footer>
  )
}
