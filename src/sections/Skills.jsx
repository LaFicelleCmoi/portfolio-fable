import { motion } from 'framer-motion'
import { Code2, Server, Brain, Wrench, Timer } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'

// Auto-évaluation : niveau + preuves tirées de mes projets (exigence du sujet portfolio)
const SKILL_GROUPS = [
  {
    icon: Code2,
    title: 'Front-end',
    color: 'from-neon to-pink',
    skills: [
      { name: 'JavaScript / React', level: 80, proof: 'f1-2026, Marioparty, easyjob' },
      { name: 'HTML / CSS', level: 85, proof: 'got, T-ENT-500, portfolios' },
      { name: 'TypeScript', level: 60, proof: 'RTC-Project-Bureau, RTC-Projet' },
    ],
  },
  {
    icon: Server,
    title: 'Back-end',
    color: 'from-cyan to-neon',
    skills: [
      { name: 'Node.js', level: 70, proof: 'BERNSTEIN, breinstein, t-dev' },
      { name: 'Python', level: 75, proof: 'Alice, qr_app, Pendu' },
      { name: 'Java', level: 65, proof: 'Jeu-2D, F1-Retro-Game' },
    ],
  },
  {
    icon: Brain,
    title: 'IA & Data',
    color: 'from-pink to-cyan',
    skills: [
      { name: 'Machine Learning', level: 55, proof: 'T-AIA-600 (Alice au pays des merveilles)' },
      { name: 'Traitement de données', level: 60, proof: 'Alice, Smart-Fridge' },
    ],
  },
  {
    icon: Wrench,
    title: 'DevOps & Outils',
    color: 'from-neon to-cyan',
    skills: [
      { name: 'Git / GitHub', level: 85, proof: '30+ dépôts publics' },
      { name: 'Docker', level: 65, proof: 'Docker, t-dev' },
      { name: 'CI/CD (Jenkins)', level: 55, proof: 'Jenkins' },
    ],
  },
]

// En F1, le violet signale le meilleur temps : la compétence la plus
// forte de chaque groupe passe en "secteur violet".
function SkillBar({ name, level, proof, best }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="flex items-center gap-2">
          {best && (
            <span className="flex items-center gap-1 rounded-full bg-[#b455ff]/15 px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#b455ff]">
              <Timer size={10} /> MEILLEUR SECTEUR
            </span>
          )}
          <span className="font-mono text-xs text-gray-500">{level}%</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          className={`h-full rounded-full ${
            best
              ? 'bg-gradient-to-r from-[#7a2fd6] to-[#b455ff] shadow-[0_0_10px_rgba(180,85,255,0.7)]'
              : 'bg-gradient-to-r from-neon to-cyan'
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Preuves : <span className="text-gray-400">{proof}</span>
      </p>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="03" kicker="Compétences" title="Ma télémétrie">
        Auto-évaluation honnête : chaque compétence est reliée aux projets qui la prouvent, et le
        secteur violet signale mon meilleur temps — comme sur un écran de chrono F1. Les pourcentages
        reflètent ma progression, pas une perfection.
      </SectionHeader>

      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, gi) => (
          <ScrollReveal key={group.title} delay={gi * 0.08}>
            <TiltCard className="h-full">
              <div className="h-full rounded-3xl border border-line bg-panel/70 p-7 backdrop-blur transition-colors hover:border-neon/50">
                <div className="mb-6 flex items-center gap-3">
                  <span className={`rounded-xl bg-gradient-to-r ${group.color} p-2.5`}>
                    <group.icon size={19} className="text-white" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                </div>
                <div className="space-y-5">
                  {group.skills.map((s) => (
                    <SkillBar
                      key={s.name}
                      {...s}
                      best={s.level === Math.max(...group.skills.map((x) => x.level))}
                    />
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
