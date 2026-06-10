<template>
  <div 
    class="sds-legend" 
    :class="getLegendContainerClasses(LEGEND_ALIGNMENT_CLASSES, props.position)"
  >
    <ul 
      :class="[isVertical ? 'flex flex-col gap-x-0 gap-y-2' : 'flex flex-wrap gap-x-6 gap-y-2']" 
      role="list"
    >
      <li
        v-for="(item, i) in items"
        :key="item.label"
        class="flex items-center gap-2 transition-opacity duration-150 cursor-default text-sm"
        :class="[
          hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100',
          hoveredIndex !== null ? 'cursor-pointer' : 'cursor-default',
        ]"
        @mouseenter="emit('update:hoveredIndex', i)"
        @mouseleave="emit('update:hoveredIndex', null)"
      >
        <span
          v-if="item.color"
          class="inline-block h-3 w-3 shrink-0 rounded-md"
          :style="{ backgroundColor: item.color }"
          aria-hidden="true"
        />
        <span class="font-medium text-gray-900 dark:text-gray-100">{{ item.label }}</span>
        <span 
          v-if="item.value !== undefined" 
          class="text-gray-500 dark:text-gray-400 tabular-nums"
        >{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface ChartLegendItem {
  label: string
  value?: string | number
  color?: string
}

export type ChartLegendOrientation = 'horizontal' | 'vertical'

export type ChartLegendPosition = 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ChartLegendProps {
  /** Array of legend items to display in the chart legend. */
  items?: ChartLegendItem[]
  /** Index of the currently hovered legend item, or null if no item is hovered. Used to apply hover styles to corresponding chart elements. */
  hoveredIndex?: number | null
  /** Legend items layout direction. @default 'horizontal' */
  orientation?: ChartLegendOrientation
  /** Legend position relative to the chart. @default 'bottom-left' */
  position?: ChartLegendPosition
}

defineOptions({
  name: 'SdsChartLegend'
})

const props = withDefaults(defineProps<ChartLegendProps>(), {
  items: () => [],
  orientation: 'horizontal',
  hoveredIndex: null,
  position: 'bottom-left',
})

const emit = defineEmits<{
  'update:hoveredIndex': [index: number | null]
}>()

const LEGEND_ALIGNMENT_CLASSES: Record<ChartLegendPosition, string> = Object.freeze({
  'top-left': 'justify-start',
  'top-center': 'justify-center',
  'top-right': 'justify-end',
  'bottom-left': 'justify-start',
  'bottom-center': 'justify-center',
  'bottom-right': 'justify-end',
} as const)

const isVertical = computed(() => {
  return props.orientation && props.orientation === 'vertical'
})

/**
 * Helper function to get the appropriate CSS classes for legend container alignment based on the provided position prop.
 * @param classes - The mapping of legend positions to CSS classes.
 * @param position - The position of the legend.
 */
function getLegendContainerClasses(classes: typeof LEGEND_ALIGNMENT_CLASSES, position: ChartLegendPosition): string {
  const orderClass = position.startsWith('top-') ? 'order-first' : ''
  return `flex ${classes[position]} ${orderClass}`
}
</script>