<template>
  <!-- To set a different root-level background/text color, override with the !important flag -->
  <div
    data-id="sds-brochure-site"
    class="sds-theme-plaid flex flex-col justify-between w-full min-h-screen text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100"
  >
    <main>
      <!-- @slot Header content. -->
      <slot name="header">
        <brochure-site-header
          :organization="organization"
          :nav="nav"
          :mobile-breakpoint="mobileBreakpoint"
        />
      </slot>
      <section v-if="$slots.default">
        <template v-if="removeContentPadding">
          <!-- @slot Page content. -->
          <slot />
        </template>
        <template v-else>
          <div class="container py-4 mx-auto md:py-8">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </template>
      </section>
    </main>
    <!-- @slot Footer content. -->
    <footer v-if="showFooter || $slots.footer">
      <slot name="footer" />
      <brochure-site-footer
        v-if="showFooter"
        :organization="organization"
        :nav="nav"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { MegaMenuItem } from '../MegaMenu/MegaMenu.vue'
import BrochureSiteHeader from "../BrochureSiteHeader/BrochureSiteHeader.vue";
import BrochureSiteFooter from "../BrochureSiteFooter/BrochureSiteFooter.vue";

defineOptions({
  name: "SdsBrochureSite",
});

interface BrochureSiteProps {
  /**
   * String matching the name of the organization to display in the header.
   */
  organization?: string;
  /**
   * An array of MegaMenuItem objects to display in the header navigation.
   */
  nav?: MegaMenuItem<Record<string, unknown>>[];
  /**
   * Removes the content padding from the default slot section.
   * Useful when you want to custom style the main content section.
   */
  removeContentPadding?: boolean;
  /**
   * Determines whether to show the footer section or not.
   */
  showFooter?: boolean;
  /**
   * The breakpoint at which the full MegaMenu is replaced by a hamburger menu and mobile panel.
   */
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

withDefaults(defineProps<BrochureSiteProps>(), {
  organization: "",
  nav: () => [],
  removeContentPadding: false,
  showFooter: false,
  mobileBreakpoint: 'xl',
});
</script>
