<template>
  <div class="flex flex-col h-screen dark:text-gray-50">
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
          class="md:hidden fixed w-2/3 z-50 bg-gray-900 dark:bg-gray-800 text-white flex-shrink-0"
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
                v-if="appName || appIconUrl"
                class="sticky top-0 bg-gray-900 dark:bg-gray-800 z-10 flex gap-2 p-4"
              >
                <span
                  v-if="appIconUrl"
                  class="inline-block w-8 h-8 my-auto flex-shrink-0"
                >
                  <img
                    :src="appIconUrl"
                    :alt="appName"
                    class="w-8 h-8"
                  >
                </span>
                <span class="text-lg font-bold my-auto">
                  {{ appName }}
                </span>
              </div>
              <nav
                v-if="sidebarNavigationItems.length > 0"
                class="grid grid-cols-1"
              >
                <!-- @slot Sidebar navigation content wrapper. @binding items, collapsed -->
                <slot
                  name="sidebar-navigation"
                  :items="sidebarNavigationItems"
                  :collapsed="collapsed"
                >
                  <a
                    v-for="item in sidebarNavigationItems"
                    :key="item.id"
                    :href="item.href"
                    class="flex relative gap-2 pl-2 px-4 py-2 border-l-8"
                    :class="{
                      'border-transparent bg-gray-900 dark:bg-gray-800 text-gray-100 dark:text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white opacity-75 hover:opacity-100': !item.active,
                      'text-white border-danger pointer-events-none': item.active
                    }"
                    @click="navigate(item, $event)"
                  >
                    <span
                      v-if="item.iconUrl"
                      class="inline-block w-8 h-8 my-auto flex-shrink-0"
                    >
                      <img
                        :src="item.iconUrl"
                        :alt="item.title"
                        class="w-8 h-8"
                      >
                    </span>
                    <span class="inline-block my-auto">{{ item.title }}</span>
                    <span class="inline-block my-auto">
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
        class="hidden md:block bg-gray-900 dark:bg-gray-800 text-white flex-shrink-0 z-50"
        :class="[computedSidebarWidth]"
      >
        <div class="h-screen flex flex-col sticky top-0">
          <div class="overflow-y-auto flex-grow overscroll-contain">
            <div
              v-if="appSuite || appName || appIconUrl"
              class="sticky top-0 bg-gray-900 dark:bg-gray-800 z-10"
            >
              <div
                v-if="appSuite"
                class="px-4 pt-3 pb-2"
                :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
              >
                <p class="text-xl flex">
                  <span class="text-red-400 font-bold">{{ appSuitePrefix }}</span>
                  <span>{{ appSuite }}</span>
                </p>
              </div>
              <p
                v-if="appName || appIconUrl"
                class="flex gap-2"
                :class="[appIconUrl ? 'p-4' : 'px-4 pt-4 pb-5']"
              >
                <span
                  v-if="appIconUrl"
                  class="block w-8 h-8 my-auto flex-shrink-0"
                >
                  <img
                    :src="appIconUrl"
                    :alt="appName"
                    class="w-8 h-8"
                  >
                </span>
                <span
                  v-if="appName"
                  class="text-lg font-bold my-auto"
                  :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
                >
                  {{ appName }}
                </span>
              </p>
            </div>
            <nav
              v-if="sidebarNavigationItems.length > 0"
              class="grid grid-cols-1"
              :class="[collapsed && !appIconUrl ? 'mt-4' : '']"
            >
              <!-- @slot Nav content. @binding items, collapsed -->
              <slot
                name="sidebar-navigation"
                :items="sidebarNavigationItems"
                :collapsed="collapsed"
              >
                <template
                  v-for="item in sidebarNavigationItems"
                  :key="item.id"
                >
                  <sds-tooltip
                    placement="right"
                    :disabled="!collapsed"
                  >
                    <template #trigger>
                      <a
                        :href="item.href"
                        class="flex relative gap-2 pl-2 px-4 py-2 border-l-8"
                        :class="{
                          'border-transparent bg-gray-900 dark:bg-gray-800 text-gray-100  dark:text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white opacity-75 hover:opacity-100': !item.active,
                          'text-white border-danger pointer-events-none': item.active
                        }"
                        @click="navigate(item, $event)"
                      >
                        <span
                          v-if="item.iconUrl"
                          class="inline-block w-8 h-8 my-auto flex-shrink-0"
                        >
                          <img
                            :src="item.iconUrl"
                            :alt="item.title"
                            class="w-8 h-8"
                          >
                        </span>
                        <span
                          v-if="!collapsed"
                          class="inline-block my-auto"
                        >{{ item.title }}</span>
                        <span
                          class="inline-block my-auto"
                          :class="{
                            'absolute bottom-1 right-1': collapsed
                          }"
                        >
                          <span
                            v-if="item.badgeCount"
                            class="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-danger"
                          >{{ item.badgeCount }}</span>
                        </span>
                      </a>
                    </template>
                    <p>{{ item.title }}</p>
                  </sds-tooltip>
                </template>
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
        <main class="flex-grow pb-4 bg-gray-100 dark:bg-gray-900">
          <div class="bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 flex h-12">
            <div class="md:hidden -ml-1 my-auto">
              <button
                ref="mobileMenuOpenBtn"
                class="flex gap-1 focus:outline-none"
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
                <span class="text-xl leading-6 flex">
                  <span
                    v-if="appSuitePrefix"
                    class="text-red-400 font-bold"
                  >{{ appSuitePrefix }}</span>
                  <span
                    v-if="appSuite"
                  >{{ appSuite }}</span>
                  <span
                    v-if="appName && !hideAppNameInMobileHeader"
                    class="text-sm text-left font-bold text-gray-200 overflow-ellipsis text-ellipsis overflow-hidden whitespace-nowrap w-40 mt-auto mr-auto"
                    :class="[appSuite ? 'ml-1': '']"
                  >{{ appName }}</span>
                </span>
              </button>
            </div>
            <div class="ml-auto my-auto flex gap-2 flex-shrink-0">
              <!-- @slot Suite header content. @binding collapsed -->
              <slot
                name="suite-header"
                :collapsed="collapsed"
              />
            </div>
          </div>
          <div class="bg-white dark:bg-gray-700 shadow px-4 py-3 sticky top-0 z-40 flex flex-col gap-4 md:flex-row">
            <div class="flex-grow my-auto">
              <p class="text-2xl font-semibold text-gray-700 dark:text-gray-100">
                {{ pageTitle }}
              </p>
            </div>
            <div class="flex-shrink-0 my-auto flex flex-col md:flex-row gap-2">
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
        <footer class="bg-gray-900 dark:bg-gray-800 text-xs text-light px-4 py-4 flex flex-col lg:flex-row gap-4">
          <div class="flex-shrink flex order-2 lg:order-1">
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
          <div class="flex-shrink flex lg:mx-auto order-1 lg:order-2">
            <div class="my-auto">
              <!-- @slot Footer middle (top in mobile) content. -->
              <slot name="footer-middle" />
            </div>
          </div>
          <div class="flex-shrink flex lg:ml-auto order-3">
            <div class="my-auto">
              <!-- @slot Footer right (bottom in mobile) content. @binding year -->
              <slot
                name="footer-right"
                :year="year"
              >
                <p>&copy; {{ year }} Carnegie Mellon University</p>
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
import SdsTooltip from '../Tooltip/Tooltip.vue'
import wordmark from '../../assets/images/Software_Engineering_Institute_Unitmark_White.svg'

export default defineComponent({
  name: 'SdsLayoutApp',
  components: {
    SdsLink,
    SdsTooltip,
  },
  props: {
    /**
     * The v-model that determines collapsed state.
     */
    modelValue: { type: Boolean, default: false },
    /**
     * The width class of the non-collapsed sidebar when not in a mobile responsive view.
     */
    sidebarWidth: { type: String, default: 'w-64' },
    /**
     * Determines whether to enable collapsing functionality.
     * 
     * Ensure to have an icon for every item in the **sidebarNavigationItems** array for this to look nice.
     * 
     * Including an **appIconUrl** will also improve the user experience.
     */
    enableCollapsibleSidebar: { type: Boolean, default: false },
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
     * Determines whether to hide the **appName** in the mobile header.
     * 
     * This is useful when an application's name is very long.
     */
    hideAppNameInMobileHeader: { type: Boolean, default: false },
    /**
     * The app icon url for the layout.
     */
    appIconUrl: { type: String, default: null },
    /**
     * The page title for the layout.
     */
    pageTitle: { type: String, default: null },
    /**
     * The sidebar navigation array for the layout.
     * 
     * Each item should have a unique **id**, **title**, **active**, and **href** key value pair. **badgeCount** and **iconUrl** are optional.
     * 
     * Item object:
     * 
     * { id: Number, title: String, active: Boolean, href: String, badgeCount: Number, iconUrl: String }
     */
    sidebarNavigationItems: { type: Array, default: () => [] },
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
    computedSidebarWidth() {
      if (!this.enableCollapsibleSidebar) return this.sidebarWidth
      return this.collapsed ? 'w-auto' : this.sidebarWidth;
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
        // prevent scrolling
        document.documentElement.classList.add("layout-app-internal-prevent-scroll");
        this.$nextTick(() => {
          this.$refs.mobileMenuCloseBtn.focus()
        })
      } else {
        // enable scrolling
        document.documentElement.classList.remove("layout-app-internal-prevent-scroll");
        this.$refs.mobileMenuOpenBtn.focus()
      }
    }
  },
  mounted() {
    // Setup collapse functionality
    document.addEventListener("keyup", this.handleDocumentKeyUp);
  },
  unmounted() {
    // enable scrolling
    document.documentElement.classList.remove("layout-app-internal-prevent-scroll");

    // Destroy collapse functionality
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

<style lang="postcss">
.layout-app-internal-prevent-scroll {
  overflow: hidden;
}

@screen md {
  .layout-app-internal-prevent-scroll {
    overflow: visible;
  }
}
</style>