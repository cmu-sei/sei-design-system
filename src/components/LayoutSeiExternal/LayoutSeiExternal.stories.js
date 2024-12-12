import SdsLayoutSeiExternal from './LayoutSeiExternal.vue';
import SdsLayoutSeiExternalNav from '../LayoutSeiExternalNav/LayoutSeiExternalNav.vue';

export default {
  title: 'Layouts/Layout SEI External/Layout SEI External',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A highly structured layout for external-facing sites that includes a branded header, a fat footer, a navigation area and page sections.',
      },
    },
  },
  component: SdsLayoutSeiExternal,
  argTypes: {}
};

const Template = (args) => ({
  components: {
    SdsLayoutSeiExternal,
    SdsLayoutSeiExternalNav
  },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-sei-external v-bind="args">
      <template #default>
        <div class="flex flex-col">
          <div class="flex flex-col-reverse lg:flex-row gap-8 container mx-auto max-w-screen-xl py-4 md:py-8">
            <div class="flex flex-col gap-4 w-full lg:w-1/3">
              <sds-layout-sei-external-nav :page="args.page" />
            </div>
            <div class="flex flex-col gap-4 w-full lg:w-2/3">
              <h1 class="text-3xl text-gray-400">
                Page Title
              </h1>
              <h2 class="text-xl text-gray-400">
                Page Subtitle
              </h2>
              <p class="text-gray-900">
                Page description
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="py-8 text-white bg-gray-400">
          <div class="container px-4 mx-auto max-w-screen-xl space-y-6 lg:px-8">
            <ul class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <li>
                <a
                  href="https://vulcoord.cert.org/VulReport/"
                  class="hover:underline focus:underline focus:outline-none"
                >Report a Vulnerability to CERT/CC</a>
              </li>
              <li>
                <a
                  href="https://sei.cmu.edu/subscribe-to-sei-bulletin/"
                  class="hover:underline focus:underline focus:outline-none"
                >Subscribe to SEI Bulletin</a>
              </li>
              <li>
                <a
                  href="https://sei.cmu.edu/legal/request-permission-to-use-sei-material"
                  class="hover:underline focus:underline focus:outline-none"
                >Request Permission to Use SEI Materials</a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </sds-layout-sei-external>
  `
});

export const Default = Template.bind({});
Default.args = {
  showFooter: true,
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
          { title: 'Link title 3', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 4', url: 'https://designsystem.sei.cmu.edu' },
          { title: 'Link title 5', url: 'https://designsystem.sei.cmu.edu' },
        ],
        seeAll: {
          title: 'See All title',
          url: 'https://designsystem.sei.cmu.edu'
        }
      }
    ]
  }
};

