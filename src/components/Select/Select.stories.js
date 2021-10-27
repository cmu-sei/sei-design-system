import SdsSelect from './Select.vue';

export default {
  title: 'Inputs/Selections/Select',
  parameters: {
    docs: {
      description: {
        component: 'A select box form field.',
      },
    },
  },
  component: SdsSelect,
  argTypes: {
    name: { type: 'string' }
  }
};

const Template = (args) => ({
  components: { SdsSelect },
  setup() {
    return { args }
  },
  template: `
    <sds-select v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: 'option 1',
  options: [
    { id: 1, value: 'option 1', text: 'Option 1' },
    { id: 2, value: 'option 2', text: 'Option 2' },
    { id: 3, value: 'option 3', text: 'Option 3' },
  ]
};

