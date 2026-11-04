import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono">© {new Date().getFullYear()} {profile.name} · built with React + Vite · hosted on GitHub Pages</p>
        <a href="#top" className="mono">back to top ↑</a>
      </div>
    </footer>
  );
}
