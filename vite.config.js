import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base URL for GitHub Pages deployment
  base: process.env.DEPLOY_BASE_URL || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})