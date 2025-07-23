import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', // source file
          dest: '.'                 // copy to root of /dist
        }
      ]
    })
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    cors: true
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
});
