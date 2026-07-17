import { CalendarClock, Smartphone, Workflow, CloudUpload, Flag, Zap } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { useLang } from '../i18n.jsx'

const STACK = ['GitLab', 'GitHub', 'Figma', 'Firebase', 'Supabase', 'n8n', 'APIs REST', 'Swift / Kotlin / Flutter', 'Cursor']

const STRINGS = {
  fr: {
    kicker: 'Expérience',
    title: 'Mon écurie : EzDrive',
    subtitle:
      "En parallèle d'Epitech, je suis apprenti ingénieur en transformation numérique et data : l'école m'apprend à apprendre, l'entreprise m'apprend le métier. Comme un pilote, je progresse au contact de l'équipe — chaque sprint est un Grand Prix. Et chez EzDrive, l'électrique ⚡ c'est littéralement le métier.",
    sector: 'Recharge électrique — DROM & Océan Indien',
    city: 'Marseille · télétravail partiel',
    badge: 'Ingénieur Transformation Numérique & Data Junior — Apprentissage',
    pitch:
      "EzDrive construit l'écosystème souverain de la recharge électrique dans les DROM et l'Océan Indien. J'y accompagne la transformation numérique : innovation, automatisation et gestion avancée des données.",
    rhythm1Title: 'Rythme — 1ʳᵉ année',
    rhythm1: (
      <>
        <span className="font-semibold text-white">4 semaines</span> en entreprise /{' '}
        <span className="font-semibold text-white">2 semaines</span> à l'école
      </>
    ),
    rhythm2Title: 'Rythme — 2ᵉ année',
    rhythm2: (
      <>
        Le <span className="font-semibold text-white">lundi</span> à l'école, le reste de la semaine en
        entreprise (même rythme sinon)
      </>
    ),
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
    stackLabel: 'Stack :',
  },
  en: {
    kicker: 'Experience',
    title: 'My team: EzDrive',
    subtitle:
      "Alongside Epitech, I'm an apprentice engineer in digital transformation & data: school teaches me how to learn, the company teaches me the craft. Like a driver, I improve with the team — every sprint is a Grand Prix. And at EzDrive, electric ⚡ literally is the business.",
    sector: 'EV charging — French overseas territories & Indian Ocean',
    city: 'Marseille · partial remote',
    badge: 'Junior Digital Transformation & Data Engineer — Apprenticeship',
    pitch:
      'EzDrive builds the sovereign EV-charging ecosystem for the French overseas territories and the Indian Ocean. I support its digital transformation: innovation, automation and advanced data management.',
    rhythm1Title: 'Rhythm — 1st year',
    rhythm1: (
      <>
        <span className="font-semibold text-white">4 weeks</span> at the company /{' '}
        <span className="font-semibold text-white">2 weeks</span> at school
      </>
    ),
    rhythm2Title: 'Rhythm — 2nd year',
    rhythm2: (
      <>
        <span className="font-semibold text-white">Mondays</span> at school, the rest of the week at the
        company (same rhythm otherwise)
      </>
    ),
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
    stackLabel: 'Stack:',
  },
}

export default function Experience() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="02" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      <ScrollReveal>
        <TiltCard>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/70 backdrop-blur">
            {/* bande damier F1 en haut de la carte */}
            <div className="checkered h-2 w-full opacity-80" />
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="animate-pulse-glow flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-f1 to-orange-600">
                    <Zap size={26} className="text-white" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      EzDrive <span className="text-sm font-medium text-gray-400">(Groupe SURAYA)</span>
                    </h3>
                    <p className="text-sm text-gray-400">{L.sector} · {L.city}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-f1/50 bg-f1/10 px-4 py-1.5 text-xs font-semibold text-orange-300">
                  <Flag size={13} /> {L.badge}
                </span>
              </div>

              <p className="mt-6 rounded-2xl border border-line bg-ink/40 p-4 text-sm leading-relaxed text-gray-300">
                {L.pitch}
              </p>

              {/* rythme d'alternance */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-ink/50 p-5">
                  <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-cyan">
                    <CalendarClock size={14} /> {L.rhythm1Title}
                  </p>
                  <p className="text-sm text-gray-300">{L.rhythm1}</p>
                </div>
                <div className="rounded-2xl border border-line bg-ink/50 p-5">
                  <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-cyan">
                    <CalendarClock size={14} /> {L.rhythm2Title}
                  </p>
                  <p className="text-sm text-gray-300">{L.rhythm2}</p>
                </div>
              </div>

              {/* missions */}
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {L.missions.map((m) => (
                  <div key={m.title} className="rounded-2xl border border-line bg-ink/40 p-5 transition-colors hover:border-f1/40">
                    <m.icon size={18} className="mb-3 text-f1" />
                    <h4 className="mb-1.5 text-sm font-semibold text-white">{m.title}</h4>
                    <p className="text-xs leading-relaxed text-gray-400">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* stack en entreprise */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs uppercase tracking-widest text-gray-500">{L.stackLabel}</span>
                {STACK.map((tech) => (
                  <span key={tech} className="rounded-full border border-line bg-panel px-3 py-1 text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
