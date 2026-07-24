<template>
  <ul
    data-id="sds-list"
    role="list"
    class="space-y-4"
    :class="{
      '[&>[data-id=sds-list-item]+[data-id=sds-list-item]]:border-t [&>[data-id=sds-list-item]+[data-id=sds-list-item]]:border-gray-50 [&>[data-id=sds-list-item]+[data-id=sds-list-item]]:pt-4 dark:[&>[data-id=sds-list-item]+[data-id=sds-list-item]]:border-gray-900': divided
    }"
  >
    <!-- @slot List items. -->
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsList'
})

interface ListProps {
  /** Adds dividers between list items. */
  divided?: boolean
}

interface ListContext {
  markerGridClass: string
  titleClass: string
}

withDefaults(defineProps<ListProps>(), {
  divided: false
})

provide<ListContext>('sdsList', {
  markerGridClass: 'grid-cols-[var(--sds-list-item-marker-column-width,auto)_1fr]',
  titleClass: 'text-sm font-semibold text-gray-900 dark:text-gray-50'
})
</script>