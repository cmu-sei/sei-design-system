<template>
  <div 
    data-id="sds-data-table"
    class="overflow-x-auto"
  >
    <SdsTable 
      v-bind="{ ...$props.data, ...$attrs }"
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
    </SdsTable>
    <div 
      class="
        grid grid-cols-3 grid-rows-1 items-center gap-x-4 p-4 
        bg-gray-600/2 dark:bg-gray-400/2 
        border border-gray-100 dark:border-gray-800 
        rounded-bl-[7px] rounded-br-[7px]
      "
    >
      <p
        aria-live="polite" 
        aria-atomic="true"  
      >
        <span class="text-sm text-gray-800 dark:text-gray-600">
          Showing <span class="font-semibold">{{ start !== end ? `${start}-${end}` : start }}</span> of <span class="font-semibold">{{ total }}</span>
        </span>
      </p>
      <SdsPaginator 
        v-bind="{ ...paginatorProps, ...$attrs }"
        @go-to-page="setCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PaginatorProps } from '../Paginator/Paginator.vue'
import type { TableProps } from '../Table/Table.vue'
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsTable from '../Table/Table.vue'
import usePaginationRange from '../../composables/usePaginationRange'

defineOptions({
  name: "SdsDataTable"
})

const props = defineProps({
  data: {
    type: Object as PropType<TableProps>,
    required: false,
    default: () => ({})
  },
  pagination: {
    type: Object as PropType<PaginatorProps & { totalResultsPerPage: number; totalResults: number }>,
    required: false,
    default: () => ({})
  }
})

const emit = defineEmits(['update:pagination'])

const currentPage = ref(props.pagination?.currentPage ?? 1)
const totalResultsPerPage = ref(props.pagination?.totalResultsPerPage ?? 0)
const totalResults = ref(props.pagination?.totalResults ?? 0)
const totalPages = ref(props.pagination?.totalPages ?? 0)

const paginatorProps = computed(() => ({ 
  currentPage: currentPage.value, 
  totalPages: totalPages.value
}))

const { start, end, total } = usePaginationRange(
  currentPage,
  totalResultsPerPage,
  totalResults,
  totalPages
)

function setCurrentPage(
  { page, event }: { page: number | string; event: KeyboardEvent | MouseEvent }
) {
  event.preventDefault()

  currentPage.value = typeof page === 'string' 
    ? Number(page) 
    : page

  emit('update:pagination', { pagination: { ...paginatorProps.value } })
}
</script>