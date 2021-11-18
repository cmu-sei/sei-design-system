import SdsTab from './Tab.vue';

export default {
  title: 'Navigation/Tab',
  parameters: {
    docs: {
      description: {
        component: 'An text control that provides the user a simple way to trigger an event.',
      },
    },
  },
  component: SdsTab,
  argTypes: {
    tag: {
      options: ['button', 'a'],
      control: { type: 'select' }
    },
    variant: {
      options: ['', 'primary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' }
    },
    type: {
      options: ['', 'underline', 'overline', 'pill', 'block'],
      control: { type: 'select' }
    },
    active: {
      options: [true, false],
      control: { type: 'radio' }
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
};

const Template = (args) => ({
  components: { SdsTab },
  setup() {
    return { args }
  },
  template: `
    <sds-tab
      v-bind="args"
    >
      Example tab
    </sds-tab>
  `
});

export const Default = Template.bind({});
Default.args = {};

