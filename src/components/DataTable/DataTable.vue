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
        v-if="hasFilters || hasFilterSearch"
        class="overflow-x-auto px-2 py-4"
      >
        <div class="flex flex-row flex-nowrap items-center gap-2 relative min-h-7.5 w-full min-w-full">
          <template 
            v-for="(filter, filterIndex) in filters"
            :key="filterIndex"
          >
            <template v-if="isSegmentFilter(filter)">
              <SdsActionButton
                v-for="(segment, segmentIndex) in filter.segments"
                :key="`${filterIndex}-${segmentIndex}`"
                :active="segment.selected"
                kind="ghost"
                variant="gray"
                size="xs"
                type="button"
                @click="onFilterChange(filter.key, segment)"
              >
                <span>{{ segment.label }}</span>
              </SdsActionButton>
            </template>
            <SdsFilterByDropdown
              v-else-if="isDropdownFilter(filter)"
              v-model="filter.options"
              :title="filter.label ?? undefined"
              :disabled="filter.disabled ?? undefined"
              :enable-filter="true"
              kind="ghost"
              variant="gray"
              size="xs"
              @update:model-value="onFilterChange(filter.key)"
            />
          </template>
          <SdsActionButton
            v-if="hasActiveFilters"
            kind="ghost"
            variant="gray"
            size="xs"
            type="button"
            @click="clearFilters"
          >
            <IconFa7SolidFilterCircleXmark class="h-4 w-4" />
            <span>Clear filters</span>
          </SdsActionButton>
          <div 
            v-if="hasFilterSearch"
            class="flex flex-row items-center justify-end gap-4 transition-all duration-200 ease-in-out"
            :class="{
              'w-auto ml-auto': !isFilterSearchActive && !isFilterSearchClosing,
              'absolute z-10 w-full min-w-full left-0': isFilterSearchActive || isFilterSearchClosing
            }"
          >
            <Transition
              enter-active-class="transition-all duration-200 ease-in-out"
              leave-active-class="transition-all duration-200 ease-in-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <SdsActionButton
                v-if="!isFilterSearchActive && !isFilterSearchClosing"
                kind="secondary"
                variant="gray"
                size="sm"
                type="button"
                @click="() => isFilterSearchActive = true"
              >
                <IconFa7SolidMagnifyingGlass class="h-4 w-4" />
                <span>Filter</span>
              </SdsActionButton>
            </Transition>
            <Transition
              enter-active-class="transition-all duration-200 ease-in-out"
              leave-active-class="transition-all duration-300 ease-in-out"
              enter-from-class="opacity-0 scale-x-0"
              enter-to-class="opacity-100 scale-x-100"
              leave-from-class="opacity-100 scale-x-100"
              leave-to-class="opacity-0 scale-x-0"
            >
              <div
                v-if="isFilterSearchActive"
                class="flex-1 origin-right"
              >
                <SdsComboBox
                  :autofocus="true"
                  :pending="false"
                  size="sm"
                  class="w-full"
                />
              </div>
            </Transition>
            <Transition
              enter-active-class="transition-all duration-200 ease-in-out"
              leave-active-class="transition-all duration-300 ease-in-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
              @after-leave="onFilterSearchClosed"
            >
              <SdsActionButton
                v-if="isFilterSearchActive"
                kind="secondary"
                variant="gray"
                size="sm"
                type="button"
                @click="closeFilterSearch"
              >
                <span>Cancel</span>
              </SdsActionButton>
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto max-w-full">
      <SdsTable 
        v-if="tableProps.items && tableProps.items.length"
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
      <template v-else>
        <div 
          class="
            bg-white dark:bg-gray-950 
            border border-t-0 border-gray-100 dark:border-gray-800 
            rounded-bl-lg rounded-br-lg sds-theme-plaid:rounded-none 
            flex flex-col items-center justify-center px-2 pt-4 pb-8
          "
        >
          <svg 
            class="mb-2"
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <mask 
              id="mask0_9148_72736" 
              style="mask-type:alpha" 
              maskUnits="userSpaceOnUse" 
              x="0" 
              y="0" 
              width="40" 
              height="40"
            >
              <rect 
                width="40" 
                height="40" 
                fill="#D9D9D9"
              />
            </mask>
            <g mask="url(#mask0_9148_72736)">
              <path 
                d="M18.7466 22.7786C19.8791 22.7786 20.8342 22.3911 21.612 21.6161C22.3898 20.8414 22.7786 19.8877 22.7786 18.7549C22.7786 17.6224 22.3911 16.6673 21.6161 15.8895C20.8414 15.1117 19.8877 14.7228 18.7549 14.7228C17.6224 14.7228 16.6673 15.1103 15.8895 15.8853C15.1117 16.66 14.7228 17.6138 14.7228 18.7466C14.7228 19.8791 15.1103 20.8342 15.8853 21.612C16.66 22.3898 17.6138 22.7786 18.7466 22.7786ZM26.7924 28.7787L22.4453 24.4311C21.8525 24.8109 21.2436 25.0934 20.6186 25.2786C19.9936 25.4636 19.3753 25.5561 18.7636 25.5561C16.8753 25.5561 15.2668 24.8918 13.9382 23.5632C12.6096 22.2346 11.9453 20.6305 11.9453 18.7507C11.9453 16.871 12.6096 15.2668 13.9382 13.9382C15.2668 12.6096 16.871 11.9453 18.7507 11.9453C20.6305 11.9453 22.2346 12.6096 23.5632 13.9382C24.8918 15.2668 25.5561 16.8753 25.5561 18.7636C25.5561 19.3753 25.4567 19.9936 25.2578 20.6186C25.0586 21.2436 24.7692 21.8525 24.3895 22.4453L28.7786 26.8341L26.7924 28.7787Z" 
                fill="#007CBA"
              />
            </g>
            <mask 
              id="mask1_9148_72736" 
              style="mask-type:alpha" 
              maskUnits="userSpaceOnUse" 
              x="0" 
              y="0" 
              width="40" 
              height="40"
            >
              <rect 
                width="40" 
                height="40" 
                fill="#D9D9D9"
              />
            </mask>
            <g mask="url(#mask1_9148_72736)">
              <path 
                d="M7.77792 35C7.02792 35 6.37736 34.7246 5.82625 34.1738C5.27542 33.6226 5 32.9721 5 32.2221V25.2221H7.77792V32.2221H14.7779V35H7.77792ZM25.2221 35V32.2221H32.2221V25.2221H35V32.2221C35 32.9721 34.7246 33.6226 34.1738 34.1738C33.6226 34.7246 32.9721 35 32.2221 35H25.2221ZM5 14.7779V7.77792C5 7.02792 5.27542 6.37736 5.82625 5.82625C6.37736 5.27542 7.02792 5 7.77792 5H14.7779V7.77792H7.77792V14.7779H5ZM32.2221 14.7779V7.77792H25.2221V5H32.2221C32.9721 5 33.6226 5.27542 34.1738 5.82625C34.7246 6.37736 35 7.02792 35 7.77792V14.7779H32.2221Z" 
                fill="#B2D8EA"
              />
            </g>
          </svg>
          <p class="flex flex-col justify-center items-center gap-y-1 w-full">
            <span class="block text-black dark:text-white font-semibold text-lg">No Results</span>
            <span class="block text-gray-600 dark:text-gray-400 text-sm">
              There are no results you can view.
            </span>
          </p>
          <p class="mt-4">
            <SdsButton
              kind="primary"
              variant="blue"
              size="sm"
              @click="clearFilters"
            >
              <span>Clear filters</span>
            </SdsButton>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FilterByDropdownOption } from '../FilterByDropdown/FilterByDropdown.vue'
import type { PaginatorProps } from '../Paginator/Paginator.vue'
import type { TableProps } from '../Table/Table.vue'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsActionDropdown from '../ActionDropdown/ActionDropdown.vue'
import SdsComboBox from '../ComboBox/ComboBox.vue'
import SdsFilterByDropdown from '../FilterByDropdown/FilterByDropdown.vue'
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsPaginatorRange from '../PaginatorRange/PaginatorRange.vue'
import SdsTable from '../Table/Table.vue'

export type DataTableFilterType = 'segment' | 'dropdown';

export interface DataTableSegments {
  label: string;
  selected: boolean;
}

export interface DataTableFilterConfig {
  key: string; // Property to filter on: e.g. "status", etc.
  label: string; // Display name for the filter: e.g. "Status", etc.
  disabled?: boolean; // Determines whether the filter is disabled
  type: DataTableFilterType; // Render as buttons or dropdowns
  segments?: DataTableSegments[]; // For segmented controls
  options?: FilterByDropdownOption[]; // For dropdowns
}

interface DataTableProps {
  data?: TableProps;
  pagination?: PaginatorProps & { 
    totalResultsPerPage: number; 
    totalResults: number; 
  };
  filters?: DataTableFilterConfig[];
  filterSearch?: boolean;
}

defineOptions({
  name: 'SdsDataTable'
})

const props = withDefaults(defineProps<DataTableProps>(), {
  data: undefined,
  pagination: undefined,
  filters: undefined,
  filterSearch: undefined
})

const emit = defineEmits(['update:filters', 'update:pagination'])

const filters = ref<DataTableFilterConfig[] | undefined>(
  props.filters && Array.isArray(props.filters)
    ? props.filters.map((f) => ({ 
      ...f,
      segments: f.segments ? [{ label: 'All', selected: true }, ...f.segments] : undefined,
      options: f.options ? [...f.options] : undefined
    })) 
    : undefined
)

const isFilterSearchActive = ref(false)
const isFilterSearchClosing = ref(false)

const tableProps = computed(() => ({
  items: [],
  fields: [],
  ...props.data
}))

const paginatorProps = computed(() => ({
  currentPage: props.pagination?.currentPage ?? 1,
  totalPages: props.pagination?.totalPages ?? 0
}))

const paginatorRangeProps = computed(() => ({
  currentPage: props.pagination?.currentPage ?? 1,
  totalResultsPerPage: props.pagination?.totalResultsPerPage ?? 0,
  totalResults: props.pagination?.totalResults ?? 0,
  totalPages: props.pagination?.totalPages ?? 0
}))

const options = computed(() => [
  { value: 10, text: '10' },
  { value: 25, text: '25' },
  { value: 50, text: '50' }
])

const totalRowsPerPage = computed(() => `${props.pagination?.totalResultsPerPage ?? 0} rows`)

const hasFilters = computed(() => {
  const { filters } = props
  return !!(filters && filters.length)
})

const hasFilterSearch = computed(() => !!props.filterSearch)

const hasActiveFilters = computed(() => {
  if (!filters.value) return false
  return filters.value.some((filter) => {
    if (isSegmentFilter(filter)) {
      // Check if any segment other than "All" (first) is selected
      return filter.segments.some((segment, index) => 
        index !== 0 && segment.selected
      )
    } else if (isDropdownFilter(filter)) {
      // Check if any options are selected
      return filter.options.some((option) => option.selected)
    }
    return false
  })
})

function isSegmentFilter(filter: DataTableFilterConfig): filter is DataTableFilterConfig & { type: 'segment'; segments: DataTableSegments[] } {
  return filter.type === 'segment' && Array.isArray(filter.segments) && filter.segments.length > 0
}

function isDropdownFilter(filter: DataTableFilterConfig): filter is DataTableFilterConfig & { type: 'dropdown'; options: FilterByDropdownOption[] } {
  return filter.type === 'dropdown' && Array.isArray(filter.options) && filter.options.length > 0
}

function clearFilters() {
  if (filters.value) {
    filters.value.forEach((filter) => {
      if (isSegmentFilter(filter)) {
        // Set "All" (first segment) to selected, or true, and the rest to false
        filter.segments.forEach((segment, index) => {
          segment.selected = index === 0
        })
      } else if (isDropdownFilter(filter)) {
        // Set all options (selected) to false
        filter.options.forEach((option) => {
          option.selected = false
        })
      }
    })
  }

  emit('update:filters', filters.value)
}

function onFilterChange(filterKey: string, segment?: DataTableSegments) {
  if (!filters.value) return

  const filter = filters.value.find((f) => f.key === filterKey)
  if (!filter) return

  if (isSegmentFilter(filter) && segment) {
    // Set clicked segment to selected and all others to false
    filter.segments.forEach((s) => {
      s.selected = s.label === segment.label
    })
  }

  // For dropdown filters, options are already updated via v-model. Just emit!

  emit('update:filters', filters.value)
}

function setCurrentPage({ page, event }: { page: number | string; event: KeyboardEvent | MouseEvent }) {
  event.preventDefault()
  const newPage = typeof page === 'string' ? Number(page) : page
  emit('update:pagination', {
    ...paginatorProps.value,
    currentPage: newPage,
    totalResults: props.pagination?.totalResults ?? 0,
    totalResultsPerPage: props.pagination?.totalResultsPerPage ?? 0
  })
}

function setPageSize(page: number) {
  emit('update:pagination', {
    ...paginatorProps.value,
    currentPage: 1,
    totalResults: props.pagination?.totalResults ?? 0,
    totalResultsPerPage: page
  })
}

function closeFilterSearch() {
  isFilterSearchClosing.value = true
  isFilterSearchActive.value = false
}

function onFilterSearchClosed() {
  isFilterSearchClosing.value = false
}
</script>