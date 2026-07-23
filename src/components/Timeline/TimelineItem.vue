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
      <button
        v-if="navigable"
        data-id="sds-timeline-item-marker-button"
        type="button"
        class="mt-1 mb-1 inline-flex items-center justify-center rounded-full text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:outline-blue-400"
        :aria-label="markerLabel"
        @click="emitNavigate('marker')"
      >
        <slot name="marker">
          <span
            data-id="sds-timeline-item-marker-dot"
            class="h-2 w-2 rounded-full"
            :class="markerVariantClass"
          />
        </slot>
      </button>
      <span
        v-else
        data-id="sds-timeline-item-marker"
        class="inline-flex items-center justify-center"
        :class="$slots.marker ? '' : 'mt-1.5 mb-1'"
        :aria-label="markerLabel"
        role="img"
      >
        <slot name="marker">
          <span
            data-id="sds-timeline-item-marker-dot"
            class="h-2 w-2 rounded-full"
            :class="markerVariantClass"
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
        <button
          v-if="navigable"
          data-id="sds-timeline-item-title-button"
          type="button"
          class="text-left text-sm font-semibold text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:outline-blue-400"
          @click="emitNavigate('title')"
        >
          <span data-id="sds-timeline-item-title">{{ title }}</span>
        </button>
        <h3
          v-else
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
  variant: Ref<'default' | 'history'>
}

interface TimelineItemProps {
  /** Accessible label for the default marker. */
  markerLabel?: string
  /** Makes the marker and title emit navigate when activated. */
  navigable?: boolean
  /** Optional timestamp displayed with the item title. */
  timestamp?: string
  /** Title displayed for the timeline item. */
  title: string
  /** Determines the color of the default marker. */
  variant?: 'gray' | 'blue' | 'green' | 'orange' | 'red'
}

const emit = defineEmits<{
  /** Emitted when a navigable marker or title is activated. */
  navigate: [payload: { source: 'marker' | 'title' }]
}>()

const props = withDefaults(defineProps<TimelineItemProps>(), {
  markerLabel: 'Timeline marker',
  navigable: false,
  timestamp: undefined,
  variant: 'gray'
})

const emitNavigate = (source: 'marker' | 'title') => {
  emit('navigate', { source })
}

const timeline = inject<TimelineContext | null>('sdsTimeline', null)
const index = timeline?.registerItem() ?? 0

const visible = computed(() => timeline?.isItemVisible(index) ?? true)
const lastVisible = computed(() => timeline?.isLastVisible(index) ?? false)
const markerVariantClass = computed(() => {
  switch (props.variant) {
    case 'blue': return 'bg-blue-600 dark:bg-blue-400'
    case 'green': return 'bg-green-500 dark:bg-green-300'
    case 'orange': return 'bg-orange-500 dark:bg-orange-300'
    case 'red': return 'bg-red-600 dark:bg-red-400'
    case 'gray':
    default: return 'bg-gray-200 dark:bg-gray-700'
  }
})
const titleClass = computed(() => {
  if (timeline?.variant.value === 'history') return 'text-base font-normal leading-6 text-gray-900 dark:text-gray-50'
  return 'text-sm font-semibold text-gray-900 dark:text-gray-50'
})
</script>