import SdsResizer from './Resizer.vue';

export default {
  title: 'CATEGORY/Resizer',
  parameters: {
    docs: {
      description: {
        component: 'Resize some components',
      },
    },
  },
  component: SdsResizer,
  argTypes: {
    /* Example:
    position: {
      options: ['bottom', 'center', 'left', 'right', 'top'],
      control: {type: 'select'}
    },
    */
  }
};

const Template = (args) => ({
  components: {SdsResizer},
  setup() {
    return {args}
  },
  template: `
    <sds-resizer v-bind="args"/>
  `
});

export const Default = Template.bind({});
Default.args = {
  /* Set default arguments */
};

