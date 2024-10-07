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
  if(props.disabled) return 'pointer-events-none bg-white text-gray-400 text-sm'

  switch(props.variant) {
    case 'gray':
      if(props.active) {
        return 'text-sm border-l-4 border-solid border-blue-500 bg-gray-25 text-gray-900 hover:bg-gray-50 hover:text-black active:bg-gray-100 active:text-black [.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-white dark:text-white dark:hover:bg-gray-800 dark:hover:text-white'
      } 
      return 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-black active:bg-gray-100 active:text-black [.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-white dark:text-white dark:hover:bg-gray-800 dark:hover:text-white'
    case 'red':
      if(props.active) {
        return 'text-sm border-l-4 border-solid border-red-500 bg-red-25 text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-100 active:text-red-700 [.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-red-300 dark:text-red-300 dark:hover:bg-gray-800 dark:hover:text-red-600'
      }
      return 'text-sm bg-white text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-100 active:text-red-700 [.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-red-300 dark:text-red-300 dark:hover:bg-gray-800 dark:hover:text-red-600'
    default:
      // Default is the same as the regular gray variant
      return 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-black active:bg-gray-100 active:text-black [.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-white dark:text-white dark:hover:bg-gray-800 dark:hover:text-white'
  }
})
</script>
