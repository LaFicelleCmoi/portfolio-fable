import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ExternalLink, Github, RefreshCw, Trophy, MousePointerClick } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'
import Loader from '../components/Loader.jsx'
import ShinyText from '../components/ShinyText.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import useGithubRepos from '../hooks/useGithubRepos.js'
import {
  PROJECT_DETAILS, PODIUM, PODIUM_STYLE, podiumRank, categoryOf, CATEGORY_ICONS,
} from '../data/projectDetails.js'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#e76f00',
  HTML: '#e34c26',
  Groovy: '#4298b8',
}

function ProjectCard({ repo, index, onOpen }) {
  const color = LANG_COLORS[repo.language] ?? '#a78bfa'
  const podium = PODIUM_STYLE[PODIUM[repo.name]]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
    >
      <TiltCard className="h-full">
        <div
          onClick={() => onOpen(repo)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(repo)}
          role="button"
          tabIndex={0}
          aria-label={`Ouvrir la fiche du projet ${repo.name}`}
          className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="flex items-center gap-2 font-semibold text-white transition-colors group-hover:text-cyan">
              {podium && (
                <span
                  className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
                  style={{ color: podium.color, background: `${podium.color}1f`, border: `1px solid ${podium.color}55` }}
                  title={`Sur le podium de mes projets — ${podium.label}`}
                >
                  <Trophy size={11} /> {podium.label}
                </span>
              )}
              {repo.name}
            </h3>
            {repo.stars > 0 && (
              <span className="flex shrink-0 items-center gap-1 text-xs text-yellow-400">
                <Star size={13} fill="currentColor" /> {repo.stars}
              </span>
            )}
          </div>
          <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-400">
            {PROJECT_DETAILS[repo.name]?.tagline ?? repo.description ?? 'Projet personnel — voir le code sur GitHub.'}
          </p>
          <div className="flex items-center justify-between">
            {repo.language ? (
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                {repo.language}
              </span>
            ) : <span />}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
                <MousePointerClick size={12} /> Voir la fiche
              </span>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Démo de ${repo.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-cyan"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Code source de ${repo.name}`}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-neon"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGithubRepos()
  const [category, setCategory] = useState('Tous')
  const [language, setLanguage] = useState('Tous')
  const [selected, setSelected] = useState(null)

  const categories = useMemo(
    () => ['Tous', ...new Set(repos.map(categoryOf))],
    [repos]
  )
  const languages = useMemo(
    () => ['Tous', ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  )
  const filtered = repos
    .filter(
      (r) =>
        (category === 'Tous' || categoryOf(r) === category) &&
        (language === 'Tous' || r.language === language)
    )
    .sort((a, b) => podiumRank(a) - podiumRank(b))

  return (
    <section id="projets" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="04" kicker="Projets" title="Le classement" />
      <ScrollReveal>
        <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <RefreshCw size={14} className="text-cyan" />
          <ShinyText>Synchronisé en direct avec mon GitHub — cliquez sur un projet pour sa fiche.</ShinyText>
        </p>
      </ScrollReveal>

      {/* filtres : catégories (projets similaires regroupés) puis langages */}
      {!loading && !error && (
        <ScrollReveal className="mb-10 space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`btn-uiverse relative cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors [--glow:var(--color-f1)] ${
                  category === cat
                    ? 'border-transparent bg-gradient-to-r from-f1 to-orange-600 text-white'
                    : 'border-line bg-panel/60 text-gray-400 hover:text-white'
                }`}
              >
                {CATEGORY_ICONS[cat] ?? '📦'} {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`btn-uiverse relative cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
                  language === lang
                    ? 'border-transparent bg-gradient-to-r from-neon to-cyan text-white'
                    : 'border-line bg-panel/60 text-gray-500 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {loading && <Loader />}
      {error && (
        <p className="text-center text-sm text-gray-500">
          Impossible de charger les projets ({error}) —{' '}
          <a href="https://github.com/LaFicelleCmoi?tab=repositories" target="_blank" rel="noreferrer" className="text-cyan underline">
            voir directement sur GitHub
          </a>
        </p>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((repo, i) => (
            <ProjectCard key={repo.name} repo={repo} index={i} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          🏎️ Tout droit dans le mur : aucun projet ne combine ces deux filtres. Essaie une autre combinaison !
        </p>
      )}

      <ProjectModal repo={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
