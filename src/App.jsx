import { lazy } from 'react'
import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import PitButton from './components/PitButton.jsx'
import FlightToggle from './components/FlightToggle.jsx'
import OrbitDivider from './components/OrbitDivider.jsx'
import LazySection from './components/LazySection.jsx'
import Hero from './sections/Hero.jsx'
import Starfield from './components/Starfield.jsx'

// Sections sous la ligne de flottaison : code-splitting + montage à l'approche
// du scroll (voir LazySection) — le chargement initial ne paie que le Hero.
const About = lazy(() => import('./sections/About.jsx'))
const Experience = lazy(() => import('./sections/Experience.jsx'))
const Skills = lazy(() => import('./sections/Skills.jsx'))
const Projects = lazy(() => import('./sections/Projects.jsx'))
const DataSection = lazy(() => import('./sections/DataSection.jsx'))
const OffTrack = lazy(() => import('./sections/OffTrack.jsx'))
const Contact = lazy(() => import('./sections/Contact.jsx'))
const Footer = lazy(() => import('./sections/Footer.jsx'))

export default function App() {
  return (
    <>
      <Starfield />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LazySection id="apropos">
          <About />
        </LazySection>
        <OrbitDivider />
        <LazySection id="experience">
          <Experience />
        </LazySection>
        <OrbitDivider />
        <LazySection id="competences">
          <Skills />
        </LazySection>
        <OrbitDivider />
        <LazySection id="projets">
          <Projects />
        </LazySection>
        <OrbitDivider />
        <LazySection id="data">
          <DataSection />
        </LazySection>
        <OrbitDivider />
        <LazySection id="horspiste">
          <OffTrack />
        </LazySection>
        <OrbitDivider />
        <LazySection id="contact">
          <Contact />
          <Footer />
        </LazySection>
      </main>
      <PitButton />
      <FlightToggle />
    </>
  )
}
