<template>
  <span
    data-id="sds-loading-box"
    :class="['rounded flex flex-row relative overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse', width, height]"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsLoadingBox'
})

defineProps({
  /**
   * Sets the height of the box. Accepts tailwind height classes.
   */
  height: {
    default: 'h-full',
    type: String
  },
  /**
   * Sets the width of the box. Accepts tailwind width classes.
   */
  width: {
    default: 'w-full',
    type: String
  }
})
</script>
