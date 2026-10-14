import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitePlugin from './vite.site-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitePlugin()],
})
