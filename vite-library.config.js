/// <reference types="vitest" />

const { resolve } = require('path')
const eslint = require('@rollup/plugin-eslint');
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log(resolve(__dirname, process.env.LIB_ROOT, 'index.js'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{
    ...eslint({
      include: '**/*.+(vue|js|jsx|ts|tsx)',
      throwOnError: true,
      throwOnWarning: true,
    }),
    enforce: 'pre',
  }, vue()],
  publicDir: false,
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, process.env.LIB_ROOT, 'index.ts'),
      name: process.env.LIB_NAME || 'SeiDesignSystem',
      fileName: format => {
        if (format === 'es') {
          return `index.mjs`
        }
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // remove the default exports warning
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
