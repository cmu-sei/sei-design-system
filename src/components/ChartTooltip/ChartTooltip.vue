<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.visible"
      ref="tooltipRef"
      class="fixed left-0 top-0 z-10 pointer-events-none min-w-24 rounded-md border border-gray-200 bg-gray-25 p-2 text-xs text-gray-900 shadow-sm transition-[opacity,transform] duration-150 ease-out dark:border-gray-800 dark:bg-black dark:text-gray-50 dark:shadow-gray-900"
      :style="tooltipStyle"
    >
      <slot />
      <svg
        class="absolute h-3.25 w-2 overflow-visible"
        :style="arrowStyle"
        viewBox="0 0 8 13"
        aria-hidden="true"
      >
        <path
          d="M8 0 L0 6 L8 12 Z"
          class="fill-gray-25 dark:fill-black"
        />
        <path
          d="M0 6 L8 0 M0 6 L8 12"
          class="stroke-gray-200 dark:stroke-gray-800"
          fill="none"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/** Minimum viewport inset to keep tooltip content visible. */
const EDGE_PADDING = 8
/** Horizontal gap between cursor point and tooltip body. */
const GAP = 12
/** Vertical inset clamp for the arrow inside the tooltip body. */
const ARROW_INSET = 10
/** Hard width cap for tooltip content before wrapping. */
const MAX_WIDTH_PX = 384

/** Input coordinates are viewport-relative and controlled by parent chart. */
interface ChartTooltipProps {
  visible: boolean
  x: number
  y: number
}

defineOptions({ 
  name: 'SdsChartTooltip' 
})

const props = defineProps<ChartTooltipProps>()
const tooltipRef = ref<HTMLElement | null>(null)
/** Measured tooltip dimensions used for placement/clamping. */
const tooltipWidth = ref(0)
const tooltipHeight = ref(0)
/** Current viewport dimensions used for edge-aware placement. */
const viewportWidth = ref(0)
const viewportHeight = ref(0)

let resizeObserver: ResizeObserver | null = null

/** Returns value clamped between min and max (inclusive). */
function clamp(value: number, min: number, max: number): number {
  if (max < min) return value
  return Math.min(Math.max(value, min), max)
}

/** Syncs viewport dimensions for responsive tooltip placement. */
function updateViewport() {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}

/** Measures rendered tooltip size after content/layout changes. */
function measureTooltip() {
  if (!tooltipRef.value) return
  const rect = tooltipRef.value.getBoundingClientRect()
  tooltipWidth.value = rect.width
  tooltipHeight.value = rect.height
}

/** Cleans up resize observer before re-binding or unmount. */
function disconnectResizeObserver() {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

watch(tooltipRef, (el) => {
  disconnectResizeObserver()
  if (!el) return
  resizeObserver = new ResizeObserver(() => measureTooltip())
  resizeObserver.observe(el)
  measureTooltip()
})

watch(
  () => props.visible,
  async (visible) => {
    if (!visible) return
    await nextTick()
    measureTooltip()
  },
)

watch(
  () => [props.x, props.y],
  async () => {
    if (!props.visible) return
    await nextTick()
    measureTooltip()
  },
)

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  disconnectResizeObserver()
})

/**
 * Preferred horizontal side for tooltip body.
 * - right by default
 * - flips left when right side lacks room
 */
const placement = computed<'right' | 'left'>(() => {
  if (viewportWidth.value <= 0 || tooltipWidth.value <= 0) return 'right'
  const spaceRight = viewportWidth.value - props.x - GAP - EDGE_PADDING
  const spaceLeft = props.x - GAP - EDGE_PADDING

  if (tooltipWidth.value <= spaceRight) return 'right'
  if (tooltipWidth.value <= spaceLeft) return 'left'
  return spaceRight >= spaceLeft ? 'right' : 'left'
})

/** Final tooltip left coordinate after side selection and viewport clamping. */
const tooltipLeft = computed(() => {
  const width = tooltipWidth.value
  const maxLeft = Math.max(EDGE_PADDING, viewportWidth.value - EDGE_PADDING - width)

  if (placement.value === 'right') {
    return clamp(props.x + GAP, EDGE_PADDING, maxLeft)
  }

  return clamp(props.x - GAP - width, EDGE_PADDING, maxLeft)
})

/** Vertically centers tooltip near cursor, clamped to viewport bounds. */
const tooltipTop = computed(() => {
  const height = tooltipHeight.value
  const maxTop = Math.max(EDGE_PADDING, viewportHeight.value - EDGE_PADDING - height)
  return clamp(props.y - height / 2, EDGE_PADDING, maxTop)
})

/** Arrow Y offset within tooltip body, clamped away from rounded corners. */
const arrowOffsetY = computed(() => {
  const height = tooltipHeight.value
  if (height <= 0) return 16
  return clamp(props.y - tooltipTop.value, ARROW_INSET, height - ARROW_INSET)
})

/** Side-aware arrow placement and mirroring transform. */
const arrowStyle = computed(() => {
  if (placement.value === 'right') {
    return {
      left: '0',
      top: `${arrowOffsetY.value}px`,
      transform: 'translate(calc(-100% + 1px), -50%)',
    }
  }

  return {
    right: '0',
    top: `${arrowOffsetY.value}px`,
    transform: 'translate(calc(100% - 1px), -50%) scaleX(-1)',
  }
})

/** Tooltip body style: position + width constraints + wrap behavior. */
const tooltipStyle = computed(() => ({
  transform: `translate3d(${tooltipLeft.value}px, ${tooltipTop.value}px, 0)`,
  maxWidth: `min(${MAX_WIDTH_PX}px, calc(100vw - ${EDGE_PADDING * 2}px))`,
  whiteSpace: 'normal' as const,
  overflowWrap: 'anywhere' as const,
  wordBreak: 'break-word' as const,
}))
</script>