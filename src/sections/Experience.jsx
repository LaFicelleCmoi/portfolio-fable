import { motion } from 'framer-motion'
import {
  CalendarClock, Smartphone, Workflow, CloudUpload, Flag, Telescope, GraduationCap,
  ExternalLink, BookOpen, Rocket, Trophy, Boxes, CheckCircle2, Orbit,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Card from '../components/Card.jsx'
import { useLang } from '../i18n.jsx'

// La boîte à outils de bord : chaque techno de l'offre avec son usage réel
const TOOLS = [
  { name: 'Swift · SwiftUI', fr: 'App iOS', en: 'iOS app' },
  { name: 'Kotlin · Jetpack Compose', fr: 'App Android', en: 'Android app' },
  { name: 'BLE & Wi-Fi', fr: 'Dialogue avec les instruments', en: 'Talking to the instruments' },
  { name: 'Firebase', fr: 'Backend & analytics', en: 'Backend & analytics' },
  { name: 'GitLab CI', fr: 'Intégration continue', en: 'Continuous integration' },
  { name: 'XCTest · JUnit', fr: 'Tests unitaires & UI', en: 'Unit & UI tests' },
  { name: 'Git', fr: 'Code & reviews', en: 'Code & reviews' },
  { name: 'Claude Code', fr: 'Dev assisté par IA', en: 'AI-assisted dev' },
]

const STRINGS = {
  fr: {
    kicker: 'Expérience',
    title: 'Ma mission : Unistellar',
    subtitle:
      "En parallèle d'Epitech, je suis développeur mobile iOS & Android en alternance : l'école m'apprend à apprendre, l'entreprise m'apprend le métier. Chaque sprint est une mission, chaque release un lancement — et chez Unistellar, viser les étoiles, c'est littéralement le métier.",
    sector: 'Astronomie grand public — télescopes connectés',
    city: 'Marseille · présentiel',
    badge: 'Développeur Mobile iOS & Android — Alternance',
    pitch:
      "Unistellar conçoit des télescopes connectés (eVscope) et les jumelles à réalité augmentée Envision — trois fois primés au CES — pilotés depuis des applications iOS et Android. J'y développe ces apps aux côtés du développeur mobile senior.",
    website: 'Découvrir Unistellar',
    strategyTitle: 'PLAN DE VOL — MON RYTHME',
    year1: '1ʳᵉ année',
    year1Desc: '4 semaines en entreprise, 2 à l\'école — et le cycle reprend.',
    year2: '2ᵉ année',
    year2Desc: 'Epitech chaque lundi, le reste de la semaine en mission chez Unistellar.',
    weekShort: ['L', 'M', 'M', 'J', 'V'],
    legendCompany: 'Entreprise (Unistellar)',
    legendSchool: 'École (Epitech)',
    missionsTitle: 'MES MISSIONS',
    missions: [
      {
        icon: Smartphone,
        title: 'Nouvelles fonctionnalités',
        text: "Développement de features sur les apps iOS (Swift, SwiftUI) et Android (Kotlin, Jetpack Compose) qui pilotent télescopes et jumelles Envision.",
      },
      {
        icon: Workflow,
        title: 'Qualité & tests',
        text: "Stabilisation sur la diversité des smartphones, tablettes et versions d'OS ; écriture et exécution des tests unitaires, fonctionnels et UI.",
      },
      {
        icon: CloudUpload,
        title: 'Architecture & UX',
        text: "Évolutions d'architecture et d'expérience utilisateur avec le développeur senior, communication BLE / Wi-Fi avec les instruments, Firebase et GitLab CI.",
      },
    ],
    exchangeTitle: "L'ÉCHANGE DE VALEUR",
    learnTitle: "Ce que j'apprends",
    learn: [
      'Le natif sur les deux plateformes : SwiftUI & Jetpack Compose',
      'Faire dialoguer une app et un instrument en BLE / Wi-Fi',
      'La rigueur qualité : tests unitaires, fonctionnels et UI',
      "Un produit hardware + software utilisé dans le monde entier",
    ],
    bringTitle: "Ce que j'apporte",
    bring: [
      'Un profil full-stack forgé par 30+ projets persos',
      'Des features livrées vite et bien',
      'Une culture outils moderne : Claude Code, CI/CD, Git propre',
      "Un œil neuf — et l'envie d'apprendre de l'équipe",
    ],
    goalsTitle: 'OBJECTIFS DE MISSION',
    goalsSub: 'Les jalons de ma fiche de poste, du décollage à la mise en orbite.',
    goals: [
      { icon: Smartphone, text: 'Livrer mes premières features sur iOS et Android' },
      { icon: Workflow, text: 'Couvrir les écrans clés de tests UI automatisés' },
      { icon: Boxes, text: 'Maîtriser la communication BLE / Wi-Fi avec les instruments' },
      { icon: Trophy, text: 'Devenir autonome sur les deux plateformes', finish: true },
    ],
    garageTitle: 'LA BOÎTE À OUTILS DE BORD',
  },
  en: {
    kicker: 'Experience',
    title: 'My mission: Unistellar',
    subtitle:
      "Alongside Epitech, I'm an iOS & Android mobile developer apprentice: school teaches me how to learn, the company teaches me the craft. Every sprint is a mission, every release a launch — and at Unistellar, reaching for the stars literally is the business.",
    sector: 'Consumer astronomy — smart telescopes',
    city: 'Marseille · on-site',
    badge: 'iOS & Android Mobile Developer — Apprenticeship',
    pitch:
      'Unistellar designs smart telescopes (eVscope) and the Envision augmented-reality binoculars — three-time CES innovation award winner — driven from iOS and Android apps. I build those apps alongside the senior mobile developer.',
    website: 'Discover Unistellar',
    strategyTitle: 'FLIGHT PLAN — MY RHYTHM',
    year1: '1st year',
    year1Desc: '4 weeks at the company, 2 at school — then the cycle repeats.',
    year2: '2nd year',
    year2Desc: 'Epitech every Monday, the rest of the week on mission at Unistellar.',
    weekShort: ['M', 'T', 'W', 'T', 'F'],
    legendCompany: 'Company (Unistellar)',
    legendSchool: 'School (Epitech)',
    missionsTitle: 'MY MISSIONS',
    missions: [
      {
        icon: Smartphone,
        title: 'New features',
        text: 'Building features for the iOS (Swift, SwiftUI) and Android (Kotlin, Jetpack Compose) apps that drive the telescopes and Envision binoculars.',
      },
      {
        icon: Workflow,
        title: 'Quality & testing',
        text: 'Stabilising the apps across many phones, tablets and OS versions; writing and running unit, functional and UI tests.',
      },
      {
        icon: CloudUpload,
        title: 'Architecture & UX',
        text: 'Architecture and user-experience improvements with the senior developer, BLE / Wi-Fi communication with the instruments, Firebase and GitLab CI.',
      },
    ],
    exchangeTitle: 'THE VALUE EXCHANGE',
    learnTitle: "What I'm learning",
    learn: [
      'Native on both platforms: SwiftUI & Jetpack Compose',
      'Making an app talk to an instrument over BLE / Wi-Fi',
      'Quality discipline: unit, functional and UI tests',
      'A hardware + software product used worldwide',
    ],
    bringTitle: 'What I bring',
    bring: [
      'A full-stack profile forged by 30+ personal projects',
      'Features shipped fast and clean',
      'A modern tooling culture: Claude Code, CI/CD, clean Git',
      'Fresh eyes — and a hunger to learn from the team',
    ],
    goalsTitle: 'MISSION OBJECTIVES',
    goalsSub: 'The milestones of my job description, from lift-off to orbit.',
    goals: [
      { icon: Smartphone, text: 'Ship my first features on iOS and Android' },
      { icon: Workflow, text: 'Cover the key screens with automated UI tests' },
      { icon: Boxes, text: 'Master BLE / Wi-Fi communication with the instruments' },
      { icon: Trophy, text: 'Become autonomous on both platforms', finish: true },
    ],
    garageTitle: 'THE ONBOARD TOOLKIT',
  },
}

// Une semaine du rythme d'alternance : entreprise ou école
function Stint({ type, label, delay }) {
  const company = type === 'e'
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', damping: 15 }}
      className={`flex h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border ${
        company
          ? 'border-f1/50 bg-f1/80'
          : 'border-line bg-[#2a2a2e]'
      }`}
      title={company ? 'Unistellar' : 'Epitech'}
    >
      {company ? <Telescope size={13} className="text-white" /> : <GraduationCap size={13} className="text-white" />}
      {label && <span className="font-mono text-[9px] font-bold text-white/80">{label}</span>}
    </motion.div>
  )
}

function MonoTitle({ children }) {
  return (
    <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-gray-500">{children}</p>
  )
}

export default function Experience() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeader sector="02" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      {/* ── carte écurie ── */}
      <ScrollReveal>
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line">
                    <Telescope size={22} strokeWidth={1.75} className="text-accent" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Unistellar <span className="text-sm font-medium text-gray-400">(CES Innovation Awards)</span>
                    </h3>
                    <p className="text-sm text-gray-400">{L.sector} · {L.city}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2.5">
                  <span className="flex items-center gap-2 rounded-md border border-line px-3 py-1 text-xs text-gray-300">
                    <Flag size={13} /> {L.badge}
                  </span>
                  <a
                    href="https://www.unistellar.com/fr/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-line bg-ink/60 px-3.5 py-1.5 text-xs text-accent transition-colors hover:border-accent/50"
                  >
                    {L.website} <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <p className="mt-6 rounded-2xl border border-line bg-ink/40 p-4 text-sm leading-relaxed text-gray-300">
                {L.pitch}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── la stratégie de course : le rythme en relais ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <CalendarClock size={13} className="text-accent" /> {L.strategyTitle}
        </MonoTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <p className="mb-1 text-sm font-semibold text-white">{L.year1}</p>
            <p className="mb-4 text-xs text-gray-400">{L.year1Desc}</p>
            <div className="flex gap-1.5">
              {['e', 'e', 'e', 'e', 's', 's'].map((t, i) => (
                <Stint key={i} type={t} delay={i * 0.07} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-panel p-6">
            <p className="mb-1 text-sm font-semibold text-white">{L.year2}</p>
            <p className="mb-4 text-xs text-gray-400">{L.year2Desc}</p>
            <div className="flex gap-1.5">
              {['s', 'e', 'e', 'e', 'e'].map((t, i) => (
                <Stint key={i} type={t} label={L.weekShort[i]} delay={i * 0.07} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-f1/80" /> {L.legendCompany}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#2a2a2e]" /> {L.legendSchool}
          </span>
        </div>
      </ScrollReveal>

      {/* ── missions ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Rocket size={13} className="text-accent" /> {L.missionsTitle}
        </MonoTitle>
        <div className="grid gap-5 sm:grid-cols-3">
          {L.missions.map((m) => (
            <div key={m.title} className="rounded-2xl border border-line bg-ink/40 p-5 transition-colors hover:border-f1/40">
              <m.icon size={18} className="mb-3 text-f1" />
              <h4 className="mb-1.5 text-sm font-semibold text-white">{m.title}</h4>
              <p className="text-xs leading-relaxed text-gray-400">{m.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── l'échange de valeur ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <BookOpen size={13} className="text-accent" /> {L.exchangeTitle}
        </MonoTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-7">
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <GraduationCap size={17} className="text-accent" /> {L.learnTitle}
            </h4>
            <ul className="space-y-2.5">
              {L.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent/70" /> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Rocket size={17} className="text-f1" /> {L.bringTitle}
            </h4>
            <ul className="space-y-2.5">
              {L.bring.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-f1/80" /> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </ScrollReveal>

      {/* ── objectifs de saison ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Flag size={13} className="text-accent" /> {L.goalsTitle}
        </MonoTitle>
        <p className="mb-6 text-xs text-gray-400">{L.goalsSub}</p>
        <ol className="mx-auto max-w-2xl space-y-3">
          {L.goals.map((goal, i) => (
            <motion.li
              key={goal.text}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 rounded-2xl border p-4 ${
                goal.finish
                  ? 'border-f1/40'
                  : 'border-line bg-panel'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  goal.finish ? 'bg-f1' : 'border border-line bg-ink/60'
                }`}
              >
                <goal.icon size={16} className={goal.finish ? 'text-white' : 'text-gray-400'} />
              </span>
              <span className="flex-1 text-sm text-gray-200">{goal.text}</span>
              <span className="font-mono text-[10px] text-gray-400">{goal.finish ? <Orbit size={13} className="text-accent" aria-label="orbite" /> : String(i + 1).padStart(2, '0')}</span>
            </motion.li>
          ))}
        </ol>
      </ScrollReveal>

      {/* ── le garage à outils ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Boxes size={13} className="text-accent" /> {L.garageTitle}
        </MonoTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.05}>
              <Card className="h-full p-4 text-center">
                <p className="text-sm font-semibold text-white">{tool.name}</p>
                <p className="mt-1 text-[11px] text-gray-500">{tool[lang]}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
