import SdsSimpleApplication from './SimpleApplication.vue';
import SdsButton from '../Button/Button.vue';
import SdsAvatar from '../Avatar/Avatar.vue';
import SdsTooltip from '../Tooltip/Tooltip.vue';

export default {
  title: 'Templates/Layouts/Simple Application',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A structured layout for internal and customer applications that includes a header and a branded footer.',
      },
    },
  },
  component: SdsSimpleApplication,
};

const Template = (args) => ({
  components: { SdsSimpleApplication, SdsButton, SdsAvatar, SdsTooltip },
  setup() {
    return { args }
  },
  template: `
    <sds-simple-application v-model="localValue" v-bind="args">
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
      <template #action-bar>
        <p class="grow pb-2 md:pb-0 text-center md:text-left">
          Action bar content
        </p>
        <button class="btn btn-ghost btn-white order-3 md:order-2 block">
          Ghost button
        </button>
        <button class="btn btn-primary btn-white order-2 md:order-3 block">
          Primary button
        </button>
      </template>
      <template #footer-top>
        Footer top content area
      </template>
      <template #footer-middle>
        Footer middle content area
      </template>
    </sds-simple-application>
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
