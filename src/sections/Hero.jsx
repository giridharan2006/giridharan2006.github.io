import { useEffect, useState } from 'react';
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons.jsx';
import { profile } from '../data/profile.js';
import './hero.css';

// Each phase is grounded in a real project; the output lines restate project facts.
const phases = [
  { n: '01', name: 'Map', sub: 'ROS 2 · LiDAR', out: [['slam', 'lab + Gazebo maze mapped']], tone: 'blue' },
  { n: '02', name: 'See', sub: 'OpenCV', out: [['vision', 'vehicles → signal → ESP32']], tone: 'blue' },
  { n: '03', name: 'Reason', sub: 'neuro-symbolic', out: [['planner', 'ask only if it changes the plan']], tone: 'blue' },
  { n: '04', name: 'Decide', sub: 'cost gate', out: [['optimizer', '$d*7 → ($d<<3)-$d']], tone: 'ok', pill: 'ACCEPT' },
  { n: '05', name: 'Verify', sub: 'time-travel SQL', out: [['verifier', '4,294 claims, 0 invalid']], tone: 'ok', pill: 'VALID' },
];

function SystemPanel() {
  const [step, setStep] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    if (mq.matches) { setStep(phases.length - 1); return; }
    const id = setInterval(() => setStep((s) => (s + 1) % (phases.length + 1)), 2200);
    return () => clearInterval(id);
  }, []);

  const shown = reduce ? phases.length : Math.min(step + 1, phases.length);
  const active = step < phases.length ? step : phases.length - 1;

  return (
    <div className="panel" role="img" aria-label="Illustration: a pipeline from sensing to verified decisions, drawn from Giridharan's robotics, vision, AI agent, compiler and database projects.">
      <div className="panel-bar">
        <span className="mono panel-path">~/systems <span className="muted">— from sensors to decisions</span></span>
        <span className="pill blue panel-status"><span className="dot" />running</span>
      </div>

      <ol className="phases" aria-hidden="true">
        {phases.map((p, i) => (
          <li key={p.n} className={`phase ${i === active ? 'on' : ''} ${i < shown ? 'done' : ''}`}>
            <span className="phase-n mono">{p.n}{i === active && ' ·'}</span>
            <span className="phase-name">{p.name}</span>
            <span className="phase-sub">{p.sub}</span>
          </li>
        ))}
      </ol>

      <div className="console mono" aria-hidden="true">
        <div className="console-head">output · one line per phase, from real projects</div>
        {phases.slice(0, shown).map((p, i) => (
          <div key={p.n} className={`line ${i === shown - 1 && !reduce ? 'fresh' : ''}`}>
            <span className="tok-c">{p.n}</span>
            <span className="tok-k">{p.out[0][0]}</span>
            <span className="line-text">{p.out[0][1]}</span>
            {p.pill && <span className={`pill ${p.tone}`}>{p.pill}</span>}
          </div>
        ))}
        {shown < phases.length && <div className="line caret"><span className="tok-c">{phases[shown].n}</span><span className="cursor" /></div>}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={{ '--d': '0ms' }}>Computer Science Undergraduate · {profile.university}</p>
          <h1 className="hero-in" style={{ '--d': '80ms' }}>{profile.name}</h1>
          <p className="hero-role mono hero-in" style={{ '--d': '140ms' }}>
            {profile.focus.map((f, i) => (
              <span key={f}>{i > 0 && <span className="sep" aria-hidden="true">/</span>}{f}</span>
            ))}
          </p>
          <p className="hero-tagline hero-in" style={{ '--d': '200ms' }}>{profile.tagline}</p>
          <p className="hero-intro hero-in" style={{ '--d': '260ms' }}>{profile.intro}</p>

          <dl className="hero-meta hero-in" style={{ '--d': '320ms' }}>
            <div><dt>Studying at</dt><dd>{profile.university}</dd></div>
            <div><dt>Degree</dt><dd>{profile.degree}, {profile.years}</dd></div>
            <div><dt>CGPA</dt><dd className="accent">{profile.cgpa}</dd></div>
          </dl>

          <div className="hero-actions hero-in" style={{ '--d': '380ms' }}>
            <a className="btn btn-primary" href="#projects">Explore projects <ArrowIcon /></a>
            <a className="btn" href={profile.resume} download><DownloadIcon />Download résumé</a>
            <a className="btn btn-ghost" href="#contact"><MailIcon />Contact me</a>
          </div>

          <div className="hero-social hero-in" style={{ '--d': '440ms' }}>
            <a className="icon-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
            <a className="icon-link" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
            <a className="icon-link" href={profile.links.email} aria-label={`Email ${profile.email}`}><MailIcon /></a>
          </div>
        </div>

        <div className="hero-visual hero-in" style={{ '--d': '300ms' }}>
          <SystemPanel />
        </div>
      </div>
    </section>
  );
}
