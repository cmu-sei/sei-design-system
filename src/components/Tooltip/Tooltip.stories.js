import SdsTooltip from './Tooltip.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Utility/Tooltip',
  parameters: {
    docs: {
      description: {
        component: 'A tooltip is a hover component that can clarify a piece of content for users.',
      },
    },
  },
  component: SdsTooltip,
  argTypes: {
    placement: {
      options: ['auto', 'top', 'bottom', 'right', 'left'],
      control: { type: 'select' }
    },
    strategy: {
      options: ['absolute', 'fixed'],
      control: {type: 'select'}
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    variant: {
      options: ['dark', 'light'],
      control: {type: 'select'}
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
        <p>Lorem ipsum dolor.</p>
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
