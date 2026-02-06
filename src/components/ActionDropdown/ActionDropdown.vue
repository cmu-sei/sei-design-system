<template>
  <floating-ui
    data-id="sds-action-dropdown"
    :offset="offset"
    :strategy="strategy"
    :placement="placement"
    :disabled="disabled"
    :will-open="willOpen"
    :will-close="willClose"
    :class="[block ? 'w-full' : '']"
    :popper-class="{
      'bg-white absolute border shadow-lg rounded-theme-md bg-white [.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950': true,
      [auto ? 'w-auto' : 'w-56']: true,
      [zIndexClass]: true
    }"
    hide-arrow
    shift
  >
    <template #trigger="{ open, close, isOpen, toggle }">
      <!-- @slot Trigger content (used to replace trigger button). @binding open, close, isOpen, toggle -->
      <slot
        name="trigger"
        :open="open"
        :close="close"
        :is-open="isOpen"
        :toggle="toggle"
      >
        <button
          :id="id"  
          ref="button"
          type="button"
          class="space-x"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :disabled="disabled"
          :class="[
            btnClass, kindClass, variantClass, sizeClass, disabledClass, blockClass,
            isOpen && 'active'
          ]"
          @click="handleClick(isOpen, open, close)"
        >
          <!-- @slot Title content of trigger button. -->
          <slot name="title">
            {{ title }}
          </slot>
          <FontAwesomeIcon
            v-if="!hideArrow"
            :icon="faChevronDown"
            class="inline-block self-center w-5 h-5 -mr-1"
          />
        </button>
      </slot>
    </template>
    <template #default="{ open, close, toggle, isOpen }">
      <div
        class="py-2 rounded-theme-sm"
        role="menu"
        aria-orientation="vertical"
        :aria-labelledby="button && (button as HTMLElement).id || undefined"
      >
        <!-- @slot Dropdown content. @binding close, open, toggle, isOpen -->
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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import FloatingUi from "../FloatingUi/FloatingUi.vue";
import { useDropdown, type ButtonKind, type ButtonVariant, type ActionButtonSize, type ZIndexValue } from '@/composables'

import type { DropdownPlacement } from "../Dropdown/Dropdown.vue";
import type { Strategy } from '@floating-ui/dom'

defineOptions({
  name: 'SdsActionButton'
})

const props = defineProps({
  /**
   * The content of the dropdown trigger.
   */
  title: { type: String, default: '' },
  /**
   * Determines the purpose and particular function of the button trigger.
   */
  kind: { type: String as PropType<ButtonKind>, default: 'ghost' },
  /**
   * Styling for the button trigger.
   */
  variant: { type: String as PropType<ButtonVariant>, default: 'gray' },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<ZIndexValue>, required: false, default: '50' },
  /**
   * The distance between the popper and the trigger.
   */
  offset: { type: Number, default: 5 },
  /**
   * Delays opening the toggle in ms.
   */
  openDelay: { type: Number, default: 0 },
  /**
   * Delays closing the toggle in ms.
   */
  closeDelay: { type: Number, default: 0 },
  /**
   * Determines the size of the trigger button.
   */
  size: { type: String as PropType<ActionButtonSize>, default: 'sm' },
  /**
   * Determines if the arrow should display or not.
   */
  hideArrow: { type: Boolean, default: false },
  /**
   * Determines whether the content of the popper will set the width of the popper.
   */
  auto: { type: Boolean, default: false },
  /**
   * The strategy of the popover on the screen.
   */
  strategy: { type: String as PropType<Strategy>, default: 'absolute' },
  /**
   * The placement of the popover on the screen.
   */
  placement: { type: String as PropType<DropdownPlacement>, default: 'bottom-start' },
  /**
   * Determines whether to use the block styling on the trigger button or not.
   */
  block: { type: Boolean, default: false },
  /**
   * Determines if the popover should display or not.
   */
  disabled: { type: Boolean, default: false },
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
  willOpen: { type: Function as PropType<GenericFunctionType>, default: null },
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
  willClose: { type: Function as PropType<GenericFunctionType>, default: null }
})

// Use unified dropdown composable
const {
  id,
  buttonRef: button,
  zIndexClass,
  btnClass,
  kindClass,
  variantClass,
  sizeClass,
  disabledClass,
  blockClass,
  handleClick
} = useDropdown({
  prefix: 'action-btn',
  kind: () => props.kind,
  variant: () => props.variant,
  size: () => props.size,
  zIndex: () => props.zIndex,
  disabled: () => props.disabled,
  block: () => props.block,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay
})
</script>
