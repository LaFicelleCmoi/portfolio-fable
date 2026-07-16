import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ExternalLink, Github, RefreshCw } from 'lucide-react'
import GradientText from '../components/GradientText.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import Loader from '../components/Loader.jsx'
import ShinyText from '../components/ShinyText.jsx'
import useGithubRepos from '../hooks/useGithubRepos.js'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#e76f00',
  HTML: '#e34c26',
  Groovy: '#4298b8',
}

// Regroupe les projets qui se ressemblent sous une même catégorie
const CATEGORY_MAP = {
  Marioparty: 'Jeux', Pendu: 'Jeux', 'Jeu-2D': 'Jeux', 'F1-Retro-Game': 'Jeux', 'Auto-Clicker': 'Jeux',
  'f1-2026': 'Web', easyjob: 'Web', got: 'Web', 'T-ENT-500': 'Web', 'Site-Web': 'Web',
  'f1-portfolio': 'Web', TEPITECH: 'Web', epitech: 'Web', btelgeuse: 'Web',
  Alice: 'IA & Python', 'T-AIA-600---Alice-au-pays-des-merveilles': 'IA & Python',
  qr_app: 'IA & Python', 'Smart-Fridge': 'IA & Python',
  'RTC-Project-Bureau': 'Temps réel', 'RTC-Projet': 'Temps réel',
  Docker: 'DevOps', Jenkins: 'DevOps', BERNSTEIN: 'DevOps', breinstein: 'DevOps', 't-dev': 'DevOps',
}
const CATEGORY_ICONS = {
  'Tous': '🏁', 'Jeux': '🎮', 'Web': '🌐', 'IA & Python': '🧠', 'Temps réel': '⚡', 'DevOps': '🐳', 'Autres': '📦',
}
const categoryOf = (repo) => CATEGORY_MAP[repo.name] ?? 'Autres'

// Mes projets phares avec une vraie description (les autres gardent celle de GitHub)
const HIGHLIGHTS = {
  'f1-2026': 'App web autour de la saison F1 2026 : classements, écuries et stats en React.',
  'Marioparty': 'Jeu multijoueur inspiré de Mario Party, mini-jeux et plateau en JavaScript.',
  'Alice': "Projet IA : traitement du langage et prédiction autour d'Alice au pays des merveilles.",
  'Jeu-2D': 'Hub de jeu 2D en Java réalisé en 3 semaines : moteur, sprites et collisions.',
  'qr_app': 'Générateur de QR codes en Python, simple et efficace.',
  'RTC-Project-Bureau': 'Application temps réel en TypeScript (WebSocket / RTC).',
}

function ProjectCard({ repo, index }) {
  const color = LANG_COLORS[repo.language] ?? '#a78bfa'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
    >
      <TiltCard className="h-full">
        <div className="group flex h-full flex-col rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white transition-colors group-hover:text-cyan">
              {repo.name}
            </h3>
            {repo.stars > 0 && (
              <span className="flex shrink-0 items-center gap-1 text-xs text-yellow-400">
                <Star size={13} fill="currentColor" /> {repo.stars}
              </span>
            )}
          </div>
          <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-400">
            {HIGHLIGHTS[repo.name] ?? repo.description ?? 'Projet personnel — voir le code sur GitHub.'}
          </p>
          <div className="flex items-center justify-between">
            {repo.language ? (
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                {repo.language}
              </span>
            ) : <span />}
            <div className="flex items-center gap-3">
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noreferrer" aria-label={`Démo de ${repo.name}`} className="text-gray-400 hover:text-cyan">
                  <ExternalLink size={16} />
                </a>
              )}
              <a href={repo.url} target="_blank" rel="noreferrer" aria-label={`Code source de ${repo.name}`} className="text-gray-400 hover:text-neon">
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

  const categories = useMemo(
    () => ['Tous', ...new Set(repos.map(categoryOf))],
    [repos]
  )
  const languages = useMemo(
    () => ['Tous', ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  )
  const filtered = repos.filter(
    (r) =>
      (category === 'Tous' || categoryOf(r) === category) &&
      (language === 'Tous' || r.language === language)
  )

  return (
    <section id="projets" className="relative mx-auto max-w-6xl px-6 py-28">
      <ScrollReveal>
        <h2 className="mb-2 text-center text-sm uppercase tracking-[0.35em] text-cyan">Projets</h2>
        <p className="mb-4 text-center text-4xl font-bold">
          <GradientText>Mes réalisations</GradientText>
        </p>
        <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <RefreshCw size={14} className="text-cyan" />
          <ShinyText>Synchronisé en direct avec mon GitHub — toujours à jour.</ShinyText>
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
            <ProjectCard key={repo.name} repo={repo} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          🏎️ Tout droit dans le mur : aucun projet ne combine ces deux filtres. Essaie une autre combinaison !
        </p>
      )}
    </section>
  )
}
