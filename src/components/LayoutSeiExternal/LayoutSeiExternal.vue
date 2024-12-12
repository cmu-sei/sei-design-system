<template>
  <!-- To set a different root-level background/text color, override with the !important flag -->
  <div
    data-id="sds-layout-sei-external"
    class="flex flex-col justify-between w-full min-h-screen text-gray-900 bg-white"
  >
    <main>
      <!-- @slot Header content. -->
      <slot name="header">
        <layout-sei-external-header :page="page" />
      </slot>
      <section v-if="$slots.default">
        <template v-if="removeContentPadding">
          <!-- @slot Page content. -->
          <slot />
        </template>
        <template v-else>
          <div class="container p-4 mx-auto max-w-screen-xl md:p-8">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </template>
      </section>
    </main>
    <!-- @slot Footer content. -->
    <footer v-if="showFooter || $slots.footer">
      <slot name="footer" />
      <layout-sei-external-footer v-if="showFooter" />
    </footer>
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
