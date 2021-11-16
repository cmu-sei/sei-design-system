import SdsToggleSwitch from './ToggleSwitch.vue';

export default {
    title: 'Inputs/ToggleSwitch',
    parameters: {
        docs: {
            description: {
                component: 'A toggle switch is a form element that can be used for when user must choose between two mutually exclusive options.',
            },
        },
    },
    component: SdsToggleSwitch,
    argTypes: {
        variant: {
            options: ['primary', 'success', 'info', 'warning', 'danger', 'disabled'],
            control: {type: 'select'}
        },
        value: {
            description: "Sets the toggle on/off."
        },
        disabled : {
            description: "Disables the toggle."
        }
    }
};

const Template = (args) => ({
    components: {SdsToggleSwitch},
    setup() {
        return { args }
    },
    template: ` <sds-toggle-switch v-model="localValue" v-bind="args"/> `,
    data() {
      return { localValue: this.$props.modelValue }
    },
    watch: {
      modelValue(value) {
        this.localValue = value
      }
    },
});

export const Default = Template.bind({});
Default.args = {};

