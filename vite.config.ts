import eslint from '@rollup/plugin-eslint'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/storybook/vue3/',
  plugins: [
    {
      ...eslint({
        include: '**/*.+(vue|js|jsx|ts|tsx)',
      }),
      enforce: 'pre',
    },
    vue()
  ],
  server: {
    fs: {
      allow: ['..']
    }
  }
})
