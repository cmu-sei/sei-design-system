<template>
  <div
    class="block bg-white dark:bg-gray-800 dark:border-gray-700"
    :class="{
      border: type === 'simple' || type === 'raised',
      'shadow border rounded': type === 'raised',
    }"
  >
    <header
      v-if="!hideHeader"
      :class="{
        'border-b dark:border-gray-700':
          type === 'simple' || type === 'raised',
        'border-0 border-t-2 border-gray-900 dark:border-gray-100':
          type === 'accented',
      }"
    >
      <div
        class="flex px-4 py-3"
        :class="{ 'border-b border-gray-300': type === 'accented' }"
      >
        <div class="self-center flex-grow">
          <div
            v-if="hasTitleSlot"
            class="slot-title"
          >
            <slot name="title" />
          </div>
          <div
            v-if="hasSubtitleSlot"
            class="text-sm text-gray-500"
          >
            <slot name="subtitle" />
          </div>
        </div>
        <div
          v-if="hasNavSlot"
          class="flex items-stretch self-start justify-center ml-auto"
          :class="[navClass]"
        >
          <slot name="nav" />
        </div>
      </div>
    </header>
    <div
      v-if="!hideContent || hasDefaultSlot"
      :class="[contentClass]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'SdsSection',
  props: {
    /**
     * The overall look and feel of the section
     */
    type: {
      type: String,
      default: "",
    },
    /**
     * Determines if the header is hidden or shown
     */
    hideHeader: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines if the content is hidden or shown
     */
    hideContent: {
      type: Boolean,
      default: false,
    },
    /**
     * The class list for the nav slot
     */
    navClass: {
      type: String,
      default: "",
    },
    /**
     * The class list of the default slot
     */
    contentClass: {
      type: String,
      default: "p-4",
    },
  },
  computed: {
    hasTitleSlot() {
      return !!this.$slots.title;
    },
    hasSubtitleSlot() {
      return !!this.$slots.subtitle;
    },
    hasNavSlot() {
      return !!this.$slots.nav;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },
});
</script>
