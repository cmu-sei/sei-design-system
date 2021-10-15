import SdsToaster from './Toaster.vue';

export default {
  title: 'Misc/Toaster',
  parameters: {
    docs: {
      description: {
        component: 'A component that handles toast generation and removal.',
      },
    },
  },
  component: SdsToaster,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsToaster },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-toaster v-bind="$props" />
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: [
    {
      id: 1,
      variant: 'success',
      title: 'Success Title',
      text: 'Text of the toast',
      noAutoHide: true
    },
    {
      id: 2,
      variant: 'danger',
      title: 'Danger Title',
      text: 'Text of the toast',
      noAutoHide: true
    }
  ]
};

