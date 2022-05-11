import SdsTabs from './Tabs.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Tabs',
  parameters: {
    docs: {
      description: {
        component: 'Tabs is a textual component that organizes information of the same hierarchy across different views or interactions.',
      },
    },
  },
  component: SdsTabs,
  argTypes: {
    type: {
      options: ['folder', 'underline'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsTabs },
  setup() {
    return { args }
  },
  template: `
    <sds-tabs
      v-model="localValue"
      v-bind="args"
      @change="onChange"
      @update:model-value="onUpdateModelValue"
    >
      <template #tab(groups)>
        <i>Directorates</i>
      </template>
      <template #content(groups)>
        <div class="p-4">
          This is the content for groups.
        </div>
      </template>
      <template #content(workplace-services)>
        <div class="p-4">
          This is the content for workplace services.
        </div>
      </template>
      <template #content(link-trigger)>
        <div class="p-4">
          <p>A <code>@change</code> event is fired when changing tabs.</p>
          <p>This event provides the selected <strong>tab</strong> so you can act upon it, e.g., trigger a Nuxt router change.</p>
          <p>In this example, this tab has a defined <strong>href</strong> property, that could be acted upon.</p>
        </div>
      </template>
    </sds-tabs>
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
    onChange: action('onChange'),
    onUpdateModelValue: action('onUpdateModelValue')
  }
});

export const Default = Template.bind({});
Default.args = {
  modelValue: [
    { key: 'home', title: 'Home', disabled: true },
    { key: 'about', title: 'About Us', active: true },
    { key: 'workplace-services', title: 'Workplace Services' },
    { key: 'groups' },
    { key: 'link-trigger', title: 'Link Trigger', href: '/internal-link' },
    { key: 'link-to-sei', title: 'Link to SEI', tag: 'a', href: 'https://sei.cmu.edu', external: true },
  ]
};

