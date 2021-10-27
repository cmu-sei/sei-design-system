import SdsScrollArea from './ScrollArea.vue';

export default {
  title: 'Utility/ScrollArea',
  parameters: {
    docs: {
      description: {
        component: 'An wrapper that provides a visible scroll bar.',
      },
    },
  },
  component: SdsScrollArea,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsScrollArea },
  setup() {
    return { args }
  },
  template: `
    <sds-scroll-area v-bind="args" class="h-64 w-32">
      <div class="h-96">Default slot</div>
    </sds-scroll-area>
  `
});

export const Default = Template.bind({});
Default.args = {};

