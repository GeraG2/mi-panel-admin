import { defineConfig } from 'vite'
// import tailwindcss from 'tailwindcss' // No longer needed here
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // css: { // PostCSS config is now in postcss.config.js
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
})