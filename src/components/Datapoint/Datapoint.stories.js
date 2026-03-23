import SdsDatapoint from './Datapoint.vue';

export default {
  title: 'Components/Data Visualization/Datapoint',
  parameters: {
    docs: {
      description: {
        component: 'A datapoint displays at-a-glance data for a user to quickly view key metrics.',
      },
    },
  },
  component: SdsDatapoint,
  argTypes: {
    variant: {
      options: ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsDatapoint },
  setup() {
    return { args }
  },
  template: `
    <sds-datapoint v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: 8675309,
  label: 'Label',
  context: 'Context'
};

