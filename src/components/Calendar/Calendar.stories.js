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
    mode: {
      options: ['date', 'dateTime', 'time'],
      control: { type: 'select' }
    },
    breakpoint: {
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' }
    },
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
    <sds-calendar v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: new Date()
};

export const Range = Template.bind({});
Range.args = {
  modelValue: { start: new Date('2022-01-26'), end: new Date('2022-02-09') },
  mode: 'dateTime',
  min: new Date('2021-11-15'),
  max: new Date('2022-03-12')
};