import { useState } from 'react';
import DashField from '../components/DashField.jsx';
import Reveal from '../components/Reveal.jsx';
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons.jsx';
import { profile } from '../data/profile.js';
import './contact.css';

const VORTICES = [{ x: 0.85, y: 0.5 }];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the mailto link still works */ }
  };

  const channels = [
    { href: profile.links.email, icon: <MailIcon />, label: 'Email', value: profile.email, external: false },
    { href: profile.links.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn', value: 'in/giridharan-s-1bb012333', external: true },
    { href: profile.links.github, icon: <GitHubIcon />, label: 'GitHub', value: 'github.com/giridharan2006', external: true },
  ];

  return (
    <section id="contact" className="section contact">
      <DashField vortices={VORTICES} spacing={28} />
      <div className="contact-fade" aria-hidden="true" />
      <div className="container contact-inner">
        <Reveal className="section-head">
          <p className="eyebrow"><span className="num">07</span><span aria-hidden="true">·</span>Contact</p>
          <h2>Open to internships in robotics,<br className="br-lg" /> AI/ML and software engineering.</h2>
          <p className="lead">The quickest way to reach me is email. I am also happy to talk about any of the projects above.</p>
        </Reveal>

        <div className="channels">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a className="card channel" href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="channel-icon">{c.icon}</span>
                <span className="channel-text"><span className="channel-label mono">{c.label}</span><span className="channel-value">{c.value}</span></span>
                <span className="channel-arrow"><ArrowIcon /></span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="contact-actions">
          <button type="button" className="btn" onClick={copy} aria-live="polite">{copied ? 'Email copied ✓' : 'Copy email address'}</button>
          <a className="btn btn-primary" href={profile.resume} download><DownloadIcon />Download résumé (PDF)</a>
        </Reveal>
      </div>
    </section>
  );
}
