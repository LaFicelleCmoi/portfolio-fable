import { motion } from 'framer-motion'
import {
  CalendarClock, Smartphone, Workflow, CloudUpload, Flag, Zap, GraduationCap,
  ExternalLink, BookOpen, Rocket, Trophy, Boxes, CheckCircle2,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import { useLang } from '../i18n.jsx'

// Le garage à outils : chaque techno de l'offre avec son usage réel
const TOOLS = [
  { name: 'GitLab & GitHub', fr: 'Code, reviews & CI', en: 'Code, reviews & CI' },
  { name: 'Figma', fr: 'Prototypage produit', en: 'Product prototyping' },
  { name: 'Firebase', fr: 'Données temps réel', en: 'Real-time data' },
  { name: 'Supabase', fr: 'Base de données & auth', en: 'Database & auth' },
  { name: 'n8n', fr: 'Automatisations métier', en: 'Business automations' },
  { name: 'APIs REST', fr: 'Intégrations', en: 'Integrations' },
  { name: 'Swift · Kotlin · Flutter', fr: 'Apps mobiles', en: 'Mobile apps' },
  { name: 'Cursor', fr: 'Dev assisté par IA', en: 'AI-assisted dev' },
]

const STRINGS = {
  fr: {
    kicker: 'Expérience',
    title: 'Mon écurie : EZdrive',
    subtitle:
      "En parallèle d'Epitech, je suis apprenti ingénieur en transformation numérique et data : l'école m'apprend à apprendre, l'entreprise m'apprend le métier. Comme un pilote, je progresse au contact de l'équipe — chaque sprint est un Grand Prix. Et chez EZdrive, l'électrique ⚡ c'est littéralement le métier.",
    sector: 'Recharge électrique — DROM & Océan Indien',
    city: 'Marseille · télétravail partiel',
    badge: 'Ingénieur Transformation Numérique & Data Junior — Apprentissage',
    pitch:
      "EZdrive construit l'écosystème souverain de la recharge électrique dans les DROM et l'Océan Indien. J'y accompagne la transformation numérique : innovation, automatisation et gestion avancée des données.",
    website: 'Découvrir EZdrive',
    strategyTitle: 'LA STRATÉGIE DE COURSE — MON RYTHME',
    year1: '1ʳᵉ année',
    year1Desc: '4 relais en entreprise, 2 relais à l\'école — et on répète le cycle.',
    year2: '2ᵉ année',
    year2Desc: 'Arrêt au stand Epitech chaque lundi, le reste de la semaine en piste chez EZdrive.',
    weekShort: ['L', 'M', 'M', 'J', 'V'],
    legendCompany: 'Entreprise (EZdrive)',
    legendSchool: 'École (Epitech)',
    missionsTitle: 'MES MISSIONS',
    missions: [
      {
        icon: Smartphone,
        title: 'Apps mobiles & SaaS',
        text: "Publication du code des applications mobiles sur les environnements iOS et Play Store, construction de mini-apps et de modules SaaS.",
      },
      {
        icon: Workflow,
        title: 'Automatisation & data',
        text: "Création d'automatisations n8n, intégration d'APIs REST, de bases de données et de modèles autour de Firebase et Supabase.",
      },
      {
        icon: CloudUpload,
        title: 'Cloud & produit',
        text: "Déploiement d'environnements cloud, prototypage Figma, cérémonies agiles et participation aux nouveaux produits numériques (outils CPO/eMSP).",
      },
    ],
    exchangeTitle: "L'ÉCHANGE DE VALEUR",
    learnTitle: "Ce que j'apprends",
    learn: [
      'Publier des apps mobiles en production (iOS & Android)',
      'Industrialiser la data : n8n, Firebase, Supabase',
      'La rigueur produit : agilité, priorisation, qualité',
      'Le cloud en conditions réelles',
    ],
    bringTitle: "Ce que j'apporte",
    bring: [
      'Un profil full-stack forgé par 30+ projets persos',
      'Des automatisations livrées vite et bien',
      'Une culture outils moderne : Cursor, CI/CD, Git propre',
      "Un œil neuf — et l'envie d'apprendre de l'équipe",
    ],
    goalsTitle: 'OBJECTIFS DE LA SAISON',
    goalsSub: 'Les jalons de ma fiche de poste, transformés en tour de circuit.',
    goals: [
      { icon: Smartphone, text: "Gérer les releases des apps sur l'App Store et le Play Store" },
      { icon: Workflow, text: "Déployer des automatisations n8n dans toute l'équipe" },
      { icon: Boxes, text: 'Construire des mini-apps et des modules SaaS' },
      { icon: Trophy, text: 'Décrocher le rôle de référent technique produit', finish: true },
    ],
    garageTitle: 'LE GARAGE À OUTILS',
  },
  en: {
    kicker: 'Experience',
    title: 'My team: EZdrive',
    subtitle:
      "Alongside Epitech, I'm an apprentice engineer in digital transformation & data: school teaches me how to learn, the company teaches me the craft. Like a driver, I improve with the team — every sprint is a Grand Prix. And at EZdrive, electric ⚡ literally is the business.",
    sector: 'EV charging — French overseas territories & Indian Ocean',
    city: 'Marseille · partial remote',
    badge: 'Junior Digital Transformation & Data Engineer — Apprenticeship',
    pitch:
      'EZdrive builds the sovereign EV-charging ecosystem for the French overseas territories and the Indian Ocean. I support its digital transformation: innovation, automation and advanced data management.',
    website: 'Discover EZdrive',
    strategyTitle: 'RACE STRATEGY — MY RHYTHM',
    year1: '1st year',
    year1Desc: '4 stints at the company, 2 stints at school — then the cycle repeats.',
    year2: '2nd year',
    year2Desc: 'Pit stop at Epitech every Monday, the rest of the week on track at EZdrive.',
    weekShort: ['M', 'T', 'W', 'T', 'F'],
    legendCompany: 'Company (EZdrive)',
    legendSchool: 'School (Epitech)',
    missionsTitle: 'MY MISSIONS',
    missions: [
      {
        icon: Smartphone,
        title: 'Mobile apps & SaaS',
        text: 'Managing mobile app releases on the iOS and Play Store environments, building mini-apps and SaaS modules.',
      },
      {
        icon: Workflow,
        title: 'Automation & data',
        text: 'Building n8n automations, integrating REST APIs, databases and models around Firebase and Supabase.',
      },
      {
        icon: CloudUpload,
        title: 'Cloud & product',
        text: 'Deploying cloud environments, Figma prototyping, agile ceremonies and contributing to new digital products (CPO/eMSP tools).',
      },
    ],
    exchangeTitle: 'THE VALUE EXCHANGE',
    learnTitle: "What I'm learning",
    learn: [
      'Shipping mobile apps to production (iOS & Android)',
      'Industrialising data: n8n, Firebase, Supabase',
      'Product discipline: agility, prioritisation, quality',
      'Cloud in real conditions',
    ],
    bringTitle: 'What I bring',
    bring: [
      'A full-stack profile forged by 30+ personal projects',
      'Automations shipped fast and clean',
      'A modern tooling culture: Cursor, CI/CD, clean Git',
      'Fresh eyes — and a hunger to learn from the team',
    ],
    goalsTitle: 'SEASON GOALS',
    goalsSub: 'The milestones of my job description, turned into a lap of the circuit.',
    goals: [
      { icon: Smartphone, text: 'Manage app releases on the App Store and Play Store' },
      { icon: Workflow, text: 'Roll out n8n automations across the team' },
      { icon: Boxes, text: 'Build mini-apps and SaaS modules' },
      { icon: Trophy, text: 'Earn the product technical-referent role', finish: true },
    ],
    garageTitle: 'THE TOOL GARAGE',
  },
}

// Un relais du rythme d'alternance, façon stratégie pneus
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
          ? 'border-f1/40 bg-gradient-to-b from-f1/70 to-[#7f0300]'
          : 'border-cyan/40 bg-gradient-to-b from-cyan/60 to-[#0e7490]'
      }`}
      title={company ? 'EZdrive' : 'Epitech'}
    >
      {company ? <Zap size={13} className="text-white" /> : <GraduationCap size={13} className="text-white" />}
      {label && <span className="font-mono text-[9px] font-bold text-white/80">{label}</span>}
    </motion.div>
  )
}

function MonoTitle({ children }) {
  return (
    <p className="mb-4 flex items-center justify-center gap-3 text-center font-mono text-[11px] tracking-[0.3em] text-gray-500">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-f1/60" />
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-f1/60" />
    </p>
  )
}

export default function Experience() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="02" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      {/* ── carte écurie ── */}
      <ScrollReveal>
        <TiltCard>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/70 backdrop-blur">
            <div className="checkered h-2 w-full opacity-80" />
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="animate-pulse-glow flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-f1 to-orange-600">
                    <Zap size={26} className="text-white" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      EZdrive <span className="text-sm font-medium text-gray-400">(Groupe SURAYA)</span>
                    </h3>
                    <p className="text-sm text-gray-400">{L.sector} · {L.city}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2.5">
                  <span className="flex items-center gap-2 rounded-full border border-f1/50 bg-f1/10 px-4 py-1.5 text-xs font-semibold text-orange-300">
                    <Flag size={13} /> {L.badge}
                  </span>
                  <a
                    href="https://ezdrive.fr"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-line bg-ink/60 px-3.5 py-1.5 text-xs text-cyan transition-colors hover:border-cyan/50"
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
        </TiltCard>
      </ScrollReveal>

      {/* ── la stratégie de course : le rythme en relais ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <CalendarClock size={13} className="text-cyan" /> {L.strategyTitle}
        </MonoTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-panel/60 p-6">
            <p className="mb-1 text-sm font-semibold text-white">{L.year1}</p>
            <p className="mb-4 text-xs text-gray-400">{L.year1Desc}</p>
            <div className="flex gap-1.5">
              {['e', 'e', 'e', 'e', 's', 's'].map((t, i) => (
                <Stint key={i} type={t} delay={i * 0.07} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-panel/60 p-6">
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
            <span className="h-3 w-3 rounded bg-gradient-to-b from-f1/70 to-[#7f0300]" /> {L.legendCompany}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-gradient-to-b from-cyan/60 to-[#0e7490]" /> {L.legendSchool}
          </span>
        </div>
      </ScrollReveal>

      {/* ── missions ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Rocket size={13} className="text-cyan" /> {L.missionsTitle}
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
          <BookOpen size={13} className="text-cyan" /> {L.exchangeTitle}
        </MonoTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <SpotlightCard className="p-7" color="rgba(34, 211, 238, 0.16)">
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <GraduationCap size={17} className="text-cyan" /> {L.learnTitle}
            </h4>
            <ul className="space-y-2.5">
              {L.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-cyan/70" /> {item}
                </li>
              ))}
            </ul>
          </SpotlightCard>
          <SpotlightCard className="p-7" color="rgba(225, 6, 0, 0.15)">
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
          </SpotlightCard>
        </div>
      </ScrollReveal>

      {/* ── objectifs de saison ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Flag size={13} className="text-cyan" /> {L.goalsTitle}
        </MonoTitle>
        <p className="mb-6 text-center text-xs text-gray-500">{L.goalsSub}</p>
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
                  ? 'border-[#ffd700]/40 bg-[#ffd700]/5'
                  : 'border-line bg-panel/60'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  goal.finish ? 'bg-gradient-to-br from-[#ffd700] to-orange-500' : 'border border-line bg-ink/60'
                }`}
              >
                <goal.icon size={16} className={goal.finish ? 'text-ink' : 'text-cyan'} />
              </span>
              <span className="flex-1 text-sm text-gray-200">{goal.text}</span>
              <span className="font-mono text-[10px] text-gray-600">{goal.finish ? '🏁' : `T${i + 1}`}</span>
            </motion.li>
          ))}
        </ol>
      </ScrollReveal>

      {/* ── le garage à outils ── */}
      <ScrollReveal className="mt-14">
        <MonoTitle>
          <Boxes size={13} className="text-cyan" /> {L.garageTitle}
        </MonoTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.05}>
              <SpotlightCard className="h-full p-4 text-center" color="rgba(124, 58, 237, 0.18)">
                <p className="text-sm font-semibold text-white">{tool.name}</p>
                <p className="mt-1 text-[11px] text-gray-500">{tool[lang]}</p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
