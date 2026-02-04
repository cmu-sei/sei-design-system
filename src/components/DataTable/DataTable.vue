<template>
  <div 
    data-id="sds-data-table"
    class="overflow-x-auto"
  >
    <div 
      v-if="props.filters"
      class="
      bg-white dark:bg-gray-950
        border border-b-0 border-gray-100 dark:border-gray-800 
        rounded-tl-lg rounded-tr-lg sds-theme-plaid:rounded-none
        min-h-14.5 w-full min-w-3xl
      "
    >
      <div class="overflow-x-auto px-2 py-4">
        <div class="flex flex-row flex-nowrap items-center gap-2 w-full min-w-3xl">
          <template v-if="filters?.button && filters.button.length">
            <SdsActionButton
              v-for="(filter, index) in filters.button"
              v-bind="{ ...actionButtonProps }"
              :key="index"
              :active="filter.selected"
              @click="onFilterChange(filter)"
            >
              <span>{{ filter.text }}</span>
            </SdsActionButton>
          </template>
        </div>
      </div>
    </div>
    <SdsTable 
      v-bind="{ ...tableProps, ...$attrs }"
      class="table-prose-td:align-middle w-full min-w-3xl"
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
        <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <SdsPaginatorRange 
            v-bind="{ ...paginatorRangeProps, ...$attrs }"
            class="w-full md:w-auto"
          />
          <SdsPaginator 
            v-bind="{ ...paginatorProps, ...$attrs }"
            @go-to-page="setCurrentPage"
          />
          <SdsPaginatorPageSizeDropdown
            v-model="totalResultsPerPage"
            :options="[...options]"
            class="justify-self-end"
            @update:model-value="setPageSize"
          >
            <template #label="{ selection }">
              {{ selection }} rows
            </template>
          </SdsPaginatorPageSizeDropdown>
        </div>
      </template>
    </SdsTable>
  </div>
</template>

<script lang="ts" setup>
import type { FilterByDropdownOption } from '../FilterByDropdown/FilterByDropdown.vue'
import type { PaginatorProps } from '../Paginator/Paginator.vue'
import type { TableProps } from '../Table/Table.vue'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsPaginatorPageSizeDropdown from '../PaginatorPageSizeDropdown/PaginatorPageSizeDropdown.vue'
import SdsPaginatorRange from '../PaginatorRange/PaginatorRange.vue'
import SdsTable from '../Table/Table.vue'

export interface DataTableButtonFilter {
  text: string;
  selected: boolean;
}

export interface DataTableDropdownFilter {
  title?: string;
  options?: FilterByDropdownOption[];
}

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

// Paginator page size dropdown options
const options = [
  { value: 10, text: '10' },
  { value: 25, text: '25' },
  { value: 50, text: '50' }
] as const

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
      : undefined
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

const actionButtonProps = computed<{
  kind: 'ghost' | 'primary' | 'secondary';
  variant: 'gray' | 'red' | 'blue' | 'white';
  size: 'xs' | 'sm' | 'md' | 'lg';
  type: 'button' | 'submit';
  selected: boolean;
}>(() => ({
  kind: 'ghost',
  variant: 'gray',
  size: 'xs',
  type: 'button',
  selected: false
}))

function onFilterChange(filter: DataTableButtonFilter) {
  if (!filters.value || !filters.value.button) return
  filters.value.button.forEach((f) => f.selected = (f.text === filter.text))

  emit('update:filter', { 
    filters: filters.value 
  });
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