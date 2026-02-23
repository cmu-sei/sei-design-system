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
import { useVariantClasses } from '@/composables'

interface DropdownItemProps {
  /**
   * Styling for the item.
   */
  variant?: 'gray' | 'red';
  /**
   * Determines the tag use for the component.
   */
  tag?: string;
  /**
   * Determines whether to close the parent dropdown when this component is clicked.
   */
  closeOnClick?: boolean;
  /**
   * Determines if this component is currently active.
   */
  active?: boolean;
  /**
   * Disables the component to prevent user interaction.
   */
  disabled?: boolean;
}

defineOptions({
  name: 'SdsDropdownItem'
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  variant: 'gray',
  tag: "a",
  closeOnClick: true,
  active: false,
  disabled: false
})

const emitter: Emitter<Record<'floating-ui-toggle', boolean>> | undefined = inject('emitter')

// Compute variant key combining variant and active state
const variantKey = computed(() => {
  if (props.disabled) return 'disabled'
  return props.active ? `${props.variant}-active` : props.variant
})

const variantClass = useVariantClasses(variantKey, {
  'disabled': 'pointer-events-none text-sm bg-white text-gray-500 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-500 dark:bg-gray-950 dark:text-gray-500',
  'gray': 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100',
  'gray-active': 'text-sm border-l-4 border-solid border-blue-600 bg-gray-25 text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 [.dropdown-dark_&]:border-blue-300 [.dropdown-dark_&]:bg-gray-900 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 dark:border-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100',
  'red': 'text-sm bg-white text-red-600 hover:bg-gray-50 hover:text-red-600 active:bg-red-25 active:text-red-600 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-red-300 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-red-300 [.dropdown-dark_&]:active:bg-red-900 [.dropdown-dark_&]:active:text-red-300 dark:bg-gray-950 dark:text-red-300 dark:hover:bg-gray-850 dark:hover:text-red-300 dark:active:bg-red-900 dark:active:text-red-300',
  'red-active': 'text-sm border-l-4 border-solid border-red-600 bg-gray-25 text-red-600 hover:bg-gray-50 hover:text-red-600 active:bg-red-25 active:text-red-600 [.dropdown-dark_&]:border-red-300 [.dropdown-dark_&]:bg-gray-900 [.dropdown-dark_&]:text-red-300 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-red-300 [.dropdown-dark_&]:active:bg-red-900 [.dropdown-dark_&]:active:text-red-300 dark:border-red-300 dark:bg-gray-900 dark:text-red-300 dark:hover:bg-gray-850 dark:hover:text-red-300 dark:active:bg-red-900 dark:active:text-red-300'
}, 'text-sm bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-blue-25 active:text-gray-900 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-100 [.dropdown-dark_&]:hover:bg-gray-850 [.dropdown-dark_&]:hover:text-gray-100 [.dropdown-dark_&]:active:bg-blue-900 [.dropdown-dark_&]:active:text-gray-100 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-850 dark:hover:text-gray-100 dark:active:bg-blue-900 dark:active:text-gray-100')
</script>
