import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist', // Damit der Build-Ordner wieder im Hauptverzeichnis landet
  }
})