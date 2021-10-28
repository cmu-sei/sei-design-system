import SdsLink from './Link.vue';

export default {
  title: 'Navigation/Link',
  parameters: {
    docs: {
      description: {
        component: 'An text control that provides the user a simple way to trigger an event.',
      },
    },
  },
  component: SdsLink,
  argTypes: {
    variant: {
      options: ['', 'primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' }
    },
    cta: {
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
  components: { SdsLink },
  setup() {
    return { args }
  },
  template: `
    <sds-link
      href="#"
      v-bind="args"
    >
      Default slot
    </sds-link>
  `
});

export const Default = Template.bind({});
Default.args = {};

