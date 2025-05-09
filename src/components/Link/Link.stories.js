import SdsLink from './Link.vue';

export default {
  title: 'Components/Navigation/Link',
  parameters: {
    docs: {
      description: {
        component: 'A link is a textual navigation element that directs users to a different location on the page or site.',
      },
    },
  },
  component: SdsLink,
  argTypes: {
    kind: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' }
    },
    type: {
      options: ['standalone', 'inline', 'cta'],
      control: { type: 'select' }
    },
    variant: {
      options: ['blue', 'red'],
      control: { type: 'select' }
    },
    decoration: {
      options: ['underline'],
      control: { type: 'select' }
    },
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
      Example link
    </sds-link>
  `
});

export const Default = Template.bind({});
Default.args = {
  kind: 'primary'
};
