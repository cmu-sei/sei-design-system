import { StorybookConfig } from '@storybook/vue3-vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const config: StorybookConfig = {
  async viteFinal(config, { configType }) {
    // Add auto-import support for Icons in Storybook
    config.plugins = config.plugins || []
    config.plugins.push(
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        iconCustomizer(_collection, _icon, props) {
          props['aria-hidden'] = 'true'
          props['role'] = 'img'
        },
      }),
      Components({
        dts: false, // Don't generate types in Storybook
        resolvers: [ IconsResolver({ prefix: 'icon',
          enabledCollections: ['fa7-solid', 'fa7-regular']
        })]
      }),
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