import SdsLoadingSkeleton from './LoadingSkeleton.vue';

export default {
  title: 'Components/Feedback/Loading Skeleton',
  parameters: {
    docs: {
      description: {
        component: 'A loading skeleton assures users that their request is in progress, helping to create the illusion of shorter load times.',
      },
    },
  },
  component: SdsLoadingSkeleton,
  argTypes: {
    width: {
      options: ['w-1/2','w-1/3', 'w-2/3', 'w-1/5', 'w-2/5','w-3/5', 'w-4/5', 'w-full'],
      control: { type: 'select' },
      description :'Set the width of the skeleton. Accepts tailwind width classes.'
    },
    height: {
      options: ['h-2','h-4', 'h-8','h-16','h-32', 'h-48', 'h-64', 'h-72', 'h-full', 'h-screen'],
      control: { type: 'select' },
      description :'Set the height of the skeleton. Accepts tailwind height classes.'
    },
  }
};

const Template = (args) => ({
  components: { SdsLoadingSkeleton },
  setup() {
    return { args }
  },
  template: `
    <div class="w-1/2 h-64">
    <sds-loading-skeleton v-bind="args" />
    </div>

  `
});

export const Default = Template.bind({});
Default.args = {};
