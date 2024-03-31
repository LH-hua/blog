import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['cesium'],
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium/'),
  },
  server: {
    open: true,
    // https:true,
    cors: true,
    host: '0.0.0.0',
    port: '5170',
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
      '/images': {
        target: 'http://127.0.0.1:6789/preject',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
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
      },
    },
  },
})
