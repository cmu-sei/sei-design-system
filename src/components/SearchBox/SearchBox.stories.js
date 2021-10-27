import SdsSearchBox from './SearchBox.vue';

export default {
  title: 'Inputs/SearchBox',
  parameters: {
    docs: {
      description: {
        component: 'A form field that presents itself as a search box.',
      },
    },
  },
  component: SdsSearchBox,
  argTypes: {
    variant: {
      options: ['default', 'primary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' }
    }
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsSearchBox },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-search-box v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {};

