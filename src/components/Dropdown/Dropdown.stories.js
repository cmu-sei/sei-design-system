import SdsDropdown from './Dropdown.vue';
import SdsDropdownHeader from '../DropdownHeader';
import SdsDropdownDivider from '../DropdownDivider';
import SdsDropdownItem from '../DropdownItem';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/Dropdowns/Dropdown',
  parameters: {
    docs: {
      description: {
        component: 'A dropdown displays a list of actions or options in a temporary modal menu to allow users to perform an action such as filtering or sorting existing content.',
      },
    },
  },
  component: SdsDropdown,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsDropdown, SdsDropdownItem, SdsDropdownHeader, SdsDropdownDivider },
  setup() {
    return { args }
  },
  template: `
  <div style="height: 28rem">
    <sds-dropdown
      v-bind="args"
      v-model="localValue"
      @input="onInput"
      @btn-click="onBtnClick"
    >
      <template #title>Dropdown</template>
      <sds-dropdown-header>Dropdown header</sds-dropdown-header>
      <sds-dropdown-item tag="button" @click="onClick">Item 1</sds-dropdown-item>
      <sds-dropdown-item tag="button" @click="onClick">Item 2</sds-dropdown-item>
      <sds-dropdown-item tag="button" @click="onClick">Item 3</sds-dropdown-item>
      <sds-dropdown-divider />
      <sds-dropdown-header>Dropdown header 2</sds-dropdown-header>
      <sds-dropdown-item tag="button" @click="onClick">Item 4</sds-dropdown-item>
      <sds-dropdown-item tag="button" @click="onClick">Item 5</sds-dropdown-item>
    </sds-dropdown>
  </div>
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
  methods: {
    onInput: action('input'),
    onBtnClick: action('btn-click'),
    onClick() {
      console.log('item clicked')
    }
  }
});

export const Default = Template.bind({});
Default.args = {
  btnClass: 'btn btn-default'
};