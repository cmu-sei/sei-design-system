<template>
  <div
    data-id="sds-dropdown-header"
    class="px-4 py-1 text-sm font-semibold leading-5 bg-white text-gray-500 [.dropdown-dark_&]:bg-gray-950 [.dropdown-dark_&]:text-gray-300 dark:bg-gray-950 dark:text-gray-300"
  >
    <!-- @slot Dropdown header content. -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsDropdownHeader',
})
</script>
