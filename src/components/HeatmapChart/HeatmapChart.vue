<template>
  <div
    class="sds-heatmap-chart w-full overflow-x-auto"
    :class="containerClass"
    :style="containerStyle"
    @mouseleave="onChartLeave"
  >
    <BaseChart
      v-bind="forwardedAttrs"
      v-model:hovered-index="hoveredIndex"
      :height="resolvedHeight"
      :width="props.width"
      :min-plot-width="gridWidth"
      :margin="resolvedMargin"
      :legend="{
        items: legendItems,
        orientation: 'horizontal',
        position: 'bottom-center',
      }"
      :show-legend="props.showLegend"
      :title="props.title"
      :x-axis-label="props.xAxisLabel"
      :y-axis-label="props.yAxisLabel"
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
            :width="CELL_SIZE"
            :height="CELL_SIZE"
            rx="2"
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
          <ChartTooltipContent
            v-if="tooltip.data.value"
            :title="tooltip.data.value.x"
            :label="tooltip.data.value.y"
            :datapoint="tooltip.data.value.value"
            :color="hasDistinctColors ? tooltip.data.value.color : undefined"
          />
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
          class="sds-heatmap-legend flex min-w-max items-center justify-center gap-1 text-xs select-none"
        >
          <span class="font-normal text-sm text-gray-600 dark:text-gray-400 p-0.5">Less</span>
          <button
            v-for="(item, i) in items"
            :key="`heatmap-legend-bin-${i}`"
            type="button"
            class="size-4 shrink-0 rounded-[2px] border-0 p-0 transition-opacity"
            :class="legendHoveredIndex !== null && legendHoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
            :style="{ backgroundColor: item.color }"
            :aria-label="`Range ${item.label}`"
            @mouseenter="updateHoveredIndex(i)"
            @mouseleave="updateHoveredIndex(null)"
          />
          <span class="font-normal text-sm text-gray-600 dark:text-gray-400 p-0.5">More</span>
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
import ChartTooltipContent from '../ChartTooltip/ChartTooltipContent.vue'
import { heatmapGridSize, useHeatmapChart } from '@/composables/useHeatmapChart'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useTooltip } from '@/composables/useTooltip'
import { DEFAULT_CHART_MARGIN } from '@/helpers/charts/constants'
import { hasMultipleColors } from '@/helpers/charts/hasMultipleColors'

interface HeatmapChartProps {
  data?: HeatmapCell[]
  height?: number
  width?: string | number
  margin?: ChartMargin
  title?: string
  /** Optional horizontal label displayed below the x-axis. */
  xAxisLabel?: string
  /** Optional vertical label displayed beside the y-axis. */
  yAxisLabel?: string
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
  xAxisLabel: undefined,
  yAxisLabel: undefined,
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

const CELL_SIZE = 32
const CELL_GAP = 4
const gridWidth = computed(() => heatmapGridSize(new Set(props.data.map((d) => d.x)).size, CELL_SIZE, CELL_GAP))
const gridHeight = computed(() => heatmapGridSize(new Set(props.data.map((d) => d.y)).size, CELL_SIZE, CELL_GAP))
const resolvedHeight = computed(() =>
  Math.max(props.height, gridHeight.value + resolvedMargin.value.top + resolvedMargin.value.bottom),
)

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
    squareCells: squareCellsRef,
    fixedCellSize: CELL_SIZE,
    cellGap: CELL_GAP
  }
)
const hasDistinctColors = computed(() => hasMultipleColors(cells.value))

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
