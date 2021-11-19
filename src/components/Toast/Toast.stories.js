import SdsToast from './Toast.vue';

export default {
  title: 'Feedback/Toast',
  parameters: {
    docs: {
      description: {
        component: 'An toast for use with the Toaster component.',
      },
    },
  },
  component: SdsToast,
  argTypes: {
    variant: {
      options: ['success', 'info', 'warning', 'danger'],
      control: { type: 'select' }
    },
  }
};

const Template = (args) => ({
  components: { SdsToast },
  setup() {
    return { args }
  },
  template: `
    <sds-toast v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  id: 1,
  variant: 'success',
  title: 'Title',
  text: 'Text of the toast'
};

