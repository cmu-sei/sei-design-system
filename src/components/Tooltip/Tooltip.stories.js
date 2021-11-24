import SdsTooltip from './Tooltip.vue';
import { action } from '@storybook/addon-actions';

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
    <div class="p-48">
      <sds-tooltip v-model="localValue" v-bind="args" @open="onOpen" @close="onClose">
        <template #trigger>
          <button class="btn btn-default" @click="onClick">I have a tooltip</button>
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
    onOpen: action('open'),
    onClose: action('close'),
    onClick: action('onClick')
  }
});

export const Default = Template.bind({});
Default.args = {};
