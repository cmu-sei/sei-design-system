<template>
  <div data-id="sds-data-table">
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
        flex self-stretch justify-center items-center gap-x-4 
        border border-gray-100 dark:border-gray-800
        rounded-bl-[7px] rounded-br-[7px]
        bg-gray-600/2 dark:bg-gray-400/2
        p-4
      "
    >
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

defineOptions({
  name: "SdsDataTable"
})

const props = defineProps({
  data: {
    type: Object as PropType<TableProps>,
    required: false,
    default: () => ({})
  },
  paginator: {
    type: Object as PropType<PaginatorProps>,
    required: false,
    default: () => ({})
  }
})

const emit = defineEmits(['update:paginator'])

const currentPage = ref(props.paginator?.currentPage ?? 1)
const paginatorProps = computed(() => ({ ...props.paginator, currentPage: currentPage.value }))

const setCurrentPage = (
  { page, event }: { page: number | string; event: KeyboardEvent | MouseEvent }
) => {
  event.preventDefault()

  currentPage.value = typeof page === 'string' 
    ? Number(page) 
    : page

  emit('update:paginator', { paginator: { ...paginatorProps.value } })
}
</script>