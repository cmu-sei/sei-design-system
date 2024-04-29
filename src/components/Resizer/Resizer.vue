<template>
  <div
    data-id="sds-resizer"
  >
    <!-- @slot content.  -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsResizer'
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
