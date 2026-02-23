<template>
  <!-- To set a different root-level background/text color, override with the !important flag -->
  <div
    data-id="sds-brochure-site"
    class="flex flex-col justify-between w-full min-h-screen text-gray-900 bg-white"
  >
    <main>
      <!-- @slot Header content. -->
      <slot name="header">
        <brochure-site-header :page="page" />
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
      <brochure-site-footer v-if="showFooter" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import BrochureSiteHeader from "../BrochureSiteHeader/BrochureSiteHeader.vue";
import BrochureSiteFooter from "../BrochureSiteFooter/BrochureSiteFooter.vue";

interface BrochureSiteProps {
  /**
   * An object containing various properties that display in the header
   */
  page?: Record<string, unknown>;
  /**
   * Removes the content padding from the default slot section.
   * Useful when you want to custom style the main content section.
   */
  removeContentPadding?: boolean;
  /**
   * Determines whether to show the footer section or not.
   */
  showFooter?: boolean;
}

defineOptions({
  name: 'SdsBrochureSite'
})

withDefaults(defineProps<BrochureSiteProps>(), {
  page: () => ({}),
  removeContentPadding: false,
  showFooter: false
})
</script>
