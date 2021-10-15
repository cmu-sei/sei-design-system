import SdsScrollspy from './Scrollspy.vue';

export default {
  title: 'Misc/Scrollspy',
  parameters: {
    docs: {
      description: {
        component: 'A components that watches the scroll position of the viewport.',
      },
    },
  },
  component: SdsScrollspy,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { SdsScrollspy },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <sds-scrollspy
        v-bind="$props"
        v-slot="{ scrollIntoView, active }"
      >
        <button
          :class="{ 'font-bold': active }"
          @click="scrollIntoView"
        >Go to section</button>
      </sds-scrollspy>
      <div id="content" class="overflow-scroll h-48 border border-dashed">
        <div class="my-96">spacer</div>
        <div id="section" class="bg-gray-100">Section</h2>
        <div class="my-96">spacer</div>
      </div>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  href: '#section',
  parent: '#content'
};

