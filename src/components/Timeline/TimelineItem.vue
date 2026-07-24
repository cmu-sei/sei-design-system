<template>
  <div
    v-if="visible"
    data-id="sds-timeline-item"
    role="listitem"
    class="group/timeline-item contents"
  >
    <div
      class="flex flex-col items-center"
      :class="{ 'order-2': lastVisible }"
    >
      <span
        data-id="sds-timeline-item-marker"
        class="inline-flex items-center justify-center"
        :class="$slots.marker ? '' : 'mt-2 mb-1'"
      >
        <slot name="marker">
          <span
            data-id="sds-timeline-item-marker-dot"
            class="h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700"
          />
        </slot>
      </span>
      <span
        v-if="!lastVisible"
        class="w-0.5 flex-1 bg-gray-100 group-last/timeline-item:hidden dark:bg-gray-800"
      />
    </div>
    <div
      class="min-w-0 pb-4"
      :class="{ 'order-2': lastVisible }"
    >
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3
          data-id="sds-timeline-item-title"
          :class="titleClass"
        >
          {{ title }}
        </h3>
        <time
          v-if="timestamp"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          {{ timestamp }}
        </time>
      </div>
      <div
        v-if="$slots.description"
        class="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300"
      >
        <!-- @slot Timeline item description. -->
        <slot name="description" />
      </div>
      <!-- @slot Custom timeline item content. -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsTimelineItem'
})

interface TimelineContext {
  registerItem: () => number
  isItemVisible: (index: number) => boolean
  isLastVisible: (index: number) => boolean
}

interface TimelineItemProps {
  /** Optional timestamp displayed with the item title. */
  timestamp?: string
  /** Title displayed for the timeline item. */
  title: string
}

withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: undefined
})

const timeline = inject<TimelineContext | null>('sdsTimeline', null)
const index = timeline?.registerItem() ?? 0

const visible = computed(() => timeline?.isItemVisible(index) ?? true)
const lastVisible = computed(() => timeline?.isLastVisible(index) ?? false)
const titleClass = computed(() => {
  return 'text-sm font-semibold text-gray-900 dark:text-gray-50'
})
</script>