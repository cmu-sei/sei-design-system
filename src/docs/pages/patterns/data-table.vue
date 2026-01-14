<template>
  <div class="grid gap-8">
    <SdsDataTable
      :data="data"
      :paginator="paginator"
      @update:paginator="(newPaginator) => console.log(newPaginator)"
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

/* Paginator */
const currentPage = ref(1)
const totalPages = ref(35)
const paginator = computed(() => ({ currentPage: currentPage.value, totalPages: totalPages.value }))
</script>