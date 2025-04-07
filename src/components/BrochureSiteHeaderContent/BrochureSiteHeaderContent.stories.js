import SdsBrochureSiteHeaderContent from './BrochureSiteHeaderContent.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site Header Content',
  parameters: {
    docs: {
      description: {
        component: 'The header content section for the BrochureSite layout.',
      },
    },
  },
  component: SdsBrochureSiteHeaderContent,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsBrochureSiteHeaderContent },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site-header-content v-bind="args" />
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

