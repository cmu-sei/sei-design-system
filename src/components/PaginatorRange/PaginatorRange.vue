<template>
  <p
    data-id="sds-paginator-range"
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
  </p>
</template>

<script lang="ts" setup>
import usePaginationRange from '../../composables/usePaginationRange'

export interface PaginatorRangeProps {
  currentPage?: number;
  totalResultsPerPage?: number;
  totalResults?: number;
  totalPages?: number;
}

defineOptions({
  name: 'SdsPaginatorRange'
})

const props = withDefaults(defineProps<PaginatorRangeProps>(), {
  currentPage: 0,
  totalResultsPerPage: 0,
  totalResults: 0,
  totalPages: 0
})

const currentPage = computed(() => props.currentPage)
const totalResultsPerPage = computed(() => props.totalResultsPerPage)
const totalResults = computed(() => props.totalResults)
const totalPages = computed(() => props.totalPages)

const { start, end, total } = usePaginationRange(
  currentPage,
  totalResultsPerPage,
  totalResults,
  totalPages
)
</script>