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
  /** Line chart data, either a single series (LineDatum[]) or multiple named series (LineSeries[]). */
  data?: LineData
  /** Chart height in pixels when aspectRatio is not provided. @default 360 */
  height?: number
  /** Optional margin overrides for the inner chart area. */
  margin?: ChartMargin
  /** Optional accessible chart title rendered within the SVG. */
  title?: string
  /** Enables point/line tooltip rendering and hover behavior. @default true */
  showTooltip?: boolean
  /** Toggles gridline rendering behind line paths. @default true */
  showGrid?: boolean
  /** Responsive width-to-height ratio used to derive chart height. */
  aspectRatio?: number
  /** X-axis scale mode. @default 'category' */
  xScaleType?: LineXScaleType
  /** Optional x-axis tick values for custom scales such as time. */
  xTickValues?: Array<string | number | Date>
  /** Optional x-axis tick formatter for custom tick labels. */
  xTickFormatter?: (value: AxisDomain) => string
  /** Y-axis tick formatter. */
  yTickFormatter?: string | ((value: number) => string)
  /** Tooltip value formatter. Falls back to yTickFormatter when omitted. */
  tooltipValueFormat?: string | ((value: number) => string)
  /** Shows point markers at each non-null datum. @default false */
  showPoints?: boolean
  /** Number of lines allowed before monochrome mode is enabled. */
  lineCountThreshold?: number
  /** Enables rendering of legend items beneath the chart. @default true */
  showLegend?: boolean
  /** Legend layout direction. @default 'horizontal' */
  legendOrientation?: ChartLegendOrientation
  /** Legend position within the legend container. @default 'bottom-left' */
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
  yTickFormatter: '~s',
  tooltipValueFormat: undefined,
  showPoints: false,
  lineCountThreshold: 6,
  showLegend: true,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-left',
})

/** Reactive line-chart data source passed to the composable. */
const dataRef = computed(() => props.data)
/** Reactive y-axis tick formatter source passed to the composable. */
const yTickFormatterRef = computed(() => props.yTickFormatter)
/** Reactive x-scale mode source passed to the composable. */
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
/** Effective dark-mode state resolved from chart config with document fallback. */
const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

const { lines, gapSegments, xAxis, yAxis, xScale, yScale, xDomainLabels } = useLineChart(
  dataRef,
  innerWidthRef,
  innerHeightRef,
  yTickFormatterRef,
  xScaleTypeRef,
  computed(() => props.xTickValues),
  computed(() => props.xTickFormatter),
)

/** Resolved chart margins, with automatic bottom padding for multi-line x labels. */
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

/** Whether monochrome rendering should be applied based on configured line threshold. */
const isMonochrome = computed(() => lines.value.length > Math.max(0, props.lineCountThreshold))

/** Final numeric formatter used in tooltips (falls back to y-axis tick formatter). */
const resolvedFormatter = computed(() => {
  const formatter = props.tooltipValueFormat ?? props.yTickFormatter
  return typeof formatter === 'function' ? formatter : format(formatter)
})

/** Whether the legend should be shown based on prop toggle and series density threshold. */
const showLegend = computed(() => props.showLegend && lines.value.length > props.lineCountThreshold)
/** Legend position normalized to render below the chart area. */
const resolvedLegendPosition = computed<ChartLegendPosition>(() =>
  props.legendPosition.startsWith('top-')
    ? (props.legendPosition.replace('top-', 'bottom-') as ChartLegendPosition)
    : props.legendPosition,
)

/** Legend item list with color values synchronized to rendered line classes. */
const resolvedLegendItems = computed(() =>
  lines.value.map((lineSeries, index) => {
    const className = getLineColorClass(index)
    return {
      label: lineSeries.seriesLabel,
      color: lineChartColorValues[className] ?? lineSeries.color,
    }
  }),
)

/** Lookup map from series id to index for fast color-class resolution. */
const lineSeriesIndexById = computed(() => {
  const seriesIndexById = new Map<string, number>()
  lines.value.forEach((lineSeries, index) => {
    seriesIndexById.set(lineSeries.seriesId, index)
  })
  return seriesIndexById
})

/** Render-ready point marker metadata for visible non-null data points. */
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

/**
 * Stores current inner chart dimensions from the BaseChart slot.
 *
 * @param innerWidth - Current chart inner width in pixels.
 * @param innerHeight - Current chart inner height in pixels.
 */
function syncDimensions(innerWidth: number, innerHeight: number) {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
}

/**
 * Computes rendered line paths for the latest chart dimensions.
 *
 * @param innerWidth - Current chart inner width in pixels.
 * @param innerHeight - Current chart inner height in pixels.
 * @returns Resolved line path objects for each series.
 */
function computeLines(innerWidth: number, innerHeight: number): LinePath[] {
  syncDimensions(innerWidth, innerHeight)
  return lines.value
}

/**
 * Computes dashed segments that bridge gaps between known points.
 *
 * @param innerWidth - Current chart inner width in pixels.
 * @param innerHeight - Current chart inner height in pixels.
 * @returns Gap connector segment definitions.
 */
function computeGapSegments(innerWidth: number, innerHeight: number): LineGapSegment[] {
  syncDimensions(innerWidth, innerHeight)
  return gapSegments.value
}

/**
 * Computes x positions for vertical grid lines.
 *
 * @param innerWidth - Current chart inner width in pixels.
 * @param innerHeight - Current chart inner height in pixels.
 * @returns X coordinates for each vertical grid line.
 */
function computeVerticalGridLines(innerWidth: number, innerHeight: number): number[] {
  syncDimensions(innerWidth, innerHeight)
  const firstSeries = lines.value[0]
  if (!firstSeries) return []
  return firstSeries.points.map((point) => getXCoordinate(point.xPosition, point.xIndex))
}

/**
 * Computes y positions for horizontal grid lines.
 *
 * @param innerWidth - Current chart inner width in pixels.
 * @param innerHeight - Current chart inner height in pixels.
 * @returns Y coordinates for each horizontal grid line.
 */
function computeHorizontalGridLines(innerWidth: number, innerHeight: number): number[] {
  syncDimensions(innerWidth, innerHeight)
  const tickCount = Math.max(MIN_HORIZONTAL_GRID_TICKS, HORIZONTAL_GRID_LINE_COUNT)
  return yScale.value.ticks(tickCount).map((tickValue) => yScale.value(tickValue))
}

/**
 * Resolves the Tailwind text color class for a series index.
 *
 * @param index - Zero-based series index.
 * @returns Color utility class used by line, point, and legend rendering.
 */
function getLineColorClass(index: number): LineChartColorClass {
  if (isMonochrome.value) {
    return hoveredIndex.value === index
      ? (isDark.value ? 'text-blue-600' : 'text-blue-400')
      : (isDark.value ? 'text-gray-400' : 'text-gray-200')
  }
  const colors = isDark.value ? lineChartColorClassesDark : lineChartColorClasses
  return colors[index % colors.length] ?? (isDark.value ? 'text-blue-600' : 'text-blue-400')
}

/**
 * Converts an x-domain value into an SVG x coordinate.
 *
 * @param value - Axis-domain value (index, number, date-like).
 * @param fallbackIndex - Category index fallback for category scales.
 * @returns X coordinate in inner chart space.
 */
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

/**
 * Resolves the color class for a gap segment based on its source series.
 *
 * @param segment - Gap segment metadata.
 * @returns Tailwind color class for the dashed connector.
 */
function getGapColorClass(segment: LineGapSegment): LineChartColorClass {
  const seriesIndex = lineSeriesIndexById.value.get(segment.seriesId)
  if (seriesIndex == null) return 'text-gray-200'
  return getLineColorClass(seriesIndex)
}

/**
 * Resolves tooltip anchor coordinates for point-hover events.
 *
 * @param event - Mouse event from point interactions.
 * @returns Screen-space tooltip anchor coordinates.
 */
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

/**
 * Handles point-hover entry and tooltip rendering.
 *
 * @param event - Mouse event for the hovered point.
 * @param point - Point marker metadata used by tooltip content.
 */
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

/**
 * Clears point-specific hover state while preserving line hover behavior.
 */
function onPointLeave() {
  hoveredPointKey.value = null
}

/**
 * Handles hover state when the pointer is over a line hit-area.
 *
 * @param index - Zero-based series index for the hovered line.
 */
function onLineEnter(index: number) {
  hoveredPointKey.value = null
  setHovered(index)
}

/**
 * Resets hover/tooltip state after leaving the chart container.
 */
function onChartLeave() {
  hoveredPointKey.value = null
  setHovered(null)
  tooltip.hide()
}
</script>