import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { skills } from '../data/profile.js';
import './skills.css';

// Which projects use which skill groups; hovering a filter highlights the groups.
const filters = [
  { id: 'all', label: 'everything', groups: null },
  { id: 'robotics', label: 'robotics', groups: ['robotics', 'languages', 'tools', 'ai'] },
  { id: 'ai', label: 'ai & vision', groups: ['ai', 'languages', 'backend', 'db'] },
  { id: 'software', label: 'software', groups: ['frontend', 'backend', 'db', 'tools', 'concepts', 'languages'] },
];

export default function Skills() {
  const [f, setF] = useState('all');
  const active = filters.find((x) => x.id === f).groups;

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead num="02" label="Technical skills" title="The toolkit" lead="Only tools I have used in the projects and roles on this page." />

        <Reveal className="skill-filter" role="group" aria-label="Highlight skills by area">
          <span className="mono muted filter-prompt">filter --area</span>
          {filters.map((x) => (
            <button key={x.id} type="button" className={`chip ${f === x.id ? 'on' : ''}`} aria-pressed={f === x.id} onClick={() => setF(x.id)}>{x.label}</button>
          ))}
        </Reveal>

        <div className="skill-grid">
          {skills.map((g, i) => (
            <Reveal key={g.key} delay={i * 50} className={`card skill-card ${active && !active.includes(g.key) ? 'dim' : ''}`}>
              <p className="skill-label mono"><span className="tok-c">{String(i + 1).padStart(2, '0')}</span> {g.label}</p>
              <ul className="tags">
                {g.items.map((s) => <li key={s} className="tag">{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
