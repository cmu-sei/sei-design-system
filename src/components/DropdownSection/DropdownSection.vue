<template>
  <div
    data-id="sds-dropdown-section"
    :class="[
      divider && !title ? 'border-b border-gray-100 dark:border-gray-700 pb-2' : '',
      divider && title ? 'border-t border-gray-100 dark:border-gray-700' : '',
      title ? 'px-2 pt-4 pb-2' : 'py-2'
    ]"
  >
    <span
      v-if="title"
      class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2"
      role="heading"
      aria-level="2"
    >
      {{ title }}
    </span>
    <div
      :class="[
        scrollable ? 'scroll-area' : '',
        scrollable && maxHeight ? '' : scrollable ? 'max-h-56' : ''
      ]"
      :style="scrollable && maxHeight ? { maxHeight } : undefined"
    >
      <ul
        v-if="!scrollable || title"
        class="flex flex-col"
      >
        <!-- @slot Dropdown section content (items). -->
        <slot />
      </ul>
      <template v-else>
        <!-- @slot Dropdown section content (items). -->
        <slot />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DropdownSectionProps {
  /**
   * Optional section header text.
   */
  title?: string;
  /**
   * Whether to show a divider for this section.
   */
  divider?: boolean;
  /**
   * Whether this section is scrollable.
   */
  scrollable?: boolean;
  /**
   * Max height when scrollable (e.g., '14rem', '200px').
   */
  maxHeight?: string;
}

defineOptions({
  name: 'SdsDropdownSection'
})

withDefaults(defineProps<DropdownSectionProps>(), {
  title: undefined,
  divider: false,
  scrollable: false,
  maxHeight: undefined
})
</script>
