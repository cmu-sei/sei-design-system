import Sds---NAME--- from './---NAME---.vue';

export default {
  title: 'CATEGORY/---NAME---',
  parameters: {
    docs: {
      description: {
        component: '---DESCRIPTION---',
      },
    },
  },
  component: Sds---NAME---,
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
  components: {Sds---NAME---},
  setup() {
    return {args}
  },
  template: `
    <sds----NAME-LOWER--- v-bind="args"/>
  `
});

export const Default = Template.bind({});
Default.args = {
  /* Set default arguments */
};

