import SdsCheckboxGroup from './CheckboxGroup.vue';

export default {
  title: 'Components/Inputs/Checkbox Group',
  parameters: {
    docs: {
      description: {
        component: 'A checkbox group allows users to pick multiple options from a list. ',
      },
    },
  },
  component: SdsCheckboxGroup,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsCheckboxGroup },
  setup() {
    return { args }
  },
  template: `
    <sds-checkbox-group v-model="localValue" v-bind="args" />
  `,
  data() {
    return { localValue: [] }
  }
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 1, value: 'option 1', text: 'Option 1' },
    { id: 2, value: 'option 2', text: 'Option 2' },
    { id: 3, value: 'option 3', text: 'Option 3' },
  ]
};

