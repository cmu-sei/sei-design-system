import SdsAvatarGroup from './AvatarGroup.vue';

export default {
  title: 'Components/Data Visualization/Avatar Group',
  parameters: {
    docs: {
      description: {
        component: 'An Avatar Group displays two or more avatars in an inline stack.',
      },
    },
  },
  component: SdsAvatarGroup,
  argTypes: {
    shape: {
      options: ['circle', 'square'],
      control: {type: 'select'}
    },
    size: {
      options: ['xs', 'sm', 'md'],
      control: {type: 'select'}
    },
    density: {
      options: ['default', 'condensed'],
      control: {type: 'select'}
    }
  }
};

const Template = (args) => ({
  components: {
    SdsAvatarGroup,
  },
  setup() {
    return { args }
  },
  template: `
    <sds-avatar-group v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  shape: 'circle',
  size: 'md',
  density: 'default',
  srcset: [
    {
      name: 'Jane Doe',
    },
    {
      name: 'Morgan Markowski',
    },
    {
      name: 'Philip Glass',
    },
    {
      name: 'Judd Frye',
    },
    {
      name: 'Thomas Edison',
    },
    {
      name: 'Benjamin Franklin',
    }
  ]
}
