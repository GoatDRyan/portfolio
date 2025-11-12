import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/nom-du-repo/', // ⚠️ remplace par le nom EXACT de ton repo GitHub
  server: {
    historyApiFallback: true,
  },
})
