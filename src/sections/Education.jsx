import Reveal from '../components/Reveal.jsx';
import { ExternalIcon } from '../components/Icons.jsx';
import { certifications, education } from '../data/profile.js';
import './education.css';

export default function Education() {
  return (
    <section id="education" className="section paper-band">
      <div className="container">
        <div className="paper-panel">
        <Reveal className="section-head">
          <p className="eyebrow"><span className="num">06</span><span aria-hidden="true">·</span>Education & certifications</p>
          <h2>Learning, formally and otherwise</h2>
        </Reveal>

        <div className="edu-grid">
          <Reveal as="article" className="edu-main">
            <p className="edu-kicker mono">Undergraduate · {education.years}</p>
            <h3>{education.school}</h3>
            <p className="edu-degree">{education.degree} · {education.place}</p>
            <div className="edu-cgpa">
              <span className="edu-cgpa-v">{education.cgpa}</span>
              <span className="edu-cgpa-l">CGPA (till date)</span>
            </div>
            <ul className="edu-earlier">
              {education.earlier.map((e) => (
                <li key={e.name}><span>{e.name}</span><span className="mono">{e.years} · {e.score}</span></li>
              ))}
            </ul>
          </Reveal>

          <ol className="cert-list">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="cert">
                <span className="cert-n mono">0{i + 1}</span>
                <div>
                  <h4>{c.href ? <a href={c.href} target="_blank" rel="noopener noreferrer">{c.title}<ExternalIcon /></a> : c.title}</h4>
                  <p className="cert-org">{c.org} · <span className="mono">{c.dates}</span></p>
                  <p className="cert-note">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </section>
  );
}
