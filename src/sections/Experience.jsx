import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { experience } from '../data/profile.js';
import './experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead num="03" label="Experience" title="Where I have worked" />
        <ol className="timeline">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.org} delay={i * 100} className="tl-item">
              <div className="tl-rail" aria-hidden="true"><span className="tl-dot" /></div>
              <article className="card tl-card">
                <header className="tl-head">
                  <div>
                    <p className="tl-org mono">{e.org}</p>
                    <h3>{e.role}</h3>
                    <p className="tl-place">{e.place}</p>
                  </div>
                  <span className="pill blue tl-dates">{e.dates}</span>
                </header>
                <ul className="tl-points">
                  {e.points.map((p) => <li key={p.slice(0, 24)}>{p}</li>)}
                </ul>
                <ul className="tags">{e.tags.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
