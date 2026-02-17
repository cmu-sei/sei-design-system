import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
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
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      iconCustomizer(_collection, _icon, props) {
        props['aria-hidden'] = 'true'
        props['role'] = 'img'
      },
    }),
    Components({
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      dirs: ['src/docs', 'src/components'],
      resolvers: [ IconsResolver({ prefix: 'icon',
        enabledCollections: ['fa7-solid', 'fa7-regular']
      })]
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
