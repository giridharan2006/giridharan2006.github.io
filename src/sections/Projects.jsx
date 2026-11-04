import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import { GitHubIcon } from '../components/Icons.jsx';
import { CineTraceVisual, CompilerVisual, NetworkVisual } from '../components/ProjectVisuals.jsx';
import { TravelArchitecture, TravelGallery, TravelWorkflow } from '../components/TravelShowcase.jsx';
import { projects, robotics } from '../data/projects.js';
import './projects.css';

const visuals = { cinetrace: CineTraceVisual, compiler: CompilerVisual, travel: TravelGallery, network: NetworkVisual };

function RepoButton({ href, label }) {
  if (!href) return null;
  return (
    <a className="btn btn-sm" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} on GitHub (opens in a new tab)`}>
      <GitHubIcon />View on GitHub
    </a>
  );
}

function ProjectCard({ p, flip }) {
  const Visual = visuals[p.visual];
  return (
    <Reveal as="article" className={`card project ${flip ? 'flip' : ''} ${p.featured ? 'featured' : ''}`} aria-labelledby={`p-${p.id}`}>
      {p.featured && <span className="featured-tag mono">featured AI project</span>}
      <div className="project-copy">
        <p className="eyebrow"><span className="num">{p.index}</span><span aria-hidden="true">·</span>{p.kicker}</p>
        <h3 id={`p-${p.id}`} className="project-title">{p.title}</h3>
        <p className="project-sub">{p.subtitle}</p>
        <p className="project-dates mono">{p.dates}</p>
        <p className="project-desc">{p.description}</p>
        <ul className="project-points">{p.points.map((x) => <li key={x.slice(0, 24)}>{x}</li>)}</ul>
        <div className="project-stats">
          {p.stats.map((s) => (
            <div key={s.l} className="stat"><span className="stat-v">{s.v}</span><span className="stat-l">{s.l}</span></div>
          ))}
        </div>
        <ul className="tags project-stack" aria-label="Technologies">{p.stack.map((t) => <li key={t} className="tag accent">{t}</li>)}</ul>
        <RepoButton href={p.repo} label={p.title} />
      </div>
      <div className="project-visual">{Visual && <Visual />}</div>
      {p.featured && (
        <div className="project-deep">
          <TravelWorkflow />
          <TravelArchitecture />
        </div>
      )}
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          num="04"
          label="Projects"
          title="Selected work"
          lead="Systems I have built or co-built, described with what the code and reports actually show."
        />
        <div className="project-list">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} flip={i % 2 === 1} />)}
        </div>

        <Reveal className="robo-head">
          <p className="eyebrow"><span className="num">05</span><span aria-hidden="true">·</span>Robotics & embedded</p>
          <h3>Robots, sensors and hardware</h3>
        </Reveal>
        <div className="robo-grid">
          {robotics.map((r, i) => (
            <Reveal as="article" key={r.title} delay={i * 80} className="card robo-card">
              <p className="robo-meta mono">{r.meta}</p>
              <h4>{r.title}</h4>
              <p className="robo-text">{r.text}</p>
              <ul className="tags">{r.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
              <RepoButton href={r.repo} label={r.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
