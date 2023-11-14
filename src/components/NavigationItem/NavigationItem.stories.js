import SdsNavigationItem from './NavigationItem.vue';

export default {
  title: 'Navigation/Navigation Item',
  parameters: {
    docs: {
      description: {
        component: 'Alpha: A Navigation Item is a stylized link. It can be used to populate a Mobile Menu.',
      },
    },
  },
  component: SdsNavigationItem,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Display with "disabled" styling— link will become grayed-out and unusable.' ,
    },
    external: {
      control: { type: 'boolean' },
      description: 'Set link attributes to open in a new window with noreferrer options set.' ,
    },
    label: {
      control: { type: 'text' },
      description: 'Set the main text to display in this Navigation Item.',
    }
  }
};

const Template = (args) => ({
  components: { SdsNavigationItem },
  setup() {
    return { args }
  },
  template: `
    <sds-mobile-menu-item class="group" v-bind="args">
      <script>console.log(${JSON.stringify(args)})</script>
    </sds-mobile-menu-item>
  `
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  external: false,
  label: 'Navigation Item Label',
};
