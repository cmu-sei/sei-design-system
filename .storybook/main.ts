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
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource"
  ],
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
};

export default config;