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

interface LoadingSkeletonProps {
  /**
   * Sets the height of the skeleton. Accepts tailwind height classes.
   */
  height?: string
  /**
   * Sets the width of the skeleton. Accepts tailwind width classes.
   */
  width?: string
}

withDefaults(defineProps<LoadingSkeletonProps>(), {
  height: 'h-full',
  width: 'w-full'
})
</script>
