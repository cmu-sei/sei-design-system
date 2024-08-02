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
      'bg-white absolute border shadow-lg rounded-md bg-white dark:border-gray-700 dark:bg-gray-850': true,
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
          ref="button"
          v-uid
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
          <svg
            v-if="!hideArrow"
            class="inline-block self-center w-5 h-5 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </slot>
    </template>
    <template #default="{ open, close, toggle, isOpen }">
      <div
        class="py-2 rounded"
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
import FloatingUi from "../FloatingUi/FloatingUi.vue";
import { Uid } from '@shimyshack/uid'

import type { Placement as BasePlacement, Strategy } from '@floating-ui/dom'
export type DropdownPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

defineOptions({
  name: 'SdsActionButton',
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * The content of the dropdown trigger.
   */
  title: { type: String, default: '' },
  /**
   * Determines the purpose and particular function of the button trigger.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'ghost'>, default: 'ghost' },
  /**
   * Styling for the button trigger.
   */
  variant: { type: String as PropType<'gray' | 'red'>, default: 'gray' },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
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
  size: { type: String as PropType<'lg' | 'md' | 'sm' | 'xs'>, default: 'sm' },
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

const button = ref()

const handleClick = (isOpen: boolean, open: GenericFunctionType, close: GenericFunctionType) => {
  if (isOpen) {
    close(props.closeDelay)
  } else {
    open(props.openDelay)
  }
}

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

const sizeClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'action-btn-lg'
    case 'md':
      return 'action-btn-md'
    case 'sm':
      return 'action-btn-sm'
    case 'xs':
      return 'action-btn-xs'
    default:
      return ''
  }
})

const btnClass = computed(() => {
  return props.kind ? 'action-btn' : ''
})

const kindClass = computed(() => {
  switch (props.kind) {
    case 'primary':
      return 'action-btn-primary'
    case 'secondary':
      return 'action-btn-secondary'
    case 'ghost':
      return 'action-btn-ghost'
    default:
      return ''
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'gray':
      return 'action-btn-gray'
    case 'red':
      return 'action-btn-red'
    default:
      return ''
  }
})

const disabledClass = computed(() => {
  return props.disabled ? 'disabled' : ''
})

const blockClass = computed(() => {
  return props.block ? 'action-btn-block' : ''
})
</script>
