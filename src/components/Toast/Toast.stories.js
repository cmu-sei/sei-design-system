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
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsToast },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-toast v-bind="$props" />
  `
});

export const Default = Template.bind({});
Default.args = {
  toast: {
    id: 1,
    variant: 'success',
    title: 'Title',
    text: 'Text of the toast'
  }
};

