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
        v-bind="{ ...$props.meta, ...$attrs }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SdsPaginator from '../Paginator/Paginator.vue'
import SdsTable from '../Table/Table.vue'

defineOptions({
  name: "SdsDataTable"
})

defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({})
  },
  meta: {
    type: Object,
    required: false,
    default: () => ({})
  }
})
</script>