<template>
  <div 
    data-id="sds-data-table"
    class="w-full min-w-full"
  >
    <div 
      v-if="hasFilters"
      class="
        bg-white dark:bg-gray-950
        border border-b-0 border-gray-100 dark:border-gray-800 
        rounded-tl-lg rounded-tr-lg sds-theme-plaid:rounded-none 
        min-h-14.5 w-full min-w-full
      "
    >
      <div 
        v-if="hasFilters"
        class="overflow-x-auto px-2 py-4"
      >
        <div class="flex flex-row flex-nowrap items-center gap-2 w-full min-w-full">
          <template v-if="filters?.button && filters.button.length">
            <SdsActionButton
              v-for="(button, index) in filters.button"
              :key="index"
              :active="button.selected"
              kind="ghost"
              variant="gray"
              size="xs"
              type="button"
              @click="onFilterChange(button)"
            >
              <span>{{ button.text }}</span>
            </SdsActionButton>
          </template>
          <template v-if="filters?.dropdown && filters.dropdown.length">
            <SdsFilterByDropdown
              v-for="(dropdown, index) in filters.dropdown"
              :key="index"
              v-model="dropdown.options"
              :title="dropdown.title ?? undefined"
              :disabled="dropdown.disabled ?? undefined"
              :enable-filter="true"
              kind="ghost"
              variant="gray"
              size="xs"
              @update:model-value="onFilterChange(dropdown)"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto max-w-full">
      <SdsTable 
        v-bind="{ ...tableProps, ...$attrs }"
        class="table-prose-td:align-middle w-full min-w-5xl"
      >
        <template
          v-for="(_, name) in $slots"
          #[name]="slotProps"
        >
          <slot
            :name="name"
            v-bind="slotProps ?? {}"
          />
        </template>
        <template #footer>
          <!-- TODO: Implement footer content outside of SdsTable component with "overflow-x-auto" scrolling -->
          <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <SdsPaginatorRange 
              v-bind="{ ...paginatorRangeProps, ...$attrs }"
              class="w-full md:w-auto"
            />
            <SdsPaginator 
              v-bind="{ ...paginatorProps, ...$attrs }"
              @go-to-page="setCurrentPage"
            />
            <SdsActionDropdown
              v-model="options"
              data-id="sds-data-table-page-size-dropdown"
              kind="secondary"
              variant="gray"
              class="justify-self-end"
            >
              <template #title>
                {{ totalRowsPerPage }}
              </template>
              <template 
                v-for="option in options" 
                :key="JSON.stringify(option)"
              >
                <SdsDropdownItem
                  tag="button"
                  @click="setPageSize(option.value)"
                >
                  {{ option.text }}
                </SdsDropdownItem>
              </template>
            </SdsActionDropdown>
          </div>
        </template>
      </SdsTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterByDropdownOption } from '../FilterByDropdown/FilterByDropdown.vue'
import type { PaginatorProps } from '../Paginator/Paginator.vue'
import type { TableProps } from '../Table/Table.vue'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsActionDropdown from '../ActionDropdown/ActionDropdown.vue'
import SdsFilterByDropdown from '../FilterByDropdown/FilterByDropdown.vue'
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsPaginatorRange from '../PaginatorRange/PaginatorRange.vue'
import SdsTable from '../Table/Table.vue'

export interface DataTableButtonFilter {
  text: string;
  selected: boolean;
}

export interface DataTableDropdownFilter {
  title?: string;
  disabled?: boolean;
  options?: FilterByDropdownOption[];
}

export type DataTableFilter = DataTableButtonFilter | DataTableDropdownFilter;

interface DataTableProps {
  data?: TableProps;
  pagination?: PaginatorProps & { 
    totalResultsPerPage: number; 
    totalResults: number; 
  };
  filters?: {
    button?: DataTableButtonFilter[];
    dropdown?: DataTableDropdownFilter[];
  };
}

defineOptions({
  name: 'SdsDataTable'
})

const props = withDefaults(defineProps<DataTableProps>(), {
  data: undefined,
  pagination: undefined,
  filters: undefined
})

const emit = defineEmits(['update:filter', 'update:pagination'])

// Pagination state
const currentPage = ref(props.pagination?.currentPage ?? 1)
const totalResultsPerPage = ref(props.pagination?.totalResultsPerPage ?? 0)
const totalResults = ref(props.pagination?.totalResults ?? 0)
const totalPages = ref(props.pagination?.totalPages ?? 0)

// Filter state
const filters = ref(props.filters 
  ? { 
    button: props.filters.button 
      ? [{ text: 'All', selected: true }, ...props.filters.button] 
      : [],
    dropdown: props.filters.dropdown 
      ? [...props.filters.dropdown] 
      : []
  }
  : undefined
)

const tableProps = computed(() => ({ 
  items: [],
  fields: [],
  ...props.data 
}))

const paginatorProps = computed(() => ({ 
  currentPage: currentPage.value, 
  totalPages: totalPages.value
}))

const paginatorRangeProps = computed(() => ({
  currentPage: currentPage.value,
  totalResultsPerPage: totalResultsPerPage.value,
  totalResults: totalResults.value,
  totalPages: totalPages.value
}))

// Paginator page size dropdown options
const options = computed(() => [
  { value: 10, text: '10' },
  { value: 25, text: '25' },
  { value: 50, text: '50' }
])

const totalRowsPerPage = computed(() => `${totalResultsPerPage.value} rows`)

const hasFilters = computed(() => {
  const { filters } = props
  return !!(filters?.button?.length || filters?.dropdown?.length)
})

// Type guards

function isButtonFilter(filter: DataTableFilter): filter is DataTableButtonFilter {
  return 'text' in filter && 'selected' in filter
}

function isDropdownFilter(filter: DataTableFilter): filter is DataTableDropdownFilter {
  return 'options' in filter && 'title' in filter
}

// Custom events

function onFilterChange(filter: DataTableFilter) {
  if (isButtonFilter(filter)) {
    filters.value?.button.forEach((f) => f.selected = (f.text === filter.text))
  }

  if (isDropdownFilter(filter)) {
    filters.value?.dropdown.forEach((f) => {
      if (f.title === filter.title && Array.isArray(f.options) && Array.isArray(filter.options)) {
        f.options.forEach((o) => {
          const match = filter.options?.find((fo) => fo.text === o.text && fo.selected)
          o.selected = !!match
        })
      }
    })
  }

  emit('update:filter', { filters: filters.value })
}

function setCurrentPage({ page, event }: { page: number | string; event: KeyboardEvent | MouseEvent }) {
  event.preventDefault()

  currentPage.value = typeof page === 'string' 
    ? Number(page) 
    : page

  emit('update:pagination', { 
    ...paginatorProps.value, 
    totalResults: totalResults.value,
    totalResultsPerPage: totalResultsPerPage.value
  })
}

function setPageSize(page: number) {
  currentPage.value = 1
  totalPages.value = Math.ceil(totalResults.value / page)
  totalResultsPerPage.value = page

  emit('update:pagination', { 
    ...paginatorProps.value, 
    totalResults: totalResults.value,
    totalResultsPerPage: totalResultsPerPage.value
  })
}
</script>