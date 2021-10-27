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

const Template = (args, { argTypes }) => ({
  components: { SdsModal },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <p>Use the properties below to display the modal.</p>
      <sds-modal v-bind="$props" />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true
};

