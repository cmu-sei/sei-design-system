import SdsExpandCollapse from './ExpandCollapse.vue';

export default {
  title: 'Buttons/ExpandCollapse',
  parameters: {
    docs: {
      description: {
        component: 'A button allows users to expand or collapse a list of items.',
      },
    },
  },
  component: SdsExpandCollapse,
  argTypes: {
  }
};

const Template = (args) => ({
  components: { SdsExpandCollapse },
  setup() {
    return { args }
  },
  template: `
    <sds-expand-collapse
      v-bind="args"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
};

