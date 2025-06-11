import SdsButton from './Button.vue';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Buttons/Button',
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
      options: ['gray', 'blue', 'red', 'white'],
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

