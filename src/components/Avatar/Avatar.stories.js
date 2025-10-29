import SdsAvatar from './Avatar.vue';

export default {
  title: 'Components/Data Visualization/Avatar',
  parameters: {
    docs: {
      description: {
        component: 'An avatar is a visual component used to represent a person or entity.',
      },
    },
  },
  component: SdsAvatar,
  argTypes: {
    position: {
      options: ['bottom', 'center', 'left', 'right', 'top'],
      control: {type: 'select'}
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'auto'],
      control: {type: 'select'}
    },
    variant: {
      options: ['gray', 'red', 'yellow', 'green', 'blue', 'purple'],
      control: {type: 'select'}
    },
    shape: {
      options: ['circle', 'square', 'portrait'],
      control: {type: 'select'}
    }
  }
};

const Template = (args) => ({
  components: {SdsAvatar},
  setup() {
    return {args}
  },
  template: `
    <sds-avatar v-bind="args"/>
  `
});

export const Default = Template.bind({});
Default.args = {
  name: 'Jane Doe',
  src: 'https://images.unsplash.com/photo-1548142542-c53707f8b05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80'
};

