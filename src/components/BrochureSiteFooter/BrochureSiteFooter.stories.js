import SdsBrochureSiteFooter from './BrochureSiteFooter.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site Footer',
  parameters: {
    docs: {
      description: {
        component: 'The footer for the BrochureSite layout.',
      },
    },
  },
  component: SdsBrochureSiteFooter,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsBrochureSiteFooter },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site-footer v-bind="args"></sds-brochure-site-footer>
  `
});

export const Default = Template.bind({});
Default.args = {};

