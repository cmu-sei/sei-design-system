<template>
  <span
    data-id="sds-application-navigation-label"
    class="flex-1 w-0 min-w-0 whitespace-normal text-pretty text-left"
    v-bind="$attrs"
  >
    {{ title }}<span
      v-if="badgeCount"
      class="relative -top-0.5 inline-flex align-middle h-5 min-w-5 items-center justify-center ml-1 px-1.5 text-xs leading-none font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
    >{{ badgeCount }}</span>
  </span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsApplicationNavigationLabel',
  inheritAttrs: false
})

interface ApplicationNavigationLabelProps {
  /**
   * Navigation item title. Required string.
   */
  title: string
  /**
   * Count displayed after the title. Defaults to null.
   */
  badgeCount?: number | null
}

withDefaults(defineProps<ApplicationNavigationLabelProps>(), {
  badgeCount: null
})
</script>
