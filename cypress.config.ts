import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    screenshotsFolder: 'test/e2e/screenshots',
    supportFile: 'test/e2e/support/index.js',
    videosFolder: 'test/e2e/video',
    specPattern: 'src/components/**/*.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: false,
    video: false,
    // Increased timeout timings
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 120000,
    requestTimeout: 20000,
    responseTimeout: 60000,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  }
})
