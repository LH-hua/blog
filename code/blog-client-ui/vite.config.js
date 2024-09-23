import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'client', // 设置打包输出的目录为 dist
  },
  plugins: [vue(), vueDevTools()],
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
      },
      '/images': {
        target: 'http://127.0.0.1:6789/preject',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
      '/docImagePath': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docImagePath/, ''),
      },
      '/post/image': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imgPath/, ''),
      },
      '/post/detal': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/post\/detal/, ''),
      },
    },
  },
})
