import SdsBrochureSiteWordmark from './BrochureSiteWordmark.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site Wordmark',
  parameters: {
    docs: {
      description: {
        component: 'The wordmark for the BrochureSite layout.',
      },
    },
  },
  component: SdsBrochureSiteWordmark,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsBrochureSiteWordmark },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site-wordmark v-bind="args"></sds-brochure-site-wordmark>
  `
});

export const Default = Template.bind({});
Default.args = {};

