<template>
  <component
    :is="tag as unknown"
    data-id="sds-dropdown-item"
    class="block w-full select-none px-4 py-2 text-sm leading-5 text-left hover:no-underline hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 hover:text-black"
    :class="{
      'bg-gray-100 dark:bg-gray-800 text-black dark:text-white': active,
      'text-gray-700 dark:text-gray-100': !active,
      'pointer-events-none opacity-50': disabled
    }"
    :disabled="disabled"
    role="menuitem"
    @click="closeOnClick ? emitter.emit('floating-ui-toggle', false) : null"
  >
    <!-- @slot Dropdown item content. -->
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: 'SdsDropdownItem',
  props: {
    /**
     * Determines the tag use for the component.
     */
    tag: {
      type: String,
      default: "a",
    },
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
  },
  setup() {
    const emitter: any = inject('emitter')
    return {
      emitter
    }
  }
});
</script>
