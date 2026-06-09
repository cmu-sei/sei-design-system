<template>
  <ul 
    :class="getLegendClasses()" 
    role="list"
  >
    <li
      v-for="(item, i) in items"
      :key="item.label"
      class="flex items-center gap-2 transition-opacity duration-150 cursor-default"
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
</template>

<script setup lang="ts">
export interface ChartLegendItem {
  label: string
  value?: string | number
  color?: string
}

export type ChartLegendOrientation = 'horizontal' | 'vertical'

interface ChartLegendProps {
  items: ChartLegendItem[]
  hoveredIndex?: number | null
  /** Legend items layout direction. @default 'horizontal' */
  orientation?: ChartLegendOrientation
}

defineOptions({
  name: 'SdsChartLegend'
})

const props = defineProps<ChartLegendProps>()

const emit = defineEmits<{
  'update:hoveredIndex': [index: number | null]
}>()

function getLegendClasses(): string {
  const baseClasses = 'sds-legend text-sm'
  const flexClasses =
    props.orientation === 'vertical'
      ? 'flex flex-col gap-x-0 gap-y-2'
      : 'flex flex-wrap gap-x-6 gap-y-2'
  return `${baseClasses} ${flexClasses}`
}
</script>