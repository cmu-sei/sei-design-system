import SdsToaster from './Toaster.vue';

export default {
  title: 'Components/Feedback/Toaster',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250
      },
      description: {
        component: 'A toaster is a wrapper that triggers the toast component.',
      },
    },
  },
  component: SdsToaster,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsToaster },
  setup() {
    return { args }
  },
  template: `
    <div>
      <button class="btn btn-secondary" @click="addToast">Add Toast</button>
      <sds-toaster v-bind="args" v-model="localValue" />
    </div>
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
  methods: {
    addToast() {
      const index = Math.floor(Math.random() * Math.floor(4));
      const toasts = [
        {
          id: Math.random(),
          title: "Success Toast",
          text: "This is the content of this toast.",
          type: "success",
        },
        {
          id: Math.random(),
          title: "Info Toast",
          text: "This is the content of this toast.",
          type: "info",
        },
        {
          id: Math.random(),
          title: "Warning Toast",
          text: "This is the content of this toast.",
          type: "warning",
        },
        {
          id: Math.random(),
          title: "Danger Toast",
          text: "This is the content of this toast.",
          type: "danger",
          noAutoHide: true,
        },
      ];
      if (!this.localValue) {
        this.localValue = []
      }
      this.localValue.unshift(toasts[index]);
    }
  }
});

export const Default = Template.bind({});
Default.args = {
};
