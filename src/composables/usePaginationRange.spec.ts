import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import usePaginationRange from './usePaginationRange'

describe('usePaginationRange', () => {
  describe('Basic Functionality', () => {
    it('should calculate correct start position for first page', () => {
      // Arrange: Set up pagination for first page
      const currentPage = ref(1)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)

      // Act: Initialize the composable
      const { start } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Assert: Start should be 1
      expect(start.value).toBe(1)
    })

    it('should calculate correct end position for first page', () => {
      // Arrange: Set up pagination for first page
      const currentPage = ref(1)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)

      // Act: Initialize the composable
      const { end } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Assert: End should be 10
      expect(end.value).toBe(10)
    })

    it('should calculate correct start and end positions for middle page', () => {
      // Arrange: Set up pagination for page 3
      const currentPage = ref(3)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)

      // Act: Initialize the composable
      const { start, end } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Assert: Start should be 21, end should be 30
      expect(start.value).toBe(21)
      expect(end.value).toBe(30)
    })

    it('should calculate correct end position for last page with partial results', () => {
      // Arrange: Set up pagination for last page with 95 total results
      const currentPage = ref(10)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(95)
      const totalPages = ref(10)

      // Act: Initialize the composable
      const { start, end } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Assert: Start should be 91, end should be 95
      expect(start.value).toBe(91)
      expect(end.value).toBe(95)
    })

    it('should return total results as reactive ref', () => {
      // Arrange: Set up pagination with 100 total results
      const currentPage = ref(1)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)

      // Act: Initialize the composable
      const { total } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Assert: Total should match totalResults
      expect(total.value).toBe(100)
    })
  })

  describe('Reactivity', () => {
    it('should update start and end when currentPage changes', () => {
      // Arrange: Set up pagination starting at page 1
      const currentPage = ref(1)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)
      const { start, end } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Act: Change to page 5
      currentPage.value = 5

      // Assert: Start and end should update to page 5 values
      expect(start.value).toBe(41)
      expect(end.value).toBe(50)
    })

    it('should update total when totalResults changes', () => {
      // Arrange: Set up pagination with 100 total results
      const currentPage = ref(1)
      const totalResultsPerPage = ref(10)
      const totalResults = ref(100)
      const totalPages = ref(10)
      const { total } = usePaginationRange(currentPage, totalResultsPerPage, totalResults, totalPages)

      // Act: Change total results to 200
      totalResults.value = 200

      // Assert: Total should update to new value
      expect(total.value).toBe(200)
    })
  })
})