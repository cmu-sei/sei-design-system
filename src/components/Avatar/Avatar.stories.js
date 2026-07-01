import SdsAvatar from './Avatar.vue';
import SdsSvgIcon from '../SvgIcon/SvgIcon.vue';

export default {
  title: 'Components/Data Visualization/Avatar',
  parameters: {
    docs: {
      description: {
        component: 'An avatar is a visual component used to represent a person or entity. It can display an image, initials, or an icon.',
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
    type: {
      options: ['subtle', 'outline'],
      control: {type: 'select'}
    },
    variant: {
      options: ['gray', 'red', 'yellow', 'green', 'blue', 'purple', 'orange'],
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

const IconTemplate = (args) => ({
  components: {SdsAvatar, SdsSvgIcon},
  setup() {
    const iconClass = 'size-2/3'
    const userIconPath = 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'
    return {args, iconClass, userIconPath}
  },
  template: `
    <sds-avatar v-bind="args">
      <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
    </sds-avatar>
  `
});

export const WithIcon = IconTemplate.bind({});
WithIcon.args = {
  name: 'User',
  variant: 'blue',
  size: 'lg'
};
WithIcon.parameters = {
  docs: {
    description: {
      story: 'Avatar with an icon in the default slot. The icon scales automatically based on the avatar size.',
    },
  },
};

export const IconSizes = () => ({
  components: {SdsAvatar, SdsSvgIcon},
  setup() {
    const iconClass = 'size-2/3'
    const userIconPath = 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'
    return {iconClass, userIconPath}
  },
  template: `
    <div class="flex flex-wrap items-end gap-4">
      <sds-avatar size="xs" variant="blue" name="Extra Small">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar size="sm" variant="green" name="Small">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar size="md" variant="purple" name="Medium">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar size="lg" variant="orange" name="Large">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar size="xl" variant="red" name="Extra Large">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar size="2xl" variant="gray" name="2 Extra Large">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
    </div>
  `
});
IconSizes.parameters = {
  docs: {
    description: {
      story: 'Icon avatars in all available sizes. Icons automatically scale to fit each size.',
    },
  },
};

export const IconVariants = () => ({
  components: {SdsAvatar, SdsSvgIcon},
  setup() {
    const iconClass = 'size-2/3'
    const userIconPath = 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'
    return {iconClass, userIconPath}
  },
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <sds-avatar variant="gray" name="Gray">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="red" name="Red">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="yellow" name="Yellow">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="green" name="Green">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="blue" name="Blue">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="purple" name="Purple">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar variant="orange" name="Orange">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
    </div>
  `
});
IconVariants.parameters = {
  docs: {
    description: {
      story: 'Icon avatars in all available color variants.',
    },
  },
};

export const IconShapes = () => ({
  components: {SdsAvatar, SdsSvgIcon},
  setup() {
    const iconClass = 'size-1/2'
    const userIconPath = 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'
    return {iconClass, userIconPath}
  },
  template: `
    <div class="flex flex-wrap items-end gap-4">
      <sds-avatar shape="circle" variant="blue" name="Circle">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar shape="square" variant="green" name="Square">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
      <sds-avatar shape="portrait" variant="purple" name="Portrait">
        <sds-svg-icon :path="userIconPath" :class="iconClass" viewBox="0 0 16 16" />
      </sds-avatar>
    </div>
  `
});
IconShapes.parameters = {
  docs: {
    description: {
      story: 'Icon avatars in different shapes: circle, square, and portrait (4:5 aspect ratio).',
    },
  },
};

