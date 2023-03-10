import SdsIndicator from './Indicator.vue';
import SdsAvatar from '../Avatar/Avatar.vue';

export default {
  title: 'Data Visualization/Indicator',
  parameters: {
    docs: {
      description: {
        component: 'An indicator is a visual representation of a status used for notification or quick recognition.',
      },
    },
  },
  component: SdsIndicator,
  argTypes: {
    variant: {
      options: ['gray', 'blue', 'green', 'teal', 'orange', 'red'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    placement: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'select' }
    },
    placementOver: {
      options: ['portrait', 'circle'],
      control: { type: 'select' }
    },
  }
};

const Template = (args) => ({
  components: { SdsIndicator, SdsAvatar },
  setup() {
    return { args }
  },
  template: `
    <sds-indicator v-bind="args">
      <SdsAvatar
        name="John Doe"
        :size="args.size"
        :shape="args.placementOver"
      />
    </sds-indicator>
  `
});

export const Default = Template.bind({});
Default.args = {
  placement: 'bottom-right',
  placementOver: 'circle',
  variant: 'green',
  size: 'lg'
};

