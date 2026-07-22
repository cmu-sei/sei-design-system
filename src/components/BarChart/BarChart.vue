<template>
  <BaseChart 
    v-model:hovered-index="hoveredIndex"
    :height="props.height"
    :aspect-ratio="props.aspectRatio"
    :margin="resolvedMargin"
    :legend="{
      items: legendItems,
      orientation: props.legendOrientation,
      position: props.legendPosition,
    }"
    :show-legend="props.showLegend"
    :title="props.title"
    :tooltip-visible="props.showTooltip ? tooltip.visible.value : undefined"
    :tooltip-x="tooltip.x.value"
    :tooltip-y="tooltip.y.value"
    :x-axis="xAxis"
    :y-axis="yAxis"
  >
    <template #default="{ innerWidth, innerHeight, containerWidth }">
      <g
        v-if="innerWidth > 0"
        ref="barsGroupRef"
        :transform="`translate(${resolvedMargin.left}, ${resolvedMargin.top})`"
      >
        <!-- Bars (rendered first so axes paint on top of bar edges) -->
        <rect
          v-for="(bar, i) in computeBars(innerWidth, innerHeight, containerWidth)"
          :key="i"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="bar.color"
          class="transition-[opacity,filter] duration-100"
          :class="
            hoveredIndex !== null && getBarSeriesIndex(bar) !== hoveredIndex
              ? 'opacity-40'
              : 'opacity-100'
          "
          role="img"
          :aria-label="`${bar.label}${bar.seriesName ? ` – ${bar.seriesName}` : ''}: ${bar.value}`"
          @mouseenter="(e) => onBarEnter(e, bar)"
          @mousemove="(e) => onBarMove(e, bar)"
          @mouseleave="onBarLeave"
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
        :format-value="resolvedFormatter"
      >
        <p 
          v-if="tooltip.data.value" 
          class="text-xs wrap-break-word"
        >
          <span class="block font-semibold">{{ tooltip.data.value.label }}</span>
          <span 
            v-if="tooltip.data.value.seriesName" 
            class="block"
          >
            <span
              class="inline-block w-2.5 h-2.5 rounded-sm mr-1"
              :style="{ background: tooltip.data.value.color }"
            />
            {{ tooltip.data.value.seriesName }}: {{ resolvedFormatter(tooltip.data.value.value) }}
          </span>
          <span 
            v-else 
            class="block"
          >
            {{ resolvedFormatter(tooltip.data.value.value) }}
          </span>
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
</template>

<script setup lang="ts">
import type {
  BarData,
  BarRect,
  BarTooltipData,
  BarOrientation,
  BarMode,
} from '@/composables/useBarChart'
import type { ChartMargin } from '@/helpers/charts'
import type { ChartLegendPosition, ChartLegendOrientation } from '../index.ts'
import { DEFAULT_BAR_CHART_MARGIN } from '@/helpers/charts/constants'
import { format, select, easeCubicOut } from '@/lib/d3'
import { useBarChart, isBarSeries } from '@/composables/useBarChart'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { useTooltip } from '@/composables/useTooltip'
import BaseChart from '../BaseChart'

interface BarChartProps {
  /** BarItem[] for single-series or BarSeries[] for multi-series. Detected automatically via type guard. */
  data?: BarData
  /** 'vertical' renders bars top-to-bottom; 'horizontal' renders left-to-right. */
  orientation?: BarOrientation
  /** 'grouped' places bars side-by-side; 'stacked' stacks them. Applies to BarSeries[] data. */
  mode?: BarMode
  height?: number
  margin?: ChartMargin
  title?: string
  showTooltip?: boolean
  /** When provided, height is derived as containerWidth / aspectRatio. */
  aspectRatio?: number
  /** Format for value-axis tick labels. Pass a D3 format specifier string (e.g. `'~s'`, `',.0f'`) or a custom formatter function. @default '~s' */
  valueFormat?: string | ((value: number) => string)
  /** Format for tooltip values. Falls back to valueFormat when omitted. */
  tooltipValueFormat?: string | ((value: number) => string)
  /** When true (default), bars grow from zero on mount and whenever data changes. The transition decelerates at the end. */
  animate?: boolean
  /** Whether to display the legend. @default false */
  showLegend?: boolean
  /** Legend items layout direction. @default 'horizontal' */
  legendOrientation?: ChartLegendOrientation
  /** Legend position in the chart container. @default 'top-right' */
  legendPosition?: ChartLegendPosition
}

defineOptions({ name: 'SdsBarChart' })

const props = withDefaults(defineProps<BarChartProps>(), {
  data: undefined,
  orientation: 'vertical',
  mode: 'grouped',
  height: 360,
  margin: undefined,
  title: undefined,
  showTooltip: true,
  aspectRatio: undefined,
  valueFormat: '~s',
  tooltipValueFormat: undefined,
  animate: false,
  showLegend: false,
  legendOrientation: 'horizontal',
  legendPosition: 'top-right',
})

// Resolved margin: user-supplied wins; otherwise measure labels, capped to container width
const containerWidthRef = ref(0)
const resolvedMargin = computed<ChartMargin>(() => {
  if (props.margin) return props.margin
  if (props.orientation !== 'horizontal') return DEFAULT_BAR_CHART_MARGIN

  const labels = props.data
    ? isBarSeries(props.data)
      ? (props.data[0]?.data.map((d) => d.label) ?? [])
      : props.data.map((d) => d.label)
    : []

  let measuredPx = 0
  if (labels.length) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.font = '14px sans-serif'
      measuredPx = Math.max(...labels.map((l) => ctx.measureText(l).width))
    }
  }

  const ideal = Math.ceil(measuredPx) + 20
  // Cap at 40% of container width so labels never crowd out bars on narrow screens
  const cap = containerWidthRef.value > 0 ? Math.floor(containerWidthRef.value * 0.4) : ideal
  const left = Math.min(ideal, Math.max(DEFAULT_BAR_CHART_MARGIN.left, cap))
  return { ...DEFAULT_BAR_CHART_MARGIN, left }
})

const dataRef = computed(() => props.data)
const orientationRef = computed(() => props.orientation)
const modeRef = computed(() => props.mode)
const valueFormatRef = computed(() => props.valueFormat)
const resolvedFormatter = computed(() => {
  const vf = props.tooltipValueFormat ?? props.valueFormat
  return typeof vf === 'function' ? vf : format(vf)
})

// Dimension state (updated by computeBars called from the default slot)
const innerWidthRef = ref(0)
const innerHeightRef = ref(0)

const { bars, xAxis, yAxis, legendItems } = useBarChart(
  dataRef,
  orientationRef,
  modeRef,
  innerWidthRef,
  innerHeightRef,
  valueFormatRef,
)

// Entry animation
const barsGroupRef = ref<SVGGElement | null>(null)

async function animateBars() {
  if (!props.animate) return
  await nextTick()
  if (!barsGroupRef.value) return
  const isVertical = props.orientation !== 'horizontal'
  const currentBars = bars.value
  const rects = select(barsGroupRef.value).selectAll<SVGRectElement, unknown>('rect')
  if (isVertical) {
    rects
      .attr('height', 0)
      .attr('y', innerHeightRef.value)
      .transition()
      .duration(400)
      .ease(easeCubicOut)
      .attr('y', (_, i) => currentBars[i]?.y ?? 0)
      .attr('height', (_, i) => currentBars[i]?.height ?? 0)
  } else {
    rects
      .attr('width', 0)
      .transition()
      .duration(400)
      .ease(easeCubicOut)
      .attr('width', (_, i) => currentBars[i]?.width ?? 0)
  }
}

// Trigger on initial mount (innerWidthRef transitions from 0 to a real value)
watch(innerWidthRef, (newVal, oldVal) => {
  if (oldVal === 0 && newVal > 0) animateBars()
})

// Trigger on data change
watch(
  () => props.data,
  () => animateBars(),
)

// Hover & tooltip
const { hoveredIndex } = useHoveredIndex()
const tooltip = useTooltip<BarTooltipData>()

function computeBars(innerWidth: number, innerHeight: number, containerWidth: number) {
  innerWidthRef.value = innerWidth
  innerHeightRef.value = innerHeight
  containerWidthRef.value = containerWidth
  return bars.value
}

function getBarSeriesIndex(bar: BarRect): number | null {
  if (!bar.seriesName) return null
  const idx = legendItems.value.findIndex((item) => item.label === bar.seriesName)
  return idx >= 0 ? idx : null
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

function onBarEnter(e: MouseEvent, bar: BarRect) {
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, {
    label: bar.label,
    seriesName: bar.seriesName,
    value: bar.value,
    color: bar.color,
  })
}

function onBarMove(e: MouseEvent, bar: BarRect) {
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, {
    label: bar.label,
    seriesName: bar.seriesName,
    value: bar.value,
    color: bar.color,
  })
}

function onBarLeave() {
  tooltip.hide()
}
</script>
