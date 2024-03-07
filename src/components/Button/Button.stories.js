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
    kind: {
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      control: { type: 'select' }
    },
    variant: {
      options: ['blue', 'red'],
      control: { type: 'select' }
    },
    type: {
      options: ['button', 'submit'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    },
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
  kind: 'secondary'
};

