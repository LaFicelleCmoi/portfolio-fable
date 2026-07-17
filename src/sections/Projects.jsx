import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import {
  Star, ExternalLink, Github, RefreshCw, Trophy, MousePointerClick, GripVertical, RotateCcw, Hand,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'
import Loader from '../components/Loader.jsx'
import ShinyText from '../components/ShinyText.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import useGithubRepos from '../hooks/useGithubRepos.js'
import {
  PROJECT_DETAILS, PODIUM_STYLE, DEFAULT_ORDER, categoryOf, CATEGORY_ICONS,
} from '../data/projectDetails.js'

const ORDER_KEY = 'project-order'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#e76f00',
  HTML: '#e34c26',
  Groovy: '#4298b8',
}

function ProjectCard({ repo, index, rank, onOpen, draggable, onReorder, registerRef }) {
  const color = LANG_COLORS[repo.language] ?? '#a78bfa'
  const podium = PODIUM_STYLE[rank]
  const controls = useDragControls()
  const dragging = useRef(false)

  return (
    <motion.div
      layout
      ref={(el) => registerRef(repo.name, el)}
      drag={draggable}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragSnapToOrigin
      whileDrag={{ scale: 1.05, zIndex: 60, cursor: 'grabbing' }}
      onDragStart={() => (dragging.current = true)}
      onDragEnd={(e, info) => {
        onReorder(repo, info)
        setTimeout(() => (dragging.current = false), 150)
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className="relative"
    >
      {/* poignée de déplacement (drag & drop) */}
      {draggable && (
        <button
          onPointerDown={(e) => {
            e.preventDefault()
            controls.start(e)
          }}
          aria-label={`Déplacer ${repo.name} dans le classement`}
          title="Glisser pour reclasser"
          className="absolute top-3.5 right-3.5 z-20 cursor-grab touch-none rounded-lg border border-line bg-ink/90 p-1.5 text-gray-500 transition-colors hover:border-f1/60 hover:text-white active:cursor-grabbing"
        >
          <GripVertical size={14} />
        </button>
      )}
      <TiltCard className="h-full">
        <div
          onClick={() => !dragging.current && onOpen(repo)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(repo)}
          role="button"
          tabIndex={0}
          className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        >
          <div className={`mb-3 flex items-start justify-between gap-2 ${draggable ? 'pr-7' : ''}`}>
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
            <div className="flex items-center gap-1">
              <span className="mr-1 flex items-center gap-1 text-[11px] text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
                <MousePointerClick size={12} /> Voir la fiche
              </span>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Démo de ${repo.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg p-2 text-gray-400 hover:text-cyan"
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
                className="rounded-lg p-2 text-gray-400 hover:text-neon"
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
  const [order, setOrder] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ORDER_KEY)) ?? DEFAULT_ORDER
    } catch {
      return DEFAULT_ORDER
    }
  })
  const cardRefs = useRef({})
  const registerRef = (name, el) => {
    cardRefs.current[name] = el
  }

  // ordre d'affichage : les noms mémorisés d'abord, le reste suit l'ordre GitHub
  const ordered = useMemo(() => {
    const pos = new Map(order.map((n, i) => [n, i]))
    return [...repos].sort(
      (a, b) => (pos.get(a.name) ?? order.length) - (pos.get(b.name) ?? order.length)
    )
  }, [repos, order])

  // le podium, c'est la ligne du haut : les 3 premières cartes de la grille
  const rankOf = (repo) => {
    if (!repo) return undefined
    const i = ordered.findIndex((r) => r.name === repo.name)
    return i > -1 && i < 3 ? i + 1 : undefined
  }

  const categories = useMemo(() => ['Tous', ...new Set(repos.map(categoryOf))], [repos])
  const languages = useMemo(
    () => ['Tous', ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  )

  const noFilter = category === 'Tous' && language === 'Tous'
  const draggable = noFilter && !loading && !error && ordered.length > 1
  const filtered = ordered.filter(
    (r) =>
      (category === 'Tous' || categoryOf(r) === category) &&
      (language === 'Tous' || r.language === language)
  )

  // dépose la carte sur une autre → elle prend sa place dans le classement
  const handleReorder = (repo, info) => {
    const x = info.point.x - window.scrollX
    const y = info.point.y - window.scrollY
    const target = Object.entries(cardRefs.current).find(([name, el]) => {
      if (!el || name === repo.name) return false
      const r = el.getBoundingClientRect()
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    })
    if (!target) return
    const names = ordered.map((r) => r.name)
    const from = names.indexOf(repo.name)
    const to = names.indexOf(target[0])
    if (from === -1 || to === -1) return
    names.splice(to, 0, ...names.splice(from, 1))
    setOrder(names)
    localStorage.setItem(ORDER_KEY, JSON.stringify(names))
  }

  const resetOrder = () => {
    setOrder(DEFAULT_ORDER)
    localStorage.removeItem(ORDER_KEY)
  }

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="04" kicker="Projets" title="Le classement" />
      <ScrollReveal>
        <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <RefreshCw size={14} className="text-cyan" />
          <ShinyText>Synchronisé en direct avec mon GitHub — cliquez sur un projet pour sa fiche.</ShinyText>
        </p>
      </ScrollReveal>

      {/* filtres : catégories (projets similaires regroupés) puis langages */}
      {!loading && !error && (
        <ScrollReveal className="mb-6 space-y-3">
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

      {/* mode stands : réorganisation du classement */}
      {draggable && (
        <ScrollReveal className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Hand size={13} className="text-f1" />
            Glissez les cartes avec la poignée — la ligne du haut, c'est le podium (P1, P2, P3).
          </span>
          <button
            onClick={resetOrder}
            className="flex cursor-pointer items-center gap-1 rounded-full border border-line bg-panel/60 px-3 py-1 transition-colors hover:text-white"
          >
            <RotateCcw size={11} /> Ordre par défaut
          </button>
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
            <ProjectCard
              key={repo.name}
              repo={repo}
              index={i}
              rank={rankOf(repo)}
              onOpen={setSelected}
              draggable={draggable}
              onReorder={handleReorder}
              registerRef={registerRef}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          🏎️ Tout droit dans le mur : aucun projet ne combine ces deux filtres. Essaie une autre combinaison !
        </p>
      )}

      <ProjectModal repo={selected} rank={rankOf(selected)} onClose={() => setSelected(null)} />
    </section>
  )
}
