import SdsLayoutAppSimple from './LayoutAppSimple.vue';
import SdsButton from '../Button/Button.vue';
import SdsAvatar from '../Avatar/Avatar.vue';
import SdsTooltip from '../Tooltip/Tooltip.vue';

export default {
  title: 'Layouts/Layout App Simple',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A structured layout for internal and customer applications that includes a header and a branded footer.',
      },
    },
  },
  component: SdsLayoutAppSimple,
};

const Template = (args) => ({
  components: { SdsLayoutAppSimple, SdsButton, SdsAvatar, SdsTooltip },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-app-simple v-model="localValue" v-bind="args">
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
    </sds-layout-app-simple>
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  }
});

export const Default = Template.bind({});
Default.args = {
  appSuite: 'SDS',
  appName: 'SEI Design System',
  pageTitle: 'About',
};
