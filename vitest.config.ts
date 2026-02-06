import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
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