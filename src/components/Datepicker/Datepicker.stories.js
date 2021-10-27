import SdsDatepicker from './Datepicker.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Date & Time/Datepicker',
  parameters: {
    docs: {
      description: {
        component: 'A date input field with the ability to display a calendar for easy selection.',
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
        v-model="date"
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
      date: null,
      parentMin: null,
      parentMax: null
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
