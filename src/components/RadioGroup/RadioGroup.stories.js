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

const Template = (args) => ({
  components: { SdsRadioGroup },
  setup() {
    return { args }
  },
  template: `
    <sds-radio-group v-model="localValue" v-bind="args" />
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true,
  options: [
    { id: 1, value: true, text: 'Yes' },
    { id: 2, value: false, text: 'No' },
  ]
};

