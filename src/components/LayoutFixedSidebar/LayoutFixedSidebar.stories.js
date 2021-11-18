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

const Template = (args) => ({
  components: { SdsLayoutFixedSidebar },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-fixed-sidebar v-model="localValue" v-bind="args">
      <template #header>Header content</template>
      <template #sidebar>
        <span class="text-white">Sidebar content</span>
      </template>
      Page content
    </sds-layout-fixed-sidebar>
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
});

export const Default = Template.bind({});
Default.args = {};

