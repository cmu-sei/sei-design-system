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
        :enter-from-class="side === 'bottom' ? 'translate-y-full' : (side === 'left' ? '-translate-x-full' : 'translate-x-full')"
        :enter-to-class="side === 'bottom' ? 'translate-y-0' : (side === 'left' ? '-translate-x-0' : 'translate-x-0')"
        :leave-from-class="side === 'bottom' ? 'translate-y-0' : (side === 'left' ? '-translate-x-0' : 'translate-x-0')"
        :leave-to-class="side === 'bottom' ? 'translate-y-full' : (side === 'left' ? '-translate-x-full' : 'translate-x-full')"
        leave-active-class="transform transition ease-in-out duration-150"
        enter-active-class="transform transition ease-in-out duration-150 delay-75"
      >
        <div
          v-if="showPanel"
          ref="panelContainer"
          role="dialog"
          aria-modal="true"
          data-id="sds-panel"
          :aria-labelledby="hasTitleSlot ? id : undefined"
          :aria-describedby="hasDefaultSlot ? `${id}-content` : undefined"
          :aria-label="!hasTitleSlot ? 'Panel' : undefined"
          :class="{
            [zIndexClass]: true,
            'max-w-sm': size === 'sm' && side !== 'bottom',
            'max-w-md': size === 'md' && side !== 'bottom',
            'max-w-lg': size === 'lg' && side !== 'bottom',
            'max-w-xl': size === 'xl' && side !== 'bottom',
            'max-h-[40vh]': size === 'sm' && side === 'bottom',
            'max-h-[60vh]': size === 'md' && side === 'bottom',
            'max-h-[75vh]': size === 'lg' && side === 'bottom',
            'max-h-[90vh]': size === 'xl' && side === 'bottom',
            'right-0 rounded-r-none inset-y-0 w-11/12': side === 'right',
            'left-0 rounded-l-none inset-y-0 w-11/12': side === 'left',
            'bottom-0 left-0 right-0 rounded-b-none w-full': side === 'bottom'
          }"
          class="fixed flex flex-col bg-white overflow-y-scroll border rounded-theme-lg shadow-xl dark:text-gray-25 dark:bg-gray-900 dark:border-gray-800"
          @keydown="trapFocus"
        >
          <header class="flex items-center shrink-0 sticky z-10 w-full top-0 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
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
              ref="closeButton"
              type="button"
              aria-label="Close panel"
              class="
                inline-block
                p-0
                ml-auto
                text-lg
                text-gray-500
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
          </header>
          <main
            :id="`${id}-content`"
            class="p-6 pt-0 flex grow flex-col z-1"
            tabindex="-1"
          >
            <!-- @slot Panel content. -->
            <slot />
          </main>
          <footer
            v-if="hasFooterSlot"
            class="flex shrink-0 sticky z-10 w-full bottom-0 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
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
import ClientOnly from '../ClientOnly/ClientOnly.vue'
import { useOverlay } from '@/composables'

const id = useId()

interface PanelProps {
  /**
   * Determines the size of the panel.
   */
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /**
   * Determines the location of the panel.
   */
  side?: 'left' | 'right' | 'bottom' | '';
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto' | '';
}

defineOptions({
  name: 'SdsPanel'
})

const props = withDefaults(defineProps<PanelProps>(), {
  size: 'md',
  side: 'right',
  zIndex: '50'
})

/**
 * The v-model that determines the show/hide state of the panel.
 */
const showPanel = defineModel<boolean>({ type: Boolean, default: false })

const slots = defineSlots<{
  default: () => unknown
  title: () => unknown
  footer: () => unknown
}>()

const panelContainer = ref<HTMLElement | null>(null)

const hasTitleSlot = computed(() => {
  return !!slots.title
})

const hasFooterSlot = computed(() => {
  return !!slots.footer
})

const hasDefaultSlot = computed(() => {
  return !!slots.default
})

// Use unified overlay composable for consistent behavior
const { zIndexClass, close, trapFocus } = useOverlay(
  showPanel,
  panelContainer,
  {
    zIndex: () => props.zIndex,
    closeOnEscape: true,
    focusTrap: true,
    lockBodyScroll: true,
    autoFocus: true,
    restoreFocus: true,
    transitionDuration: 250, // delay-75 (75ms) + duration-150 (150ms) = 225ms, use 250ms to be safe
    onClose: () => {
      showPanel.value = false
    }
  }
)
</script>

