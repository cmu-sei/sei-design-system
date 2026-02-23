<template>
  <SdsFloatingUi
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
          <IconFa7SolidChevronDown
            v-if="!hideArrow"
            class="inline-block self-center w-4 h-4"
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
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import SdsFloatingUi from "../FloatingUi/FloatingUi.vue";
import { useDropdown, type ButtonKind, type ButtonVariant, type ActionButtonSize, type ZIndexValue } from '@/composables'

import type { DropdownPlacement } from "../Dropdown/Dropdown.vue";
import type { Strategy } from '@floating-ui/dom'

interface ActionDropdownProps {
  /**
   * The content of the dropdown trigger.
   */
  title?: string;
  /**
   * Determines the purpose and particular function of the button trigger.
   */
  kind?: Exclude<ButtonKind, 'tertiary'>;
  /**
   * Styling for the button trigger.
   */
  variant?: ButtonVariant;
  /**
   * The z-index for the popover.
   */
  zIndex?: ZIndexValue;
  /**
   * The distance between the popper and the trigger.
   */
  offset?: number;
  /**
   * Delays opening the toggle in ms.
   */
  openDelay?: number;
  /**
   * Delays closing the toggle in ms.
   */
  closeDelay?: number;
  /**
   * Determines the size of the trigger button.
   */
  size?: ActionButtonSize;
  /**
   * Determines if the arrow should display or not.
   */
  hideArrow?: boolean;
  /**
   * Determines whether the content of the popper will set the width of the popper.
   */
  auto?: boolean;
  /**
   * The strategy of the popover on the screen.
   */
  strategy?: Strategy;
  /**
   * The placement of the popover on the screen.
   */
  placement?: DropdownPlacement;
  /**
   * Determines whether to use the block styling on the trigger button or not.
   */
  block?: boolean;
  /**
   * Determines if the popover should display or not.
   */
  disabled?: boolean;
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
  willOpen?: GenericFunctionType;
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
  willClose?: GenericFunctionType;
}

defineOptions({
  name: 'SdsActionDropdown'
})

const props = withDefaults(defineProps<ActionDropdownProps>(), {
  title: '',
  kind: 'ghost',
  variant: 'gray',
  zIndex: '50',
  offset: 5,
  openDelay: 0,
  closeDelay: 0,
  size: 'sm',
  hideArrow: false,
  auto: false,
  strategy: 'absolute',
  placement: 'bottom-start',
  block: false,
  disabled: false,
  willOpen: undefined,
  willClose: undefined
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
