import type { Ref } from 'vue'
import { computed } from 'vue'

/*
 * Helper functions to calculate start and end positions for pagination range.
 */

function calculateStart(currentPage: number, totalResultsPerPage: number) {
  return currentPage === 1 ? 1 : (((currentPage * totalResultsPerPage) - totalResultsPerPage) + 1)
}

function calculateEnd(start: number, totalResultsPerPage: number, total: number) {
  return Math.min(((start + totalResultsPerPage) - 1), total)
}

/**
 * Calculates pagination range values for displaying result counts (e.g., "Showing 1-10 of 350").
 * @param currentPage - The current page number.
 * @param totalResultsPerPage - The number of results displayed per page.
 * @param totalResults - The total number of results across all pages.
 * @param totalPages - The total number of pages.
 * @returns An object containing computed start position, end position, and total results.
 */
export default function usePaginationRange(
  currentPage: Ref<number>,
  totalResultsPerPage: Ref<number>,
  totalResults: Ref<number>,
  totalPages: Ref<number>
) {
  const start = computed(() => {
    if (
      totalResults.value === 0 ||
      totalResultsPerPage.value === 0 ||
      currentPage.value > totalPages.value
    ) {
      return 0
    }

    return calculateStart(currentPage.value, totalResultsPerPage.value)
  })

  const end = computed(() => {
    if (
      totalResultsPerPage.value === 0 ||
      currentPage.value > totalPages.value
    ) {
      return 0
    }

    return currentPage.value === totalPages.value
      ? totalResults.value
      : calculateEnd(start.value, totalResultsPerPage.value, totalResults.value)
  })

  return { start, end, total: totalResults }
}