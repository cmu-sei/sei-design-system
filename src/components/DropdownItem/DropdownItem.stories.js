import SdsDropdownItem from './DropdownItem.vue';

export default {
  title: 'Buttons/Dropdowns/DropdownItem',
  parameters: {
    docs: {
      description: {
        component: 'An item for use as a child to a dropdown.',
      },
    },
  },
  component: SdsDropdownItem,
  argTypes: {
    tag: {
      options: ['a', 'button'],
      control: { type: 'radio' }
    }
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsDropdownItem },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-dropdown-item v-bind="args">
      Content of default slot
    </sds-dropdown-item>
  `
});

export const Default = Template.bind({});
Default.args = {};

