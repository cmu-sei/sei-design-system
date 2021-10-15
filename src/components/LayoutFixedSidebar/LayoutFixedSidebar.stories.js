import SdsLayoutFixedSidebar from './LayoutFixedSidebar.vue';

export default {
  title: 'Layouts/LayoutFixedSidebar',
  parameters: {
    docs: {
      description: {
        component: 'A layout that presents a fixed-positioned, collapsible sidebar.',
      },
    },
  },
  component: SdsLayoutFixedSidebar,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsLayoutFixedSidebar },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-layout-fixed-sidebar v-bind="$props">
      <template #header>Header slot</template>
      <template #sidebar>Sidebar slot</template>
      Default slot
    </sds-layout-fixed-sidebar>
  `
});

export const Default = Template.bind({});
Default.args = {};

