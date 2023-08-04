import SdsPanel from './Panel.vue';

export default {
  title: 'Containers/Panel',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 300
      },
      description: {
        component: 'Alpha: A Drawer is a panel that slides in from the edge of the screen over the page content. It contains supplementary content or actions to support tasks as part of a flow.'
      },
    },
  },
  component: SdsPanel,
  argTypes: {
    size: {
      options: ['sm', 'md', 'auto'],
      control: { type: 'select' }
    },
    side: {
      options: ['left', 'right'],
      control: { type: 'select' }
    },
    zIndex: {
      options: ['0', '10', '20', '30', '40', '50', 'auto'],
      control: {type: 'select'}
    }
  }
};

const Template = (args) => ({
  components: { SdsPanel },
  setup() {
    return { args }
  },
  template: `
    <div>
      <p class="mb-4">Use the button below to toggle the panel.</p>
      <button class="btn btn-primary" @click="localValue = !localValue">Toggle Panel</button>
      <sds-panel v-model="localValue" v-bind="args">
        <template #title>
          Panel title
        </template>
        <template #navigationIcon>
          <svg
              class="w-6 h-6 cursor-pointer self-center mr-2"
              height="32"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
              @click="localValue = false"
          >
            <path d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
                  fill="currentColor" />
          </svg>
        </template>
        <div class="relative h-full overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
          <svg class="absolute inset-0 h-full w-full stroke-gray-900/10"
               fill="none">
            <defs>
              <pattern id="pattern-510798f3-74a4-4150-a0cf-4e93e8f4fbdf"
                       height="10"
                       patternUnits="userSpaceOnUse"
                       width="10"
                       x="0"
                       y="0">
                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
              </pattern>
            </defs>
            <rect fill="url(#pattern-510798f3-74a4-4150-a0cf-4e93e8f4fbdf)"
                  height="100%"
                  stroke="none"
                  width="100%"></rect>
          </svg>
        </div>

        <template #footer>
          <div class="space-x-2">
            <Button
                class="btn btn-primary"
                @click="localValue = false"
            >Save
            </Button>
            <Button
                class="btn btn-default"
                @click="localValue = false"
            >Cancel
            </Button>
          </div>
        </template>
      </sds-panel>
    </div>
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
});

export const Default = Template.bind({});
Default.args = {
};
