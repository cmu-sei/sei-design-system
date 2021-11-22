import SdsButton from './Button.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/Button',
  parameters: {
    docs: {
      description: {
        component: 'A button allows users to take action or make a choice with a single tap.',
      },
    },
  },
  component: SdsButton,
  argTypes: {
    variant: {
      options: ['', 'default', 'primary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' }
    },
    size: {
      options: ['', 'sm'],
      control: { type: 'select' }
    },
    outline: {
      options: [true, false],
      control: { type: 'radio' }
    },
    block: {
      options: [true, false],
      control: { type: 'radio' }
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
};

const Template = (args) => ({
  components: { SdsButton },
  setup() {
    return { args }
  },
  template: `
    <sds-button
      v-bind="args"
      @click="onClick"
    >
      Button
    </sds-button>
  `,
  methods: {
    onClick: action('onClick')
  }
});

export const Default = Template.bind({});
Default.args = {
  variant: 'default'
};

