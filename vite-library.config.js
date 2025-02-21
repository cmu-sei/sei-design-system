import { resolve } from 'path'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { unheadComposablesImports } from 'unhead'

console.log(resolve(__dirname, process.env.LIB_ROOT, 'index.js'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      dts: true,
      imports: [
        'vue',
        '@vueuse/core',
        unheadComposablesImports[0]
      ],
      eslintrc: { enabled: true },
    }),
    vue()
  ],
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
        },
        // ensure we use style.css naming
        assetFileNames: (assetInfo) => {
          const names = assetInfo.names.map(name => {
            if (name === 'sei-design-system.css') {
              return 'style.css'
            }
            return name
          })
          return `${names}`;
        },
      }
    }
  },
  test: {
    environment: 'jsdom',
    exclude: [
      ...configDefaults.exclude,
      'scripts/templates/*'
    ],
    setupFiles: ['./setup.ts']
  },
})
