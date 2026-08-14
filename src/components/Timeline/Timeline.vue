<template>
  <ol
    data-id="sds-timeline"
    :data-orientation="orientation"
    role="list"
    class="m-0 grid list-none p-0"
    :class="orientation === 'horizontal'
      ? 'grid-flow-col auto-cols-[minmax(12rem,1fr)] grid-rows-[auto_1fr] overflow-x-auto'
      : 'grid-cols-[var(--sds-timeline-marker-column-width,1.5rem)_1fr] gap-x-3'"
    :style="{ '--sds-timeline-marker-column-width': markerColumnWidth }"
  >
    <!-- @slot Timeline items. -->
    <slot />
    <li
      v-if="shouldCollapse && !expanded"
      data-id="sds-timeline-collapse"
      role="listitem"
      class="contents"
    >
      <div
        data-id="sds-timeline-collapse-marker-track"
        class="flex items-center order-1"
        :class="orientation === 'horizontal' ? 'flex-row' : 'flex-col'"
      >
        <span
          data-id="sds-timeline-collapse-connector"
          class="flex-1 bg-gray-100 dark:bg-gray-800"
          :class="orientation === 'horizontal' ? '-ml-1 h-0.5' : 'mt-0.5 -mb-1.5 w-0.5'"
        />
      </div>
      <div
        class="min-w-0 order-1"
        :class="orientation === 'horizontal' ? 'pb-4 pr-6' : 'pb-4'"
      >
        <button
          type="button"
          class="text-sm font-medium text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:outline-blue-400"
          @click="expanded = true"
        >
          Show {{ hiddenCount }} more
        </button>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { listItemContextKey, type ListItemContext } from '../List/listContext'
import {
  timelineContextKey,
  type TimelineContext,
  type TimelineItemRegistration,
  type TimelineOrientation
} from './timelineContext'

defineOptions({
  name: 'SdsTimeline'
})

interface TimelineProps {
  /** Number of items to show before collapsing middle items. */
  collapseAfter?: number
  /** Width reserved for each item marker. Defaults to auto when an item has a custom marker. */
  markerColumnWidth?: string
  /** Direction used to arrange timeline events. */
  orientation?: TimelineOrientation
}

const props = withDefaults(defineProps<TimelineProps>(), {
  collapseAfter: 0,
  markerColumnWidth: undefined,
  orientation: 'vertical'
})

const listItem = inject<ListItemContext | null>(listItemContextKey, null)
const expanded = ref(false)
const registeredItems: TimelineItemRegistration[] = []
const orderedItems = shallowRef<TimelineItemRegistration[]>([])

const orientation = computed<TimelineOrientation>(() => props.orientation === 'horizontal' ? 'horizontal' : 'vertical')
const hasCustomMarker = computed(() => orderedItems.value.some(item => item.hasCustomMarker.value))
const markerColumnWidth = computed(() => props.markerColumnWidth ?? listItem?.markerColumnWidth.value ?? (hasCustomMarker.value ? 'auto' : '1.5rem'))
const collapseAfter = computed(() => Number.isFinite(props.collapseAfter) ? Math.max(Math.floor(props.collapseAfter), 0) : 0)
const timelineItemCount = computed(() => orderedItems.value.length)
const shouldCollapse = computed(() => collapseAfter.value > 0 && timelineItemCount.value > collapseAfter.value)
const hiddenCount = computed(() => Math.max(timelineItemCount.value - collapseAfter.value, 0))

const registerItem = (item: TimelineItemRegistration) => {
  registeredItems.push(item)
  orderedItems.value = [...registeredItems]
}

const unregisterItem = (item: TimelineItemRegistration) => {
  const index = registeredItems.indexOf(item)
  if (index !== -1) registeredItems.splice(index, 1)
  orderedItems.value = orderedItems.value.filter(registeredItem => registeredItem !== item)
}

const synchronizeItemOrder = () => {
  const nextOrder = [...registeredItems].sort((firstItem, secondItem) => {
    const firstElement = firstItem.element.value
    const secondElement = secondItem.element.value
    if (!firstElement || !secondElement) return 0

    const position = firstElement.compareDocumentPosition(secondElement)
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
    return 0
  })

  if (nextOrder.some((item, index) => item !== orderedItems.value[index])) {
    orderedItems.value = nextOrder
  }
}

const isItemVisible = (item: TimelineItemRegistration) => {
  if (!shouldCollapse.value || expanded.value) return true
  const index = orderedItems.value.indexOf(item)
  if (index < collapseAfter.value - 1) return true
  if (index === timelineItemCount.value - 1) return true
  return false
}

const isLastVisible = (item: TimelineItemRegistration) => {
  if (!shouldCollapse.value || expanded.value) return false
  const index = orderedItems.value.indexOf(item)
  return index === timelineItemCount.value - 1
}

onMounted(synchronizeItemOrder)
onUpdated(synchronizeItemOrder)

provide<TimelineContext>(timelineContextKey, {
  orientation,
  registerItem,
  unregisterItem,
  isItemVisible,
  isLastVisible
})
</script>
