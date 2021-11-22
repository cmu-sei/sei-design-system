import SdsInput from './Input.vue';

export default {
  title: 'Inputs/Text fields/Input',
  parameters: {
    docs: {
      description: {
        component: 'An input is a standard text field that allows users to enter a freeform response that includes letters, numbers, or symbols.',
      },
    },
  },
  component: SdsInput,
  argTypes: {
    type: {
      options: ['date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsInput },
  setup() {
    return { args }
  },
  template: `
    <sds-input v-model="localValue" v-bind="args" />
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

