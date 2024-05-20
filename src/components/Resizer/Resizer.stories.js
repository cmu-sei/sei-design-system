import SdsResizer from './Resizer.vue';

export default {
  title: 'Containers/Resizer',
  parameters: {
    docs: {
      description: {
        component: 'Alpha: Allow an area to be resized (either vertically or horizontally) by clicking and dragging on the border.',
      },
    },
  },
  component: SdsResizer,
  argTypes: {
    clamp: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    min: {
      control: { type: 'number' }
    },
    max: {
      control: { type: 'number' }
    },
    direction: {
      options: ['bottom', 'right'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: {SdsResizer},
  setup() {
    return {args}
  },
  template: `
    <sds-resizer v-bind="args" class="w-full h-36">
      <div class="p-4">
        <div class="w-full flex flex-col justify-start bg-black dark:bg-white rounded-lg bg-opacity-5 p-4">
          <h1 class="text-xl font-bold">Resizer</h1>
          <p class="max-w-60 mb-1 mr-auto">This is the Storybook example for the Resizer component.</p>
        </div>
      </div>
    </sds-resizer>
  `
});

export const Default = Template.bind({});
Default.args = {
  /* Set default arguments */
};
