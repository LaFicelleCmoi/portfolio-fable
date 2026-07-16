import Navbar from './components/Navbar.jsx'
import RaceProgress from './components/RaceProgress.jsx'
import PitButton from './components/PitButton.jsx'
import Kerb from './components/Kerb.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  return (
    <>
      <RaceProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Kerb />
        <Experience />
        <Kerb />
        <Skills />
        <Kerb />
        <Projects />
        <Kerb />
        <Contact />
      </main>
      <Footer />
      <PitButton />
    </>
  )
}
