# giridharan2006.github.io

Personal portfolio of **Giridharan S**, Computer Science undergraduate at VIT Vellore.
Live at **https://giridharan2006.github.io/**

Built with React + Vite and deployed to GitHub Pages by GitHub Actions. The visual identity
(charcoal canvas, Inter + JetBrains Mono, periwinkle accents, decision-log tables, vortex
dash-field background) is adapted from my *Mini compiler for custom language* presentation.

## Structure

```
src/
  components/   Navigation, Footer, DashField (canvas background), Reveal, SectionHead, ProjectVisuals, Icons
  sections/     Hero, About, Skills, Experience, Projects, Education, Contact (+ one CSS file each)
  data/         profile.js, projects.js  ← edit content here
  assets/       project screenshots and charts (webp)
  styles/       global.css (design tokens), footer.css
public/
  resume/Giridharan_S_Resume.pdf
  favicon.svg, og-image.png, robots.txt
.github/workflows/deploy.yml
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`
to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.
Because this is the user-site repository (`<user>.github.io`), `vite.config.js` uses `base: '/'`.

## Updating content

- Text, skills, experience: `src/data/profile.js`
- Projects: `src/data/projects.js` (only add a `repo` link for a repository that exists)
- Résumé: replace `public/resume/Giridharan_S_Resume.pdf`, keeping the file name
