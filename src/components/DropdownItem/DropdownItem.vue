<template>
  <component
    :is="tag"
    class="block w-full px-4 py-2 text-sm leading-5 text-left hover:no-underline hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white focus:outline-none focus:bg-blue-500 dark:focus:bg-blue-600 focus:text-white"
    :class="{
      'bg-blue-500 dark:bg-blue-600 text-white': active,
      'text-gray-700 dark:text-gray-100': !active,
    }"
    role="menuitem"
    @click="closeOnClick ? emitter.emit('dropdown-close') : null"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: 'SdsDropdownItem',
  props: {
    tag: {
      type: String,
      default: "a",
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const emitter = inject('emitter')
    return {
      emitter
    }
  }
});
</script>
