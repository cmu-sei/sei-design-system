import { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  async viteFinal(config, { configType }) {
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