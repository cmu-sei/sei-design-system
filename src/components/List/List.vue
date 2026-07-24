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
  /** Width reserved for each item marker. */
  markerSize?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
  /** Size of list item titles. */
  titleSize?: 'sm' | 'md'
}

interface ListContext {
  markerFrameClass: Ref<string>
  markerGridClass: Ref<string>
  titleClass: Ref<string>
}

const props = withDefaults(defineProps<ListProps>(), {
  divided: false,
  markerSize: 'auto',
  titleSize: 'sm'
})

const markerGridClass = computed(() => {
  switch (props.markerSize) {
    case 'xl': return 'grid-cols-[3rem_1fr]'
    case 'lg': return 'grid-cols-[2.5rem_1fr]'
    case 'md': return 'grid-cols-[2rem_1fr]'
    case 'sm': return 'grid-cols-[1.5rem_1fr]'
    case 'auto':
    default: return 'grid-cols-[auto_1fr]'
  }
})

const markerFrameClass = computed(() => {
  switch (props.markerSize) {
    case 'xl': return 'h-12 w-12'
    case 'lg': return 'h-10 w-10'
    case 'md': return 'h-8 w-8'
    case 'sm': return 'h-6 w-6'
    case 'auto':
    default: return ''
  }
})

const titleClass = computed(() => {
  switch (props.titleSize) {
    case 'md': return 'text-base font-semibold text-gray-900 dark:text-gray-50'
    case 'sm':
    default: return 'text-sm font-semibold text-gray-900 dark:text-gray-50'
  }
})

provide<ListContext>('sdsList', {
  markerFrameClass,
  markerGridClass,
  titleClass
})
</script>