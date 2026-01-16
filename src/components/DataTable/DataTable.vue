<template>
  <div 
    data-id="sds-data-table"
    class="overflow-x-auto"
  >
    <SdsTable 
      v-bind="{ ...tableProps, ...$attrs }"
      class="rounded-bl-none rounded-br-none"
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
        flex flex-row flex-nowrap justify-between items-center gap-x-4 p-4 
        w-full overflow-x-auto
        bg-gray-600/2 dark:bg-gray-400/2 
        border border-t-0 border-gray-100 dark:border-gray-800 
        rounded-bl-[7px] rounded-br-[7px]
      "
    >
      <SdsPaginatorRange v-bind="{ ...paginatorRangeProps, ...$attrs }" />
      <SdsPaginator 
        v-bind="{ ...paginatorProps, ...$attrs }"
        @go-to-page="setCurrentPage"
      />
      <SdsPaginatorPageSizeDropdown
        v-model="totalResultsPerPage"
        :options="[...options]"
        class="justify-self-end"
        @update:model-value="setPageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PaginatorProps } from '../Paginator/Paginator.vue'
import type { TableProps } from '../Table/Table.vue'
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsPaginatorPageSizeDropdown from '../PaginatorPageSizeDropdown/PaginatorPageSizeDropdown.vue'
import SdsPaginatorRange from '../PaginatorRange/PaginatorRange.vue'
import SdsTable from '../Table/Table.vue'

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

const options = [
  { value: 10, text: '10' },
  { value: 25, text: '25' },
  { value: 50, text: '50' }
] as const

const currentPage = ref(props.pagination?.currentPage ?? 1)
const totalResultsPerPage = ref(props.pagination?.totalResultsPerPage ?? 0)
const totalResults = ref(props.pagination?.totalResults ?? 0)
const totalPages = ref(props.pagination?.totalPages ?? 0)

const tableProps = computed(() => ({ 
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