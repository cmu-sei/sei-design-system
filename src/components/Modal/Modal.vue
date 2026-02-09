<template>
  <client-only>
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-75"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-75 delay-75"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          data-id="sds-modal-backdrop"
          class="
            fixed
            inset-0
            block
            h-full
            bg-black/50
          "
          :class="[zIndexClass]"
        />
      </transition>
      <transition
        enter-active-class="transition-all duration-75 delay-75"
        enter-from-class="transform scale-90 opacity-0"
        leave-active-class="transition-all duration-75"
        leave-to-class="transform scale-90 opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 block h-full w-full overflow-auto z-50"
          @mousedown.self="close"
        >
          <button
            class="fixed inset-0 h-full w-full cursor-auto"
            :class="{
              'sr-only': hideHeader
            }"
            @click="close"
          >
            <span class="sr-only">Close modal</span>
          </button>
          <div
            ref="modalContainer"
            role="dialog"
            data-id="sds-modal"
            :aria-labelledby="titleWrapper && (titleWrapper as HTMLElement).id || undefined"
            class="z-50 p-2"
            @keydown="trapFocus"
            @mousedown.self="close"
          >
            <div
              class="
                relative
                block
                w-full
                mx-auto
                bg-white
                border
                rounded-theme-lg
                shadow-xl
                dark:text-gray-25
                dark:bg-gray-900 dark:border-gray-800
                md:my-16
              "
              :class="{
                [zIndexClass]: true,
                'md:max-w-sm': size === 'sm',
                'md:max-w-xl': size === 'md',
                'md:max-w-xl lg:max-w-2xl': size === 'lg',
                'md:max-w-xl lg:max-w-2xl xl:max-w-4xl': size === 'xl',
                'md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl': size === '2xl',
              }"
            >
              <div
                class="flex items-center p-6 pb-0"
                :class="{
                  'sr-only': hideHeader
                }"
              >
                <div
                  v-if="hasTitleSlot || title"
                  :id="id"
                  ref="titleWrapper"
                  class="flex items-center gap-2 text-2xl leading-7 font-light"
                >
                  <!-- @slot Modal title content. -->
                  <slot name="title">
                    {{ title }}
                  </slot>
                </div>
                <button
                  v-focus
                  aria-label="close"
                  class="
                    inline-block
                    p-0
                    ml-auto
                    text-lg text-gray-500
                    bg-transparent
                    border-0
                    cursor-pointer
                    hover:text-gray-700 hover:outline-hidden
                    focus:text-gray-700 focus:outline-hidden
                    dark:hover:text-gray-300 dark:focus:text-gray-300
                    active:text-gray-500
                    dark:active:text-gray-600
                  "
                  @click="close"
                >
                  <IconFa7SolidXmark />
                </button>
              </div>
              <div class="p-6">
                <!-- @slot Modal content. -->
                <slot />
              </div>
              <div
                v-if="hasFooterSlot"
                class="p-6 pt-0"
              >
                <!-- @slot Modal footer content. -->
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </client-only>
</template>

<script setup lang="ts">
import { type Directive } from "vue";
import ClientOnly from '../ClientOnly/ClientOnly.vue'
import { useOverlay } from '@/composables'

const id = useId()

defineOptions({
  name: 'SdsModal',
  directives: {
    focus: {
      mounted(el: HTMLElement) {
        el.focus();
      },
    } as Directive,
  },
})

const props = defineProps({
  /**
   * Determines the size of the modal.
   */
  size: {
    type: String as PropType<'2xl' | 'xl' | 'lg' | 'md' | 'sm'>,
    default: "md",
  },
  /**
   * Determines the title of the modal.
   */
  title: { type: String, default: null },
  /**
   * Determines if the modal header should be hidden.
   */
  hideHeader: { type: Boolean, default: false },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
})

/**
 * The v-model that determines the show/hide state of the modal.
 */
const model = defineModel<boolean>({ type: Boolean, default: false })

const emit = defineEmits(['update:modelValue'])

const slots = defineSlots<{
  default: () => unknown
  title: () => unknown
  footer: () => unknown
}>()

const titleWrapper = ref<HTMLElement | null>(null)
const modalContainer = ref<HTMLElement | null>(null)

const hasTitleSlot = computed(() => {
  return !!slots.title;
})

const hasFooterSlot = computed(() => {
  return !!slots.footer;
})

const showModal = computed({
  get() {
    return model.value
  },
  set(value) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:modelValue", value);
  },
})

// Use unified overlay composable for consistent behavior
const { zIndexClass, close, trapFocus } = useOverlay(
  showModal,
  modalContainer,
  {
    zIndex: () => props.zIndex,
    closeOnEscape: true,
    focusTrap: true,
    lockBodyScroll: true,
    autoFocus: true,
    restoreFocus: true,
    transitionDuration: 225, // delay-75 (75ms) + duration-75 (75ms) = 150ms, use 225ms to be safe
    onClose: () => {
      showModal.value = false
    }
  }
)
</script>
