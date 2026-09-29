import SdsComboBox from './ComboBox.vue';

export default {
  title: 'Components/Inputs/Combo Box',
  parameters: {
    docs: {
      description: {
        component: 'A Combo Box is an input field that allows users to perform a simple search or select an item from a list of dynamically filtered options based on their query.',
      },
    },
  },
  component: SdsComboBox,
  argTypes: {
    variant: {
      options: ['gray', 'blue', 'red'],
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
    <sds-combo-box v-model="localValue" v-bind="args" />
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
});

export const Default = Template.bind({});
Default.args = {};

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
        click-to-select
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
NarrowContainer.args = {};
NarrowContainer.parameters = {
  docs: {
    description: {
      story: 'Open the Combo Box to verify the compact keyboard footer at a common 320px container width, independent of viewport width.'
    }
  }
};
