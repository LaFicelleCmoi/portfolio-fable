import { lazy } from 'react'
import Navbar from './components/Navbar.jsx'
import RaceProgress from './components/RaceProgress.jsx'
import PitButton from './components/PitButton.jsx'
import Kerb from './components/Kerb.jsx'
import LazySection from './components/LazySection.jsx'
import Hero from './sections/Hero.jsx'

// Sections sous la ligne de flottaison : code-splitting + montage à l'approche
// du scroll (voir LazySection) — le chargement initial ne paie que le Hero.
const About = lazy(() => import('./sections/About.jsx'))
const Experience = lazy(() => import('./sections/Experience.jsx'))
const Skills = lazy(() => import('./sections/Skills.jsx'))
const Projects = lazy(() => import('./sections/Projects.jsx'))
const Contact = lazy(() => import('./sections/Contact.jsx'))
const Footer = lazy(() => import('./sections/Footer.jsx'))

export default function App() {
  return (
    <>
      <RaceProgress />
      <Navbar />
      <main>
        <Hero />
        <LazySection id="apropos">
          <About />
        </LazySection>
        <Kerb />
        <LazySection id="experience">
          <Experience />
        </LazySection>
        <Kerb />
        <LazySection id="competences">
          <Skills />
        </LazySection>
        <Kerb />
        <LazySection id="projets">
          <Projects />
        </LazySection>
        <Kerb />
        <LazySection id="contact">
          <Contact />
          <Footer />
        </LazySection>
      </main>
      <PitButton />
    </>
  )
}
