<template>
  <div
    data-id="sds-line-chart"
    class="sds-line-chart w-full min-w-0"
    @mouseleave="onChartLeave"
  >
    <BaseChart
      v-model:hovered-index="hoveredIndex"
      :height="props.height"
      :aspect-ratio="props.aspectRatio"
      :margin="resolvedMargin"
      :legend="{
        items: resolvedLegendItems,
        orientation: props.legendOrientation,
        position: resolvedLegendPosition,
      }"
      :show-legend="showLegend"
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
          <template v-if="props.showGrid">
            <line
              v-for="(y, yIndex) in computeHorizontalGridLines(innerWidth, innerHeight)"
              :key="`line-grid-y-${yIndex}`"
              x1="0"
              :y1="y"
              :x2="innerWidth"
              :y2="y"
              class="stroke-current text-gray-100 dark:text-gray-900 pointer-events-none"
              role="none"
              stroke-width="1"
            />
            <line
              v-for="(x, xIndex) in computeVerticalGridLines(innerWidth, innerHeight)"
              :key="`line-grid-x-${xIndex}`"
              :x1="x"
              y1="0"
              :x2="x"
              :y2="innerHeight"
              class="stroke-current text-gray-100 dark:text-gray-900 pointer-events-none"
              role="none"
              stroke-width="1"
            />
          </template>

          <line
            v-for="(segment, segmentIndex) in computeGapSegments(innerWidth, innerHeight)"
            :key="`line-gap-${segment.seriesId}-${segmentIndex}`"
            :x1="segment.x1"
            :y1="segment.y1"
            :x2="segment.x2"
            :y2="segment.y2"
            role="none"
            stroke-width="1"
            stroke-dasharray="4 4"
            stroke-linecap="round"
            class="stroke-current pointer-events-none transition-[opacity,color] duration-150"
            :class="getGapColorClass(segment)"
          />

          <path
            v-for="(lineSeries, i) in computeLines(innerWidth, innerHeight)"
            :key="lineSeries.seriesId"
            :d="lineSeries.path"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current transition-[opacity,stroke-width,color] duration-150 pointer-events-none"
            :class="getLineColorClass(i)"
            :stroke-width="2"
            role="img"
            :aria-label="`Series ${lineSeries.seriesLabel}`"
          />

          <path
            v-for="(lineSeries, i) in computeLines(innerWidth, innerHeight)"
            :key="`line-hit-${lineSeries.seriesId}`"
            :d="lineSeries.path"
            fill="none"
            role="none"
            stroke="transparent"
            stroke-width="10"
            class="pointer-events-stroke"
            @mouseenter="onLineEnter(i)"
            @mousemove="onLineEnter(i)"
          />

          <template v-if="props.showPoints">
            <circle
              v-for="point in pointMarkers"
              :key="point.key"
              :cx="point.cx"
              :cy="point.cy"
              :r="hoveredPointKey === point.key ? 4.5 : 3.5"
              class="fill-current stroke-current pointer-events-all transition-[opacity,color] duration-150"
              style="transition: r 120ms ease, opacity 150ms ease, color 150ms ease;"
              :class="getLineColorClass(point.seriesIndex)"
              :fill-opacity="0.35"
              :stroke-width="1"
              role="img"
              :aria-label="`${point.seriesLabel} at ${point.xLabel}: ${resolvedFormatter(point.value)}`"
              @mouseenter="(event) => onPointEnter(event, point)"
              @mousemove="(event) => onPointEnter(event, point)"
              @mouseleave="onPointLeave"
            />
          </template>
        </g>
      </template>

      <template
        v-if="props.showTooltip"
        #tooltip
      >
        <slot
          name="tooltip"
          :data="tooltip.data.value"
          :format-value="resolvedFormatter"
        >
          <p
            v-if="tooltip.data.value"
            class="text-xs wrap-break-word"
          >
            <span class="block font-semibold">{{ tooltip.data.value.seriesLabel }}</span>
            <span class="block">{{ tooltip.data.value.xLabel }}</span>
            <span class="block">{{ resolvedFormatter(tooltip.data.value.value) }}</span>
          </p>
        </slot>
      </template>

      <template
        v-if="$slots.legend"
        #legend="slotProps"
      >
        <slot
          name="legend"
          v-bind="slotProps"
        />
      </template>
    </BaseChart>
  </div>
</template>

<script setup lang="ts">
import type { ChartMargin } from '@/helpers/charts'
import type { ChartLegendPosition, ChartLegendOrientation } from '../index.ts'
import type { LineData, LinePath, LineTooltipData, LineGapSegment, LineXScaleType } from '@/composables/useLineChart'
import { DEFAULT_BAR_CHART_MARGIN } from '@/helpers/charts/constants'
import { lineChartColorClasses, lineChartColorClassesDark, lineChartColorValues } from '@/helpers/charts/colors'
import { format, type AxisDomain, type ScaleLinear, type ScaleTime } from '@/lib/d3'
import { useChartConfig } from '@/composables/useChartConfig'
import { useDarkMode } from '@/composables/useDarkMode'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useLineChart } from '@/composables/useLineChart'
import { useTooltip } from '@/composables/useTooltip'
import BaseChart from '../BaseChart'

export type { LineDatum, LineSeries, LineData, LineXScaleType } from '@/composables/useLineChart'

interface LineChartProps {
  data?: LineData
  height?: number
  margin?: ChartMargin
  title?: string
  showTooltip?: boolean
  showGrid?: boolean
  aspectRatio?: number
  /** X-axis scale mode. @default 'category' */
  xScaleType?: LineXScaleType
  /** Optional x-axis tick values for custom scales such as time. */
  xTickValues?: Array<string | number | Date>
  /** Optional x-axis tick formatter for custom tick labels. */
  xTickFormatter?: (value: AxisDomain) => string
  valueFormat?: string | ((value: number) => string)
  tooltipValueFormat?: string | ((value: number) => string)
  showPoints?: boolean
  /** Number of lines allowed before monochrome mode is enabled. */
  lineCountThreshold?: number
  showLegend?: boolean
  legendOrientation?: ChartLegendOrientation
  legendPosition?: ChartLegendPosition
}

interface LinePointMarker {
  key: string
  seriesIndex: number
  seriesLabel: string
  xLabel: string
  value: number
  color: string
  cx: number
  cy: number
}

type LineChartColorClass =
  | (typeof lineChartColorClasses)[number]
  | (typeof lineChartColorClassesDark)[number]
  | 'text-gray-200'
  | 'text-gray-400'

defineOptions({
  name: 'SdsLineChart',
})

const props = withDefaults(defineProps<LineChartProps>(), {
  data: () => [],
  height: 360,
  margin: undefined,
  title: undefined,
  showTooltip: true,
  showGrid: true,
  aspectRatio: undefined,
  xScaleType: 'category',
  xTickValues: undefined,
  xTickFormatter: undefined,
  valueFormat: '~s',
  tooltipValueFormat: undefined,
  showPoints: false,
  lineCountThreshold: 6,
  showLegend: true,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-left',
})

const dataRef = computed(() => props.data)
const valueFormatRef = computed(() => props.valueFormat)
const xScaleTypeRef = computed(() => props.xScaleType)
const innerWidthRef = ref(0)
const innerHeightRef = ref(0)

// Keep horizontal grid density readable across chart heights.
const MIN_HORIZONTAL_GRID_TICKS = 2
const HORIZONTAL_GRID_LINE_COUNT = 6

const { hoveredIndex, setHovered } = useHoveredIndex()
const hoveredPointKey = ref<string | null>(null)
const tooltip = useTooltip<LineTooltipData>()
const _bodyDark = useDarkMode()
const config = useChartConfig() ?? {}
const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

const { lines, gapSegments, xAxis, yAxis, xScale, yScale, xDomainLabels } = useLineChart(
  dataRef,
  innerWidthRef,
  innerHeightRef,
  valueFormatRef,
  xScaleTypeRef,
  computed(() => props.xTickValues),
  computed(() => props.xTickFormatter),
)

const resolvedMargin = computed<ChartMargin>(() => {
  if (props.margin) return props.margin
  const maxLabelLines = Math.max(
    1,
    ...xDomainLabels.value.map((label) => Math.max(1, label.split(/\s+/).filter(Boolean).length)),
  )
  const extraBottom = Math.max(0, (maxLabelLines - 1) * 14)
  return {
    ...DEFAULT_BAR_CHART_MARGIN,
    bottom: DEFAULT_BAR_CHART_MARGIN.bottom + extraBottom,
  }
})

const isMonochrome = computed(() => lines.value.length > Math.max(0, props.lineCountThreshold))

const resolvedFormatter = computed(() => {
  const formatter = props.tooltipValueFormat ?? props.valueFormat
  return typeof formatter === 'function' ? formatter : format(formatter)
})

const showLegend = computed(() => props.showLegend && lines.value.length > props.lineCountThreshold)
const resolvedLegendPosition = computed<ChartLegendPosition>(() =>
  props.legendPosition.startsWith('top-')
    ? (props.legendPosition.replace('top-', 'bottom-') as ChartLegendPosition)
    : props.legendPosition,
)

const resolvedLegendItems = computed(() =>
  lines.value.map((lineSeries, index) => {
    const className = getLineColorClass(index)
    return {
      label: lineSeries.seriesLabel,
      color: lineChartColorValues[className] ?? lineSeries.color,
    }
  }),
)

const lineSeriesIndexById = computed(() => {
  const seriesIndexById = new Map<string, number>()
  lines.value.forEach((lineSeries, index) => {
    seriesIndexById.set(lineSeries.seriesId, index)
  })
  return seriesIndexById
})

const pointMarkers = computed<LinePointMarker[]>(() =>
  lines.value.flatMap((lineSeries, seriesIndex) =>
    lineSeries.points
      .filter((point) => point.y != null)
      .map((point) => ({
        key: `${lineSeries.seriesId}-${point.xKey}`,
        seriesIndex,
        seriesLabel: lineSeries.seriesLabel,
        xLabel: point.xLabel,
        value: point.y ?? 0,
        color: lineSeries.color,
        cx: getXCoordinate(point.xPosition, point.xIndex),
        cy: yScale.value(point.y ?? 0),
      })),
  ),
)

function syncDimensions(innerWidth: number, innerHeight: number) {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
}

function computeLines(innerWidth: number, innerHeight: number): LinePath[] {
  syncDimensions(innerWidth, innerHeight)
  return lines.value
}

function computeGapSegments(innerWidth: number, innerHeight: number): LineGapSegment[] {
  syncDimensions(innerWidth, innerHeight)
  return gapSegments.value
}

function computeVerticalGridLines(innerWidth: number, innerHeight: number): number[] {
  syncDimensions(innerWidth, innerHeight)
  const firstSeries = lines.value[0]
  if (!firstSeries) return []
  return firstSeries.points.map((point) => getXCoordinate(point.xPosition, point.xIndex))
}

function computeHorizontalGridLines(innerWidth: number, innerHeight: number): number[] {
  syncDimensions(innerWidth, innerHeight)
  const tickCount = Math.max(MIN_HORIZONTAL_GRID_TICKS, HORIZONTAL_GRID_LINE_COUNT)
  return yScale.value.ticks(tickCount).map((tickValue) => yScale.value(tickValue))
}

function getLineColorClass(index: number): LineChartColorClass {
  if (isMonochrome.value) {
    return hoveredIndex.value === index
      ? (isDark.value ? 'text-blue-600' : 'text-blue-400')
      : (isDark.value ? 'text-gray-400' : 'text-gray-200')
  }
  const colors = isDark.value ? lineChartColorClassesDark : lineChartColorClasses
  return colors[index % colors.length] ?? (isDark.value ? 'text-blue-600' : 'text-blue-400')
}

function getXCoordinate(value: AxisDomain, fallbackIndex: number): number {
  if (props.xScaleType === 'category') {
    return (xScale.value as ScaleLinear<number, number>)(fallbackIndex)
  }
  const scaleValue =
    value instanceof Date || typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? new Date(value)
        : value.valueOf()
  return (xScale.value as ScaleLinear<number, number> | ScaleTime<number, number>)(scaleValue)
}

function getGapColorClass(segment: LineGapSegment): LineChartColorClass {
  const seriesIndex = lineSeriesIndexById.value.get(segment.seriesId)
  if (seriesIndex == null) return 'text-gray-200'
  return getLineColorClass(seriesIndex)
}

function getTooltipAnchor(event: MouseEvent): { x: number; y: number } {
  const target = event.currentTarget
  if (!(target instanceof SVGCircleElement)) {
    return { x: event.clientX, y: event.clientY }
  }
  const rect = target.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function onPointEnter(event: MouseEvent, point: LinePointMarker) {
  hoveredPointKey.value = point.key
  setHovered(point.seriesIndex)
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(event)
  tooltip.show(anchor.x, anchor.y, {
    xLabel: point.xLabel,
    seriesLabel: point.seriesLabel,
    value: point.value,
    color: point.color,
  })
}

function onPointLeave() {
  hoveredPointKey.value = null
}

function onLineEnter(index: number) {
  hoveredPointKey.value = null
  setHovered(index)
}

function onChartLeave() {
  hoveredPointKey.value = null
  setHovered(null)
  tooltip.hide()
}
</script>