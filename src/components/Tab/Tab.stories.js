import SdsTab from './Tab.vue';

export default {
  title: 'Navigation/Tab',
  parameters: {
    docs: {
      description: {
        component: 'A tab is a textual component that organizes information of the same hierarchy across different views or interactions.',
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
      options: ['', 'primary', 'danger'],
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

