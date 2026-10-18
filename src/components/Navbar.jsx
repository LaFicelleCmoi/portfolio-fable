import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLang } from '../i18n.jsx'

// `sector` reprend la numérotation des en-têtes de section
const LINKS = [
  { id: 'apropos', sector: '01', fr: 'À propos', en: 'About' },
  { id: 'experience', sector: '02', fr: 'Alternance', en: 'Apprenticeship' },
  { id: 'competences', sector: '03', fr: 'Compétences', en: 'Skills' },
  { id: 'projets', sector: '04', fr: 'Projets', en: 'Projects' },
  { id: 'data', sector: '05', fr: 'Data', en: 'Data' },
  { id: 'horspiste', sector: '06', fr: 'Hors piste', en: 'Off track' },
  { id: 'contact', sector: '07', fr: 'Contact', en: 'Contact' },
]

const SOCIALS = [
  { href: 'https://github.com/LaFicelleCmoi', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/lo%C3%AFs-clerc-a46583386/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:lois.clerc@epitech.eu', icon: Mail, label: 'Email' },
]

const EASE = [0.22, 1, 0.36, 1]

// Menu plein écran du mobile : sections numérotées en grand, arrivée en cascade,
// et une étoile filante qui traverse le bas de l'écran à l'ouverture.
function MobileMenu({ active, lang, toggleLang, onNavigate }) {
  return (
    <motion.div
      id="mobile-menu"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-0 flex flex-col bg-ink px-6 pt-20 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="flex-1 overflow-y-auto">
        <ul>
          {LINKS.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.05, ease: EASE }}
              className="border-b border-line"
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => onNavigate(e, link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`group flex items-baseline gap-4 py-3.5 transition-colors ${
                  active === link.id ? 'text-white' : 'text-gray-500 active:text-white'
                }`}
              >
                <span className={`font-mono text-xs ${active === link.id ? 'text-accent' : 'text-gray-600'}`}>
                  {link.sector}
                </span>
                <span className="text-[2rem] leading-none font-semibold tracking-tight">{link[lang]}</span>
                {active === link.id && <span className="ml-auto h-2 w-2 self-center rounded-full bg-f1" aria-hidden />}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="pt-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-gray-400 active:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          {/* bascule de langue en segments */}
          <div className="flex rounded-lg border border-line p-1 font-mono text-xs" role="group" aria-label="Langue / Language">
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => l !== lang && toggleLang()}
                aria-pressed={lang === l}
                className={`h-9 w-11 cursor-pointer rounded-md uppercase transition-colors ${
                  lang === l ? 'bg-white text-ink' : 'text-gray-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        {/* une étoile filante traverse le bas du menu */}
        <div className="relative mt-6 h-6 overflow-hidden" aria-hidden>
          <div className="absolute inset-x-0 bottom-2 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          <motion.div
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: '420%', opacity: [0, 1, 1, 0] }}
            transition={{ delay: 0.45, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-[7px] left-0 flex w-1/4 items-center"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Barre de navigation : nom à gauche, sections à droite.
// La section visible est soulignée en rouge ; le trait glisse d'un lien à l'autre.
export default function Navbar() {
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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

  // menu mobile : scroll de la page bloqué, Échap pour fermer, retour au bureau = fermeture
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onWide = () => mq.matches && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [menuOpen])

  // on ferme d'abord le menu (le scroll se débloque), puis on file vers la section
  const navigate = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
  }

  const switchLabel = lang === 'fr' ? 'Switch to English' : 'Passer en français'

  return (
    <nav
      aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        menuOpen ? 'border-transparent bg-ink' : scrolled ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="relative z-10 mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#accueil" onClick={() => setMenuOpen(false)} className="relative z-10 text-sm font-semibold tracking-tight text-white">
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
          <li className="ml-2 border-l border-line pl-3 max-md:hidden">
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

        {/* bouton du menu mobile : deux traits qui se croisent en X */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? (lang === 'fr' ? 'Fermer le menu' : 'Close menu') : lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
          className="relative z-10 -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 0, width: 20 } : { rotate: 0, y: -4, width: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute h-[1.5px] rounded-full bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: 0, width: 20 } : { rotate: 0, y: 4, width: 13 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute h-[1.5px] rounded-full bg-white"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu active={active} lang={lang} toggleLang={toggle} onNavigate={navigate} />}
      </AnimatePresence>
    </nav>
  )
}
