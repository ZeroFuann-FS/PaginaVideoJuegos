// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // CAMBIO CRUCIAL: Usar rutas relativas
  base: './', 
  plugins: [vue()],
})