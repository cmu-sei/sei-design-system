import { timestamp } from '@vueuse/core';
import SdsCallout from './Callout.vue';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Containers/Callout',
  parameters: {
    docs: {
      description: {
        component: "A Callout is a visually distinct container used to highlight key information relevant to the user’s task. It communicates status, alerts, or additional context that helps the user make informed decisions. Callouts are persistent and typically inline—unlike ephemeral notifications like Toasts—and should be used when information is critical to the user's success or safety, or when additional clarification is needed for complex content.",
      },
    },
  },
  component: SdsCallout,
  argTypes: {
    type: {
      options: ['bold', 'outline', 'subtle'],
      control: { type: 'select' }
    },
    variant: {
      options: ['gray', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsCallout },
  setup() {
    return { args }
  },
  template: `
    <sds-callout v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  type: 'outline',
  variant: 'gray',
  size: 'md',
  title: 'This is a title',
  description: 'This is a description for the callout.',
  timestamp: new Date(),
  dismissable: true
};