<template>
  <transition
    enter-active-class="transition duration-150 ease-out transform"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-12"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toasts.length > 0"
      data-id="sds-toaster"
      class="fixed inset-0 z-50 p-4 pointer-events-none sm:p-6"
    >
      <transition-group
        tag="div"
        enter-active-class="transition duration-150 ease-out transform"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        class="space-y-4"
      >
        <!-- @slot Toaster content. @binding toasts, removeToast -->
        <slot
          :toasts="toasts"
          :remove-toast="removeToast"
        >
          <sds-toast
            v-for="toast in toasts"
            :id="toast.id"
            :key="toast.id"
            :type="toast.type"
            :title="toast.title"
            :text="toast.text"
            :auto-hide-delay="toast.autoHideDelay || 5000"
            :no-auto-hide="toast.noAutoHide || false"
            class="ml-auto"
            @remove="removeToast"
          />
        </slot>
      </transition-group>
    </div>
  </transition>
</template>

<script setup lang="ts">
import SdsToast from "../Toast/Toast.vue";

export interface ToasterToast {
  id: number
  type: 'success' | 'info' | 'warning' | 'danger'
  title: string
  text: string
  autoHideDelay: number
  noAutoHide: boolean
}

defineOptions({
  name: 'SdsToaster'
})

const props = defineProps({
  /**
   * The v-model for this component. It accepts an array of toasts. See the Toast component for guidance.
   */
  modelValue: {
    type: Array as PropType<ToasterToast[]>,
    default: () => [],
  },
})

const emit = defineEmits(['update:model-value'])

const toasts = computed({
  get() {
    return props.modelValue;
  },
  set(value: ToasterToast[]) {
    /**
     * Emitted when current array of toasts changes.
     */
    emit("update:model-value", value);
  }
})

const removeToast = (id: number | string) => {
  toasts.value = toasts.value.filter((i) => id !== i.id);
}
</script>
