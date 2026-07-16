import { Building2, CalendarClock, Rocket, GitBranch, Layers, Flag } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TiltCard from '../components/TiltCard.jsx'

const COMPANY = {
  name: 'EzDrive',
  sector: 'Transport & Logistique',
  city: 'France',
}

const MISSIONS = [
  {
    icon: Layers,
    title: 'Développement full-stack',
    text: 'Conception et développement de fonctionnalités front (React) et back (API Node.js / bases de données), de la maquette à la mise en production.',
  },
  {
    icon: GitBranch,
    title: 'Qualité & collaboration',
    text: 'Travail en équipe avec Git : revues de code, pull requests, résolution de bugs et amélioration continue de l\'existant.',
  },
  {
    icon: Rocket,
    title: 'Intégration & déploiement',
    text: 'Participation à la CI/CD : conteneurisation Docker, pipelines automatisés et suivi des déploiements.',
  },
]

const STACK = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Git']

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="02" kicker="Expérience" title="Mon écurie : EzDrive">
        En parallèle d'Epitech, je suis développeur full-stack en alternance : l'école m'apprend à
        apprendre, l'entreprise m'apprend le métier. Comme un pilote, je progresse au contact de
        l'équipe — chaque sprint est un Grand Prix.
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
                    <Building2 size={26} className="text-white" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{COMPANY.name}</h3>
                    <p className="text-sm text-gray-400">{COMPANY.sector} · {COMPANY.city}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-f1/50 bg-f1/10 px-4 py-1.5 text-xs font-semibold text-orange-300">
                  <Flag size={13} /> Développeur Full-Stack — Alternance
                </span>
              </div>

              {/* rythme d'alternance */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-ink/50 p-5">
                  <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-cyan">
                    <CalendarClock size={14} /> Rythme — 1ʳᵉ année
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">4 semaines</span> en entreprise /{' '}
                    <span className="font-semibold text-white">2 semaines</span> à l'école
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-ink/50 p-5">
                  <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-cyan">
                    <CalendarClock size={14} /> Rythme — 2ᵉ année
                  </p>
                  <p className="text-sm text-gray-300">
                    Le <span className="font-semibold text-white">lundi</span> à l'école, le reste de la
                    semaine en entreprise (même rythme sinon)
                  </p>
                </div>
              </div>

              {/* missions */}
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {MISSIONS.map((m) => (
                  <div key={m.title} className="rounded-2xl border border-line bg-ink/40 p-5 transition-colors hover:border-f1/40">
                    <m.icon size={18} className="mb-3 text-f1" />
                    <h4 className="mb-1.5 text-sm font-semibold text-white">{m.title}</h4>
                    <p className="text-xs leading-relaxed text-gray-400">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* stack en entreprise */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs uppercase tracking-widest text-gray-500">Stack :</span>
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
