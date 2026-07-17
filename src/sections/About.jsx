import { GraduationCap, MapPin, Mail, Github, Sparkles } from 'lucide-react'
import BlurText from '../components/BlurText.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Marquee from '../components/Marquee.jsx'
import { useLang } from '../i18n.jsx'

const TECHS = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
  'Docker', 'Jenkins', 'Git & GitHub', 'HTML / CSS', 'TailwindCSS', 'SQL',
  'Firebase', 'Supabase', 'n8n', 'Flutter', 'Figma',
]

const STRINGS = {
  fr: {
    kicker: 'À propos',
    title: 'Qui suis-je ?',
    bio: "Étudiant à Epitech après un BTS CIEL, je code par passion depuis plusieurs années. Du jeu 2D en Java au réseau de neurones en Python, en passant par des apps React et des pipelines CI/CD : j'aime toucher à tout et apprendre en construisant.",
    school: 'Epitech — pédagogie par projets',
    location: 'France',
    timeline: [
      {
        date: 'Saisons 2023 – 2025',
        title: 'BTS CIEL',
        text: "Cybersécurité, Informatique et réseaux, Électronique. Premiers projets concrets : système d'arrosage automatique, jeu 2D en Java.",
      },
      {
        date: 'Saison 2025 – en cours',
        title: 'Epitech',
        text: "Pédagogie par projets : développement web (React, Node), IA (projet Alice), DevOps (Docker, Kubernetes, Jenkins), travail en équipe et gestion de projet.",
      },
      {
        date: 'Saison en cours',
        title: 'Apprentissage chez EzDrive — Transformation Numérique & Data',
        text: "Ingénieur junior au sein du Groupe SURAYA (recharge électrique dans les DROM et l'Océan Indien) : apps mobiles, automatisations n8n, Firebase/Supabase et cloud. Détails dans la section Alternance 🏎️",
      },
      {
        date: 'Prochaines saisons',
        title: 'Et après ?',
        text: "Objectif : devenir développeur full-stack polyvalent, avec une appétence pour l'IA et l'automatisation. Comme en F1 : chaque saison, une monoplace plus rapide.",
      },
    ],
    philosophy:
      "Ma philosophie : un projet fini et imparfait vaut mieux qu'un projet parfait jamais livré. Je préfère itérer vite, apprendre de mes erreurs et améliorer en continu.",
  },
  en: {
    kicker: 'About',
    title: 'Who am I?',
    bio: "Epitech student after a two-year technical degree (BTS CIEL), I've been coding out of passion for years. From a 2D Java game to Python neural networks, through React apps and CI/CD pipelines: I love trying everything and learning by building.",
    school: 'Epitech — project-based learning',
    location: 'France',
    timeline: [
      {
        date: 'Seasons 2023 – 2025',
        title: 'BTS CIEL',
        text: 'Cybersecurity, IT & networks, electronics. First hands-on projects: an automatic watering system, a 2D game in Java.',
      },
      {
        date: 'Season 2025 – ongoing',
        title: 'Epitech',
        text: 'Project-based learning: web development (React, Node), AI (the Alice project), DevOps (Docker, Kubernetes, Jenkins), teamwork and project management.',
      },
      {
        date: 'Current season',
        title: 'Apprenticeship at EzDrive — Digital Transformation & Data',
        text: 'Junior engineer within Groupe SURAYA (EV charging across the French overseas territories and the Indian Ocean): mobile apps, n8n automations, Firebase/Supabase and cloud. Details in the Apprenticeship section 🏎️',
      },
      {
        date: 'Next seasons',
        title: "What's next?",
        text: 'Goal: become a versatile full-stack developer with a taste for AI and automation. Like in F1: every season, a faster car.',
      },
    ],
    philosophy:
      'My philosophy: a finished, imperfect project beats a perfect one that never ships. I iterate fast, learn from my mistakes and improve continuously.',
  },
}

export default function About() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="01" kicker={L.kicker} title={L.title} />

      <div className="grid gap-10 md:grid-cols-2">
        <ScrollReveal direction="right">
          <div className="border-beam rounded-3xl">
            <div className="border-beam-inner p-8">
              <p className="text-lg leading-relaxed text-gray-300">
                <BlurText key={lang} text={L.bio} />
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-neon" /> {L.school}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-neon" /> {L.location}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-neon" />
                  <a href="mailto:lois.clerc@epitech.eu" className="hover:text-cyan">lois.clerc@epitech.eu</a>
                </li>
                <li className="flex items-center gap-3">
                  <Github size={16} className="text-neon" />
                  <a href="https://github.com/LaFicelleCmoi" target="_blank" rel="noreferrer" className="hover:text-cyan">
                    github.com/LaFicelleCmoi
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.15}>
          <ol className="relative space-y-8 border-l border-line pl-6">
            {L.timeline.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[31px] flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-neon to-cyan shadow-[0_0_12px_var(--color-neon)]" />
                <p className="text-xs uppercase tracking-widest text-cyan">{item.date}</p>
                <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-start gap-2 rounded-2xl border border-line bg-panel/50 p-4 text-sm text-gray-400">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-pink" />
            {L.philosophy}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2} className="mt-16">
        <Marquee items={TECHS} />
      </ScrollReveal>
    </section>
  )
}
