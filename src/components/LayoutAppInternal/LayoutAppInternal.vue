<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-grow flex-shrink-0">
      <aside
        class="bg-gray-900 text-white flex-shrink-0"
        :class="[sidebarWidth]"
      >
        <div class="h-screen flex flex-col sticky top-0">
          <div class="overflow-y-auto flex-grow overscroll-contain">
            <div
              v-if="appSuite || appName"
              class="sticky top-0 bg-gray-900 z-10"
            >
              <div
                class="px-4 py-2"
                :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
              >
                <p class="text-xl">
                  <span class="text-red-400 font-bold">{{ appSuitePrefix }}</span>
                  <span>{{ appSuite }}</span>
                </p>
              </div>
              <h1
                class="text-lg font-bold p-4"
                :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
              >
                {{ appName }}
              </h1>
            </div>
            <nav
              v-if="pageNav.length > 0"
              class="grid grid-cols-1"
            >
              <!-- @slot Nav content. @binding items, collapsed -->
              <slot
                name="sidebar-nav"
                :items="pageNav"
                :collapsed="collapsed"
              >
                <a
                  v-for="item in pageNav"
                  :key="item.id"
                  :href="item.href"
                  class="flex gap-2 px-4 py-2 hover:bg-gray-800 hover:text-white"
                  :class="{
                    'bg-gray-900 text-gray-100': !item.active,
                    'bg-gray-800 text-white': item.active
                  }"
                  @click="navigate(item, $event)"
                >
                  <span
                    class="inline-block"
                    v-html="item.title"
                  />
                  <span class="inline-block">
                    <span
                      v-if="item.badgeCount"
                      class="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-danger"
                    >{{ item.badgeCount }}</span>
                  </span>
                </a>
              </slot>
            </nav>
          </div>
          <div
            v-if="enableCollapsibleSidebar"
            class="flex-shrink-0 sticky bottom-0"
          >
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
          <div class="bg-gray-900 text-white px-4 py-2 flex h-10">
            <div class="ml-auto my-auto flex gap-2">
              <!-- @slot Suite header content. @binding collapsed -->
              <slot
                name="suite-header"
                :collapsed="collapsed"
              />
            </div>
          </div>
          <div class="bg-white shadow px-8 py-3 sticky top-0 z-50 flex gap-4 h-16">
            <div class="flex-grow my-auto">
              <p class="text-2xl font-semibold text-gray-700">
                {{ pageTitle }}
              </p>
            </div>
            <div class="flex-shrink-0 my-auto flex gap-2">
              <!-- @slot Page header content. @binding collapsed -->
              <slot
                name="page-header"
                :collapsed="collapsed"
              />
            </div>
          </div>
          <div class="p-8">
            <!-- @slot Page content. @binding collapsed -->
            <slot :collapsed="collapsed" />
          </div>
        </main>
        <footer class="bg-gray-900 text-xs text-light px-8 py-4 flex gap-4">
          <div class="flex-shrink flex">
            <sds-link
              href="https://sei.cmu.edu"
              title="Software Engineering Institute"
              class="my-auto"
              external
            >
              <img
                class="h-10"
                :src="wordmark"
                alt="Software Engineering Institute"
              >
            </sds-link>
          </div>
          <div class="flex-shrink flex ml-auto">
            <div class="my-auto">
              <p>&copy; {{ year }} Carnegie Mellon University</p>
              <p>SEI Internal Use Only</p>
            </div>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SdsLink from '../Link/Link.vue'
import wordmark from '../../assets/images/Software_Engineering_Institute_Unitmark_White.svg'

export default defineComponent({
  name: 'SdsLayoutAppInternal',
  components: {
    SdsLink
  },
  props: {
    /**
     * The v-model that determines collapsed state.
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * The width class of the sidebar, both min (collapsed) and max (expanded).
     */
    width: {
      type: Object,
      default: () => ({
        min: 'w-12',
        max: 'w-60',
      }),
    },
    /**
     * Determines whether to enable collapsing functionality.
     */
    enableCollapsibleSidebar: {
      type: Boolean,
      default: false
    },
    /**
     * The app suite name's prefix (styled in red) for the layout.
     */
    appSuitePrefix: { type: String, default: 'SEI' },
    /**
     * The app suite name for the layout.
     */
    appSuite: { type: String, default: null },
    /**
     * The app name for the layout.
     */
    appName: { type: String, default: null },
    /**
     * The page title for the layout.
     */
    pageTitle: { type: String, default: null },
    /**
     * The page navigation for the layout.
     */
    pageNav: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue', 'navigate'],
  computed: {
    wordmark() {
      return wordmark
    },
    year() {
      const d = new Date();
      return d.getFullYear();
    },
    sidebarWidth() {
      if (!this.enableCollapsibleSidebar) return this.width.max
      return this.collapsed ? this.width.min : this.width.max;
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
    navigate(item, event) {
      /**
       * Emmited when a navigation menu item has been clicked.
       *
       * Sends a payload of the clicked item and the click event: { item, event }
       */
      this.$emit('navigate', { item, event })
    },
    toggleCollapse() {
      if (!this.enableCollapsibleSidebar) {
        this.collapsed = false
      } else {
        this.collapsed = !this.collapsed;
      }
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
