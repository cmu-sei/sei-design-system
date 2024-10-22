<template>
  <component
    :is="tag as unknown"
    data-id="sds-dropdown-item"

    :class="[
      'block w-full select-none px-4 text-sm leading-5 text-left hover:no-underline',
      variantClass
    ]"
    :disabled="disabled"
    role="menuitem"
    @click="closeOnClick ? emitter?.emit('floating-ui-toggle', false) : null"
  >
    <!-- @slot Dropdown item content. -->
    <span :class="['flex py-2', active && '-ml-2']">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { Emitter } from 'mitt';

defineOptions({
  name: 'SdsDropdownItem'
})

const props = defineProps({
  /**
   * Styling for the item.
   */
  variant: { type: String as PropType<'gray' | 'red'>, default: 'gray' },
  /**
   * Determines the tag use for the component.
   */
  tag: {
    type: String,
    default: "a",
  },
//  type prop
  /**
   * Determines whether to close the parent dropdown when this component is clicked.
   */
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  /**
   * Determines if this component is currently active.
   */
  active: {
    type: Boolean,
    default: false,
  },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emitter: Emitter<Record<'floating-ui-toggle', boolean>> | undefined = inject('emitter')

const variantClass = computed(() => {
  if(props.disabled) return 'pointer-events-none text-sm bg-white text-gray-500 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-500 dark:bg-gray-950 dark:text-gray-500'

  switch(props.variant) {
    case 'gray':
      if(props.active) {
        return 'text-sm border-l-4 border-solid border-blue-600 bg-gray-25 text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 ' + 
          '[.dropdown-dark_&]:border-blue-300 [.dropdown-dark_&]:bg-gray-900 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 ' + 
          'dark:border-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100' 
      } 
      return 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 ' +
        '[.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 ' +
        'dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100'
    case 'red':
      if(props.active) {
        return 'text-sm border-l-4 border-solid border-red-600 bg-gray-25 text-red-600 hover:bg-gray-50 hover:text-red-600 active:bg-red-25 active:text-red-600 ' + 
          '[.dropdown-dark_&]:border-red-300 [.dropdown-dark_&]:bg-gray-900 [.dropdown-dark_&]:text-red-300 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-red-300 [.dropdown-dark_&]:active:bg-red-900 [.dropdown-dark_&]:active:text-red-300 ' + 
          'dark:border-red-300 dark:bg-gray-900 dark:text-red-300 dark:hover:bg-gray-850 dark:hover:text-red-300 dark:active:bg-red-900 dark:active:text-red-300'
      } 
        return 'text-sm bg-white text-red-600 hover:bg-gray-50 hover:text-red-600 active:bg-red-25 active:text-red-600 ' +
          '[.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-red-300 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-red-300 [.dropdown-dark_&]:active:bg-red-900 [.dropdown-dark_&]:active:text-red-300 ' +
          'dark:bg-gray-950 dark:text-red-300 dark:hover:bg-gray-850 dark:hover:text-red-300 dark:active:bg-red-900 dark:active:text-red-300'
    default:
      // Default is the same as the regular gray variant
      return 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 ' +
        '[.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 ' +
        'dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100'
    }
})
</script>
