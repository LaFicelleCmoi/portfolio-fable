import { GraduationCap, MapPin, Mail, Github, Database, Workflow } from 'lucide-react'
import {
  SiReact, SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiNodedotjs, SiDocker, SiJenkins,
  SiSwift, SiKotlin, SiGithub, SiHtml5, SiTailwindcss, SiFirebase, SiSupabase, SiFigma,
} from 'react-icons/si'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ScrollRevealText from '../components/reactbits/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LogoLoop from '../components/reactbits/LogoLoop.jsx'
import { useLang } from '../i18n.jsx'

// Ma stack, en logos monochromes (Simple Icons ; Lucide quand la marque n'existe pas)
const TECHS = [
  { name: 'React', icon: SiReact },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Swift', icon: SiSwift },
  { name: 'Kotlin', icon: SiKotlin },
  { name: 'Python', icon: SiPython },
  { name: 'Java', icon: SiOpenjdk },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Docker', icon: SiDocker },
  { name: 'Jenkins', icon: SiJenkins },
  { name: 'Git & GitHub', icon: SiGithub },
  { name: 'HTML / CSS', icon: SiHtml5 },
  { name: 'TailwindCSS', icon: SiTailwindcss },
  { name: 'SQL', icon: Database },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'n8n', icon: Workflow },
  { name: 'Figma', icon: SiFigma },
].map(({ name, icon: Icon }) => ({
  title: name,
  node: (
    <span className="flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-200">
      <Icon size={18} aria-hidden />
      <span className="font-mono text-sm">{name}</span>
    </span>
  ),
}))

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
        title: 'Alternance chez Unistellar — Développeur Mobile iOS & Android',
        text: "Télescopes connectés et jumelles Envision pilotés depuis mobile : Swift/SwiftUI, Kotlin/Jetpack Compose, BLE & Wi-Fi, Firebase et GitLab CI. Détails dans la section Alternance",
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
        title: 'Apprenticeship at Unistellar — iOS & Android Mobile Developer',
        text: 'Smart telescopes and Envision binoculars driven from mobile: Swift/SwiftUI, Kotlin/Jetpack Compose, BLE & Wi-Fi, Firebase and GitLab CI. Details in the Apprenticeship section',
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
    <section className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <SectionHeader sector="01" kicker={L.kicker} title={L.title} />

      <div className="grid gap-10 md:grid-cols-2">
        <ScrollReveal direction="right">
          <div className="rounded-2xl border border-line bg-panel">
            <div className="p-8">
              <ScrollRevealText key={lang} className="text-lg leading-relaxed text-gray-200">
                {L.bio}
              </ScrollRevealText>
              <ul className="mt-8 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-gray-500" /> {L.school}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500" /> {L.location}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-500" />
                  <a href="mailto:lois.clerc@epitech.eu" className="transition-colors hover:text-white">lois.clerc@epitech.eu</a>
                </li>
                <li className="flex items-center gap-3">
                  <Github size={16} className="text-gray-500" />
                  <a href="https://github.com/LaFicelleCmoi" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
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
                <span className="absolute -left-[31px] flex h-2 w-2 rounded-full border border-gray-500 bg-ink" />
                <p className="font-mono text-xs text-gray-500">{item.date}</p>
                <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-f1 pl-4 text-sm leading-relaxed text-gray-400">{L.philosophy}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2} className="mt-16">
        <LogoLoop
          logos={TECHS}
          speed={40}
          gap={40}
          logoHeight={18}
          pauseOnHover
          fadeOut
          fadeOutColor="#0a0a0b"
          ariaLabel={lang === 'fr' ? 'Technologies que j’utilise' : 'Technologies I use'}
        />
      </ScrollReveal>
    </section>
  )
}
