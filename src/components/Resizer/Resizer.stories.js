import SdsResizer from './Resizer.vue';

export default {
  title: 'Containers/Resizer',
  parameters: {
    docs: {
      description: {
        component: 'Beta: Allow an area to be vertically resized by clicking and dragging on the bottom border.',
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

