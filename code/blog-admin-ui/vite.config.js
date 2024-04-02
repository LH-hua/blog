import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8848,
    open: true,
    // https:true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3333/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'http://127.0.0.1:6789/preject',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
    },
  },
})
