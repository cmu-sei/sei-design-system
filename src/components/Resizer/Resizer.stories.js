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
    initial: {
      control: { type: 'number' }
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
    <sds-resizer v-bind="args" class="w-full">
      <div class="w-full flex flex-col justify-start p-4 bg-teal-25">
        <p class="mb-1 mr-auto w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.</p>
      </div>
    </sds-resizer>
  `
});

export const Default = Template.bind({});
Default.args = {
  /* Set default arguments */
};
