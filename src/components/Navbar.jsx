import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'

const LINKS = [
  { id: 'apropos', fr: 'À propos', en: 'About' },
  { id: 'experience', fr: 'Alternance', en: 'Apprenticeship' },
  { id: 'competences', fr: 'Compétences', en: 'Skills' },
  { id: 'projets', fr: 'Projets', en: 'Projects' },
  { id: 'data', fr: 'Data', en: 'Data' },
  { id: 'horspiste', fr: 'Hors piste', en: 'Off track' },
  { id: 'contact', fr: 'Contact', en: 'Contact' },
]

// Barre de navigation : nom à gauche, sections à droite.
// La section visible est soulignée en rouge ; le trait glisse d'un lien à l'autre.
export default function Navbar() {
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    ;['accueil', ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const switchLabel = lang === 'fr' ? 'Switch to English' : 'Passer en français'

  return (
    <nav
      aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#accueil" className="text-sm font-semibold tracking-tight text-white">
          Loïs Clerc
        </a>
        <ul className="flex items-center gap-1 overflow-x-auto text-[13px] [scrollbar-width:none]">
          {LINKS.map((link) => (
            <li key={link.id} className="max-md:hidden">
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative block px-2.5 py-1.5 transition-colors ${
                  active === link.id ? 'text-white' : 'text-gray-500 hover:text-gray-200'
                }`}
              >
                {link[lang]}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2.5 -bottom-[11px] h-px bg-f1"
                    transition={{ type: 'spring', damping: 30, stiffness: 380 }}
                  />
                )}
              </a>
            </li>
          ))}
          <li className="md:hidden">
            <a href="#contact" className="block px-2.5 py-1.5 text-gray-300">
              {lang === 'fr' ? 'Contact' : 'Contact'}
            </a>
          </li>
          <li className="ml-2 border-l border-line pl-3">
            <button
              onClick={toggle}
              aria-label={switchLabel}
              title={switchLabel}
              className="cursor-pointer font-mono text-xs text-gray-500 transition-colors hover:text-white"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
