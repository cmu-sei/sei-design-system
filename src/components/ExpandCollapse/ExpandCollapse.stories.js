import SdsExpandCollapse from './ExpandCollapse.vue';

export default {
  title: 'Components/Buttons/ExpandCollapse',
  parameters: {
    docs: {
      description: {
        component: 'An Expand Collapse allows users to show or hide content with a single click to help manage the amount of content on the page.',
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

