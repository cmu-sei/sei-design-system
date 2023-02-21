import SdsFloatingActionButton from './FloatingActionButton.vue';

export default {
  title: 'Buttons/Floating Action Button',
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 675,
      description: {
        component: 'A floating action button (FAB) is a component that is displayed on the bottom right corner of a page, housing important content like help links or announcements.',
      },
    },
  },
  component: SdsFloatingActionButton,
  argTypes: {
    variant: {
      options: ['primary', 'danger'],
      control: { type: 'select' }
    },
  }
};

const Template = (args) => ({
  components: { SdsFloatingActionButton },
  setup() {
    return { args }
  },
  template: `
    <sds-floating-action-button v-model="localValue" v-bind="args">
      <template #tab(tab1)="{ tab }">
        {{ tab.title }}
      </template>
      <template #tab(tab2)="{ tab }">
        {{ tab.title }}
      </template>
      <template #tab(tab3)="{ tab }">
        {{ tab.title }}
      </template>
    </sds-floating-action-button>
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
Default.args = {
  modelValue: [
    { key: 'tab1', tabName: 'Tab 1', title: 'Active Tab 1', active: true },
    { key: 'tab2', tabName: 'Tab 2', title: 'Active Tab 2', active: false },
    { key: 'tab3', tabName: 'Tab 3', title: 'Active Tab 3', active: false }
  ]
};

