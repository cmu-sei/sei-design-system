import SdsModal from './Modal.vue';

export default {
  title: 'Containers/Modal',
  parameters: {
    docs: {
      description: {
        component: 'An overlay component that is typically shown after a user action such as a button click.',
      },
    },
  },
  component: SdsModal,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsModal },
  setup() {
    return { args }
  },
  template: `
    <div>
      <p>Use the properties below to display the modal.</p>
      <sds-modal v-model="localValue" v-bind="args" />
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
Default.args = {
};

