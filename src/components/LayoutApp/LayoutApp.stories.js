import SdsLayoutApp from './LayoutApp.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layouts/LayoutApp',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A highly structured layout for internal and customer applications that includes a header, a branded footer, and a collapsible navigation sidebar.',
      },
    },
  },
  component: SdsLayoutApp,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsLayoutApp },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-app v-model="localValue" v-bind="args" @navigate="navigate">
      <template #suite-header>
        Suite header content area
      </template>
      <template #page-header>
        Page header content area
      </template>
      Page content area
      <template #footer-middle>
        Footer middle content area
      </template>
    </sds-layout-app>
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
    navigate({ item, event }) {
      event.preventDefault()
      this.navigateAction({item, event })
    },
    navigateAction: action('navigate')
  }
});

export const Default = Template.bind({});
Default.args = {
  appSuite: 'SDS',
  appName: 'SEI Design System',
  pageTitle: 'About',
  sidebarNavigationItems: [
    { id: 1, title: 'About', active: true, href: '#' },
    { id: 2, title: 'Visual Language', active: false, href: '#' },
    { id: 3, title: 'Components', active: false, href: '#' },
    { id: 4, title: 'Downloads', active: false, href: '#', badgeCount: 9 },
    { id: 9, title: 'Help & Support', active: false, href: '#' },
  ]
};
