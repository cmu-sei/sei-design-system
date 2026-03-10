<template>
  <SdsDropdown
    v-bind="$props"
    button-style="action"
  >
    <!-- Pass through all slots -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
  </SdsDropdown>
</template>

<script setup lang="ts">
import SdsDropdown from "../Dropdown/Dropdown.vue";
import type { ButtonVariant, ActionButtonSize, ZIndexValue, DropdownPlacement } from '@/composables'
import type { Strategy } from '@floating-ui/dom'

interface ActionDropdownProps {
  /**
   * The content of the dropdown trigger.
   */
  title?: string;
  /**
   * When true, displays only an icon without text label.
   * Useful for compact layouts and toolbars.
   */
  iconOnly?: boolean;
  /**
   * Tooltip text to display when iconOnly is enabled.
   * Only shown when iconOnly is true and tooltip text is provided.
   */
  tooltip?: string;
  /**
   * Determines the purpose and particular function of the button trigger.
   */
  kind?: 'primary' | 'secondary' | 'ghost';
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
   * @deprecated Use iconOnly instead
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

/**
 * A generic dropdown component with compact action button styling.
 * 
 * This component is a convenience wrapper around SdsDropdown with buttonStyle="action".
 * 
 * Use this component for:
 * - Generic action menus with arbitrary content
 * - Toolbar actions and icon buttons
 * - Dropdowns that don't fit the Filter or Sort patterns
 * 
 * For specialized use cases, consider:
 * - {@link SdsFilterByDropdown} - Multi-select filtering with checkboxes
 * - {@link SdsSortByDropdown} - Sorting with field and direction selection
 * - {@link SdsDropdown} - Standard dropdown with traditional button trigger
 * 
 * @component
 */
defineProps<ActionDropdownProps>()
</script>
