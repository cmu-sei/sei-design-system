import SdsDatepicker from './Datepicker.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Date & Time/Datepicker',
  parameters: {
    docs: {
      description: {
        component: 'A date picker is a text input field that displays a calendar to allow users to select a single date.',
      },
    },
  },
  component: SdsDatepicker,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'danger'],
      control: { type: 'select' }
    },
    size: {
      options: ['md', 'sm'],
      control: { type: 'select' }
    },
    modelValue: { control: { type: 'date' } },
    min: { control: { type: 'date' } },
    max: { control: { type: 'date' } }
  }
};

const Template = (args) => ({
  components: { SdsDatepicker },
  setup() {
    return { args }
  },
  template: `
    <div style="height: 28rem">
      <sds-datepicker
        v-model="localValue"
        v-model:min="parentMin"
        v-model:max="parentMax"
        v-bind="args"
        @input="onInput"
        @update:min="onUpdateMin"
        @update:max="onUpdateMax"
      />
    </div>
  `,
  data() {
    return {
      localValue: null,
      parentMin: null,
      parentMax: null
    }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
  methods: {
    onInput: action('input'),
    onUpdateMin: action('update:min'),
    onUpdateMax: action('update:max'),
  }
});

export const Default = Template.bind({});
Default.args = {};
