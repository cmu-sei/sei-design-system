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
        component: 'A Panel is a vertical section that slides in from the edge of the screen over the page content. It contains supplementary content or actions to support tasks as part of a flow.'
      },
    },
  },
  component: SdsPanel,
  argTypes: {
    size: {
      options: [ 'sm', 'md', 'lg', 'xl'],
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
      <button class="btn btn-secondary" @click="localValue = !localValue">Toggle Panel</button>
      <sds-panel v-model="localValue" v-bind="args">
        <template #title>
          Panel title
        </template>
        <p>Panel copy goes here</p>
        <template #footer>
          Panel footer
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

