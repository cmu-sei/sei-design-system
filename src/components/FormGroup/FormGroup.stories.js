import SdsFormGroup from './FormGroup.vue';
import SdsInput from '../Input/Input.vue';

export default {
  title: 'Containers/Form Group',
  parameters: {
    docs: {
      description: {
        component: 'Alpha: A form group provides structure and labeling for form fields.',
      },
    },
  },
  component: SdsFormGroup,
  argTypes: {
    el: {
      options: ['div', 'fieldset'],
      control: { type: 'select' }
    },
  }
};

const Template = (args) => ({
  components: { SdsFormGroup, SdsInput },
  setup() {
    return { args }
  },
  template: `
    <sds-form-group
      v-slot="{ id }"
      v-bind="args"
    >
      <sds-input
        :id="id"
        v-model="text"
        v-bind="args"
      />
    </sds-form-group>
  `,
  data() {
    return { text: '' }
  }
});

export const Default = Template.bind({});
Default.args = {
  label: "Field label",
  description: "Field description",
  heplerText: "Field helper text"
};

