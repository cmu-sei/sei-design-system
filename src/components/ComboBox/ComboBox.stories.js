import SdsComboBox from './ComboBox.vue';

export default {
  title: 'Components/Inputs/Combo Box',
  parameters: {
    docs: {
      description: {
        component: 'A Combo Box is an input field that allows users to perform a simple search or select an item from a list of dynamically filtered options based on their query.',
      },
    },
  },
  component: SdsComboBox,
  argTypes: {
    variant: {
      options: ['gray', 'blue', 'red'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsComboBox },
  setup() {
    return { args }
  },
  template: `
    <sds-combo-box v-model="localValue" v-bind="args" />
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
Default.args = {};

