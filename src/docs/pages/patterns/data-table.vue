<template>
  <div class="grid gap-8">
    <SdsDataTable
      :data="data"
      :pagination="pagination"
      :filters="filters"
      :filter-search="true"
      @update:filters="handleFilterUpdate"
      @update:pagination="handlePaginationUpdate"
    >
      <template #cell(task)="{ item }: { item: TableItem }">
        <SdsLink 
          href="https://www.atlassian.com/software/jira"
          kind="primary"
          type="standalone"
          variant="blue"
          size="md"
          :external="true"
        >
          {{ item.task }}
        </SdsLink>
      </template>
      <template #cell(assignee)="{ item }: { item: TableItem }">
        <div class="flex flex-row gap-2 items-start">
          <SdsAvatar
            :name="(item.assignee as string)"
            class="grow-0 shrink-0"
            shape="circle"
            size="sm"
            variant="gray"
          />
          <span class="pt-1">{{ item.assignee }}</span>
        </div>
      </template>
      <template #cell(status)="{ item }: { item: TableItem }">
        <SdsBadge v-bind="getBadgeVariant((item.status as string))">
          {{ item.status }}
        </SdsBadge>
      </template>
    </SdsDataTable>
  </div>
</template>

<script setup lang="ts">
import type { DataTableFilterConfig } from '../../../components/DataTable/DataTable.vue'
import type { TableField, TableItem } from '../../../components/Table/Table.vue'
import SdsAvatar from '../../../components/Avatar/Avatar.vue'
import SdsBadge from '../../../components/Badge/Badge.vue'
import SdsDataTable from '../../../components/DataTable/DataTable.vue'
import SdsLink from '../../../components/Link/Link.vue'

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
    sortable: true
  },
  {
    key: 'description',
    label: 'Description',
    sortable: false
  },
  {
    key: 'assignee',
    label: 'Assignee',
    sortable: true
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

const tableItemsOriginal = ref<TableItem[]>([
  { id: 1, task: 'SDS-101', description: 'Implement responsive navigation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 2, task: 'SDS-102', description: 'Refactor authentication module', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 3, task: 'SDS-103', description: 'Optimize image loading', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 4, task: 'SDS-104', description: 'Add accessibility features', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 5, task: 'SDS-105', description: 'Integrate third-party API', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 6, task: 'SDS-106', description: 'Update user profile page', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 7, task: 'SDS-107', description: 'Fix mobile layout issues', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 8, task: 'SDS-108', description: 'Implement dark mode', assignee: 'Samira Hassan', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 9, task: 'SDS-109', description: 'Set up CI/CD pipeline', assignee: 'Chris Walker', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 10, task: 'SDS-110', description: 'Improve form validation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 11, task: 'SDS-111', description: 'Create dashboard analytics', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 12, task: 'SDS-112', description: 'Implement file uploader', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 13, task: 'SDS-113', description: 'Add multi-language support', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 14, task: 'SDS-114', description: 'Redesign landing page', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 15, task: 'SDS-115', description: 'Integrate payment gateway', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 16, task: 'SDS-116', description: 'Fix broken links', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 17, task: 'SDS-117', description: 'Add user notifications', assignee: 'Samira Hassan', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 18, task: 'SDS-118', description: 'Implement search functionality', assignee: 'Chris Walker', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 19, task: 'SDS-119', description: 'Update documentation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 20, task: 'SDS-120', description: 'Add role-based access control', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 21, task: 'SDS-121', description: 'Improve loading performance', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 22, task: 'SDS-122', description: 'Implement drag-and-drop', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit', workflow: 'Open' },
  { id: 23, task: 'SDS-123', description: 'Add audit logging', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit', workflow: 'Testing' },
  { id: 24, task: 'SDS-124', description: 'Refactor state management', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit', workflow: 'Recently Updated' },
  { id: 25, task: 'SDS-125', description: 'Integrate maps feature', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit', workflow: 'Open' }
])

const tableItems = ref<TableItem[]>([...tableItemsOriginal.value])

/* Table */
const sort_by = ref<string>('status')
const sort_desc = ref<boolean>(true)

/* Pagination */
const currentPage = ref(1)
const totalResults = ref(tableItems.value.length)
const totalResultsPerPage = ref(10)
const totalPages = ref(Math.ceil(totalResults.value / totalResultsPerPage.value))

/* Chunked table items */
const items = computed(() => chunkArray(tableItems.value, totalResultsPerPage.value))

const data = computed(() => ({ 
  fields: tableFields.value, 
  items: items.value[currentPage.value - 1],
  sortBy: sort_by.value,
  sortDesc: sort_desc.value,
  onSort: sortTableItems
}))

const pagination = computed(() => ({ 
  currentPage: currentPage.value, 
  totalPages: totalPages.value, 
  totalResultsPerPage: totalResultsPerPage.value, 
  totalResults: totalResults.value 
}))

const filters = ref<DataTableFilterConfig[]>([
  {
    key: 'workflow',
    label: 'Workflow',
    type: 'segment',
    segments: [
      { label: 'Open', selected: false },
      { label: 'Testing', selected: false },
      { label: 'Recently Updated', selected: false }
    ]
  },
  {
    key: 'assignee',
    label: 'Assignee',
    type: 'dropdown',
    options: getUniqueBy(tableItemsOriginal.value, 'assignee').map((i) => ({
      id: i.id,
      text: (i.assignee as string),
      selected: false
    }))
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    options: [
      { id: 1, text: 'Submitted', selected: false },
      { id: 2, text: 'Approved', selected: false },
      { id: 3, text: 'Draft', selected: false }
    ]
  }
])

/* Filter update handler */
function handleFilterUpdate(updatedFilters: DataTableFilterConfig[]) {
  // Update local filters with the emitted values from DataTable
  filters.value = updatedFilters

  // Check if all filters are cleared
  const allFiltersCleared = updatedFilters.every((filter) => {
    if (filter.type === 'segment' && filter.segments) {
      // Check if no segment is selected or first segment ("All") is selected
      const hasSelection = filter.segments.some((s) => s.selected)
      if (!hasSelection) return true
      const firstSelected = filter.segments[0]?.selected === true
      return firstSelected && filter.segments[0]?.label === 'All'
    } else if (filter.type === 'dropdown' && filter.options) {
      // No options selected
      return filter.options.every((o) => !o.selected)
    }
    return true
  })

  if (allFiltersCleared) {
    // Restore original data and reset pagination
    tableItems.value = [...tableItemsOriginal.value]
    currentPage.value = 1
    totalResults.value = tableItemsOriginal.value.length
    totalPages.value = Math.ceil(totalResults.value / totalResultsPerPage.value)
    return
  }

  // Otherwise, filter as usual
  let filtered = [...tableItemsOriginal.value]

  // Process each filter
  updatedFilters.forEach((filter) => {
    if (filter.type === 'segment' && filter.segments) {
      // Find selected segment (skip "All")
      const selectedSegment = filter.segments.find((s) => s.selected)
      if (selectedSegment && selectedSegment.label !== 'All') {
        filtered = filtered.filter((item) => item[filter.key] === selectedSegment.label)
      }
    } else if (filter.type === 'dropdown' && filter.options) {
      // Find selected options
      const selectedOptions = filter.options.filter((o) => o.selected).map((o) => o.text)
      if (selectedOptions.length > 0) {
        filtered = filterObjectsByKey(filtered, filter.key as keyof TableItem, selectedOptions)
      }
    }
  })

  tableItems.value = filtered
  currentPage.value = 1
  totalResults.value = filtered.length
  totalPages.value = Math.ceil(totalResults.value / totalResultsPerPage.value)
}

/* Pagination update handler */
function handlePaginationUpdate(newPagination: {
  currentPage: number;
  totalPages: number;
  totalResultsPerPage: number;
  totalResults: number;
}) {
  currentPage.value = newPagination.currentPage
  // Recalculate totalPages based on current filtered results and new page size
  totalPages.value = Math.ceil(tableItems.value.length / newPagination.totalResultsPerPage)
  totalResultsPerPage.value = newPagination.totalResultsPerPage
  totalResults.value = newPagination.totalResults
}

// --- Sorting helper functions --- //

/**
 * Sorts tableItems by a string field.
 */
function sortByStringField(field: keyof TableItem, desc: boolean) {
  tableItems.value.sort((a: TableItem, b: TableItem) => {
    const aVal = a[field] as string
    const bVal = b[field] as string
    if (desc) {
      return String(bVal).localeCompare(String(aVal))
    } else {
      return String(aVal).localeCompare(String(bVal))
    }
  })
}

/**
 * Extracts the last name from a full name string.
 *
 * Notes/limitations:
 * - Treats the last *non-suffix* token as the last name.
 * - Does not try to handle multi-word last names, prefixes, or non‑Western orders.
 * - Returns an empty string if no name part can be found.
 */
function getLastName(fullName: string): string {
  const trimmed = fullName.trim()
  if (!trimmed) return ""

  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) return parts[0]

  const rawLast = parts[parts.length - 1]

  // Handle very common suffixes (normalized to lowercase, no dots)
  const suffixes = new Set(["jr", "sr", "ii", "iii", "iv"])
  const normalized = rawLast.replace(/\./g, "").toLowerCase()

  if (suffixes.has(normalized) && parts.length > 1) {
    return parts[parts.length - 2]
  }

  return rawLast
}

/**
 * Sorts tableItems by assignee's last name.
 */
function sortByAssigneeLastName(desc: boolean) {
  tableItems.value.sort((a: TableItem, b: TableItem) => {
    const aLast = getLastName(a.assignee as string)
    const bLast = getLastName(b.assignee as string)
    if (desc) {
      return bLast.localeCompare(aLast)
    } else {
      return aLast.localeCompare(bLast)
    }
  })
}

/* Utility functions */

function chunkArray<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc: T[], val, i) => {
    const index = Math.floor(i / size)
    if (!acc[index]) (acc[index] as T[]) = []
    ;(acc[index] as T[]).push(val)
    return acc
  }, []) as T[][]
}

function filterObjectsByKey<T, K extends keyof T>(
  items: T[],
  key: K,
  filter: T[K] | T[K][]
): T[] {
  const filterValues = Array.isArray(filter) ? filter : [filter];
  return items.filter((item) => filterValues.includes(item[key]));
}

function getBadgeVariant(status: string): {
  type: 'light-border' | undefined
  variant: 'green' | 'blue' | 'yellow' | undefined
}  {
  switch (status.toLocaleLowerCase()) {
    case 'submitted':
      return {
        type: 'light-border',
        variant: 'blue'
      }
    case 'approved':
      return {
        type: 'light-border',
        variant: 'green'
      }
    case 'draft':
    default:
      return {
        type: 'light-border',
        variant: 'yellow'
      }
  }
}

function getUniqueBy<T>(arr: T[], prop: keyof T): T[] {
  const seen = new Set()
  return arr.filter((i) => {
    const value = i[prop]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

function sortTableItems({ sortBy, sortDesc }: { sortBy: string; sortDesc: boolean }) {
  sort_by.value = sortBy
  sort_desc.value = sortDesc

  switch (sort_by.value) {
    case 'status':
    case 'task':
      sortByStringField(sort_by.value, sort_desc.value)
      break
    case 'assignee':
      sortByAssigneeLastName(sort_desc.value)
      break
  }
}
</script>