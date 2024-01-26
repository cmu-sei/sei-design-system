import SdsComboBox from './ComboBox.vue';

export default {
  title: 'Inputs/Combo Box',
  parameters: {
    docs: {
      description: {
        component: 'A combo box is a text field allows users to type in search terms and execute it by clicking the magnifying glass icon.',
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

