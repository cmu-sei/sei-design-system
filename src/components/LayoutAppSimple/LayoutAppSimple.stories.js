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
      <template #user-section>
        User section content area
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
      <div>
          <div class="flex gap-2">
            <p class="ml-auto my-auto mr-2 font-semibold">
              Action bar content area
            </p>
            <sds-button kind="ghost" variant="white">
              Cancel
            </sds-button>
            <sds-button kind="primary" variant="white">
              Save
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
