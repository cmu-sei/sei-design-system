<template>
  <div
    class="sds-pie-chart w-full"
    @mouseleave="onChartLeave"
  >
    <BaseChart
      v-model:hovered-index="hoveredIndex"
      :height="props.height"
      :aspect-ratio="props.aspectRatio"
      :margin="props.margin"
      :legend="{
        items: legendItems,
        orientation: props.legendOrientation,
        position: props.legendPosition
      }"
      :show-legend="props.showLegend"
      :title="props.title"
      :tooltip-visible="props.showTooltip ? tooltip.visible.value : undefined"
      :tooltip-x="tooltip.x.value"
      :tooltip-y="tooltip.y.value"
    >
      <template #default="{ containerWidth, innerWidth, innerHeight }">
        <g
          v-if="containerWidth > 0"
          :transform="`translate(${props.margin.left + innerWidth / 2}, ${props.margin.top + innerHeight / 2})`"
        >
          <path
            v-for="(arc, i) in computeArcs(innerWidth, innerHeight)"
            :key="i"
            :d="arc.path"
            :fill="arc.color"
            class="transition-opacity duration-150 cursor-pointer sds-pie-chart-slice"
            :class="hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
            role="img"
            :aria-label="`${arc.data.label}: ${resolvedFormatter(arc.data.value)}`"
            @mouseenter="(e) => onArcEnter(e, arc)"
            @mousemove="(e) => onArcMove(e, arc)"
          />
          <template v-if="props.showLabels">
            <text
              v-for="(arc, i) in arcs"
              v-show="arc.angle > MIN_LABEL_ANGLE"
              :key="`label-${i}`"
              :x="arc.centroid[0]"
              :y="arc.centroid[1]"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="white"
              font-size="12"
              font-weight="600"
              class="pointer-events-none select-none sds-pie-chart-label"
            >
              <tspan
                v-if="props.labelType === 'label' || props.labelType === 'both'"
                :x="arc.centroid[0]"
                dy="0"
              >
                {{ arc.data.label }}
              </tspan>
              <tspan 
                v-if="props.labelType === 'both'" 
                :x="arc.centroid[0]" 
                dy="1.2rem"
              >
                {{ resolvedFormatter(arc.data.value) }}
              </tspan>
              <tspan 
                v-if="props.labelType === 'value'" 
                :x="arc.centroid[0]" 
                dy="0"
              >
                {{ resolvedFormatter(arc.data.value) }}
              </tspan>
            </text>
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
            <span class="block font-semibold">{{ tooltip.data.value.label }}</span>
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
import type { PieSlice, PieArcData } from '@/composables/usePieChart'
import type { ChartMargin } from '@/helpers/charts'
import type { ChartLegendPosition, ChartLegendOrientation } from '../ChartLegend/ChartLegend.vue'
import { DEFAULT_CHART_MARGIN, MIN_LABEL_ANGLE } from '@/helpers/charts/constants'
import { format } from '@/lib/d3'
import BaseChart from '../BaseChart'
import { useHoveredIndex } from '@/composables/useHoveredIndex'
import { usePieChart } from '@/composables/usePieChart'
import { useTooltip } from '@/composables/useTooltip'

interface PieChartProps {
  slices: PieSlice[]
  height?: number
  margin?: ChartMargin
  innerRadius?: number
  title?: string
  showLabels?: boolean
  labelType?: 'value' | 'label' | 'both'
  showTooltip?: boolean
  /** When provided, height is derived as containerWidth / aspectRatio (e.g. 16/9). */
  aspectRatio?: number
  /** Format for slice values in legend. Pass a D3 format specifier string or a custom formatter function. @default `(v) => \`${v}%\`` */
  valueFormat?: string | ((value: number) => string)
  /** Format for slice values in tooltip and slice labels. Falls back to valueFormat when omitted. */
  tooltipValueFormat?: string | ((value: number) => string)
  /** Whether to display the legend. @default false */
  showLegend?: boolean
  /** Legend items layout direction. @default 'horizontal' */
  legendOrientation?: ChartLegendOrientation
  /** Legend position in the chart container. @default 'bottom-left' */
  legendPosition?: ChartLegendPosition
}

defineOptions({
  name: 'SdsPieChart'
})

const props = withDefaults(defineProps<PieChartProps>(), {
  height: 360,
  margin: () => DEFAULT_CHART_MARGIN,
  innerRadius: 0,
  title: undefined,
  showLabels: false,
  labelType: 'value',
  showTooltip: true,
  aspectRatio: undefined,
  valueFormat: undefined,
  tooltipValueFormat: undefined,
  showLegend: false,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-left'
})

function resolveFormat(vf: string | ((v: number) => string) | undefined): (v: number) => string {
  if (!vf) return (v: number) => `${v}%`
  return typeof vf === 'function' ? vf : format(vf)
}

// Used for legend items (via usePieChart)
const legendFormatter = computed(() => resolveFormat(props.valueFormat))
// Used for tooltip and slice labels — falls back to legend format
const resolvedFormatter = computed(() =>
  resolveFormat(props.tooltipValueFormat ?? props.valueFormat),
)

const outerRadiusRef = ref(0)
const innerRadiusRef = computed(() => props.innerRadius)
const slicesRef = computed(() => props.slices)

const { hoveredIndex, setHovered } = useHoveredIndex()
const { arcs, legendItems } = usePieChart(
  slicesRef,
  outerRadiusRef,
  innerRadiusRef,
  legendFormatter
)
const tooltip = useTooltip<PieSlice>()

/**
 * Recomputes arcs whenever dimensions or data change.
 */
function computeArcs(innerWidth: number, innerHeight: number) {
  outerRadiusRef.value = Math.min(innerWidth, innerHeight) / 2
  return arcs.value
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

/**
 * Show tooltip and set hovered slice index on mouse enter.
 */
function onArcEnter(e: MouseEvent, arc: PieArcData) {
  setHovered(arcs.value.indexOf(arc))
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, arc.data)
}

/**
 * Update tooltip position on mouse move.
 */
function onArcMove(e: MouseEvent, arc: PieArcData) {
  if (!props.showTooltip) return
  const anchor = getTooltipAnchor(e)
  tooltip.show(anchor.x, anchor.y, arc.data)
}

/**
 * Hide tooltip and reset hovered slice when leaving chart bounds.
 */
function onChartLeave() {
  setHovered(null)
  tooltip.hide()
}
</script>