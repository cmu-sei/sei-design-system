import SdsTextarea from './Textarea.vue';

export default {
  title: 'Inputs/Text fields/Textarea',
  parameters: {
    docs: {
      description: {
        component: 'An textarea form field for long content input.',
      },
    },
  },
  component: SdsTextarea,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsTextarea },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-textarea v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {};

