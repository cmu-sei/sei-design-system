<template>
  <div data-id="sds-sort-by-dropdown" />
</template>

<script lang="ts" setup>
export interface SortByDropdownOption {
  id: number | string;
}

export type SortByDropdownPlacement = 'auto' | 'top' | 'right' | 'bottom-start'

defineOptions({
  name: "SdsSortByDropdown"
})
</script>