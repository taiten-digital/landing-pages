import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output, no adapter: deployable to any static host (Vercel, Netlify,
// S3+CDN, etc.) or served path-based (domain.com/<client-slug>) behind any
// reverse proxy. Do not add an adapter unless a specific host is chosen.
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
