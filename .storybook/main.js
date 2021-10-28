module.exports = {
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
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "storybook-builder-vite"
  }
}