import SdsActionButton from './ActionButton.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/Action Button',
  parameters: {
    docs: {
      description: {
        component: 'An Action Button allows users to perform task-oriented actions within a workflow, form, or page. It is designed to be a minimal distraction from the interface.',
      },
    },
  },
  component: SdsButton,
  argTypes: {
    kind: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'select' }
    },
    variant: {
      options: ['gray', 'red'],
      control: { type: 'select' }
    },
    type: {
      options: ['button', 'submit'],
      control: { type: 'select' }
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' }
    },
  }
};

const Template = (args) => ({
  components: { SdsActionButton },
  setup() {
    return { args }
  },
  template: `
    <sds-action-button
      v-bind="args"
      @click="onClick"
    >
      Action Button
    </sds-action-button>
  `,
  methods: {
    onClick: action('onClick')
  }
});

export const Default = Template.bind({});
Default.args = {
  kind: 'secondary'
};

