import SdsMegaMenuItem from './MegaMenuItem.vue';

export default {
  title: 'Navigation/Mega Menu Item',
  parameters: {
    docs: {
      description: {
        component: 'Alpha: A Mega Menu Item is a stylized link, either simple or descriptive. It can be used to populate a Mega Menu.',
      },
    },
  },
  component: SdsMegaMenuItem,
  argTypes: {
    cta: {
      control: { type: 'boolean' },
      description: 'Display an arrow after the link label (similar to "landing-page" type).' ,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Display with "disabled" styling— link will become grayed-out and unusable.' ,
    },
    external: {
      control: { type: 'boolean' },
      description: 'Set link attributes to open in a new window with noreferrer options set.' ,
    },
    label: {
      control: { type: 'text' },
      description: 'Set the main text to display in this Mega Menu Item.',
    },
    variant: {
      options: ['simple', 'landing-page', 'descriptive'],
      control: { type: 'select' },
      description: 'Choose the link type to display.',
    }
  }
};

const Template = (args) => ({
  components: { SdsMegaMenuItem },
  setup() {
    return { args }
  },
  template: `
    <sds-mega-menu-item class="group" v-bind="args">
      <script>console.log(${JSON.stringify(args)})</script>
      <template v-if="args.variant === 'descriptive'" #default>
        <p class="text-sm text-gray-500">default</p>
      </template>
      <template v-if="args.variant === 'descriptive'" #left>
        <div class="w-10 h-10 flex transition-color bg-gray-100 group-hover:bg-gray-200 mt-1 text-center">
          <p class="self-center w-full">left</p>
        </div>
      </template>
      <template v-if="args.variant === 'descriptive'" #top>
        <div class="w-full h-40 flex transition-color bg-gray-100 group-hover:bg-gray-200 mb-4 text-center">
          <p class="self-center w-full">top</p>
        </div>
      </template>
    </sds-mega-menu-item>
  `
});

export const Default = Template.bind({});
Default.args = {
  cta: false,
  disabled: false,
  external: false,
  label: 'Mega Menu Item Label',
};
