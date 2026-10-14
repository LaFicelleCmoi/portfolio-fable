import { motion } from 'framer-motion'
import { Code2, Server, Brain, Wrench, Timer } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useLang } from '../i18n.jsx'

// Auto-évaluation : niveau + preuves tirées de mes projets (exigence du sujet portfolio)
const SKILL_GROUPS = [
  {
    icon: Code2,
    fr: 'Front-end',
    en: 'Front-end',
    skills: [
      { name: 'JavaScript / React', level: 80, proof: 'f1-2026, Marioparty, easyjob' },
      { name: 'HTML / CSS', level: 85, proof: 'got, T-ENT-500, portfolios' },
      { name: 'TypeScript', level: 60, proof: 'RTC-Project-Bureau, RTC-Projet' },
    ],
  },
  {
    icon: Server,
    fr: 'Back-end',
    en: 'Back-end',
    skills: [
      { name: 'Node.js', level: 70, proof: 'BERNSTEIN, breinstein, t-dev' },
      { name: 'Python', level: 75, proof: 'Alice, qr_app, Pendu' },
      { name: 'Java', level: 65, proof: 'Jeu-2D, F1-Retro-Game' },
    ],
  },
  {
    icon: Brain,
    fr: 'IA & Data',
    en: 'AI & Data',
    skills: [
      { name: 'Machine Learning', level: 55, proof: 'T-AIA-600 (Alice au pays des merveilles)' },
      { name: { fr: 'Traitement de données', en: 'Data processing' }, level: 60, proof: 'Alice, Smart-Fridge' },
    ],
  },
  {
    icon: Wrench,
    fr: 'DevOps & Outils',
    en: 'DevOps & Tools',
    skills: [
      { name: 'Git / GitHub', level: 85, proof: { fr: '30+ dépôts publics', en: '30+ public repos' } },
      { name: 'Docker', level: 65, proof: 'Docker, t-dev' },
      { name: 'CI/CD (Jenkins)', level: 55, proof: 'Jenkins' },
    ],
  },
]

const STRINGS = {
  fr: {
    kicker: 'Compétences',
    title: 'Ma télémétrie',
    subtitle:
      "Auto-évaluation honnête : chaque compétence est reliée aux projets qui la prouvent, et le secteur violet signale mon meilleur temps — comme sur un écran de chrono F1. Les pourcentages reflètent ma progression, pas une perfection.",
    best: 'MEILLEUR SECTEUR',
    proof: 'Preuves :',
  },
  en: {
    kicker: 'Skills',
    title: 'My telemetry',
    subtitle:
      'An honest self-assessment: every skill is tied to the projects that prove it, and the purple sector marks my best time — just like an F1 timing screen. The percentages reflect my progress, not perfection.',
    best: 'BEST SECTOR',
    proof: 'Proof:',
  },
}

const pick = (v, lang) => (typeof v === 'object' && v !== null && !Array.isArray(v) ? v[lang] : v)

// En F1, le violet signale le meilleur temps : la compétence la plus
// forte de chaque groupe passe en "secteur violet".
function SkillBar({ name, level, proof, best, L, lang }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-gray-200">{pick(name, lang)}</span>
        <span className="flex items-center gap-2">
          {best && (
            <span className="flex items-center gap-1 rounded-full bg-f1/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent">
              <Timer size={10} /> {L.best}
            </span>
          )}
          <span className="font-mono text-xs text-gray-500">{level}%</span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-line">
        <motion.div
          className={`h-full rounded-full ${best ? 'bg-f1' : 'bg-gray-400'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        {L.proof} <span className="text-gray-400">{pick(proof, lang)}</span>
      </p>
    </div>
  )
}

export default function Skills() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="03" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, gi) => (
          <ScrollReveal key={group.fr} delay={gi * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-panel p-7">
                <div className="mb-6 flex items-center gap-3">
                  <group.icon size={18} strokeWidth={1.75} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-white">{group[lang]}</h3>
                </div>
                <div className="space-y-5">
                  {group.skills.map((s) => (
                    <SkillBar
                      key={pick(s.name, 'fr')}
                      {...s}
                      L={L}
                      lang={lang}
                      best={s.level === Math.max(...group.skills.map((x) => x.level))}
                    />
                  ))}
                </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
