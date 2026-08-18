<template>
  <ol
    :id="timelineId"
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
  /** Number of items to show before collapsing middle items. Positive values have a minimum of two. */
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

const timelineId = `sds-timeline-${useId()}`
const listItem = inject<ListItemContext | null>(listItemContextKey, null)
const expanded = ref(false)
const registeredItems: TimelineItemRegistration[] = []
const orderedItems = shallowRef<TimelineItemRegistration[]>([])

const orientation = computed<TimelineOrientation>(() => props.orientation === 'horizontal' ? 'horizontal' : 'vertical')
const hasCustomMarker = computed(() => orderedItems.value.some(item => item.hasCustomMarker.value))
const markerColumnWidth = computed(() => props.markerColumnWidth ?? listItem?.markerColumnWidth.value ?? (hasCustomMarker.value ? 'auto' : '1.5rem'))
const collapseAfter = computed(() => {
  if (!Number.isFinite(props.collapseAfter) || props.collapseAfter <= 0) return 0
  return Math.max(Math.floor(props.collapseAfter), 2)
})
const timelineItemCount = computed(() => orderedItems.value.length)
const shouldCollapse = computed(() => collapseAfter.value > 0 && timelineItemCount.value > collapseAfter.value)
const hiddenCount = computed(() => Math.max(timelineItemCount.value - collapseAfter.value, 0))
const expand = () => {
  expanded.value = true
}

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
  hiddenCount,
  timelineId,
  orientation,
  expand,
  registerItem,
  unregisterItem,
  isItemVisible,
  isLastVisible
})
</script>
