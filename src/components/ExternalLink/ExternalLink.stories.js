import SdsExternalLink from './ExternalLink.vue';

export default {
  title: 'Navigation/ExternalLink',
  parameters: {
    docs: {
      description: {
        component: 'An anchor tag with helpful built-in properties that links to external resources. DEPRECATED: Use Link component instead.',
      },
    },
  },
  component: SdsExternalLink,
  argTypes: {
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsExternalLink },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-external-link href="#" v-bind="$props">
      Content of link
    </sds-external-link>
  `
});

export const Default = Template.bind({});
Default.args = {};
