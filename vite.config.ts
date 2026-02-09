import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

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
      dirs: ['src/docs', 'src/components'],
      resolvers: [
        (componentName) => {
          if (componentName === 'FontAwesomeIcon') {
            return { name: 'FontAwesomeIcon', from: '@fortawesome/vue-fontawesome' }
          }
        }
      ],
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    hmr: { overlay: false },
    fs: {
      allow: ['..']
    }
  }
})
