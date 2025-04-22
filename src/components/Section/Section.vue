<template>
  <div
    data-id="sds-section"
    class="block bg-white dark:bg-gray-950"
    :class="{
      'rounded-theme-sm': type === 'simple',
      'border border-gray-200 dark:border-gray-800': type === 'simple' || type === 'raised',
      'shadow-md border rounded-theme-lg': type === 'raised',
    }"
  >
    <header
      v-if="!hideHeader"
      :class="{
        'border-b dark:border-gray-800':
          type === 'simple' || type === 'raised',
        'border-0 border-t-2 border-gray-900 dark:border-gray-600':
          type === 'accented',
      }"
    >
      <div
        class="flex px-4 py-3"
        :class="{ 'border-b border-gray-200 dark:border-gray-800': type === 'accented' }"
      >
        <div class="self-center grow">
          <div
            v-if="hasTitleSlot"
            class="slot-title"
          >
            <!-- @slot Section title content. -->
            <slot name="title" />
          </div>
          <div
            v-if="hasSubtitleSlot"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            <!-- @slot Section subtitle content. -->
            <slot name="subtitle" />
          </div>
        </div>
        <div
          v-if="hasNavSlot"
          class="flex items-stretch self-start justify-center ml-auto"
          :class="[navClass]"
        >
          <!-- @slot Section nav content. -->
          <slot name="nav" />
        </div>
      </div>
    </header>
    <div
      v-if="!hideContent && hasDefaultSlot"
      :class="[contentClass]"
    >
      <!-- @slot Section content. -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsSection'
})

defineProps({
  /**
   * Determines the overall look and feel of the section.
   */
  type: {
    type: String,
    default: "",
  },
  /**
   * Determines if the header is hidden or shown.
   */
  hideHeader: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines if the content is hidden or shown.
   */
  hideContent: {
    type: Boolean,
    default: false,
  },
  /**
   * The class list for the nav slot.
   */
  navClass: {
    type: String,
    default: "",
  },
  /**
   * The class list of the default slot.
   */
  contentClass: {
    type: String,
    default: "p-4",
  },
})

const slots = defineSlots<{
  default: () => unknown
  title: () => unknown
  subtitle: () => unknown
  nav: () => unknown
  footer: () => unknown
}>()

const hasTitleSlot = computed(() => {
  return !!slots.title;
})

const hasSubtitleSlot = computed(() => {
  return !!slots.subtitle;
})

const hasNavSlot = computed(() => {
  return !!slots.nav;
})

const hasDefaultSlot = computed(() => {
  return !!slots.default;
})
</script>
