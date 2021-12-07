import SdsCharacterCounter from './CharacterCounter.vue';

export default {
  title: 'Utility/CharacterCounter',
  parameters: {
    docs: {
      description: {
        component: 'A character counter displays the current character number or number of characters over the maximum value in a given text field.',
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
