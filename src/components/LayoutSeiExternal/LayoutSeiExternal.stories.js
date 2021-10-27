import SdsLayoutSeiExternal from './LayoutSeiExternal.vue';

export default {
  title: 'Layouts/LayoutSeiExternal',
  parameters: {
    docs: {
      description: {
        component: 'A layout tailored for use on external-facing properties.',
      },
    },
  },
  component: SdsLayoutSeiExternal,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsLayoutSeiExternal },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <sds-layout-sei-external v-bind="args">
      Default slot
    </sds-layout-sei-external>
  `
});

export const Default = Template.bind({});
Default.args = {
  showMasthead: true,
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

