<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-grow flex-shrink-0">
      <!-- Mobile sidebar close section -->
      <transition
        enter-active-class="transition-opacity ease-linear duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="showMobileMenu"
          class="bg-black bg-opacity-40 fixed inset h-screen w-screen z-50 md:hidden"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span class="sr-only">Toggle mobile menu</span>
        </button>
      </transition>

      <!-- Mobile sidebar -->
      <transition
        enter-active-class="transition-transform ease-linear duration-150"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform ease-linear duration-150"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="showMobileMenu"
          ref="mobileSidebarContainer"
          class="md:hidden fixed w-2/3 z-50 bg-gray-900 text-white flex-shrink-0"
          @keydown="checkKeyEvent"
        >
          <button
            ref="mobileMenuCloseBtn"
            class="sr-only"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="sr-only">Toggle mobile menu</span>
          </button>
          <div class="h-screen flex flex-col sticky top-0">
            <div class="overflow-y-auto flex-grow overscroll-contain">
              <div
                v-if="appName"
                class="sticky top-0 bg-gray-900 z-10"
              >
                <p class="text-lg font-bold p-4">
                  {{ appName }}
                </p>
              </div>
              <nav
                v-if="pageNav.length > 0"
                class="grid grid-cols-1"
              >
                <!-- @slot Nav content. @binding items, collapsed -->
                <slot
                  name="sidebar-navigation"
                  :items="pageNav"
                  :collapsed="collapsed"
                >
                  <a
                    v-for="item in pageNav"
                    :key="item.id"
                    :href="item.href"
                    class="flex gap-2 px-4 py-2 border-l-4"
                    :class="{
                      'border-transparent bg-gray-900 text-gray-100 hover:bg-gray-800 hover:text-white': !item.active,
                      'text-white border-danger pointer-events-none': item.active
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
          </div>
        </aside>
      </transition>

      <!-- Desktop sidebar -->
      <aside
        class="hidden md:block bg-gray-900 text-white flex-shrink-0"
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
              <p
                class="text-lg font-bold p-4"
                :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
              >
                {{ appName }}
              </p>
            </div>
            <nav
              v-if="pageNav.length > 0"
              class="grid grid-cols-1"
            >
              <!-- @slot Nav content. @binding items, collapsed -->
              <slot
                name="sidebar-navigation"
                :items="pageNav"
                :collapsed="collapsed"
              >
                <a
                  v-for="item in pageNav"
                  :key="item.id"
                  :href="item.href"
                  class="flex gap-2 px-4 py-2 border-l-4"
                  :class="{
                    'border-transparent bg-gray-900 text-gray-100 hover:bg-gray-800 hover:text-white': !item.active,
                    'text-white border-danger pointer-events-none': item.active
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

      <!-- Main content -->
      <section class="flex flex-col items-stretch flex-grow min-w-0">
        <main class="flex-grow pb-4 bg-gray-100">
          <div class="bg-gray-900 text-white px-4 py-2 flex h-10">
            <button
              ref="mobileMenuOpenBtn"
              class="flex gap-2 md:hidden -ml-1 focus:outline-none"
              @click="showMobileMenu = !showMobileMenu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="text-white h-6 w-6 inline-block"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 48 48"
              ><g
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M7.95 11.95h32" /><path d="M7.95 23.95h32" /><path d="M7.95 35.95h32" /></g></svg>
              <span class="text-xl leading-6">
                <span
                  v-if="appSuitePrefix"
                  class="text-red-400 font-bold"
                >{{ appSuitePrefix }}</span>
                <span v-if="appSuite">{{ appSuite }}</span>
              </span>
            </button>
            <div class="ml-auto my-auto flex gap-2">
              <!-- @slot Suite header content. @binding collapsed -->
              <slot
                name="suite-header"
                :collapsed="collapsed"
              />
            </div>
          </div>
          <div class="bg-white shadow px-4 py-3 sticky top-0 z-40 flex gap-4 h-16">
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
          <div class="p-4">
            <!-- @slot Page content. @binding collapsed -->
            <slot :collapsed="collapsed" />
          </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-xs text-light px-4 py-4 flex flex-col lg:flex-row gap-4">
          <div class="flex-shrink flex order-2 lg:order-1">
            <slot name="footer-left">
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
            </slot>
          </div>
          <div class="flex-shrink flex lg:mx-auto order-1 lg:order-2">
            <div class="my-auto">
              <slot name="footer-middle" />
            </div>
          </div>
          <div class="flex-shrink flex lg:ml-auto order-3">
            <div class="my-auto">
              <slot name="footer-right">
                <p>&copy; {{ year }} Carnegie Mellon University</p>
                <p>SEI Internal Use Only</p>
              </slot>
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
  data() {
    return {
      showMobileMenu: false
    }
  },
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
  watch: {
    showMobileMenu(value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.mobileMenuCloseBtn.focus()
        })
      } else {
        this.$refs.mobileMenuOpenBtn.focus()
      }
    }
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
      // Close the mobile menu
      this.showMobileMenu = false
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
    checkKeyEvent(event) {
      // close modal and return early if escape
      if (event.key === "Escape") {
        this.showMobileMenu = false;
        return;
      }
      const focusableList = this.$refs.mobileSidebarContainer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      // escape early if only 1 or no elements to focus
      if (focusableList.length < 2 && event.key === "Tab") {
        event.preventDefault();
        return;
      }
      const last = focusableList.length - 1;
      if (
        event.key === "Tab" &&
        event.shiftKey === false &&
        event.target === focusableList[last]
      ) {
        event.preventDefault();
        focusableList[0].focus();
      } else if (
        event.key === "Tab" &&
        event.shiftKey === true &&
        event.target === focusableList[0]
      ) {
        event.preventDefault();
        focusableList[last].focus();
      }
    }
  }
})
</script>
