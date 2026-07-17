import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, Code2, FolderGit2, Mail, Languages, Gauge, Joystick } from 'lucide-react'
import Magnetic from './Magnetic.jsx'
import { useLang } from '../i18n.jsx'

const LINKS = [
  { id: 'accueil', icon: Home, fr: 'Accueil', en: 'Home' },
  { id: 'apropos', icon: User, fr: 'À propos', en: 'About' },
  { id: 'experience', icon: Briefcase, fr: 'Alternance', en: 'Apprenticeship' },
  { id: 'competences', icon: Code2, fr: 'Compétences', en: 'Skills' },
  { id: 'projets', icon: FolderGit2, fr: 'Projets', en: 'Projects' },
  { id: 'data', icon: Gauge, fr: 'Data', en: 'Data' },
  { id: 'horspiste', icon: Joystick, fr: 'Hors piste', en: 'Off track' },
  { id: 'contact', icon: Mail, fr: 'Contact', en: 'Contact' },
]

// Navigation "dock" thème F1 : la bulle active est une livrée rouge F1
// avec un damier d'arrivée, et elle "roule" d'un onglet à l'autre 🏎️
export default function Navbar() {
  const [active, setActive] = useState('accueil')
  const { lang, toggle } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 18, delay: 0.3 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}
    >
      <ul className="flex items-center gap-0.5 rounded-2xl border border-line bg-panel/70 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:gap-1">
        {LINKS.map(({ id, icon: Icon, ...labels }) => (
          <li key={id}>
            <Magnetic strength={0.2}>
              <a
                href={`#${id}`}
                aria-label={labels[lang]}
                className={`relative flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm whitespace-nowrap transition-colors sm:px-4 ${
                  active === id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_0_18px_rgba(225,6,0,0.55)]"
                    transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                  >
                    {/* livrée rouge F1 */}
                    <span className="absolute inset-0 bg-gradient-to-r from-f1 via-[#c00500] to-[#7f0300]" />
                    {/* damier de ligne d'arrivée sur le bord droit */}
                    <span className="checkered absolute inset-y-0 right-0 w-2.5 opacity-90" />
                    {/* reflet vitesse */}
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white/15" />
                  </motion.span>
                )}
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10 hidden lg:inline">{labels[lang]}</span>
                {/* petite F1 qui apparaît sur l'onglet actif */}
                {active === id && (
                  <motion.span
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, type: 'spring', damping: 15 }}
                    className="relative z-10 hidden -scale-x-100 text-xs lg:inline"
                    aria-hidden
                  >
                    🏎️
                  </motion.span>
                )}
              </a>
            </Magnetic>
          </li>
        ))}
        {/* bascule de langue */}
        <li className="ml-1 border-l border-line pl-1.5">
          <button
            onClick={toggle}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-400 transition-colors hover:text-white"
          >
            <Languages size={15} />
            <span className="hidden sm:inline">{lang === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </li>
      </ul>
    </motion.nav>
  )
}
