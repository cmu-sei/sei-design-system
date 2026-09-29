import { resolve } from 'path'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const isVueUseInvalidAnnotation = log => (
  log.code === 'INVALID_ANNOTATION' &&
  log.message.includes('node_modules/@vueuse/core/dist/index.js')
)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      iconCustomizer(_collection, _icon, props) {
        props['aria-hidden'] = 'true'
        props['role'] = 'img'
      },
    }),
    Components({
      dts: false,
      resolvers: [ IconsResolver({ prefix: 'icon',
        enabledCollections: ['fa7-solid', 'fa7-regular']
      })]
    }),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        '@vueuse/core',
        {
          '@unhead/vue': ['useHead', 'useSeoMeta', 'useScript'],
        },
      ],
      eslintrc: { enabled: true },
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  publicDir: false,
  define: { 'process.env.NODE_ENV': JSON.stringify(mode === 'test' ? 'test' : 'production') },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(import.meta.dirname, process.env.LIB_ROOT, 'index.ts'),
      name: process.env.LIB_NAME || 'SeiDesignSystem',
      fileName: format => {
        if (format === 'es') {
          return `index.mjs`
        }
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      onLog(level, log, defaultHandler) {
        if (level === 'warn' && isVueUseInvalidAnnotation(log)) {
          return
        }

        defaultHandler(level, log)
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue'
      ],
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
    setupFiles: ['./setup.ts'],
    coverage: {
      include: [
        'src/components/**/*.vue',
        'src/composables/**/*.{js,ts}',
        'src/helpers/**/*.{js,ts}',
        'src/lib/*.{js,ts}'
      ],
      provider: 'v8'
    }
  },
}))
