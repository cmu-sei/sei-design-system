<template>
  <client-only>
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-75"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-75 delay-150"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPanel"
          data-id="sds-panel-backdrop"
          class="
            fixed
            inset-0
            block
            h-full
            px-2
            py-0
            overflow-auto
            bg-black/50
          "
          :class="[zIndexClass]"
        >
          <button
            class="absolute inset-0"
            @click="close"
          >
            <span class="sr-only">Close panel</span>
          </button>
        </div>
      </transition>
      <transition
        :enter-from-class="`${side === 'left' ? '-translate-x-full' : 'translate-x-full'}`"
        :enter-to-class="`${side === 'left' ? '-translate-x-0' : 'translate-x-0'}`"
        :leave-from-class="`${side === 'left' ? '-translate-x-0' : 'translate-x-0'}`"
        :leave-to-class="`${side === 'left' ? '-translate-x-full' : 'translate-x-full'}`"
        leave-active-class="transform transition ease-in-out duration-150"
        enter-active-class="transform transition ease-in-out duration-150 delay-75"
      >
        <div
          v-if="showPanel"
          ref="panelContainer"
          role="dialog"
          data-id="sds-panel"
          :aria-labelledby="titleWrapper && (titleWrapper as HTMLElement).id || undefined"
          :class="{
            [zIndexClass]: true,
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-lg': size === 'lg',
            'max-w-xl': size === 'xl',
            'right-0 rounded-r-none': side === 'right',
            'left-0 rounded-l-none': side === 'left'
          }"
          class="fixed flex flex-col inset-y-0 w-11/12 bg-white overflow-y-scroll border rounded-lg shadow-xl dark:text-gray-25 dark:bg-gray-900 dark:border-gray-800"
          @keydown="checkKeyEvent"
        >
          <header class="flex items-center p-6 pb-0">
            <div
              v-if="hasTitleSlot"
              :id="id"
              ref="titleWrapper"
              class="flex items-center gap-2 text-2xl leading-7 font-light"
            >
              <!-- @slot Panel header content. -->
              <slot name="title" />
            </div>
            <button
              v-focus
              aria-label="close"
              class="
            inline-block
            p-0
            ml-auto
            text-3xl text-gray-500
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
              <svg
                class="w-6 h-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <main class="p-6 flex grow flex-col">
            <!-- @slot Panel content. -->
            <slot />
          </main>
          <footer
            v-if="hasFooterSlot"
            class="flex shrink-0 sticky w-full bottom-0 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
          >
            <!-- @slot Panel footer content. -->
            <slot name="footer" />
          </footer>
        </div>
      </transition>
    </teleport>
  </client-only>
</template>

<script setup lang="ts">
import { type Directive } from "vue";
import ClientOnly from '../ClientOnly/ClientOnly.vue';

const id = useId()

defineOptions({
  name: 'SdsPanel',
  directives: {
    focus: {
      mounted(el: HTMLElement) {
        el.focus();
      },
    } as Directive,
  }
})

const props = defineProps({
  /**
   * The v-model that determines the show/hide state of the panel.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines the size of the panel.
   */
  size: {
    type: String as PropType<'xl' | 'lg' | 'md' | 'sm'>,
    default: "md",
  },
  /**
   * Determines the location of the panel.
   */
    side: {
    type: String as PropType<'left' | 'right' | ''>,
    default: "right",
  },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
})

const emit = defineEmits(['update:model-value'])

const slots = defineSlots<{
  default: () => unknown
  title: () => unknown
  footer: () => unknown
}>()

const titleWrapper = ref(null)
const panelContainer = ref(null)

const hasTitleSlot = computed(() => {
  return !!slots.title
})

const hasFooterSlot = computed(() => {
  return !!slots.footer
})

const showPanel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:model-value", value);
  },
})

const zIndexClass = computed(() => {
  switch (props.zIndex) {
    case '0':
      return 'z-0'
    case '10':
      return 'z-10'
    case '20':
      return 'z-20'
    case '30':
      return 'z-30'
    case '40':
      return 'z-40'
    case '50':
      return 'z-50'
    case 'auto':
      return 'z-auto'
    default:
      return ''
  }
})

onUnmounted(() => {
  removeDomChanges();
})

const makeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("panel-prevent-scroll");
  setTimeout(() => {
    document.addEventListener("keyup", handleEscKey);
  }, 0);
}

const removeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("panel-prevent-scroll");
  document.removeEventListener("keyup", handleEscKey);
}

const close = () => {
  showPanel.value = false;
}

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
}

const checkKeyEvent = (event: KeyboardEvent) => {
  if (panelContainer.value === null) return;

  // close panel and return early if escape
  if (event.key === "Escape") {
    close();
    return;
  }
  const focusableList: NodeListOf<HTMLElement> = (panelContainer.value as unknown as HTMLElement).querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // escape early if only 1 or no elements to focus
  if (focusableList.length < 2 && event.key === "Tab") {
    event.preventDefault();
    return;
  }

  const last = focusableList.length - 1;

  if (
    event.key === "Tab" &&
    event.shiftKey === false &&
    event.target === focusableList[last]
  ) {
    event.preventDefault();
    focusableList[0].focus();
  } else if (
    event.key === "Tab" &&
    event.shiftKey === true &&
    event.target === focusableList[0]
  ) {
    event.preventDefault();
    focusableList[last].focus();
  }
}

watch(showPanel, (value) => {
  showPanel.value = (value as boolean);
  if (typeof document === "undefined") return;
  if (value) {
    makeDomChanges();
  } else {
    removeDomChanges();
  }
}, { immediate: true })
</script>

<style>
.panel-prevent-scroll {
  overflow: hidden;
}
</style>
