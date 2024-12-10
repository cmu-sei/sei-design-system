import SdsTag from './Tag.vue';

export default {
  title: 'Data Visualization/Tag',
  parameters: {
    docs: {
      description: {
        component: 'A Tag is a visual indicator used to label, organize, or categorize an item for quick recognition, and it may also be interactive.',
      },
    },
  },
  component: SdsTag,
  argTypes: {
    action: {
      options: ['add', 'remove', 'destroy'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    }
  }
}

const Template = (args) => ({
  components: { SdsTag },
  setup() {
    return { args }
  },
  template: `
    <sds-tag
      v-bind="args"
    >
      <template #label>
        Tag
      </template>
    </sds-tag>
  `
});

export const Default = Template.bind({});
Default.args = {};