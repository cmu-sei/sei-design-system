import SdsCalendar from './Calendar.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Date & Time/Calendar',
  parameters: {
    docs: {
      description: {
        component: 'A calendar is a text input field that displays a calendar to allow users to select a single date or a date range.',
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

const Template = (args) => ({
  components: { SdsCalendar },
  setup() {
    return { args }
  },
  template: `
    <sds-calendar
      v-bind="args"
      v-model:date="localDate"
      v-model:end-date="localEndDate"
      v-model:min="localMinDate"
      v-model:max="localMaxDate"
    />
  `,
  data() {
    return {
      localDate: null,
      localEndDate: null,
      localMinDate: null,
      localMaxDate: null
    }
  },
  watch: {
    date(value) {
      this.localDate = value
    },
    endDate(value) {
      this.localEndDate = value
    },
    minDate(value) {
      this.localMinDate = value
    },
    maxDate(value) {
      this.localMaxDate = value
    }
  }
});

export const Default = Template.bind({});
Default.args = {};
