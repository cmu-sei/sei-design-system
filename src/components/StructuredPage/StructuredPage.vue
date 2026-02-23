<template>
  <div
    data-id="sds-structured-page"
    class="flex flex-col w-full min-h-screen"
  >
    <header
      v-if="hasHeaderSlot"
      class="z-30 shrink"
      :class="{ 'sticky top-0 shadow-sm': stickyHeader }"
    >
      <!-- @slot Header content. -->
      <slot name="header" />
    </header>
    <main class="grow">
      <!-- @slot Page content. -->
      <slot />
    </main>
    <footer
      v-if="hasFooterSlot"
      class="z-20 shrink"
      :class="{ 'sticky bottom-0 shadow-sm': stickyFooter }"
    >
      <!-- @slot Footer content. -->
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
interface StructuredPageProps {
  /**
   * Determines whether to make the header sticky or not.
   */
  stickyHeader?: boolean;
  /**
   * Determines whether to make the footer sticky or not.
   */
  stickyFooter?: boolean;
}

defineOptions({
  name: 'SdsStructuredPage'
})

withDefaults(defineProps<StructuredPageProps>(), {
  stickyHeader: false,
  stickyFooter: false
})

const slots = defineSlots<{
  default: () => unknown
  header: () => unknown
  footer: () => unknown
}>()

const hasHeaderSlot = computed<boolean>(() => {
  return !!slots.header;
})

const hasFooterSlot = computed<boolean>(() => {
  return !!slots.footer;
})
</script>
