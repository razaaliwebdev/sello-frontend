import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Try this instead of localhost
    port: 5173,
    strictPort: true,
    cors: true // Enable CORS
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'] // If using any suspicious packages
  }
})