import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

console.log(resolve(__dirname, process.env.LIB_ROOT, 'index.js'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"' },
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
    environment: 'jsdom',
  },
})
