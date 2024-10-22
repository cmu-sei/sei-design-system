<template>
  <div
    data-id="sds-dropdown-header"
    class="[.dropdown-dark_&]:bg-gray-850 [.dropdown-dark_&]:text-gray-300 px-4 py-1 text-sm font-semibold leading-5 bg-white text-gray-500 dark:text-gray-300"
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
