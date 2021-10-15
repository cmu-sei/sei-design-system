import SdsLayoutSeiExternalWordmark from './LayoutSeiExternalWordmark.vue';

export default {
  title: 'Layouts/LayoutSeiExternalWordmark',
  parameters: {
    docs: {
      description: {
        component: 'The wordmark for the LayoutSeiExternal layout.',
      },
    },
  },
  component: SdsLayoutSeiExternalWordmark,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsLayoutSeiExternalWordmark },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-layout-sei-external-wordmark v-bind="$props"></sds-layout-sei-external-wordmark>
  `
});

export const Default = Template.bind({});
Default.args = {};

