import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' keeps built asset paths relative, so dist/ works from any
// subpath or static host without extra config.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
