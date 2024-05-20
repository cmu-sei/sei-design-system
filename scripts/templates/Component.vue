<template>
  <div
    data-id="sds----NAME-LOWER---"
  >
    <!-- @slot content.  -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Sds---NAME---'
})

const props = defineProps({
  /* Define props, like so:
   * ---
   * type: {
   * type: String as PropType<'light-border' | 'light' | 'medium' | 'dark'>,
   * default: 'medium'
   * },
   */
})
</script>
