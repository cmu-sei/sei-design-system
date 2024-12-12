<template>
  <div
    data-id="sds-layout-sei-external"
    class="flex flex-col relative w-full min-h-screen text-gray-900 bg-white"
  >
    <!-- @slot Header content. -->
    <slot name="header">
      <layout-sei-external-header :page="page" />
    </slot>
    <main v-if="$slots.default">
      <template v-if="removeContentPadding">
        <!-- @slot Page content. -->
        <slot />
      </template>
      <template v-else>
        <div class="container p-4 mx-auto md:p-8">
          <!-- @slot Page content. -->
          <slot />
        </div>
      </template>
    </main>
    <!-- @slot Footer content. -->
    <slot
      v-if="showFooter"
      name="footer"
      class="absolute bottom-0"
    >
      <layout-sei-external-footer />
    </slot>
  </div>
</template>

<script setup lang="ts">
import LayoutSeiExternalHeader from "../LayoutSeiExternalHeader/LayoutSeiExternalHeader.vue";
import LayoutSeiExternalFooter from "../LayoutSeiExternalFooter/LayoutSeiExternalFooter.vue";

defineOptions({
  name: 'SdsLayoutSeiExternal'
})

defineProps({
  /**
   * An object containing various properties that display in the header
   */
  page: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Removes the content padding from the default slot section.
   * Useful when you want to custom style the main content section.
   */
  removeContentPadding: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether to show the footer section or not.
   */
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>
