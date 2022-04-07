
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import path from 'path'

export default defineConfig({
  plugins: [vue(), vueJsx(), eslintPlugin({
    cache: false
  }), styleImport({
    resolves: [VantResolve()]
  })],
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/api': {
        target: ' http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')

      }
      // '/api': {
      //   target: 'http:/localhost:7002/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace('/api', '')
      // }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
