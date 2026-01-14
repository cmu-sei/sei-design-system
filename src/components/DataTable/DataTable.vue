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
    <div>
      <SdsPaginator 
        v-bind="{ ...$props.paginator, ...$attrs }"
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

defineProps({
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
</script>