<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gray-900 text-white py-2 px-4 flex-shrink-0">
      <!-- @slot Header content. -->
      <slot name="header" />
    </header>
    <div class="flex flex-grow flex-shrink-0">
      <aside
        class="bg-gray-900 text-white"
        :style="{
          width: sidebarWidth,
          maxWidth: sidebarWidth,
          minWidth: sidebarWidth,
        }"
      >
        <div class="h-screen flex flex-col sticky top-0">
          <div
            class="overflow-y-auto flex-grow overscroll-contain"
            :class="{
              'mb-6': collapsed,
              'mb-10': !collapsed
            }"
          >
            <!-- @slot Sidebar content. @binding collapsed -->
            <slot
              name="sidebar"
              :collapsed="collapsed"
            />
          </div>
          <div class="flex-shrink-0 sticky bottom-0">
            <button
              id="btn-collapse-toggle"
              :title="
                collapsed ? 'Expand sidebar ( [ )' : 'Collapse sidebar ( [ )'
              "
              class="px-3 ml-auto border-transparent rounded-none tab tab-block tab-dark"
              :class="{ 'w-full': collapsed, 'w-auto': !collapsed }"
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
        </div>
      </aside>
      <section class="flex flex-col items-stretch flex-grow min-w-0">
        <main class="flex-grow pb-4 bg-gray-100">
          <div class="bg-white shadow p-4 sticky top-0 z-50">
            <!-- @slot Page top content. -->
            <slot name="page-top" />
          </div>
          <div class="p-4">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </main>
        <footer class="bg-gray-900 text-white">
          <!-- @slot Footer content. -->
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsLayoutAppInternal',
  props: {
    /**
     * The v-model that determines collapsed state.
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
  },
  emits: ['update:modelValue'],
  computed: {
    sidebarWidth() {
      return this.collapsed ? `${this.width.min}px` : `${this.width.max}px`;
    },
    collapsed: {
      get() {
        return this.modelValue;
      },
      set(val) {
        /**
         * Emmitted when modelValue changes.
         */
        this.$emit("update:modelValue", val);
      },
    },
  },
  mounted() {
    // Setup collapse functionality
    document.addEventListener("keyup", this.handleDocumentKeyUp);
  },
  unmounted() {
    document.removeEventListener("keyup", this.handleDocumentKeyUp);
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    handleDocumentKeyUp($event) {
      const tagName = $event.target.tagName.toLowerCase();
      if (tagName === "textarea") return;
      if (tagName === "input") return;
      // toggle collapse on "[" key
      if ($event.keyCode === 219) this.toggleCollapse();
    },
  }
})
</script>
