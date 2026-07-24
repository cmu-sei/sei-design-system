<template>
  <div
    data-id="sds-timeline"
    role="list"
    class="grid gap-x-3"
    :class="markerColumnClass"
  >
    <!-- @slot Timeline items. -->
    <slot />
    <div
      v-if="shouldCollapse && !expanded"
      data-id="sds-timeline-collapse"
      role="listitem"
      class="contents"
    >
      <div class="flex flex-col items-center order-1">
        <span class="w-0.5 flex-1 bg-gray-100 dark:bg-gray-800" />
      </div>
      <div class="min-w-0 pb-4 order-1">
        <button
          type="button"
          class="text-sm font-medium text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:outline-blue-400"
          @click="expanded = true"
        >
          Show {{ hiddenCount }} more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsTimeline'
})

interface TimelineProps {
  /** Number of items to show before collapsing middle items. */
  collapseAfter?: number
  /** Width reserved for each item marker. */
  markerSize?: 'sm' | 'md' | 'lg' | 'xl'
  /** Timeline presentation style. */
  variant?: 'default' | 'history'
}

interface TimelineContext {
  registerItem: () => number
  isItemVisible: (index: number) => boolean
  isLastVisible: (index: number) => boolean
  variant: Ref<'default' | 'history'>
}

const props = withDefaults(defineProps<TimelineProps>(), {
  collapseAfter: 0,
  markerSize: 'sm',
  variant: 'default'
})
const variant = computed(() => props.variant)


type TimelineSlotNode = {
  children?: unknown
  type?: unknown
}

const slots = useSlots()
const expanded = ref(false)
let nextIndex = 0

const timelineItemCount = computed(() => countRenderableSlotNodes(slots.default?.() ?? []))
const shouldCollapse = computed(() => props.collapseAfter > 0 && timelineItemCount.value > props.collapseAfter)
const hiddenCount = computed(() => Math.max(timelineItemCount.value - (props.collapseAfter - 1) - 1, 0))
const markerColumnClass = computed(() => {
  switch (props.markerSize) {
    case 'xl': return 'grid-cols-[3rem_1fr]'
    case 'lg': return 'grid-cols-[2.5rem_1fr]'
    case 'md': return 'grid-cols-[2rem_1fr]'
    case 'sm':
    default: return 'grid-cols-[1.5rem_1fr]'
  }
})

const isSlotNodeArray = (children: unknown): children is TimelineSlotNode[] => Array.isArray(children)

const countRenderableSlotNodes = (nodes: TimelineSlotNode[]): number => nodes.reduce((count, node) => {
  if (String(node.type) === 'Symbol(v-fgt)' && isSlotNodeArray(node.children)) {
    return count + countRenderableSlotNodes(node.children)
  }
  if (typeof node.type === 'symbol') return count
  return count + 1
}, 0)

const registerItem = () => nextIndex++

const isItemVisible = (index: number) => {
  if (!shouldCollapse.value || expanded.value) return true
  if (index < props.collapseAfter - 1) return true
  if (index === timelineItemCount.value - 1) return true
  return false
}

const isLastVisible = (index: number) => {
  if (!shouldCollapse.value || expanded.value) return false
  return index === timelineItemCount.value - 1
}

provide<TimelineContext>('sdsTimeline', {
  registerItem,
  isItemVisible,
  isLastVisible,
  variant
})
</script>