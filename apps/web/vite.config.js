import path from 'node:path';
import { readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const allDeps = Object.keys(pkg.dependencies || {});

const base = process.env.GITHUB_PAGES === 'true' ? '/Portfolio-KG/' : '/';

export default defineConfig({
  base,
  optimizeDeps: {
    include: allDeps,
  },
  plugins: [react()],
  server: {
    port: 3000,
    cors: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
