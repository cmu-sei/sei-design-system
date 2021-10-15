import SdsMultiselect from './Multiselect.vue';

export default {
  title: 'Inputs/Text fields/Multiselect',
  parameters: {
    docs: {
      description: {
        component: 'An advanced taggable form field that accepts text and displays a list of options.',
      },
    },
  },
  component: SdsMultiselect,
  argTypes: {
    // size: {
    //   options: ['sm', 'md', 'lg', 'xl'],
    //   control: { type: 'select' }
    // }
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsMultiselect },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-multiselect v-bind="$props" />
  `
});

export const Default = Template.bind({});
Default.args = {};

