<template>
  <div 
    data-id="sds-base-chart" 
    class="sds-base-chart flex flex-col gap-y-4"
  >
    <div 
      ref="containerRef" 
      class="relative" 
      :style="{ width: props.width }"
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
    </div>
    <template v-if="props.legend && props.showLegend">
      <slot
        name="legend"
        :items="props.legend.items"
        :hovered-index="props.hoveredIndex"
        :update-hovered-index="(i: number | null) => emit('update:hoveredIndex', i)"
      >
        <ChartLegend
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
import { DEFAULT_MARGIN } from '@/helpers/charts/constants'
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
  /** Minimum font size (px) for axis tick labels. @default 9 */
  axisMinFontSize?: number
  /** Maximum font size (px) for axis tick labels. @default 14 */
  axisMaxFontSize?: number
}

defineOptions({
  name: 'SdsBaseChart',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BaseChartProps>(), {
  height: 360,
  width: '100%',
  margin: () => DEFAULT_MARGIN,
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
  axisMinFontSize: 9,
  axisMaxFontSize: 14,
})

const emit = defineEmits<{
  'update:hoveredIndex': [index: number | null]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const heightRef = computed(() => props.height)
const marginRef = computed(() => props.margin)
const aspectRatioRef = computed(() => props.aspectRatio)

const { containerWidth, innerWidth, innerHeight, svgHeight } = useChartDimensions(
  containerRef,
  heightRef,
  marginRef,
  aspectRatioRef
)
</script>