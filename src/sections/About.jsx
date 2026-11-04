import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { about } from '../data/profile.js';
import './about.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead num="01" label="About" title="I build software that senses, reasons and decides." />
        <div className="about-grid">
          <Reveal className="about-text">
            {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </Reveal>
          <Reveal as="ol" className="focus-list" delay={120} aria-label="Areas of focus">
            {about.focus.map((f, i) => (
              <li key={f.t}>
                <span className="focus-n" aria-hidden="true">{i + 1}</span>
                <div><strong>{f.t}</strong><span>{f.d}</span></div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
