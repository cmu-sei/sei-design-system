import SdsDropdown from './Dropdown.vue';
import SdsDropdownItem from '../DropdownItem';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/Dropdowns/Dropdown',
  parameters: {
    docs: {
      description: {
        component: 'An interactive element that toggles a hidden menu.',
      },
    },
  },
  component: SdsDropdown,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsDropdown, SdsDropdownItem },
  setup() {
    return { args }
  },
  template: `
    <div style="height: 28rem">
      <sds-dropdown
        v-model="localValue"
        v-bind="args"
        @input="onInput"
        @btn-click="onBtnClick"
      >
        <template #title>Dropdown</template>
        <sds-dropdown-item href="#">Dropdown Item</sds-dropdown-item>
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
    onBtnClick: action('btn-click')
   }
});

export const Default = Template.bind({});
Default.args = {};
