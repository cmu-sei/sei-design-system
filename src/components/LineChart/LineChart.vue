<template>
  <div
    data-id="sds-line-chart"
    class="sds-line-chart w-full"
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
          <line
            v-for="(segment, segmentIndex) in computeGapSegments(innerWidth, innerHeight)"
            :key="`line-gap-${segment.seriesId}-${segmentIndex}`"
            :x1="segment.x1"
            :y1="segment.y1"
            :x2="segment.x2"
            :y2="segment.y2"
            stroke-width="2"
            stroke-dasharray="6 6"
            stroke-linecap="round"
            class="stroke-current pointer-events-none transition-[opacity,color] duration-150"
            :class="'text-gray-200'"
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
            stroke="transparent"
            stroke-width="10"
            class="pointer-events-stroke"
            @mouseenter="onLineEnter(i)"
            @mousemove="onLineEnter(i)"
            @mouseleave="onLineLeave"
          />

          <template v-if="props.showPoints">
            <circle
              v-for="point in pointMarkers"
              :key="point.key"
              :cx="point.cx"
              :cy="point.cy"
              :r="hoveredPointKey === point.key ? 4.5 : 3.5"
              class="fill-current pointer-events-none transition-[opacity,color] duration-150"
              style="transition: r 120ms ease, opacity 150ms ease, color 150ms ease;"
              :class="getLineColorClass(point.seriesIndex)"
              role="img"
              :aria-label="`${point.seriesLabel} at ${point.xLabel}: ${resolvedFormatter(point.value)}`"
            />

            <circle
              v-for="point in pointMarkers"
              :key="`point-hit-${point.key}`"
              :cx="point.cx"
              :cy="point.cy"
              :r="8"
              fill="transparent"
              class="pointer-events-all"
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
import type { LineData, LinePath, LineTooltipData, LineGapSegment } from '@/composables/useLineChart'
import { DEFAULT_BAR_CHART_MARGIN } from '@/helpers/charts/constants'
import { lineChartColorClasses, lineChartColorValues } from '@/helpers/charts/colors'
import { format } from '@/lib/d3'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useLineChart } from '@/composables/useLineChart'
import { useTooltip } from '@/composables/useTooltip'
import BaseChart from '../BaseChart'

export type { LineDatum, LineSeries, LineData } from '@/composables/useLineChart'

interface LineChartProps {
  data?: LineData
  height?: number
  margin?: ChartMargin
  title?: string
  showTooltip?: boolean
  aspectRatio?: number
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

type LineChartColorClass = (typeof lineChartColorClasses)[number] | 'text-gray-200'

defineOptions({
  name: 'SdsLineChart',
})

const props = withDefaults(defineProps<LineChartProps>(), {
  data: () => [],
  height: 360,
  margin: undefined,
  title: undefined,
  showTooltip: true,
  aspectRatio: undefined,
  valueFormat: '~s',
  tooltipValueFormat: undefined,
  showPoints: false,
  lineCountThreshold: 6,
  showLegend: true,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-left',
})

const resolvedMargin = computed<ChartMargin>(() => props.margin ?? DEFAULT_BAR_CHART_MARGIN)

const dataRef = computed(() => props.data)
const valueFormatRef = computed(() => props.valueFormat)
const innerWidthRef = ref(0)
const innerHeightRef = ref(0)

const { hoveredIndex, setHovered } = useHoveredIndex()
const hoveredPointKey = ref<string | null>(null)
const tooltip = useTooltip<LineTooltipData>()

const { lines, gapSegments, xAxis, yAxis, xScale, yScale } = useLineChart(
  dataRef,
  innerWidthRef,
  innerHeightRef,
  valueFormatRef,
)

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
        cx: xScale.value(point.xIndex),
        cy: yScale.value(point.y ?? 0),
      })),
  ),
)

function computeLines(innerWidth: number, innerHeight: number): LinePath[] {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
  return lines.value
}

function computeGapSegments(innerWidth: number, innerHeight: number): LineGapSegment[] {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
  return gapSegments.value
}

function getLineColorClass(index: number): LineChartColorClass {
  if (isMonochrome.value) {
    return hoveredIndex.value === index ? 'text-blue-400' : 'text-gray-200'
  }
  return lineChartColorClasses[index % lineChartColorClasses.length] ?? 'text-blue-400'
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
  setHovered(null)
  tooltip.hide()
}

function onLineEnter(index: number) {
  if (hoveredPointKey.value) return
  setHovered(index)
  tooltip.hide()
}

function onLineLeave() {
  if (hoveredPointKey.value) return
  setHovered(null)
}
</script>