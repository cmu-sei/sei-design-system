<template>
  <div class="flex flex-col w-full min-h-screen text-gray-900 bg-white">
    <slot name="header">
      <layout-sei-external-header :page="page" />
    </slot>
    <slot
      v-if="showMasthead"
      name="masthead"
    >
      <layout-sei-external-masthead :page="page" />
    </slot>
    <main class="flex-grow">
      <div
        :class="{
          'bg-gray-50': showMasthead,
        }"
      >
        <template v-if="removeContentPadding">
          <slot />
        </template>
        <template v-else>
          <div class="container p-4 mx-auto md:p-8">
            <slot />
          </div>
        </template>
      </div>
    </main>
    <layout-sei-external-footer />
  </div>
</template>

<script>
import LayoutSeiExternalHeader from "../LayoutSeiExternalHeader/LayoutSeiExternalHeader.vue";
import LayoutSeiExternalFooter from "../LayoutSeiExternalFooter/LayoutSeiExternalFooter.vue";
import LayoutSeiExternalMasthead from "../LayoutSeiExternalMasthead/LayoutSeiExternalMasthead.vue";

export default {
  name: 'SdsLayoutSeiExternal',
  components: {
    LayoutSeiExternalHeader,
    LayoutSeiExternalFooter,
    LayoutSeiExternalMasthead,
  },
  props: {
    /**
     * An object containing various properties that display in the header and masthead.
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
     * Determines whether to show the masthead section or not.
     */
    showMasthead: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
