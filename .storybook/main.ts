import { StorybookConfig } from '@storybook/vue3-vite'
import Components from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  async viteFinal(config, { configType }) {
    // Add auto-import support for FontAwesomeIcon in Storybook
    config.plugins = config.plugins || []
    config.plugins.push(
      Components({
        dts: false, // Don't generate types in Storybook
        resolvers: [
          (componentName) => {
            if (componentName === 'FontAwesomeIcon') {
              return { name: 'FontAwesomeIcon', from: '@fortawesome/vue-fontawesome' }
            }
          }
        ],
      })
    )

    // customize the Vite config here
    if (configType === 'DEVELOPMENT') {
      config.base = '/';
    } else {
      config.base = './';
    }

    // return the customized config
    return config;
  },

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", '@storybook/addon-docs'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  }
};

export default config;