import SdsFilterByDropdown from './FilterByDropdown.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/Dropdowns/FilterByDropdown',
  parameters: {
    docs: {
      description: {
        component: 'An item for use as a child to a dropdown.',
      },
    },
  },
  component: SdsFilterByDropdown,
  argTypes: {
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsFilterByDropdown },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-filter-by-dropdown
      v-model="options"
      v-bind="$props"
      @input="onInput"
    />
  `,
  data() {
    return {
      options: [
        { id: 1, text: "Option 1", selected: false },
        { id: 2, text: "Option 2", selected: false },
        { id: 3, text: "Option 3", selected: false },
        { id: 4, text: "Option 4", selected: false },
        { id: 5, text: "Option 5", selected: false },
        { id: 6, text: "Option 6", selected: false },
        { id: 7, text: "Option 7", selected: false },
        { id: 8, text: "Option 8", selected: false },
        { id: 9, text: "Option 9", selected: false },
        { id: 10, text: "Option 10", selected: false },
        { id: 11, text: "Option 11", selected: false },
        { id: 12, text: "Option 12", selected: false },
        { id: 13, text: "Option 13", selected: false },
        { id: 14, text: "Option 14", selected: false },
        { id: 15, text: "Option 15", selected: false },
        { id: 16, text: "Option 16", selected: false },
        { id: 17, text: "Option 17", selected: false },
        { id: 18, text: "Option 18", selected: false },
        { id: 19, text: "Option 19", selected: false },
        { id: 20, text: "Option 20", selected: false },
      ]
    }
  },
  methods: {
    onInput: action('input')
  }
});

export const Default = Template.bind({});
Default.args = {};

