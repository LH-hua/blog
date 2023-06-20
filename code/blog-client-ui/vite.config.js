import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['cesium'],
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium/'),
  },
  server: {
    open:true,
    // https:true,
    cors: true,
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3333',
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
      }
    }
  }
})
