import SdsCharacterCounter from './CharacterCounter.vue';

export default {
  title: 'Utility/CharacterCounter',
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

const Template = (args) => ({
  components: { SdsCharacterCounter },
  setup() {
    return { args }
  },
  template: `
    <sds-character-counter v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {};
