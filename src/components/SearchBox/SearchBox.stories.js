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

const Template = (args) => ({
  components: { SdsSearchBox },
  setup() {
    return { args }
  },
  template: `
    <sds-search-box v-model="localValue" v-bind="args" />
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

