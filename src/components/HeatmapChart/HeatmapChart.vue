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
      class="[&_.sds-chart-axis_.domain]:hidden [&_.sds-chart-axis_.tick_line]:hidden"
      :height="resolvedHeight"
      :width="props.width"
      :min-plot-width="gridWidth"
      :fit-axis-labels="!props.margin"
      :align-x-axis-labels-to-plot="true"
      :margin="resolvedMargin"
      :legend="{
        items: legendItems,
        orientation: props.legendOrientation,
        position: props.legendPosition,
      }"
      :show-legend="props.showLegend"
      :title="props.title"
      :x-axis-label="props.xAxisLabel"
      x-axis-label-position="top"
      :x-axis-label-plot-width="gridWidth"
      :y-axis-label="props.yAxisLabel"
      :tooltip-visible="props.showTooltip ? tooltip.visible.value : undefined"
      :tooltip-x="tooltip.x.value"
      :tooltip-y="tooltip.y.value"
      :x-axis="xAxisWithoutTicks"
      x-axis-position="top"
      :y-axis="yAxisWithoutTicks"
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
        <ChartLegend
          class="min-w-max"
          :orientation="props.legendOrientation"
          :position="props.legendPosition"
        >
          <slot
            v-if="$slots.legend"
            name="legend"
            :items="items"
            :hovered-index="legendHoveredIndex"
            :update-hovered-index="updateHoveredIndex"
          />
          <div
            v-else
            class="sds-heatmap-legend flex items-center gap-1 text-xs select-none"
            :class="props.legendOrientation === 'vertical' ? 'flex-col' : 'flex-row'"
          >
            <span class="font-normal text-sm leading-0 text-gray-600 dark:text-gray-400 px-0.5">Less</span>
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
            <span class="font-normal text-sm leading-0 text-gray-600 dark:text-gray-400 px-0.5">More</span>
          </div>
        </ChartLegend>
      </template>
    </BaseChart>
  </div>
</template>

<script setup lang="ts">
import type { AxisDomain } from '@/lib/d3'
import type { ChartMargin } from '@/helpers/charts/constants'
import type { ChartLegendOrientation, ChartLegendPosition } from '../ChartLegend/ChartLegend.vue'
import type { HeatmapCell, HeatmapColors, HeatmapRect, HeatmapTooltipData } from '@/composables/useHeatmapChart'
import BaseChart from '../BaseChart'
import ChartLegend from '../ChartLegend'
import ChartTooltipContent from '../ChartTooltip/ChartTooltipContent.vue'
import { heatmapGridSize, useHeatmapChart } from '@/composables/useHeatmapChart'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useTooltip } from '@/composables/useTooltip'
import { DEFAULT_CHART_MARGIN } from '@/helpers/charts/constants'
import { hasMultipleColors } from '@/helpers/charts/hasMultipleColors'

interface HeatmapChartProps {
  data?: HeatmapCell[]
  width?: string | number
  margin?: ChartMargin
  title?: string
  /** Optional horizontal label displayed above the cells. */
  xAxisLabel?: string
  /** Optional vertical label displayed beside the y-axis. */
  yAxisLabel?: string
  showTooltip?: boolean
  showLegend?: boolean
  /** Legend items layout direction. @default 'horizontal' */
  legendOrientation?: ChartLegendOrientation
  /** Position of the legend relative to the chart. @default 'top-center' */
  legendPosition?: ChartLegendPosition
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
  width: '100%',
  margin: undefined,
  title: undefined,
  xAxisLabel: undefined,
  yAxisLabel: undefined,
  showTooltip: true,
  showLegend: true,
  legendOrientation: 'horizontal',
  legendPosition: 'top-center',
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
  delete rest.height
  return rest
})

const innerWidthRef = ref(0)
const innerHeightRef = ref(0)

const resolvedMargin = computed<ChartMargin>(() => {
  if (props.margin) return props.margin
  return {
    ...DEFAULT_CHART_MARGIN,
    left: 72,
    top: 0,
    bottom: 0
  }
})

const CELL_SIZE = 32
const CELL_GAP = 4
const gridWidth = computed(() => heatmapGridSize(new Set(props.data.map((d) => d.x)).size, CELL_SIZE, CELL_GAP))
const gridHeight = computed(() => heatmapGridSize(new Set(props.data.map((d) => d.y)).size, CELL_SIZE, CELL_GAP))
const resolvedHeight = computed(() =>
  gridHeight.value + resolvedMargin.value.top + resolvedMargin.value.bottom,
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
const xAxisWithoutTicks = computed(() => xAxis.value.tickSizeInner(0))
const yAxisWithoutTicks = computed(() => yAxis.value.tickSizeInner(0))
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
