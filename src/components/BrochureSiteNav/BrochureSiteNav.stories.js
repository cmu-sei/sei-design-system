import SdsBrochureSiteNav from './BrochureSiteNav.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site Nav',
  parameters: {
    docs: {
      description: {
        component: 'The nav for the BrochureSite layout.',
      },
    },
  },
  component: SdsBrochureSiteNav,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsBrochureSiteNav },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site-nav v-bind="args"></sds-brochure-site-nav>
  `
});

export const Default = Template.bind({});
Default.args = {
  page: {
    organization: 'Page Organization',
    title: 'Page Title',
    subtitle: 'Page Subtitle',
    description: 'Page Description',
    nav: [
      {
        title: 'Section 1',
        items: [
          { title: 'Link title 1', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 2', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 3', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 4', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 5', url: 'https://designsystem.sei.cmu.edu' },
        ],
        seeAll: {
          title: 'See All title',
          url: 'https://designsystem.sei.cmu.edu'
        }
      },
      {
        title: 'Section 2',
        items: [
          { title: 'Link title 1', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 2', url: 'https://designsystem.sei.cmu.edu' },
        ]
      }
    ]
  }
};

