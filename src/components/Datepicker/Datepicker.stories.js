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
    size: {
      options: ['md', 'sm'],
      control: { type: 'select' }
    },
    mode: {
      options: ['date', 'dateTime', 'time'],
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

export const Range = Template.bind({});
Range.args = {
  modelValue: { start: new Date('2022-01-26'), end: new Date('2022-02-09') },
  mode: 'dateTime',
  min: new Date('2021-11-15'),
  max: new Date('2022-03-12')
};
