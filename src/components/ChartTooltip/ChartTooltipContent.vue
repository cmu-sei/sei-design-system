<template>
  <div
    data-id="sds-chart-tooltip-content"
    class="flex flex-col gap-y-3"
  >
    <span class="text-xs leading-none font-semibold text-gray-900 dark:text-gray-100">
      {{ props.title }}
    </span>
    <div
      data-id="sds-chart-tooltip-details"
      class="flex flex-wrap items-center justify-between gap-x-6 w-full"
    >
      <span
        v-if="props.color || props.label !== undefined"
        class="flex min-w-0 items-center gap-x-1.5"
      >
        <span
          v-if="props.color"
          data-id="sds-chart-tooltip-swatch"
          class="block h-2 w-2 shrink-0 rounded-xs"
          :style="{ backgroundColor: props.color }"
          aria-hidden="true"
        />
        <span
          v-if="props.label !== undefined"
          data-id="sds-chart-tooltip-label"
          class="text-xs leading-none font-normal text-gray-600 dark:text-gray-400"
        >
          {{ props.label }}
        </span>
      </span>
      <span
        data-id="sds-chart-tooltip-datapoint"
        class="text-xs leading-none font-semibold text-gray-900 dark:text-gray-100"
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

defineOptions({ name:
  'SdsChartTooltipContent'
})

const props = defineProps<ChartTooltipContentProps>()
</script>