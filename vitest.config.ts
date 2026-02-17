import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
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
      dts: false, // Don't generate types in Vitest
      resolvers: [ IconsResolver({ prefix: 'icon',
        enabledCollections: ['fa7-solid', 'fa7-regular']
      })]
    }),
    vue(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core'
      ],
      dts: 'auto-imports.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      include: [
        'src/components/**/*.vue',
        'src/composables/*.{js,ts}',
        'src/helpers/*.{js,ts}'
      ],
      provider: 'v8'
    },
    environment: 'jsdom',
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      'scripts/templates/*',
      'src/docs/*'
    ],
    setupFiles: ['./setup.ts']
  }
})