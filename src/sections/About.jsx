import { GraduationCap, MapPin, Mail, Github, Sparkles } from 'lucide-react'
import BlurText from '../components/BlurText.jsx'
import GradientText from '../components/GradientText.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import Marquee from '../components/Marquee.jsx'

const TECHS = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
  'Docker', 'Jenkins', 'Git & GitHub', 'HTML / CSS', 'TailwindCSS', 'SQL',
]

const TIMELINE = [
  {
    date: '2023 – 2025',
    title: 'BTS CIEL',
    text: "Cybersécurité, Informatique et réseaux, Électronique. Premiers projets concrets : système d'arrosage automatique, jeu 2D en Java.",
  },
  {
    date: '2025 – aujourd\'hui',
    title: 'Epitech',
    text: "Pédagogie par projets : développement web (React, Node), IA (projet Alice), DevOps (Docker, Kubernetes, Jenkins), travail en équipe et gestion de projet.",
  },
  {
    date: 'Aujourd\'hui',
    title: 'Alternance — Développeur Full-Stack',
    text: "En entreprise 4 semaines sur 6 : du code en conditions réelles, des vrais utilisateurs et une vraie équipe. Détails dans la section Alternance 🏎️",
  },
  {
    date: 'Demain',
    title: 'Et après ?',
    text: "Objectif : devenir développeur full-stack polyvalent, avec une appétence pour l'IA et l'automatisation.",
  },
]

export default function About() {
  return (
    <section id="apropos" className="relative mx-auto max-w-5xl px-6 py-28">
      <ScrollReveal>
        <h2 className="mb-2 text-center text-sm uppercase tracking-[0.35em] text-cyan">À propos</h2>
        <p className="mb-12 text-center text-4xl font-bold">
          <GradientText>Qui suis-je ?</GradientText>
        </p>
      </ScrollReveal>

      <div className="grid gap-10 md:grid-cols-2">
        <ScrollReveal direction="right">
          <div className="border-beam rounded-3xl">
            <div className="border-beam-inner p-8">
              <p className="text-lg leading-relaxed text-gray-300">
                <BlurText text="Étudiant à Epitech après un BTS CIEL, je code par passion depuis plusieurs années. Du jeu 2D en Java au réseau de neurones en Python, en passant par des apps React et des pipelines CI/CD : j'aime toucher à tout et apprendre en construisant." />
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-neon" /> Epitech — pédagogie par projets
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-neon" /> France
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
            {TIMELINE.map((item) => (
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
            Ma philosophie : un projet fini et imparfait vaut mieux qu'un projet parfait jamais livré. Je préfère
            itérer vite, apprendre de mes erreurs et améliorer en continu.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2} className="mt-16">
        <Marquee items={TECHS} />
      </ScrollReveal>
    </section>
  )
}
