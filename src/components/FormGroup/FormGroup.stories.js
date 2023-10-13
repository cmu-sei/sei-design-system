import SdsFormGroup from './FormGroup.vue';
import SdsInput from '../Input/Input.vue';

export default {
  title: 'Containers/Form Group',
  parameters: {
    docs: {
      description: {
        component: 'Alpha: A Form Group provides structure and labeling for form fields.',
      },
    },
  },
  component: SdsFormGroup,
  argTypes: {
    el: {
      options: ['div', 'fieldset'],
      control: { type: 'select' }
    },
    labelAlignment: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' }
    },
    labelWidth: {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 'auto'],
      control: { type: 'select' }
    },
    labelPosition: {
      options: ['top', 'left'],
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
  helperText: "Field helper text"
};

