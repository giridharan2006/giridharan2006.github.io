import MagnetLines from './components/MagnetLines.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Experience from './sections/Experience.jsx';
import Projects from './sections/Projects.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  return (
    <>
      <MagnetLines />
      <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}
