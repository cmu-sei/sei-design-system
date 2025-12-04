import type { Preview } from '@storybook/vue3-vite'
import "../tailwindcss/tailwind.css"

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Global color scheme for components',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Color scheme',
        icon: 'mirror',
        // Array of plain string values or MenuItem shape (see below)
        items: ['light', 'dark'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Global theme for components',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'paintbrush',
        // Array of plain string values or MenuItem shape (see below)
        items: ['sds-theme-forge', 'sds-theme-plaid'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    colorScheme: 'light',
    theme: 'sds-theme-forge',

    backgrounds: {
      value: 'transparent'
    }
  },

  decorators: [
    (_, context) => {
      const colorScheme = context.globals.colorScheme || 'light';
      const theme = context.globals.theme || 'sds-theme-forge';
      return {
        template: `<div class="${colorScheme} ${theme}"><story /></div>`,
      }
    },
  ],

  parameters: {
    backgrounds: {
      options: {
        transparent: { name: 'transparent', value: 'transparent' },
        white: { name: 'white', value: '#ffffff' },
        "gray-25": { name: 'gray-25', value: '#f8f8f8' },
        "gray-50": { name: 'gray-50', value: '#f0f1f1' },
        "gray-900": { name: 'gray-900', value: '#1b1c1d' },
        "gray-950": { name: 'gray-950', value: '#0e0e0f' },
        black: { name: 'black', value: '#000000' },
        "blue-500": { name: 'blue-500', value: '#007cba' }
      }
    },

    controls: {
      sort: 'alpha',
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    docs: {
      codePanel: true
    }
  },

  tags: ['autodocs']
}

export default preview;