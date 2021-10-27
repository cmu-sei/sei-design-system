import SdsDropdownHeader from './DropdownHeader.vue';

export default {
  title: 'Buttons/Dropdowns/DropdownHeader',
  parameters: {
    docs: {
      description: {
        component: 'A divider for use as a child to a dropdown.',
      },
    },
  },
  component: SdsDropdownHeader,
  argTypes: {
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsDropdownHeader },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-dropdown-header>
      Content of default slot
    </sds-dropdown-header>
  `
});

export const Default = Template.bind({});
Default.args = {};
