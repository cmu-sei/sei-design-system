import SdsSection from './Section.vue';

export default {
  title: 'Containers/Section',
  parameters: {
    docs: {
      description: {
        component: 'A container for related content.',
      },
    },
  },
  component: SdsSection,
  argTypes: {
    type: {
      options: ['simple', 'raised', 'accented'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: { SdsSection },
  setup() {
    return { args }
  },
  template: `
    <sds-section v-bind="args">
      <template #title>Title slot</template>
      <template #subtitle>Subtitle slot</template>
      <template #nav>Nav slot</template>
      Default slot
    </sds-section>
  `
});

export const Default = Template.bind({});
Default.args = {};

