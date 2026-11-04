import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the user-site repository giridharan2006.github.io,
// so it lives at the domain root and the base path is "/".
// (For a project repository such as /portfolio/, set base to '/portfolio/'.)
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    sourcemap: false,
  },
});
