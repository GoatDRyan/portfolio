import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
  },
  server: {
    // Pour le mode dev
    historyApiFallback: true,
  },
  preview: {
    // Pour la version buildée (utile pour tester avant déploiement)
    historyApiFallback: true,
  },
})
