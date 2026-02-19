import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Root path for username.github.io site
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimize for production
    minify: 'esbuild', // Use esbuild for minification (faster and built-in)
    sourcemap: false,
  },
});
