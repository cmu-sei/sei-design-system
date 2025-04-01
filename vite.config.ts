import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: true,
      routesFolder: 'src/docs/pages',
    }),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          '@unhead/vue': ['useHead', 'useSeoMeta', 'useScript'],
        },
      ],
      eslintrc: { enabled: true },
    }),
    Components({
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      dirs: ['src/docs'],
    }),
    vue()
  ],
  server: {
    hmr: { overlay: false },
    fs: {
      allow: ['..']
    }
  }
})
