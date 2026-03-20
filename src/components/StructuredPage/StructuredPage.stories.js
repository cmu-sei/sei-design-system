import SdsStructuredPage from './StructuredPage.vue';

export default {
  title: 'Templates/Shells/Structured Page',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 250
      },
      description: {
        component: 'A simple layout that automatically adjusts to the size of the viewport.',
      },
    },
  },
  component: SdsStructuredPage,
  argTypes: {
    stickyHeader: {
      control: { type: 'boolean' }
    },
    stickyFooter: {
      control: { type: 'boolean' }
    }
  }
};

const Template = (args) => ({
  components: { SdsStructuredPage },
  setup() {
    return { args }
  },
  template: `
    <sds-structured-page v-bind="args">
      <template #header>
        <div class="border border-dashed">
          Header area
        </div>
      </template>
      <div class="border border-dashed">
        Page area
      </div>
      <template #footer>
        <div class="border border-dashed">
          Footer area
        </div>
      </template>
    </sds-structured-page>
  `
});

export const Default = Template.bind({});
Default.args = {};

