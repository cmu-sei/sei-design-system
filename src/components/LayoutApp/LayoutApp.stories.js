import SdsLayoutApp from './LayoutApp.vue';
import SdsButton from '../Button/Button.vue';
import SdsAvatar from '../Avatar/Avatar.vue';
import SdsTooltip from '../Tooltip/Tooltip.vue';

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
  components: { SdsLayoutApp, SdsButton, SdsAvatar, SdsTooltip },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-app v-model="localValue" v-bind="args" @navigate="navigate">
      <template #suite-header>
        Suite header content area
        <sds-tooltip data-id="avatarContainer" size="auto" variant="light" placement="left">
          <template data-id="avatarTooltipTrigger" #trigger>
            <sds-avatar size="xs" shape="circle" name="John Smith" />
          </template>
          <p data-id="avatarTooltipContent">
            John Smith
          </p>
        </sds-tooltip>
      </template>
      <template #page-header>
        Page header content area
      </template>
      Page content area
      <template #actions-bar>
      <div class="bg-white dark:bg-gray-900 dark:text-white backdrop-blur p-4 shadow">
          <div class="flex gap-2">
            <p class="ml-auto my-auto mr-2 font-semibold">
              Action bar content area
            </p>
            <sds-button kind="ghost">
              Cancel
            </sds-button>
            <sds-button kind="primary">
              Save
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
