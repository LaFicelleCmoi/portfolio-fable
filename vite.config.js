import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' pour un déploiement facile sur GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
