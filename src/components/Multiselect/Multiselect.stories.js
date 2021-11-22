import SdsMultiselect from './Multiselect.vue';

export default {
  title: 'Inputs/Text fields/Multiselect',
  parameters: {
    docs: {
      description: {
        component: 'A multiselect is an advanced form field that allows users to select multiple options from a predefined set and displays them as pills within the field.',
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
      <sds-multiselect v-model="localValue" v-bind="args" />
    </div>
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

