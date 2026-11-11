import SdsComboBox from './ComboBox.vue';
import { action } from 'storybook/actions';

export default {
  title: 'Components/Inputs/Combo Box',
  parameters: {
    docs: {
      description: {
        component: 'A Combo Box lets users search or select from dynamically filtered options. Single-select buttons toggle a dropdown with its own search field; editable text and multiselect inputs keep suggestions open when clicked.',
      },
    },
  },
  component: SdsComboBox,
  argTypes: {
    type: {
      options: ['text', 'select', 'taggable-select'],
      control: { type: 'select' }
    },
    optionType: {
      options: ['button', 'a', 'custom'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsComboBox },
  setup() {
    return { args }
  },
  template: `
    <sds-combo-box
      v-bind="args"
      v-model="localValue"
      v-model:selected="localSelected"
      @complete="onComplete"
      @result="onResult"
      @enter="onEnter"
      @open="onOpen"
      @close="onClose"
      @focus="onFocus"
      @blur="onBlur"
    />
  `,
  data() {
    return { localValue: this.args.modelValue ?? '', localSelected: [...(this.args.selected ?? [])] }
  },
  watch: {
    'args.modelValue'(value) {
      this.localValue = value
    },
    'args.selected'(value) {
      this.localSelected = [...(value ?? [])]
    }
  },
  methods: {
    onComplete: action('complete'),
    onResult: action('result'),
    onEnter: action('enter'),
    onOpen: action('open'),
    onClose: action('close'),
    onFocus: action('focus'),
    onBlur: action('blur')
  }
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: { description: { story: 'Omit suggestions for a plain search input with no suggestions dropdown. Pass an array, including [], to enable suggestions; initialize remote results to [] so loading, error, and empty-result feedback are available.' } }
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  type: 'select',
  'aria-label': 'Choose fruit',
  selected: ['Banana'],
  suggestions: ['Apple', 'Banana', 'Cherry'],
  filterSuggestions: true
};

export const CompactSelections = Template.bind({});
CompactSelections.args = {
  ...SingleSelect.args,
  multiple: true,
  maxVisibleTags: 2,
  selected: ['Apple', 'Banana', 'Cherry']
};
CompactSelections.parameters = {
  docs: { description: { story: 'Expand or collapse the selected tags without changing their values.' } }
};

export const RemoteError = Template.bind({});
RemoteError.args = {
  type: 'select',
  'aria-label': 'Choose fruit',
  suggestions: [],
  error: 'Suggestions could not be loaded.',
  onRetry: action('retry')
};
RemoteError.parameters = {
  docs: { description: { story: 'Open the dropdown and use Tab to reach the retry action. Retry logs the current query; clear error or enable pending in Controls to inspect the response states.' } }
};

export const NarrowContainer = (args) => ({
  components: { SdsComboBox },
  setup() {
    const suggestions = [
      { section: 'Fruits', items: [{ name: 'Apple' }, { name: 'Banana' }] },
      { section: 'Vegetables', items: [{ name: 'Artichoke' }, { name: 'Carrot' }] }
    ]
    return { args, suggestions }
  },
  template: `
    <div class="w-80 max-w-full">
      <sds-combo-box
        v-bind="args"
        v-model="query"
        :suggestions="suggestions"
        type="select"
        option-label="name"
        option-group-label="section"
        option-group-children="items"
      />
    </div>
  `,
  data() {
    return { query: '' }
  }
});
NarrowContainer.args = {
  'aria-label': 'Choose fruit or vegetables'
};
NarrowContainer.parameters = {
  docs: {
    description: {
      story: 'Open the Combo Box to verify the compact keyboard footer at a common 320px container width, independent of viewport width.'
    }
  }
};
