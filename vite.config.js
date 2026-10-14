import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import sitePlugin from './vite.site-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitePlugin()],
  resolve: {
    // Short paths to the font files used by the @font-face rules in src/index.css.
    alias: {
      '@inter-files': path.resolve('node_modules/@fontsource-variable/inter/files'),
      '@plex-files': path.resolve('node_modules/@fontsource/ibm-plex-mono/files'),
    },
  },
})
