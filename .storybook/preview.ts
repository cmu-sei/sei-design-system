import { Preview } from '@storybook/vue3'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      sort: 'alpha',
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
}

export default preview;