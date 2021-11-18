import SdsLayoutStacked from './LayoutStacked.vue';

export default {
  title: 'Layouts/LayoutStacked',
  parameters: {
    docs: {
      description: {
        component: 'A stacked layout that automatically stretches to the size of the viewport.',
      },
    },
  },
  component: SdsLayoutStacked,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsLayoutStacked },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-stacked v-bind="args">
      <template #header>Header content</template>
      Page content
      <template #footer>Footer content</template>
    </sds-layout-stacked>
  `
});

export const Default = Template.bind({});
Default.args = {};

