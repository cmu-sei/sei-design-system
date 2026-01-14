<template>
  <div 
    data-id="sds-result-range" 
    aria-live="polite" 
    aria-atomic="true"
  >
    <slot 
      :start="start" 
      :end="end" 
      :total="total"
    >
      <span class="text-sm text-gray-800 dark:text-gray-600">
        Showing <span class="font-semibold">{{ start !== end ? `${start}-${end}` : start }}</span> of <span class="font-semibold">{{ total }}</span>
      </span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
/**
 * Props for the ResultRange component.
 */
export interface ResultRangeProps {
  /**
   * Current page number.
   * @default 0
   */
  resultsCurrentPage?: number;
  /**
   * Number of results per page.
   * @default 0
   */
  resultsPerPage?: number;
  /**
   * Total number of results.
   * @default 0
   */
  total?: number;
  /**
   * Total number of pages.
   * @default 0
   */
  totalPages?: number;
}

defineOptions({
  name: "SdsResultRange"
})

const props = withDefaults(defineProps<ResultRangeProps>(), {
  resultsCurrentPage: 0,
  resultsPerPage: 0,
  total: 0,
  totalPages: 0
})

function calculateStart(currentPage: number, perPage: number) {
  return currentPage === 1 ? 1 : (((currentPage * perPage) - perPage) + 1)
}

function calculateEnd(start: number, perPage: number, total: number) {
  return Math.min(((start + perPage) - 1), total)
}

const resultsCurrentPage = computed(() => props.resultsCurrentPage)
const resultsPerPage = computed(() => props.resultsPerPage)
const total = computed(() => props.total)
const totalPages = computed(() => props.totalPages)

const start = computed(() => {
  if (
    total.value === 0 ||
    resultsPerPage.value === 0 ||
    resultsCurrentPage.value > totalPages.value
  ) {
    return 0
  }
  return calculateStart(resultsCurrentPage.value, resultsPerPage.value)
})

const end = computed(() => {
  if (
    resultsPerPage.value === 0 ||
    resultsCurrentPage.value > totalPages.value
  ) {
    return 0
  }
  return resultsCurrentPage.value === totalPages.value
    ? total.value
    : calculateEnd(start.value, resultsPerPage.value, total.value)
})
</script>