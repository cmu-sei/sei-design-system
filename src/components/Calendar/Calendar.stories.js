import SdsCalendar from './Calendar.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Date & Time/Calendar',
  parameters: {
    docs: {
      description: {
        component: 'A calendar that allows for either a single or a range date selection.',
      },
    },
  },
  component: SdsCalendar,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'danger'],
      control: { type: 'select' }
    },
    date: { control: { type: 'date' } },
    endDate: { control: { type: 'date' } },
    min: { control: { type: 'date' } },
    max: { control: { type: 'date' } }
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsCalendar },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-calendar
      v-model:date="parentDate"
      v-model:end-date="parentEndDate"
      v-model:min="parentMin"
      v-model:max="parentMax"
      v-model:multiple="parentMultiple"
      @update:date="onUpdateDate"
      @update:endDate="onUpdateEndDate"
      @update:min="onUpdateMin"
      @update:max="onUpdateMax"
    />
  `,
  data () {
    return {
      parentDate: null,
      parentEndDate: null,
      parentMax: null,
      parentMin: null,
      parentMultiple: true,
    }
  },
  methods: {
    onUpdateDate: action('update:date'),
    onUpdateEndDate: action('update:endDate'),
    onUpdateMin: action('update:min'),
    onUpdateMax: action('update:max'),
  }
});

export const Default = Template.bind({});
Default.args = {};
