<template>
  <div class="flex flex-col h-full sds-layout-fixed-sidebar">
    <!-- @slot Header content. -->
    <slot name="header" />
    <div class="flex flex-grow flex-shrink-0">
      <aside
        v-if="hasSidebarSlot"
        :style="{
          width: sidebarWidth,
          maxWidth: sidebarWidth,
          minWidth: sidebarWidth,
        }"
        :class="[sidebarClass]"
      >
        <div
          ref="fixed"
          :class="{ fixed }"
          :style="{
            top: `${topOffset}px`,
            bottom: 0,
            left: 0,
            width: sidebarWidth,
            maxWidth: sidebarWidth,
            minWidth: sidebarWidth,
          }"
          class="z-50 h-full overflow-y-auto bg-gray-900 border-r shadow sidebar-menu dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex">
            <div class="flex-col flex-auto pb-16">
              <!-- @slot Sidebar content. -->
              <slot name="sidebar" />
            </div>
          </div>
        </div>
        <!-- Bottom collapse btn -->
        <div
          class="fixed bottom-0 left-0 z-50 bg-gray-900 border-t border-gray-600 collapse-container dark:bg-gray-800 dark:border-gray-700"
          :style="{
            width: sidebarCollapseWidth,
            maxWidth: sidebarCollapseWidth,
            minWidth: sidebarCollapseWidth,
          }"
        >
          <button
            id="btn-collapse-toggle"
            :title="
              collapsed ? 'Expand sidebar ( [ )' : 'Collapse sidebar ( [ )'
            "
            class="w-auto px-2 ml-auto border-transparent rounded-none tab tab-block tab-dark"
            :class="{ 'w-full': collapsed, 'px-3': !collapsed }"
            @click="toggleCollapse"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="collapsed"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </aside>
      <section class="flex flex-col items-stretch flex-grow">
        <!-- @slot Page content. -->
        <slot />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import debounce from "../../helpers/debounce";

/**
 * THIS COMPONENT IS DEPRECATED and marked for DELETION.
 */

export default defineComponent({
  name: 'SdsLayoutFixedSidebar',
  props: {
    /**
     * The v-model that determines open/closed state.
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * The width of the sidebar, both min (collapsed) and max (expanded).
     */
    width: {
      type: Object,
      default: () => ({
        min: 50,
        max: 250,
      }),
    },
    /**
     * Determines the top offset of the sidebar.
     * Helpful when you have a header above the the sidebar.
     */
    topOffset: {
      type: Number,
      default: 0,
    },
    /**
     * A class list for the sidebar.
     */
    sidebarClass: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      debouncedSetElTop: null as null | EventListener,
      fixed: false,
      elTop: 0,
    };
  },
  computed: {
    hasSidebarSlot() {
      return !!this.$slots.sidebar;
    },
    sidebarWidth() {
      return this.collapsed ? `${this.width.min}px` : `${this.width.max}px`;
    },
    sidebarCollapseWidth() {
      return this.collapsed
        ? `${this.width.min - 1}px`
        : `${this.width.max - 1}px`;
    },
    collapsed: {
      get() {
        return this.modelValue;
      },
      set(val: boolean) {
        /**
         * Emmitted when modelValue changes.
         */
        this.$emit("update:modelValue", val);
      },
    },
  },
  mounted() {
    // Setup collapse and fixedness functionalities
    document.addEventListener("keyup", this.handleDocumentKeyUp);
    window.addEventListener("scroll", this.handleFixedSidebar);

    this.debouncedSetElTop = debounce(this.setElTop, 50);
    window.addEventListener("resize", this.debouncedSetElTop);

    this.$nextTick(() => {
      this.setElTop();
    });
  },
  unmounted() {
    document.removeEventListener("keyup", this.handleDocumentKeyUp);
    window.removeEventListener("scroll", this.handleFixedSidebar);
    window.removeEventListener("resize", (this.debouncedSetElTop as EventListener));
  },
  methods: {
    setElTop() {
      if (typeof this.$refs.fixed !== "undefined") {
        // The fixed data attribute sets position: fixed.
        // We need position: relative to calculate the true
        // elTop, so we set fixed to false
        this.fixed = false;
        setTimeout(() => {
          this.elTop =
            (this.$refs.fixed as HTMLElement).getBoundingClientRect().top + window.pageYOffset;
          this.handleFixedSidebar();
        }, 0);
      }
    },
    async toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    handleDocumentKeyUp($event: KeyboardEvent) {
      const tagName = $event.target && ($event.target as HTMLElement).tagName.toLowerCase();
      if (tagName === "textarea") return;
      if (tagName === "input") return;
      // toggle collapse on "[" key
      if ($event.key === '[') this.toggleCollapse();
    },
    handleFixedSidebar() {
      const distanceFromTop = this.elTop - this.topOffset - window.pageYOffset;
      this.fixed = distanceFromTop <= 0;
    },
  },
});
</script>
