import { ref, watch } from 'vue';
import SdsTextarea from './Textarea.vue';

export default {
  title: 'Inputs/Text fields/Textarea',
  parameters: {
    docs: {
      description: {
        component: 'An textarea form field for long content input.',
      },
    },
  },
  component: SdsTextarea,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsTextarea },
  setup(props) {
    const localValue = ref(props.modelValue)
    watch(() => props.modelValue, (newValue) => {
      localValue.value = newValue
    })
    return { localValue, args }
  },
  template: `
    <sds-textarea v-model="localValue" v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {};

