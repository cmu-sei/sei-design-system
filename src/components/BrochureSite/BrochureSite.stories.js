import SdsBrochureSite from './BrochureSite.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A highly structured layout for external-facing sites that includes a branded header, a fat footer, a navigation area and page sections.',
      },
    },
  },
  component: SdsBrochureSite,
  argTypes: {}
};

const Template = (args) => ({
  components: {
    SdsBrochureSite
  },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site v-bind="args">
      <template #default>
        <div class="flex flex-col gap-4 w-full lg:w-2/3">
          <h1 class="text-h1">
            Page text-h1
          </h1>
          <h2 class="text-h2">
            Page text-h2
          </h2>
          <p class="text-body">
            Page text-body
          </p>
        </div>
      </template>
    </sds-brochure-site>
  `
});

export const Default = Template.bind({});
Default.args = {
  showFooter: true,
  organization: 'CERT Coordination Center',
  nav: [
    {
      key: 'home',
      title: 'Home',
      alignment: 'left',
      tag: 'a',
      href: 'https://sei.cmu.edu',
    },
    {
      key: 'section-1',
      title: 'Section 1',
      type: 'slide',
      content: {
        col_1: [
          {
            label: 'Col 1',
            href: 'https://designsystem.sei.cmu.edu',
            type: 'landing-page'
          },
          { label: 'Link label 1', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 2', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 3', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 4', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 5', href: 'https://designsystem.sei.cmu.edu' },
        ],
        col_2: [
          {
            label: 'Col 2',
            href: 'https://designsystem.sei.cmu.edu',
            type: 'landing-page'
          }
        ],
        col_3: [
          {
            label: 'Col 3',
            href: 'https://designsystem.sei.cmu.edu',
            type: 'landing-page'
          }
        ]
      }
    },
    {
      key: 'section-2',
      title: 'Section 2',
      type: 'slide',
      content: {
        col_1: [
          { label: 'Link label 1', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 2', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 3', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 4', href: 'https://designsystem.sei.cmu.edu' },
          { label: 'Link label 5', href: 'https://designsystem.sei.cmu.edu' },
        ]
      }
    }
  ]
};
