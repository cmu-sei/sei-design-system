import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core'
      ],
      dts: 'auto-imports.d.ts'
    }),
    Components({
      dirs: ['src/components'],
      directoryAsNamespace: true,
      dts: 'components.d.ts'
    })
  ],
  test: {
    coverage: {
      include: [
        'src/components/**/*.{spec,vue}',
        'src/helpers/*.{js,ts}'
      ],
      exclude: [
        ...configDefaults.exclude,
        'scripts/templates/*',
        'src/docs/*'
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
    setupFiles: './setup.ts',
  }
})