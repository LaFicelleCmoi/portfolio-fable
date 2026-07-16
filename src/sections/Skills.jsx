import { motion } from 'framer-motion'
import { Code2, Server, Brain, Wrench } from 'lucide-react'
import GradientText from '../components/GradientText.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
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

function SkillBar({ name, level, proof }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon to-cyan"
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
    <section id="competences" className="relative mx-auto max-w-6xl px-6 py-28">
      <ScrollReveal>
        <h2 className="mb-2 text-center text-sm uppercase tracking-[0.35em] text-cyan">Compétences</h2>
        <p className="mb-4 text-center text-4xl font-bold">
          <GradientText>Ce que je sais faire</GradientText>
        </p>
        <p className="mx-auto mb-14 max-w-2xl text-center text-sm text-gray-400">
          Auto-évaluation honnête : chaque compétence est reliée aux projets qui la prouvent.
          Les pourcentages reflètent ma progression, pas une perfection — je continue d'apprendre chaque jour.
        </p>
      </ScrollReveal>

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
                    <SkillBar key={s.name} {...s} />
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
