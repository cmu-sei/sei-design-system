import SdsCharacterCounter from './CharacterCounter.vue';

export default {
  title: 'Misc/CharacterCounter',
  parameters: {
    docs: {
      description: {
        component: 'A component that displays number difference between a current and a max value.',
      },
    },
  },
  component: SdsCharacterCounter,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsCharacterCounter },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-character-counter v-bind="$props" />
  `
});

export const Default = Template.bind({});
Default.args = {};
