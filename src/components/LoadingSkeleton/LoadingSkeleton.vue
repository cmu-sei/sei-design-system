<template>
  <span
    data-id="sds-loading-skeleton"
    :class="['rounded-theme-sm flex flex-row relative overflow-hidden bg-gray-100 dark:bg-gray-800 animate-pulse', width, height]"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsLoadingSkeleton'
})

defineProps({
  /**
   * Sets the height of the skeleton. Accepts tailwind height classes.
   */
  height: {
    default: 'h-full',
    type: String
  },
  /**
   * Sets the width of the skeleton. Accepts tailwind width classes.
   */
  width: {
    default: 'w-full',
    type: String
  }
})
</script>
