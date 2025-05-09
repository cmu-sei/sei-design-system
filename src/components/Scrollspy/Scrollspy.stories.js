import SdsScrollspy from './Scrollspy.vue';

export default {
  title: 'Components/Utility/Scrollspy',
  parameters: {
    docs: {
      description: {
        component: 'A scrollspy listens to page scrolling and trigger events based on the scroll position and allows users to smoothly navigate through different page sections.',
      },
    },
  },
  component: SdsScrollspy,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsScrollspy },
  setup() {
    return { args }
  },
  template: `
    <div>
      <sds-scrollspy v-bind="args" class="tab-group" />
      <div id="scrollspy-parent" class="scroll-area h-96 mb-4 border p-4">
        <p
          id="scrollspy-test"
          class="text-4xl mb-4"
        >
          Heading 1
        </p>
        <p
          class="mb-8"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Sit amet justo donec enim diam vulputate ut. Nam at lectus urna duis convallis. Mauris in aliquam sem fringilla ut morbi. Orci porta non pulvinar neque laoreet suspendisse interdum. Duis convallis convallis tellus id interdum. Nisi vitae suscipit tellus mauris a diam. Vitae purus faucibus ornare suspendisse. Hendrerit gravida rutrum quisque non. Purus non enim praesent elementum facilisis leo vel. Tellus integer feugiat scelerisque varius morbi. Potenti nullam ac tortor vitae purus faucibus ornare. Faucibus in ornare quam viverra.
        </p>
        <p
          id="scrollspy-test-2"
          class="text-4xl mb-4"
        >
          Heading 2
        </p>
        <p
          class="mb-8"
        >
          Phasellus vestibulum lorem sed risus ultricies tristique. A condimentum vitae sapien pellentesque habitant. Urna nec tincidunt praesent semper. Tortor id aliquet lectus proin. Metus vulputate eu scelerisque felis imperdiet. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Pellentesque nec nam aliquam sem et. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Sit amet est placerat in egestas erat imperdiet sed euismod. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Nunc sed augue lacus viverra vitae congue eu consequat. Felis imperdiet proin fermentum leo vel orci porta.
        </p>
        <p
          id="scrollspy-test-3"
          class="text-4xl mb-4"
        >
          Heading 3
        </p>
        <p
          class="mb-8"
        >
          A iaculis at erat pellentesque adipiscing. Sed arcu non odio euismod. Sem integer vitae justo eget magna fermentum iaculis. Praesent elementum facilisis leo vel fringilla est ullamcorper. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. In dictum non consectetur a erat nam at lectus. Nam at lectus urna duis convallis convallis. Montes nascetur ridiculus mus mauris. Mauris ultrices eros in cursus turpis massa tincidunt. Sagittis orci a scelerisque purus semper eget duis. Varius morbi enim nunc faucibus. Nec nam aliquam sem et tortor consequat id porta. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. In eu mi bibendum neque egestas congue quisque. Tortor aliquam nulla facilisi cras. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Adipiscing commodo elit at imperdiet dui. In hac habitasse platea dictumst. Laoreet id donec ultrices tincidunt arcu.
        </p>
        <p
          id="scrollspy-test-4"
          class="text-4xl mb-4"
        >
          Heading 4
        </p>
        <p
          class="mb-8"
        >
          Porttitor rhoncus dolor purus non enim. Lectus proin nibh nisl condimentum id venenatis. Quis varius quam quisque id diam vel quam. Nibh sit amet commodo nulla. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Ante metus dictum at tempor commodo ullamcorper a. Eleifend quam adipiscing vitae proin sagittis nisl. Tincidunt id aliquet risus feugiat in. Purus semper eget duis at tellus at urna condimentum mattis. Rutrum quisque non tellus orci ac auctor augue mauris. Interdum varius sit amet mattis. Porttitor eget dolor morbi non. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Blandit libero volutpat sed cras ornare arcu dui vivamus. Augue eget arcu dictum varius duis at consectetur lorem. Urna porttitor rhoncus dolor purus non enim. Est placerat in egestas erat imperdiet sed euismod nisi porta. Eu feugiat pretium nibh ipsum.
        </p>
        <p
          id="scrollspy-test-5"
          class="text-4xl mb-4"
        >
          Heading 5
        </p>
        <p
          class="mb-8"
        >
          Nisi lacus sed viverra tellus in. Diam vel quam elementum pulvinar etiam non quam. Donec ac odio tempor orci dapibus ultrices in. Praesent elementum facilisis leo vel. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Placerat in egestas erat imperdiet. Diam in arcu cursus euismod quis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Sed arcu non odio euismod lacinia at quis risus sed. Nibh nisl condimentum id venenatis a condimentum vitae sapien. In est ante in nibh mauris cursus mattis molestie. Amet aliquam id diam maecenas ultricies. Duis ultricies lacus sed turpis tincidunt id. Lectus proin nibh nisl condimentum id venenatis a. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. In metus vulputate eu scelerisque felis imperdiet proin.
        </p>
      </div>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'scrollspy-test', text: 'Heading 1' },
    { id: 'scrollspy-test-2', text: 'Heading 2' },
    { id: 'scrollspy-test-3', text: 'Heading 3' },
    { id: 'scrollspy-test-4', text: 'Heading 4' },
    { id: 'scrollspy-test-5', text: 'Heading 5' }
  ],
  parent: "#scrollspy-parent",
  itemClass: "tab tab-red tab-underline",
  activeClass: "active"
};

