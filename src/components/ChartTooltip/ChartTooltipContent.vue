<template>
  <div
    data-id="sds-chart-tooltip-content"
    class="flex flex-col gap-y-2"
  >
    <span class="text-base font-semibold text-gray-600 dark:text-gray-400">
      {{ props.title }}
    </span>
    <div
      data-id="sds-chart-tooltip-details"
      class="flex flex-wrap items-center gap-y-1"
      :class="props.label === undefined ? 'gap-x-2' : 'gap-x-4'"
    >
      <span
        v-if="props.color || props.label !== undefined"
        class="flex min-w-0 items-center gap-x-2"
      >
        <span
          v-if="props.color"
          data-id="sds-chart-tooltip-swatch"
          class="block h-3.5 w-3.5 shrink-0 rounded-xs"
          :style="{ backgroundColor: props.color }"
          aria-hidden="true"
        />
        <span
          v-if="props.label !== undefined"
          data-id="sds-chart-tooltip-label"
          class="text-sm font-normal text-gray-600 dark:text-gray-400"
        >
          {{ props.label }}
        </span>
      </span>
      <span
        data-id="sds-chart-tooltip-datapoint"
        class="text-sm font-semibold text-gray-600 dark:text-gray-400"
      >
        {{ props.datapoint }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChartTooltipContentProps {
  /** Primary heading describing the hovered item. */
  title: string
  /** Optional secondary category or series label. */
  label?: string
  /** Formatted value displayed for the hovered item. */
  datapoint: string | number
  /** Resolved chart color used for the optional swatch. */
  color?: string
}

defineOptions({ name: 'SdsChartTooltipContent' })

const props = defineProps<ChartTooltipContentProps>()
</script>
