import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss' // Importas tailwindcss
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()], // Lo añades como plugin de PostCSS
    },
  },
})