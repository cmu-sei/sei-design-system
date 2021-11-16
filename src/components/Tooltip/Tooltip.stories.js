import SdsTooltip from './Tooltip.vue';

export default {
  title: 'Utility/Tooltip',
  parameters: {
    docs: {
      description: {
        component: 'Tooltips are short messages related to specific UI elements that provide additional explanations and guide users towards taking specific actions. They\'re triggered when a user hovers over an on-page item or when they click on an icon, a hotspot, or another active element. Tooltips give users extra information that paves the way for product success.',
      },
    },
  },
  component: SdsTooltip,
  argTypes: {
    placement: {
      options: ['auto', 'top', 'bottom', 'right', 'left'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsTooltip },
  setup() {
    return { args }
  },
  template: `
    <div class="flex col h-56">
      <sds-tooltip class="my-24 mx-auto" v-model="localValue" v-bind="args">
        <template #trigger>
          <button @click="onClick">I have a tooltip.</button>
        </template>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum maximus blandit.</p>
      </sds-tooltip>
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
  methods: {
    onClick() {
      console.log('onClick Fired.');
    }
  }
});

export const Default = Template.bind({});
Default.args = {};

