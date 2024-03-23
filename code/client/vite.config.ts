import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    // https:true,
    cors: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3333/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/avatar': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/avatar/, ''),
      },
      '/image': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/image/, ''),
      },
      '/post/image': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/post/, ''),
      },
      '/post/detal': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/post\/detal/, ''),
      }
    }
  }
})
