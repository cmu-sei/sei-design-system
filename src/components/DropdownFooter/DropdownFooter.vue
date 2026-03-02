<template>
  <div
    data-id="sds-dropdown-footer"
    class="px-4 pt-2.5 pb-2 space-y-2"
    :class="{ 'border-t border-gray-100 dark:border-gray-700': divider }"
  >
    <!-- @slot Footer content (typically buttons). -->
    <slot />
  </div>
</template>

<script setup lang="ts">
interface DropdownFooterProps {
  /**
   * Whether to show a divider above the footer.
   */
  divider?: boolean;
}

defineOptions({
  name: 'SdsDropdownFooter'
})

withDefaults(defineProps<DropdownFooterProps>(), {
  divider: false
})
</script>
