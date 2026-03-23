<template>
  <floating-ui
    data-id="sds-popover"
    :strategy="strategy"
    :placement="placement"
    :disabled="disabled"
    :will-open="willOpen"
    :will-close="willClose"
    :popper-class="`absolute bg-white dark:text-gray-50 dark:bg-gray-850 dark:border-gray-700 border shadow-lg rounded-theme-md ${sizeClass} ${zIndexClass}`"
    arrow-class="absolute bg-white dark:bg-gray-850 dark:border-gray-700 border w-3 h-3 rotate-45"
    placement-top-arrow-class="-bottom-1.5 border-t-0 border-l-0"
    placement-right-arrow-class="-left-1.5 border-t-0 border-r-0"
    placement-bottom-arrow-class="-top-1.5 border-b-0 border-r-0"
    placement-left-arrow-class="-right-1.5 border-b-0 border-l-0"
    shift
  >
    <template #trigger="{ open, close }">
      <div
        @mouseover="open(openDelay)"
        @mouseleave="close(closeDelay)"
      >
        <!-- @slot Trigger content. -->
        <slot name="trigger" />
      </div>
    </template>
    <template #default="{ open, close, toggle, isOpen }">
      <div
        class="p-4"
        @mouseover="open()"
        @mouseout="close(closeDelay)"
      >
        <!-- @slot Popover content. @binding close, open, toggle, isOpen -->
        <slot
          :close="close"
          :open="open"
          :toggle="toggle"
          :is-open="isOpen"
        />
      </div>
    </template>
  </floating-ui>
</template>

<script setup lang="ts">
import FloatingUi from "../FloatingUi/FloatingUi.vue";
import { useZIndex, useVariantClasses } from '@/composables'

import type { Placement as BasePlacement, Strategy } from '@floating-ui/dom'
export type PopoverPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

defineOptions({
  name: 'SdsPopover'
})

interface PopoverProps {
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto'
  /**
   * Delays opening the toggle in ms.
   */
  openDelay?: number
  /**
   * Delays closing the toggle in ms.
   */
  closeDelay?: number
  /**
   * The width of the popover.
   */
  size?: 'lg' | 'md' | 'sm' | 'auto'
  /**
   * The strategy of the popover on the screen.
   */
  strategy?: Strategy
  /**
   * The placement of the popover on the screen.
   */
  placement?: PopoverPlacement
  /**
   * Determines if the popover should display or not.
   */
  disabled?: boolean
  /**
   * Allows for code execution prior to opening the popover.
   * 
   * A `cancel()` callback can be called as well to cancel
   * the opening process.
   * 
   * For example, this can prevent the popover from opening
   * until a call to a backend API completes.
   * 
   * Example definition in parent component:
   * 
   * ```
   * async willOpen(open, cancel) {
   *  try {
   *    await SOME_API_CALL_RESPONSE()
   *    // let the open process continue
   *    open()
   *  } catch (e) {
   *    // cancel the open process
   *    cancel()
   *  }
   * }
   * ```
   */
  willOpen?: GenericFunctionType
  /**
   * Allows for code execution prior to closing the popover.
   * 
   * A `cancel()` callback can be called as well to cancel
   * the opening process.
   * 
   * For example, this can prevent the popover from closing
   * until a call to a backend API completes.
   * 
   * Example definition in parent component:
   * 
   * ```
   * async willClose(close, cancel) {
   *  try {
   *    await SOME_API_CALL_RESPONSE()
   *    // let the close process continue
   *    close()
   *  } catch (e) {
   *    // cancel the close process
   *    cancel()
   *  }
   * }
   * ```
   */
  willClose?: GenericFunctionType
}

const props = withDefaults(defineProps<PopoverProps>(), {
  zIndex: '50',
  openDelay: 500,
  closeDelay: 250,
  size: 'lg',
  strategy: 'absolute',
  placement: 'auto',
  disabled: false,
  willOpen: undefined,
  willClose: undefined
})

const { zIndexClass } = useZIndex(() => props.zIndex)

const sizeClass = useVariantClasses(
  () => props.size,
  {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    auto: 'min-w-96 w-auto'
  },
  'sm'
)
</script>
