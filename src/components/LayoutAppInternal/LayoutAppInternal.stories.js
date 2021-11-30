import SdsLayoutAppInternal from './LayoutAppInternal.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Layouts/LayoutAppInternal',
  parameters: {
    docs: {
      description: {
        component: 'The Layout App Internal is comprised of 3 separate UI elements; the header, the footer, and the sidebar. ',
      },
    },
  },
  component: SdsLayoutAppInternal,
  argTypes: {
  }
};

const Template = (args) => ({
  components: { SdsLayoutAppInternal },
  setup() {
    return { args }
  },
  template: `
    <sds-layout-app-internal v-bind="args">
      <template #header>
        Header content
      </template>
      <template #sidebar>
        Sidebar content
      </template>
      <template #page-top>
        Page top content
      </template>
      <template #default>
        Page content
      </template>
      <template #footer>
        Footer content
      </template>
    </sds-sds-layout-app-internal>
  `,
  methods: {
    onClick: action('onClick')
  }
});

export const Default = Template.bind({});
Default.args = {
  variant: 'default'
};

