import SdsAvatarGroup from './AvatarGroup.vue';

export default {
  title: 'Components/Data Visualization/AvatarGroup',
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
    condensed: {
      options: [true, false],
      control: {type: 'select'}
    }
  }
};

const Template = (args) => ({
  components: {SdsAvatarGroup},
  setup() {
    return {args}
  },
  template: `
    <sds-avatargroup v-bind="args"/>
  `
});

export const Default = Template.bind({});
Default.args = {
  /* Set default arguments */
}
