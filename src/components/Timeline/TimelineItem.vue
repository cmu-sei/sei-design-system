<template>
  <li
    ref="itemElement"
    :data-id="visible ? 'sds-timeline-item' : undefined"
    :role="visible ? 'listitem' : undefined"
    :aria-current="visible && current ? 'step' : undefined"
    :class="visible ? 'group/timeline-item contents' : 'hidden'"
  >
    <template v-if="visible">
      <div
        data-id="sds-timeline-item-marker-track"
        class="flex items-center"
        :class="[
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          { 'translate-y-1.5': orientation === 'vertical' && !$slots.marker },
          { 'order-2': lastVisible }
        ]"
      >
        <div
          data-id="sds-timeline-item-marker"
          class="inline-flex items-center justify-center"
          :class="orientation === 'horizontal'
            ? 'shrink-0'
            : 'shrink-0'"
        >
          <slot name="marker">
            <span
              data-id="sds-timeline-item-marker-dot"
              class="h-2 w-2 rounded-full"
              :class="current ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-200 dark:bg-gray-700'"
            />
          </slot>
        </div>
        <span
          v-if="!lastVisible"
          data-id="sds-timeline-item-connector"
          class="flex-1 bg-gray-100 group-last/timeline-item:hidden dark:bg-gray-800"
          :class="orientation === 'horizontal' ? 'mx-1 h-0.5' : 'my-1 w-0.5'"
        />
      </div>
      <div
        data-id="sds-timeline-item-content"
        class="min-w-0"
        :class="[
          orientation === 'horizontal' ? 'flex flex-col gap-1 pt-1 pr-6 pb-4' : 'flex flex-col gap-1 pb-4',
          { 'order-2': lastVisible }
        ]"
      >
        <!-- @slot Custom content that replaces all structured item information. -->
        <slot v-if="$slots.default" />
        <template v-else>
          <h3
            v-if="title || $slots.title"
            data-id="sds-timeline-item-title"
            :class="titleClass"
          >
            <!-- @slot Custom timeline item title. -->
            <slot name="title">
              {{ title }}
            </slot>
          </h3>
          <div
            v-if="subtitle || $slots.subtitle"
            data-id="sds-timeline-item-subtitle"
            class="text-sm text-gray-700 dark:text-gray-200"
          >
            <!-- @slot Custom timeline item subtitle. -->
            <slot name="subtitle">
              {{ subtitle }}
            </slot>
          </div>
          <div
            v-if="description || $slots.description"
            data-id="sds-timeline-item-description"
            class="text-sm leading-5 text-gray-600 dark:text-gray-300"
          >
            <!-- @slot Timeline item description. -->
            <slot name="description">
              {{ description }}
            </slot>
          </div>
          <time
            v-if="timestamp || $slots.timestamp"
            data-id="sds-timeline-item-timestamp"
            :datetime="datetime"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            <!-- @slot Custom timeline item timestamp. -->
            <slot name="timestamp">
              {{ timestamp }}
            </slot>
          </time>
        </template>
      </div>
    </template>
  </li>
</template>

<script setup lang="ts">
import {
  timelineContextKey,
  type TimelineContext,
  type TimelineItemRegistration
} from './timelineContext'

defineOptions({
  name: 'SdsTimelineItem'
})

interface TimelineItemProps {
  /** Marks this item as the current event in the timeline. */
  current?: boolean
  /** Machine-readable value for the timestamp. */
  datetime?: string
  /** Optional description displayed below the subtitle. */
  description?: string
  /** Optional subtitle displayed below the title. */
  subtitle?: string
  /** Optional timestamp displayed below the description. */
  timestamp?: string
  /** Optional title displayed for the timeline item. */
  title?: string
}

withDefaults(defineProps<TimelineItemProps>(), {
  current: false,
  datetime: undefined,
  description: undefined,
  subtitle: undefined,
  title: undefined,
  timestamp: undefined
})

const timeline = inject<TimelineContext | null>(timelineContextKey, null)
const slots = useSlots()
const itemElement = ref<HTMLElement | null>(null)
const hasCustomMarker = computed(() => Boolean(slots.marker))
const item: TimelineItemRegistration = { element: itemElement, hasCustomMarker }
timeline?.registerItem(item)

const orientation = computed(() => timeline?.orientation.value ?? 'vertical')
const visible = computed(() => timeline?.isItemVisible(item) ?? true)
const lastVisible = computed(() => timeline?.isLastVisible(item) ?? false)
const titleClass = computed(() => {
  return 'text-sm font-semibold text-gray-900 dark:text-gray-50'
})

onBeforeUnmount(() => timeline?.unregisterItem(item))
</script>