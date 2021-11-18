<template>
  <div
    v-if="toasts.length > 0"
    class="fixed inset-0 z-50 p-4 pointer-events-none sm:p-6"
  >
    <transition-group
      tag="div"
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      class="space-y-4"
    >
      <!-- @slot Toaster content. @binding toasts, autoHideDelay, removeToast -->
      <slot
        :toasts="toasts"
        :auto-hide-delay="autoHideDelay"
        :remove-toast="removeToast"
      >
        <sds-toast
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          :auto-hide-delay="autoHideDelay"
          @remove="removeToast"
        />
      </slot>
    </transition-group>
  </div>
</template>

<script>
import SdsToast from "../Toast/Toast.vue";

export default {
  name: 'SdsToaster',
  components: {
    SdsToast,
  },
  props: {
    /**
     * The v-model for this component that accepts an array of toasts. See the Toast component for guidance.
     */
    modelValue: {
      type: Array,
      default: () => [],
    },
    /**
     * Determines the delay used by children to invoke an event that will trigger toast removal.
     */
    autoHideDelay: {
      type: Number,
      default: 5000,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    toasts: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    removeToast(toast) {
      this.toasts = this.toasts.filter((i) => toast.id !== i.id);
    },
  },
};
</script>
