<template>
  <div 
    data-id="sds-base-chart" 
    class="sds-base-chart flex w-full min-w-0 flex-col gap-y-4"
  >
    <div
      class="min-w-0"
      :style="{ paddingLeft: `${yAxisLabelPadding}px` }"
    >
      <div
        ref="containerRef"
        class="relative w-full min-w-0"
        :style="{ width: props.width, paddingBottom: `${axisLabelPadding}px` }"
      >
        <svg
          width="100%"
          :height="svgHeight"
          :aria-label="props.title"
          role="img"
          class="block"
          v-bind="$attrs"
        >
          <title v-if="props.title">{{ props.title }}</title>
          <slot
            :container-width="containerWidth"
            :inner-width="innerWidth"
            :inner-height="innerHeight"
            :container-ref="containerRef"
          />
          <!-- x-axis: rendered at the bottom edge of the inner chart area -->
          <g
            v-if="$slots['x-axis'] || props.xAxis"
            :transform="`translate(${props.margin.left}, ${props.margin.top + innerHeight})`"
          >
            <slot
              name="x-axis"
              :inner-width="innerWidth"
              :inner-height="innerHeight"
            >
              <ChartAxis
                v-if="props.xAxis"
                :axis="props.xAxis"
                :inner-width="innerWidth"
                :inner-height="innerHeight"
                orientation="x"
                :min-font-size="props.axisMinFontSize"
                :max-font-size="props.axisMaxFontSize"
              />
            </slot>
          </g>
          <!-- y-axis: rendered at the left edge of the inner chart area -->
          <g
            v-if="$slots['y-axis'] || props.yAxis"
            :transform="`translate(${props.margin.left}, ${props.margin.top})`"
          >
            <slot
              name="y-axis"
              :inner-width="innerWidth"
              :inner-height="innerHeight"
            >
              <ChartAxis
                v-if="props.yAxis"
                :axis="props.yAxis"
                :inner-width="innerWidth"
                :inner-height="innerHeight"
                orientation="y"
                :min-font-size="props.axisMinFontSize"
                :max-font-size="props.axisMaxFontSize"
                :max-label-width="props.margin.left - 10"
              />
            </slot>
          </g>
        </svg>
        <ChartTooltip
          v-if="props.tooltipVisible !== undefined"
          :visible="props.tooltipVisible ?? false"
          :x="props.tooltipX ?? 0"
          :y="props.tooltipY ?? 0"
        >
          <slot name="tooltip" />
        </ChartTooltip>
        <div
          v-if="props.yAxisLabel"
          ref="yAxisLabelContainerRef"
          class="absolute flex items-center justify-center"
          :style="yAxisLabelStyle"
        >
          <span
            ref="yAxisLabelRef"
            class="rotate-180 whitespace-nowrap text-base font-semibold text-gray-600 [writing-mode:vertical-rl] dark:text-gray-400"
          >
            {{ props.yAxisLabel }}
          </span>
        </div>
        <div
          v-if="props.xAxisLabel"
          ref="xAxisLabelRef"
          class="absolute text-base font-semibold text-gray-600 dark:text-gray-400"
          :style="xAxisLabelStyle"
        >
          {{ props.xAxisLabel }}
        </div>
      </div>
    </div>
    <template v-if="props.showLegend">
      <slot
        name="legend"
        :items="props.legend?.items ?? []"
        :hovered-index="props.hoveredIndex"
        :update-hovered-index="(i: number | null) => emit('update:hoveredIndex', i)"
      >
        <ChartLegend
          v-if="props.legend"
          :items="props.legend.items"
          :hovered-index="props.hoveredIndex"
          :orientation="props.legend.orientation"
          :position="props.legend.position"
          @update:hovered-index="emit('update:hoveredIndex', $event)"
        />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Axis, AxisDomain } from '@/lib/d3'
import type { ChartLegendProps } from '../ChartLegend/ChartLegend.vue'
import type { ChartMargin } from '@/helpers/charts'
import { DEFAULT_CHART_MARGIN } from '@/helpers/charts/constants'
import ChartAxis from '../ChartAxis'
import ChartTooltip from '../ChartTooltip'
import ChartLegend from '../ChartLegend'
import { useChartDimensions } from '@/composables/useChartDimensions'

interface BaseChartProps {
  height?: number
  width?: string | number
  margin?: ChartMargin
  legend?: ChartLegendProps
  showLegend?: boolean
  title?: string
  hoveredIndex?: number | null
  /** When provided, height is derived as containerWidth / aspectRatio (e.g. 16/9). */
  aspectRatio?: number
  /** Tooltip visibility — when provided the ChartTooltip is rendered by BaseChart. */
  tooltipVisible?: boolean
  tooltipX?: number
  tooltipY?: number
  /** D3 x-axis generator. When provided, BaseChart renders a responsive x-axis. */
  xAxis?: Axis<AxisDomain>
  /** D3 y-axis generator. When provided, BaseChart renders a responsive y-axis. */
  yAxis?: Axis<AxisDomain>
  /** Optional horizontal label displayed below the x-axis. */
  xAxisLabel?: string
  /** Optional vertical label displayed beside the y-axis. */
  yAxisLabel?: string
  /** Minimum font size (px) for axis tick labels. @default 9 */
  axisMinFontSize?: number
  /** Maximum font size (px) for axis tick labels. @default 14 */
  axisMaxFontSize?: number
}

defineOptions({
  name: 'SdsBaseChart',
  inheritAttrs: false
})

const props = withDefaults(defineProps<BaseChartProps>(), {
  height: 360,
  width: '100%',
  margin: () => DEFAULT_CHART_MARGIN,
  legend: undefined,
  showLegend: false,
  title: undefined,
  hoveredIndex: null,
  aspectRatio: undefined,
  tooltipVisible: undefined,
  tooltipX: 0,
  tooltipY: 0,
  xAxis: undefined,
  yAxis: undefined,
  xAxisLabel: undefined,
  yAxisLabel: undefined,
  axisMinFontSize: 9,
  axisMaxFontSize: 14,
})

const emit = defineEmits<{
  'update:hoveredIndex': [index: number | null]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const xAxisLabelRef = ref<HTMLDivElement | null>(null)
const yAxisLabelRef = ref<HTMLSpanElement | null>(null)
const yAxisLabelContainerRef = ref<HTMLDivElement | null>(null)
const axisLabelPadding = ref(0)
const yAxisLabelPadding = ref(0)
const xAxisLabelStyle = ref({ left: '50%', top: '100%', transform: 'translateX(-50%)' })
const yAxisLabelStyle = ref({ left: '0px', top: '0px', width: '0px', height: '0px' })
const heightRef = computed(() => props.height)
const marginRef = computed(() => props.margin)
const aspectRatioRef = computed(() => props.aspectRatio)

const { containerWidth, innerWidth, innerHeight, svgHeight } = useChartDimensions(
  containerRef,
  heightRef,
  marginRef,
  aspectRatioRef
)

function updateAxisLabelLayout() {
  const container = containerRef.value
  const svg = container?.querySelector('svg')
  if (!container || !svg) return

  const containerRect = container.getBoundingClientRect()
  const svgRect = svg.getBoundingClientRect()
  const xTickTexts = Array.from(svg.querySelectorAll<SVGTextElement>(
    '.sds-chart-axis[data-orientation="x"] .tick text',
  ))
  const yTickTexts = Array.from(svg.querySelectorAll<SVGTextElement>(
    '.sds-chart-axis[data-orientation="y"] .tick text',
  ))
  const xTickBottom = xTickTexts.reduce((bottom, text) => {
    const rect = text.getBoundingClientRect()
    return rect.width > 0 || rect.height > 0
      ? Math.max(bottom, rect.bottom - containerRect.top)
      : bottom
  }, -Infinity)
  const yTickLeft = yTickTexts.reduce((left, text) => {
    const rect = text.getBoundingClientRect()
    return rect.width > 0 || rect.height > 0
      ? Math.min(left, rect.left - containerRect.left)
      : left
  }, Infinity)

  if (props.xAxisLabel && xAxisLabelRef.value) {
    const labelHeight = xAxisLabelRef.value.getBoundingClientRect().height || 24
    const top = Number.isFinite(xTickBottom)
      ? xTickBottom + 8
      : svgRect.height - props.margin.bottom + 22
    const plotCenter = props.margin.left + (svgRect.width - props.margin.left - props.margin.right) / 2
    const style = {
      left: `${plotCenter}px`,
      top: `${top}px`,
      transform: 'translateX(-50%)',
    }
    if (
      xAxisLabelStyle.value.left !== style.left
      || xAxisLabelStyle.value.top !== style.top
      || xAxisLabelStyle.value.transform !== style.transform
    ) {
      xAxisLabelStyle.value = style
    }
    axisLabelPadding.value = Math.max(0, Math.ceil(top + labelHeight - svgRect.height))
  } else {
    axisLabelPadding.value = 0
  }

  if (props.yAxisLabel && yAxisLabelRef.value) {
    const labelRect = yAxisLabelRef.value.getBoundingClientRect()
    const labelWidth = labelRect.width || 24
    const left = Number.isFinite(yTickLeft)
      ? yTickLeft - 8 - labelWidth
      : props.margin.left - (props.margin.left - 10) - 8 - labelWidth
    const style = {
      left: `${left}px`,
      top: `${props.margin.top}px`,
      width: `${labelWidth}px`,
      height: `${innerHeight.value}px`,
    }
    if (
      yAxisLabelStyle.value.left !== style.left
      || yAxisLabelStyle.value.top !== style.top
      || yAxisLabelStyle.value.width !== style.width
      || yAxisLabelStyle.value.height !== style.height
    ) {
      yAxisLabelStyle.value = style
    }
    // Reserve room outside the positioned container so the title never overflows its left edge.
    yAxisLabelPadding.value = Math.max(0, Math.ceil(-left))
  } else {
    yAxisLabelPadding.value = 0
  }
}

onMounted(() => {
  void nextTick(updateAxisLabelLayout)
})

onUpdated(() => {
  void nextTick(updateAxisLabelLayout)
})
</script>