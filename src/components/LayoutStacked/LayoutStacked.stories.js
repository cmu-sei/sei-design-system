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

const Template = (args, { argTypes }) => ({
  components: { SdsLayoutStacked },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-layout-stacked v-bind="$props">
      <template #header>Header slot</template>
      Default slot
      <template #footer>Footer slot</template>
    </sds-layout-stacked>
  `
});

export const Default = Template.bind({});
Default.args = {};

