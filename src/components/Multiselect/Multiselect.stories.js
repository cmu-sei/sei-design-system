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

const Template = (args) => ({
  components: { SdsMultiselect },
  setup() {
    return { args }
  },
  template: `
    <div style="height: 28rem">
      <sds-multiselect v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {};

