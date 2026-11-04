import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons.jsx';
import './navigation.css';

const items = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

export default function Navigation() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'top' ? '' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['top', ...items.map(([id]) => id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">gs</span>
          <span className="brand-name">Giridharan S</span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`} id="nav-menu">
          {items.map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>
                <span className="nav-num" aria-hidden="true">0{i + 1}</span>{label}
              </a>
            </li>
          ))}
          <li className="nav-cta-mobile">
            <a className="btn btn-primary" href={profile.resume} download onClick={() => setOpen(false)}><DownloadIcon />Download résumé</a>
          </li>
        </ul>

        <a className="btn btn-sm nav-cta" href={profile.resume} download><DownloadIcon />Résumé</a>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
    </header>
  );
}
