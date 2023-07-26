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
        // TODO: Panel Description
        component: 'NEED DESCRIPTION',
      },
    },
  },
  component: SdsPanel,
  argTypes: {
    size: {
      options: ['sm', 'md', 'auto'],
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
      <sds-modal v-model="localValue" v-bind="args">
        <template #title>
          Panel title
        </template>
        <p>Panel copy goes here</p>
        <template #footer>
          Panel footer
        </template>
      </sds-modal>
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
