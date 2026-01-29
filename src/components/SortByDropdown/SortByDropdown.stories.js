import SdsSortByDropdown from './SortByDropdown.vue'
import { action } from 'storybook/actions'

export default {
  title: 'Components/Buttons/Dropdowns/Sort by Dropdown',
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  component: SdsSortByDropdown,
  argTypes: {
    placement: {
      options: ["auto", "left", "top", "right", "bottom", "auto-start", "auto-end", "left-start", "left-end", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end"],
      control: { type: 'select' }
    },
    kind: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'select' }
    },
    variant: {
      options: ['gray', 'red', 'blue', 'white'],
      control: { type: 'select' }
    },    
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    zIndex: {
      options: ['0', '10', '20', '30', '40', '50', 'auto'],
      control: {type: 'select'}
    }
  }
}

const Template = (args) => ({
  components: { SdsSortByDropdown },
  setup() {
    return { args }
  },
  template: `
    <sds-sort-by-dropdown
      v-bind="args"
      @update:model-value="onUpdateModelValue"
    />
  `,
  methods: {
    onUpdateModelValue: action('update:model-value')
  }
})

export const Default = Template.bind({});
Default.args = {
  modelValue: {
    sortBy: 'Author',
    orderBy: 'alpha:ascending'
  },
  options: [
    { id: '1', label: 'Author', value: 'Author', type: 'alpha' },
    { id: '2', label: 'Date published', value: 'Date published', type: 'chronological' },
    { id: '3', label: 'Price', value: 'Price', type: 'numerical' },
    { id: '4', label: 'Relevance', value: 'Relevance', type: 'custom', customAttribute: 'relevant' }
  ]
};