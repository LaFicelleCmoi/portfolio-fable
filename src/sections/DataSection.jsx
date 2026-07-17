import { useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import DonutChart from '../components/DonutChart.jsx'
import StatRing from '../components/StatRing.jsx'
import ShinyText from '../components/ShinyText.jsx'
import useGithubRepos from '../hooks/useGithubRepos.js'
import { PROJECT_DETAILS } from '../data/projectDetails.js'
import { useLang } from '../i18n.jsx'

// Palette du donut VALIDÉE (script dataviz : bande de luminosité, chroma,
// séparation daltonisme ΔE 74, contraste ≥ 3:1 sur fond sombre).
// Teintes d'identité des langages, assombries pour rester dans la bande.
const CHART_COLORS = {
  JavaScript: '#a68c08',
  Python: '#3776ab',
  HTML: '#e34c26',
  TypeScript: '#3178c6',
  Java: '#d16600',
  other: '#8a63f2',
}

const STRINGS = {
  fr: {
    kicker: 'Data',
    title: 'La data du paddock',
    subtitle: 'Tout est calculé en direct depuis mes dépôts GitHub — rien de saisi à la main, comme une vraie télémétrie.',
    live: 'Données live — elles bougent quand je code.',
    donutTitle: 'Langages de mes dépôts',
    repos: 'dépôts',
    other: 'Autres',
    donutAria: (n) => `Répartition des langages sur ${n} dépôts GitHub`,
    rings: [
      { key: 'active', label: 'Actifs ce mois-ci', sub: (a, b) => `${a}/${b} dépôts` },
      { key: 'demo', label: 'Démos en ligne', sub: (a, b) => `${a}/${b} dépôts` },
      { key: 'doc', label: 'Fiches rédigées', sub: (a, b) => `${a}/${b} dépôts` },
    ],
  },
  en: {
    kicker: 'Data',
    title: 'Paddock data',
    subtitle: 'Everything is computed live from my GitHub repositories — nothing typed by hand, like real telemetry.',
    live: 'Live data — it moves when I code.',
    donutTitle: 'Languages across my repos',
    repos: 'repos',
    other: 'Other',
    donutAria: (n) => `Language distribution across ${n} GitHub repositories`,
    rings: [
      { key: 'active', label: 'Active this month', sub: (a, b) => `${a}/${b} repos` },
      { key: 'demo', label: 'Live demos', sub: (a, b) => `${a}/${b} repos` },
      { key: 'doc', label: 'Documented', sub: (a, b) => `${a}/${b} repos` },
    ],
  },
}

const RING_COLORS = { active: '#22d3ee', demo: '#b455ff', doc: '#f472b6' }

export default function DataSection() {
  const { lang } = useLang()
  const L = STRINGS[lang]
  const { repos, loading, error } = useGithubRepos()

  const stats = useMemo(() => {
    if (!repos.length) return null
    // répartition des langages : top 5 + Autres, ordre décroissant fixe
    const counts = {}
    for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const top = sorted.slice(0, 5)
    const rest = sorted.slice(5).reduce((s, [, n]) => s + n, 0)
    const donut = top.map(([label, value]) => ({
      label,
      value,
      color: CHART_COLORS[label] ?? CHART_COLORS.other,
    }))
    if (rest > 0) donut.push({ label: L.other, value: rest, color: CHART_COLORS.other })

    const now = Date.now()
    const active = repos.filter((r) => now - new Date(r.updatedAt).getTime() < 30 * 24 * 3.6e6).length
    const demo = repos.filter((r) => r.homepage).length
    const doc = repos.filter((r) => PROJECT_DETAILS[r.name]).length
    return { donut, total: repos.length, active, demo, doc }
  }, [repos, L.other])

  if (loading || error || !stats) return null

  const ringValues = { active: stats.active, demo: stats.demo, doc: stats.doc }

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="05" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      <ScrollReveal>
        <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <RefreshCw size={14} className="text-cyan" />
          <ShinyText>{L.live}</ShinyText>
        </p>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* donut des langages */}
        <ScrollReveal direction="right" className="lg:col-span-3">
          <SpotlightCard className="h-full p-7">
            <h3 className="mb-6 text-sm font-semibold tracking-wide text-gray-300 uppercase">
              {L.donutTitle}
            </h3>
            <DonutChart
              data={stats.donut}
              centerLabel={stats.total}
              centerSub={L.repos}
              ariaLabel={L.donutAria(stats.total)}
            />
          </SpotlightCard>
        </ScrollReveal>

        {/* jauges : des pourcentages réels */}
        <ScrollReveal direction="left" delay={0.1} className="lg:col-span-2">
          <SpotlightCard className="flex h-full items-center justify-around gap-4 p-7 max-lg:flex-row lg:flex-col" color="rgba(34, 211, 238, 0.16)">
            {L.rings.map((ring) => (
              <StatRing
                key={ring.key}
                pct={(ringValues[ring.key] / stats.total) * 100}
                label={ring.label}
                sub={ring.sub(ringValues[ring.key], stats.total)}
                color={RING_COLORS[ring.key]}
              />
            ))}
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
