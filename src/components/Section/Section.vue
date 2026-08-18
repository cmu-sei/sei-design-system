<template>
  <div
    data-id="sds-section"
    class="block bg-white dark:bg-gray-950"
    :class="{
      'border border-gray-100 dark:border-gray-900': type === 'simple' || type === 'raised',
      'rounded-theme-lg shadow-sm': type === 'simple',
      'rounded-theme-xl shadow-lg': type === 'raised',
    }"
  >
    <header
      v-if="!hideHeader"
      :class="{
        'border-b border-gray-100 dark:border-gray-900':
          type === 'simple' || type === 'raised',
        'border-0 border-t-2 border-gray-900 dark:border-gray-600':
          type === 'accented',
      }"
    >
      <div
        class="flex px-4 py-3"
        :class="{ 'border-b border-gray-100 dark:border-gray-900': type === 'accented' }"
      >
        <div class="self-center grow">
          <div
            v-if="hasTitle"
            class="slot-title uppercase font-semibold"
          >
            <!-- @slot Section title content. -->
            <slot name="title">
              {{ props.title }}
            </slot>
          </div>
          <div
            v-if="hasSubtitle"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            <!-- @slot Section subtitle content. -->
            <slot name="subtitle">
              {{ props.subtitle }}
            </slot>
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
interface SectionProps {
  /**
   * The title of the section.
   */
  title?: string;
  /**
   * The subtitle of the section.
   */
  subtitle?: string;
  /**
   * Determines the overall look and feel of the section.
   */
  type?: 'simple' | 'raised' | 'accented';
  /**
   * Determines if the header is hidden or shown.
   */
  hideHeader?: boolean;
  /**
   * Determines if the content is hidden or shown.
   */
  hideContent?: boolean;
  /**
   * The class list for the nav slot.
   */
  navClass?: string;
  /**
   * The class list of the default slot.
   */
  contentClass?: string;
}

defineOptions({
  name: 'SdsSection'
})

const props = withDefaults(defineProps<SectionProps>(), {
  title: undefined,
  subtitle: undefined,
  type: undefined,
  hideHeader: false,
  hideContent: false,
  navClass: undefined,
  contentClass: 'p-4'
})

const slots = defineSlots<{
  default: () => unknown
  title: () => unknown
  subtitle: () => unknown
  nav: () => unknown
  footer: () => unknown
}>()

const hasTitle = computed(() => {
  return !!slots.title || !!props.title;
})

const hasSubtitle = computed(() => {
  return !!slots.subtitle || !!props.subtitle;
})

const hasNavSlot = computed(() => {
  return !!slots.nav;
})

const hasDefaultSlot = computed(() => {
  return !!slots.default;
})
</script>
