<template>
  <floating-ui
    data-id="sds-tooltip"
    :strategy="strategy"
    :placement="placement"
    :disabled="disabled"
    :will-open="willOpen"
    :will-close="willClose"
    :popper-class="`absolute text-xs shadow-sm border rounded-theme-md text-center ${variantClass} ${sizeClass} ${zIndexClass}`"
    :arrow-class="`absolute w-2 h-2 rotate-45 ${variantArrowClass}`"
    placement-top-arrow-class="-bottom-1 border-b border-r"
    placement-right-arrow-class="-left-1 border-b border-l"
    placement-bottom-arrow-class="-top-1 border-t border-l"
    placement-left-arrow-class="-right-1 border-t border-r"
    disable-animation
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
        class="p-2"
        @mouseover="open()"
        @mouseout="close(closeDelay)"
      >
        <!-- @slot Tooltip content. @binding close, open, toggle, isOpen -->
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
export type TooltipPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

interface TooltipProps {
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto' | '';
  /**
   * Determines the purpose and particular function of the component.
   */
  type?: 'dark' | 'light';
  /**
   * Delays opening the toggle in ms.
   */
  openDelay?: number;
  /**
   * Delays closing the toggle in ms.
   */
  closeDelay?: number;
  /**
   * The width of the popover.
   */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'auto' | '';
  /**
   * The strategy of the popover on the screen.
   */
  strategy?: Strategy;
  /**
   * The placement of the popover on the screen.
   */
  placement?: TooltipPlacement;
  /**
   * Determines if the popover should display or not.
   */
  disabled?: boolean;
  /**
   * Allows for code execution prior to opening the tooltip.
   * 
   * A `cancel()` callback can be called as well to cancel
   * the opening process.
   * 
   * For example, this can prevent the tooltip from opening
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
  willOpen?: GenericFunctionType;
  /**
   * Allows for code execution prior to closing the tooltip.
   * 
   * A `cancel()` callback can be called as well to cancel
   * the opening process.
   * 
   * For example, this can prevent the tooltip from closing
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
  willClose?: GenericFunctionType;
}

defineOptions({
  name: 'SdsPopover'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  zIndex: '50',
  type: 'dark',
  openDelay: 0,
  closeDelay: 0,
  size: 'sm',
  strategy: 'absolute',
  placement: 'top',
  disabled: false,
  willOpen: undefined,
  willClose: undefined
})

const { zIndexClass } = useZIndex(() => props.zIndex)

const variantClass = useVariantClasses(
  () => props.type,
  {
    light: 'bg-gray-25 text-gray-900 border-gray-200',
    dark: 'bg-black text-gray-50 border-gray-800 dark:shadow-gray-900'
  },
  'dark'
)

const variantArrowClass = useVariantClasses(
  () => props.type,
  {
    light: 'bg-gray-25 border-gray-200',
    dark: 'bg-black border-gray-800'
  },
  'dark'
)

const sizeClass = useVariantClasses(
  () => props.size,
  {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-56',
    xl: 'w-72',
    auto: 'w-auto'
  },
  'sm'
)
</script>
