import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Github, ExternalLink, Clock, Trophy } from 'lucide-react'
import GlowButton from './GlowButton.jsx'
import { PROJECT_DETAILS, PODIUM_STYLE, categoryOf, CATEGORY_ICONS } from '../data/projectDetails.js'

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  Java: '#e76f00', HTML: '#e34c26', Groovy: '#4298b8',
}

// Fiche projet détaillée, ouverte au clic sur une carte.
// `rank` (1-3) : position sur le podium de la grille, si le projet y est.
export default function ProjectModal({ repo, rank, onClose }) {
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

  const details = repo ? PROJECT_DETAILS[repo.name] : null
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
          aria-label={`Fiche du projet ${repo.name}`}
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
              aria-label="Fermer la fiche"
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
                  {CATEGORY_ICONS[category]} {category}
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
                  Mis à jour le{' '}
                  {new Date(repo.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* description détaillée */}
              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                {details?.details ?? repo.description ?? 'Projet personnel — le code parle de lui-même, il est sur GitHub.'}
              </p>

              {/* technologies */}
              {details?.tech && (
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-mono text-[10px] tracking-widest text-gray-500">STACK</span>
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
                  <Github size={16} /> Voir le code
                </GlowButton>
                {repo.homepage && (
                  <GlowButton href={repo.homepage} target="_blank" rel="noreferrer" variant="ghost">
                    <ExternalLink size={16} /> Voir la démo
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
