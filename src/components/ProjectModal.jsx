import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Github, ExternalLink, Clock, Trophy, GraduationCap } from 'lucide-react'
import GlowButton from './GlowButton.jsx'
import { useLang } from '../i18n.jsx'
import { getProjectText, PODIUM_STYLE, categoryOf, CATEGORY_ICONS, CATEGORY_LABELS } from '../data/projectDetails.js'

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  Java: '#e76f00', HTML: '#e34c26', Groovy: '#4298b8',
}

// Label du bouton "démo" adapté au type de projet
const DEMO_LABELS = {
  fr: {
    'Jeux': 'Jouer en ligne',
    'Foot': 'Ouvrir le tracker',
    'Web': "Ouvrir l'app",
    'IA & Python': 'Tester en ligne',
    'Temps réel': "Ouvrir l'app",
    default: 'Essayer en ligne',
  },
  en: {
    'Jeux': 'Play online',
    'Foot': 'Open the tracker',
    'Web': 'Open the app',
    'IA & Python': 'Try it online',
    'Temps réel': 'Open the app',
    default: 'Try it online',
  },
}

const STRINGS = {
  fr: {
    close: 'Fermer la fiche',
    updated: 'Mis à jour le',
    fallback: 'Projet personnel — le code parle de lui-même, il est sur GitHub.',
    debrief: "DEBRIEF — CE QUE J'AI APPRIS",
    stack: 'STACK',
    code: 'Voir le code',
    aria: (name) => `Fiche du projet ${name}`,
    dateLocale: 'fr-FR',
  },
  en: {
    close: 'Close details',
    updated: 'Updated on',
    fallback: 'Personal project — the code speaks for itself, it lives on GitHub.',
    debrief: 'DEBRIEF — WHAT I LEARNED',
    stack: 'STACK',
    code: 'View the code',
    aria: (name) => `${name} project details`,
    dateLocale: 'en-GB',
  },
}

// Fiche projet détaillée, ouverte au clic sur une carte.
// `rank` (1-3) : position sur le podium de la grille, si le projet y est.
export default function ProjectModal({ repo, rank, onClose }) {
  const { lang } = useLang()
  const L = STRINGS[lang]

  useEffect(() => {
    if (!repo) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [repo, onClose])

  const details = repo ? getProjectText(repo.name, lang) : null
  const podium = repo ? PODIUM_STYLE[rank] : null
  const category = repo ? categoryOf(repo) : null
  const langColor = repo ? (LANG_COLORS[repo.language] ?? '#a78bfa') : null

  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={L.aria(repo.name)}
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl shadow-black/60"
          >
            {/* bande damier F1 */}
            <div className="checkered h-2 w-full opacity-80" />

            <button
              onClick={onClose}
              aria-label={L.close}
              className="absolute top-5 right-4 cursor-pointer rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-line hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="max-h-[75vh] overflow-y-auto p-7 sm:p-8">
              {/* en-tête */}
              <div className="mb-1 flex flex-wrap items-center gap-2 pr-8">
                {podium && (
                  <span
                    className="flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
                    style={{ color: podium.color, background: `${podium.color}1f`, border: `1px solid ${podium.color}55` }}
                  >
                    <Trophy size={11} /> {podium.label}
                  </span>
                )}
                <h3 className="text-xl font-bold break-all text-white">{repo.name}</h3>
              </div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="rounded-full border border-line bg-ink/60 px-2.5 py-0.5">
                  {CATEGORY_ICONS[category]} {CATEGORY_LABELS[lang][category] ?? category}
                </span>
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: langColor, boxShadow: `0 0 6px ${langColor}` }} />
                    {repo.language}
                  </span>
                )}
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" /> {repo.stars}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {L.updated}{' '}
                  {new Date(repo.updatedAt).toLocaleDateString(L.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* description détaillée */}
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                {details?.details ?? repo.description ?? L.fallback}
              </p>

              {/* rétrospective : l'analyse des progrès demandée par le sujet */}
              {details?.learned && (
                <div className="mb-6 rounded-2xl border border-neon/30 bg-neon/5 p-4">
                  <p className="mb-1.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neon">
                    <GraduationCap size={13} /> {L.debrief}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">{details.learned}</p>
                </div>
              )}

              {/* technologies */}
              {details?.tech && (
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-mono text-[10px] tracking-widest text-gray-500">{L.stack}</span>
                  {details.tech.map((t) => (
                    <span key={t} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* actions */}
              <div className="flex flex-wrap gap-3">
                <GlowButton href={repo.url} target="_blank" rel="noreferrer">
                  <Github size={16} /> {L.code}
                </GlowButton>
                {repo.homepage && (
                  <GlowButton href={repo.homepage} target="_blank" rel="noreferrer" variant="ghost">
                    <ExternalLink size={16} /> {DEMO_LABELS[lang][category] ?? DEMO_LABELS[lang].default}
                  </GlowButton>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
