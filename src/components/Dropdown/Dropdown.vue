<template>
  <SdsFloatingUi
    data-id="sds-dropdown"
    :offset="offset"
    :strategy="strategy"
    :placement="placement"
    :disabled="disabled"
    :will-open="willOpen"
    :will-close="willClose"
    :class="[block ? 'w-full' : '']"
    :popper-class="{
      '[.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950': type === 'dark',
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
            type && 'hover:bg-gray-800 text-white border-0',
            (!isOpen && type) && 'bg-gray-900',
            (isOpen && type) && 'active bg-gray-800',
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
            class="inline-block self-center"
            :class="{
              'w-4 h-4 -mt-0.5 ml-1 -mr-1': size === 'sm' || size === '',
              'w-5 h-5 ml-2 -mt-1 -mr-2': size !== 'sm' && size !== '',
            }"
          />
        </button>
      </slot>
    </template>
    <template #default="{ open, close, toggle, isOpen }">
      <div
        :class="[
          'py-2 rounded-theme-sm',
          type === 'dark' ? 'dropdown-dark bg-gray-950': ''
        ]"
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
import { useDropdown, type ButtonKind, type ButtonVariant, type ZIndexValue } from '@/composables'

import type { Placement as BasePlacement, Strategy } from '@floating-ui/dom'
export type DropdownPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

interface DropdownProps {
  /**
   * The content of the dropdown trigger.
   */
  title?: string;
  /**
   * Determines the purpose and particular function of the button trigger.
   */
  kind?: ButtonKind;
  /**
   * Styling for the button trigger.
   */
  variant?: ButtonVariant;
  /**
   * Allows you to force dark mode on all child components
   */
  type?: 'dark';
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
  size?: 'md' | 'sm' | '';
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
  name: 'SdsDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  title: '',
  kind: 'secondary',
  variant: '' as ButtonVariant,
  type: undefined,
  zIndex: '50',
  offset: 5,
  openDelay: 0,
  closeDelay: 0,
  size: 'md',
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
  prefix: 'btn',
  kind: () => props.kind,
  variant: () => props.variant,
  size: () => props.size,
  zIndex: () => props.zIndex,
  disabled: () => props.disabled,
  block: () => props.block,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay,
  darkMode: () => props.type === 'dark'
})
</script>
