<template>
  <div
    class="sds-heatmap-chart w-full"
    :class="containerClass"
    :style="containerStyle"
    @mouseleave="onChartLeave"
  >
    <BaseChart
      v-bind="forwardedAttrs"
      v-model:hovered-index="hoveredIndex"
      :height="props.height"
      :width="props.width"
      :aspect-ratio="resolvedAspectRatio"
      :margin="resolvedMargin"
      :legend="{
        items: legendItems,
        orientation: 'horizontal',
        position: 'bottom-center',
      }"
      :show-legend="props.showLegend"
      :title="props.title"
      :tooltip-visible="props.showTooltip ? tooltip.visible.value : undefined"
      :tooltip-x="tooltip.x.value"
      :tooltip-y="tooltip.y.value"
      :x-axis="xAxis"
      :y-axis="yAxis"
    >
      <template #default="{ innerWidth, innerHeight }">
        <g
          v-if="innerWidth > 0"
          :transform="`translate(${resolvedMargin.left}, ${resolvedMargin.top})`"
        >
          <rect
            v-for="(cell, i) in computeCells(innerWidth, innerHeight)"
            :key="`${cell.data.x}-${cell.data.y}-${i}`"
            :x="cell.x"
            :y="cell.y"
            :width="cell.width"
            :height="cell.height"
            :fill="cell.color"
            class="transition-opacity duration-150"
            :class="hoveredIndex !== null && hoveredIndex !== cell.binIndex ? 'opacity-40' : 'opacity-100'"
            role="img"
            :aria-label="`${cell.data.x}, ${cell.data.y}: ${cell.data.value}`"
            @mouseenter="(e) => onCellEnter(e, cell)"
            @mousemove="(e) => onCellMove(e, cell)"
          />
        </g>
      </template>
      <template 
        v-if="props.showTooltip" 
        #tooltip
      >
        <slot 
          name="tooltip" 
          :data="tooltip.data.value"
        >
          <p
            v-if="tooltip.data.value"
            class="text-xs wrap-break-word"
          >
            <span class="block font-semibold">{{ tooltip.data.value.x }} / {{ tooltip.data.value.y }}</span>
            <span class="block">{{ tooltip.data.value.value }}</span>
          </p>
        </slot>
      </template>
      <template #legend="{ items, hoveredIndex: legendHoveredIndex, updateHoveredIndex }">
        <slot
          v-if="$slots.legend"
          name="legend"
          :items="items"
          :hovered-index="legendHoveredIndex"
          :update-hovered-index="updateHoveredIndex"
        />
        <div 
          v-else 
          class="sds-heatmap-legend flex items-center justify-center gap-1 text-xs select-none"
        >
          <span class="text-gray-900 dark:text-gray-100">Less</span>
          <button
            v-for="(item, i) in items"
            :key="`heatmap-legend-bin-${i}`"
            type="button"
            class="h-4 w-8 p-0 transition-opacity border border-gray-300 dark:border-gray-600"
            :class="legendHoveredIndex !== null && legendHoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
            :style="{ backgroundColor: item.color }"
            :aria-label="`Range ${item.label}`"
            @mouseenter="updateHoveredIndex(i)"
            @mouseleave="updateHoveredIndex(null)"
          />
          <span class="text-gray-900 dark:text-gray-100">More</span>
        </div>
      </template>
    </BaseChart>
  </div>
</template>

<script setup lang="ts">
import type { AxisDomain } from '@/lib/d3'
import type { ChartMargin } from '@/helpers/charts/constants'
import type { HeatmapCell, HeatmapColors, HeatmapRect, HeatmapTooltipData } from '@/composables/useHeatmapChart'
import BaseChart from '../BaseChart'
import { useHeatmapChart } from '@/composables/useHeatmapChart'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useTooltip } from '@/composables/useTooltip'
import { DEFAULT_CHART_MARGIN } from '@/helpers/charts/constants'

interface HeatmapChartProps {
  data?: HeatmapCell[]
  height?: number
  width?: string | number
  margin?: ChartMargin
  title?: string
  showTooltip?: boolean
  showLegend?: boolean
  colors?: HeatmapColors
  xTickValues?: string[]
  xTickFormatter?: (value: AxisDomain) => string
  yTickValues?: string[]
  yTickFormatter?: (value: AxisDomain) => string
  squareCells?: boolean
}

defineOptions({
  name: 'SdsHeatmapChart',
  inheritAttrs: false
})

const props = withDefaults(defineProps<HeatmapChartProps>(), {
  data: () => [],
  height: 360,
  width: '100%',
  margin: undefined,
  title: undefined,
  showTooltip: true,
  showLegend: true,
  colors: undefined,
  xTickValues: undefined,
  xTickFormatter: undefined,
  yTickValues: undefined,
  yTickFormatter: undefined,
  squareCells: false
})

const attrs = useAttrs()
const containerClass = computed(() => attrs.class)
const containerStyle = computed(() => attrs.style)
const forwardedAttrs = computed<Record<string, unknown>>(() => {
  const rest = { ...attrs }
  delete rest.class
  delete rest.style
  return rest
})

const innerWidthRef = ref(0)
const innerHeightRef = ref(0)

const resolvedMargin = computed<ChartMargin>(() => {
  if (props.margin) return props.margin
  return {
    ...DEFAULT_CHART_MARGIN,
    left: 72,
    bottom: 44
  }
})

const resolvedAspectRatio = computed<number | undefined>(() => {
  if (!props.squareCells || !props.data.length) return undefined
  const xCount = new Set(props.data.map((d) => d.x)).size
  const yCount = new Set(props.data.map((d) => d.y)).size
  if (xCount === 0 || yCount === 0) return undefined

  const measuredInnerWidth = innerWidthRef.value
  if (measuredInnerWidth > 0) {
    const desiredInnerHeight = (measuredInnerWidth * yCount) / xCount
    const svgHeight = desiredInnerHeight + resolvedMargin.value.top + resolvedMargin.value.bottom
    const containerWidth = measuredInnerWidth + resolvedMargin.value.left + resolvedMargin.value.right
    if (svgHeight > 0) {
      return containerWidth / svgHeight
    }
  }

  return xCount / yCount
})

const dataRef = computed(() => props.data)
const colorsRef = computed(() => props.colors)
const xTickValuesRef = computed(() => props.xTickValues)
const xTickFormatterRef = computed(() => props.xTickFormatter)
const yTickValuesRef = computed(() => props.yTickValues)
const yTickFormatterRef = computed(() => props.yTickFormatter)
const squareCellsRef = computed(() => props.squareCells)

const { hoveredIndex } = useHoveredIndex()
const tooltip = useTooltip<HeatmapTooltipData>()

const { cells, xAxis, yAxis, legendItems } = useHeatmapChart(
  dataRef,
  innerWidthRef,
  innerHeightRef,
  colorsRef,
  {
    xTickFormatter: xTickFormatterRef,
    xTickValues: xTickValuesRef,
    yTickFormatter: yTickFormatterRef,
    yTickValues: yTickValuesRef
  },
  {
    squareCells: squareCellsRef
  }
)

function computeCells(innerWidth: number, innerHeight: number): HeatmapRect[] {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
  return cells.value
}

function getTooltipAnchor(e: MouseEvent): { x: number; y: number } {
  const target = e.currentTarget
  if (!(target instanceof Element)) return { x: e.clientX, y: e.clientY }
  const rect = target.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function onCellEnter(e: MouseEvent, cell: HeatmapRect) {
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, {
    ...cell.data,
    color: cell.color,
    binIndex: cell.binIndex
  })
}

function onCellMove(e: MouseEvent, cell: HeatmapRect) {
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, {
    ...cell.data,
    color: cell.color,
    binIndex: cell.binIndex
  })
}

function onChartLeave() {
  hoveredIndex.value = null
  tooltip.hide()
}
</script>
