import SdsLayoutApp from './LayoutApp.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layouts/Layout App',
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
      <template #actions-bar>
      <div class="bg-blue-500/90 backdrop-blur dark:bg-blue-800 px-6 py-2 shadow">
          <div class="flex gap-2">
            <p class="my-auto text-white font-semibold">
              Action bar content area
            </p>
            <sds-button
              variant="light"
              class="ml-auto"
              outline
            >
              Cancel
            </sds-button>
            <sds-button
              variant="default"
              class="text-primary hover:text-black hover:bg-white"
            >
              Save something
            </sds-button>
          </div>
        </div>
      </template>
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
    navigate({ group, item, event }) {
      event.preventDefault()
      this.navigateAction({ group, item, event })
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
    {
      id: 2,
      title: 'Visual Language',
      items: [
        { id: 1, title: 'Color', active: false, href: '#', badgeCount: 2 },
        { id: 2, title: 'Grid', active: false, href: '#', badgeCount: 3 },
        { id: 3, title: 'Typography', active: false, href: '#' },
      ]
    },
    { id: 3, title: 'Components', active: false, href: '#' },
    {
      id: 5,
      title: 'Downloads',
      items: [
        { id: 1, title: 'Typefaces', active: false, href: '#' },
        { id: 2, title: 'UI Kit', active: false, href: '#' },
        { id: 3, title: 'Unitmarks', active: false, href: '#' },
      ]
    },
    { id: 6, title: 'Help & Support', active: false, href: '#' },
  ]
};
