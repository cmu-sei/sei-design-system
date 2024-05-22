<template>
  <component
    :is="tag as unknown"
    data-id="sds-dropdown-item"

    :class="[
      'block w-full select-none px-4 text-sm leading-5 text-left hover:no-underline',
      variantClass,
      {
        'border-l-8 border-solid border-red-700 dark:border-red-400': active,
        'pointer-events-none opacity-50': disabled
      }
    ]"
    :disabled="disabled"
    role="menuitem"
    @click="closeOnClick ? emitter?.emit('floating-ui-toggle', false) : null"
  >
    <!-- @slot Dropdown item content. -->
    <div :class="['flex py-2', active && '-ml-2']">
      <slot />
    </div>
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
  switch(props.variant) {
    case 'gray':
      return '[.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-white hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 hover:text-black'
    case 'red':
    return '[.dropdown-dark_&]:hover:bg-gray-800 [.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-red-300 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-gray-800 hover:text-red-600'
  }
})
</script>
