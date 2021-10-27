import SdsRadioGroup from './RadioGroup.vue';

export default {
  title: 'Inputs/Selections/RadioGroup',
  parameters: {
    docs: {
      description: {
        component: 'A radio group form field.',
      },
    },
  },
  component: SdsRadioGroup,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsRadioGroup },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-radio-group v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true,
  options: [
    { id: 1, value: true, text: 'Yes' },
    { id: 2, value: false, text: 'No' },
  ]
};

