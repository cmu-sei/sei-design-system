<template>
  <div
    data-id="sds-toast"
    role="alert"
    aria-live="polite"
    class="w-full max-w-sm bg-white rounded-theme-sm shadow-lg pointer-events-auto dark:bg-gray-850 dark:border dark:border-gray-700"
    @mouseenter="autoHideTimer.clear"
    @mouseleave="autoHideTimer.reset"
  >
    <div class="overflow-hidden rounded-theme-sm ring-1 ring-black/5 dark:ring-gray-700">
      <div class="p-4">
        <div class="flex toasts-start">
          <div class="shrink-0">
            <IconFa7SolidCircleCheck
              v-if="localType === 'success'"
              class="w-6 h-6 text-green-400 dark:text-green-300"
            />
            <IconFa7SolidCircleInfo
              v-else-if="localType === 'info'"
              class="w-6 h-6 text-blue-400 dark:text-blue-300"
            />
            <IconFa7SolidTriangleExclamation
              v-else-if="localType === 'warning'"
              class="w-6 h-6 text-orange-300 dark:text-orange-300"
            />
            <IconFa7SolidCircleExclamation
              v-else-if="localType === 'danger'"
              class="w-6 h-6 text-red-600 dark:text-red-300"
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p
              v-if="title"
              class="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ title }}
            </p>
            <p
              v-if="text"
              class="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-400"
            >
              {{ text }}
            </p>
          </div>
          <div class="flex shrink-0 ml-4">
            <button
              class="inline-flex text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out focus:outline-hidden hover:text-gray-900 dark:hover:text-gray-100"
              @click="removeToast"
            >
              <IconFa7SolidXmark />
              <span class="sr-only">Close toast</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimedAction } from '@/composables'
defineOptions({
  name: 'SdsToast'
})

interface ToastProps {
  /**
   * Determines the id of the component.
   */
  id: number
  /**
   * Determines the purpose and particular function of the component.
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | null
  /**
   * Determines the title content of the component.
   */
  title: string
  /**
   * Determines the text content of the component.
   */
  text: string
  /**
   * Determines the wait time in milliseconds before automatically emitting the "remove" event for this component.
   */
  autoHideDelay?: number
  /**
   * Determines whether to ignore the autoHideDelay property.
   */
  noAutoHide?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: null,
  autoHideDelay: 5000,
  noAutoHide: false
})

const emit = defineEmits(['remove'])

const localType = computed(() => {
  return props.type
})

const removeToast = () => {
  /**
   * Emits an event with the "id" property as its payload.
   *
   * The parent component (typically the Toaster component) can then remove the toast from its toast array.
   */
  emit("remove", props.id);
}

const autoHideTimer = useTimedAction(removeToast, {
  delay: computed(() => props.autoHideDelay),
  enabled: computed(() => !props.noAutoHide),
  autoStart: true
})
</script>
