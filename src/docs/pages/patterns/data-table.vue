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
const fields = computed<TableField[]>(() => [
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
const items = computed<TableItem[]>(() => [])
const data = computed(() => ({ fields: fields.value, items: items.value }))

/* Pagination */
const currentPage = ref(1)
const totalResults = ref(350)
const totalResultsPerPage = ref(10)
const totalPages = ref(Math.ceil(totalResults.value / totalResultsPerPage.value))

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
</script>