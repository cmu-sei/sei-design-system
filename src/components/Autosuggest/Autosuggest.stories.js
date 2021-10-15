import SdsAutosuggest from './Autosuggest.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Inputs/Autosuggest',
  parameters: {
    docs: {
      description: {
        component: 'An input field that presents an autosuggest popover as you type.',
      },
    },
  },
  component: SdsAutosuggest,
  argTypes: {
    variant: {
      options: ['default', 'primary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      control: { type: 'select' }
    }
  }
};

const Template = (args, { argTypes }) => ({
  components: { SdsAutosuggest },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-autosuggest
      v-model="searchText"
      v-bind="$props"
      :items="itemList"
      :autosuggest="onAutosuggest"
      @input="onInput"
      @search="onSearch"
      @result="onResult"
    />
  `,
  data () {
    return {
      searchText: '',
      itemList: [],
      fakeAjaxItems: [
        { term: "Apple", payload: "test" },
        {
          term:
            "Apple lksd kljsdflk jsdflk sdflkj sdflkj sdflk sdflkj sdflk sdflk sdflkj sdflkj sdflkj sdflkj sdflkj sdflksjd f",
          payload: "test",
        },
        { term: "Banana", payload: "test" },
        { term: "Orange", payload: "test" },
        { term: "Pineapple", payload: "test" },
        { term: "Kiwi", payload: "test" },
        { term: "Pomegranate", payload: "test" },
        { term: "Strawberry", payload: "test" },
        { term: "Raspberry", payload: "test" },
        { term: "Watermelon", payload: "test" },
        { term: "Mango", payload: "test" },
      ]
    }
  },
  methods: {
    onInput: action('input'),
    onSearch: action('search'),
    onResult: action('result'),
    onAutosuggest() {
      setTimeout(() => {
        this.itemList = this.fakeAjaxItems.filter((i) => {
          return i.term.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }, 250);
    }
  }
});

export const Default = Template.bind({});
Default.args = {};
