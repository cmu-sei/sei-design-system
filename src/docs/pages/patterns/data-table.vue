<template>
  <div class="grid gap-8">
    <SdsDataTable
      :data="data"
      :pagination="pagination"
      @update:pagination="updatePagination"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableField, TableItem } from '../../../components/Table/Table.vue'
import SdsDataTable from '../../../components/DataTable/DataTable.vue'

defineOptions({
  name: 'DataTablePage'
})

definePage({
  meta: {
    title: 'Data Table'
  }
})

useHead({
  title: 'Data Table'
})

/* Data */
const tableFields = computed<TableField[]>(() => [
  {
    key: 'task',
    label: 'Task',
    sortable: false
  },
  {
    key: 'description',
    label: 'Description',
    sortable: false
  },
  {
    key: 'assignee',
    label: 'Assignee',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    align: 'right'
  }
])

const tableItems = computed<TableItem[]>(() => [
  { id: 1, task: 'SDS-101', description: 'Implement responsive navigation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit' },
  { id: 2, task: 'SDS-102', description: 'Refactor authentication module', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit' },
  { id: 3, task: 'SDS-103', description: 'Optimize image loading', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit' },
  { id: 4, task: 'SDS-104', description: 'Add accessibility features', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit' },
  { id: 5, task: 'SDS-105', description: 'Integrate third-party API', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit' },
  { id: 6, task: 'SDS-106', description: 'Update user profile page', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit' },
  { id: 7, task: 'SDS-107', description: 'Fix mobile layout issues', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit' },
  { id: 8, task: 'SDS-108', description: 'Implement dark mode', assignee: 'Samira Hassan', status: 'Submitted', actions: 'Edit' },
  { id: 9, task: 'SDS-109', description: 'Set up CI/CD pipeline', assignee: 'Chris Walker', status: 'Approved', actions: 'Edit' },
  { id: 10, task: 'SDS-110', description: 'Improve form validation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit' },
  { id: 11, task: 'SDS-111', description: 'Create dashboard analytics', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit' },
  { id: 12, task: 'SDS-112', description: 'Implement file uploader', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit' },
  { id: 13, task: 'SDS-113', description: 'Add multi-language support', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit' },
  { id: 14, task: 'SDS-114', description: 'Redesign landing page', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit' },
  { id: 15, task: 'SDS-115', description: 'Integrate payment gateway', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit' },
  { id: 16, task: 'SDS-116', description: 'Fix broken links', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit' },
  { id: 17, task: 'SDS-117', description: 'Add user notifications', assignee: 'Samira Hassan', status: 'Submitted', actions: 'Edit' },
  { id: 18, task: 'SDS-118', description: 'Implement search functionality', assignee: 'Chris Walker', status: 'Approved', actions: 'Edit' },
  { id: 19, task: 'SDS-119', description: 'Update documentation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit' },
  { id: 20, task: 'SDS-120', description: 'Add role-based access control', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit' },
  { id: 21, task: 'SDS-121', description: 'Improve loading performance', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit' },
  { id: 22, task: 'SDS-122', description: 'Implement drag-and-drop', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit' },
  { id: 23, task: 'SDS-123', description: 'Add audit logging', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit' },
  { id: 24, task: 'SDS-124', description: 'Refactor state management', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit' },
  { id: 25, task: 'SDS-125', description: 'Integrate maps feature', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit' }
])

/* Pagination */
const currentPage = ref(1)
const totalResults = ref(tableItems.value.length)
const totalResultsPerPage = ref(10)
const totalPages = ref(Math.ceil(totalResults.value / totalResultsPerPage.value))

/* Chunked table items */
const items = computed(() => chunkArray(tableItems.value, totalResultsPerPage.value))

const data = computed(() => ({ 
  fields: tableFields.value, 
  items: items.value[currentPage.value - 1] 
}))

const pagination = computed(() => ({ 
  currentPage: currentPage.value, 
  totalPages: totalPages.value, 
  totalResultsPerPage: totalResultsPerPage.value, 
  totalResults: totalResults.value 
}))

function updatePagination(newPagination: {
  currentPage: number;
  totalPages: number;
  totalResultsPerPage: number;
  totalResults: number;
}) {
  currentPage.value = newPagination.currentPage
  totalPages.value = newPagination.totalPages
  totalResults.value = newPagination.totalResults
  totalResultsPerPage.value = newPagination.totalResultsPerPage
}

/**
 * Splits an array into chunks of a specified size.
 *
 * @template T The type of elements in the array.
 * @param {T[]} arr - The array to be split into chunks.
 * @param {number} size - The size of each chunk. Must be a positive integer.
 * @returns {T[][]} A new array containing subarrays (chunks) of the specified size.
 *                  The last chunk may contain fewer elements if the array cannot
 *                  be evenly divided.
 * 
 * @example
 * // Example usage:
 * const result = chunkArray([1, 2, 3, 4, 5], 2);
 * console.log(result); // [[1, 2], [3, 4], [5]]
 */
function chunkArray<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc: T[], val, i) => {
    const index = Math.floor(i / size)
    if (!acc[index]) (acc[index] as T[]) = []
    ;(acc[index] as T[]).push(val)
    return acc
  }, []) as T[][]
}
</script>