<template>
  <div
    data-id="sds-layout-app-simple"
    class="flex flex-col h-screen dark:text-gray-50"
  >
    <div class="bg-gray-900 text-white px-4 py-2 flex flex-shrink-0">
      <div class="my-auto">
        <div
          v-if="appSuite"
          class="block"
        >
          <a
            v-if="appSuiteUrl"
            :href="appSuiteUrl"
            class="text-xl flex hover:underline"
            @click="navigate(null, { title: appSuite, href: appSuiteUrl }, $event)"
          >
            <span class="text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </a>
          <p
            v-else
            class="text-xl flex"
          >
            <span class="text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </p>
        </div>
      </div>
      <div class="ml-auto my-auto items-center flex gap-2 flex-shrink-0">
        <!-- @slot Suite header content. -->
        <slot
          name="suite-header"
        />
      </div>
    </div>
    <div class="flex flex-grow flex-shrink-0">
      <!-- Main content -->
      <section class="flex flex-col items-stretch flex-grow min-w-0">
        <main class="flex-grow pb-4 bg-gray-50 dark:bg-gray-950">
          <div
            v-if="!hidePageHeader"
            class="bg-white dark:bg-gray-850 shadow px-4 py-3 sticky top-0 z-40 flex flex-col gap-4 md:flex-row"
          >
            <div class="flex-grow my-auto flex flex-row gap-2">
              <!-- @slot Page title content. -->
              <slot
                name="page-title"
                class-list="text-2xl font-semibold text-gray-700 dark:text-gray-100"
              >
                <p class="text-2xl font-semibold text-gray-700 dark:text-gray-100">
                  {{ pageTitle }}
                </p>
              </slot>
            </div>
            <div
              v-if="hasSlot('page-header')"
              class="flex-shrink-0 my-auto flex flex-col md:flex-row gap-2"
            >
              <!-- @slot Page header content. -->
              <slot
                name="page-header"
              />
            </div>
          </div>
          <div class="p-4">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </main>

        <!-- @slot Footer top content. Great for application-specific footer content. -->
        <slot name="footer-top" />

        <!-- Footer -->
        <footer class="bg-gray-900 dark:bg-black text-xs text-white px-4 pt-4 pb-4 flex flex-col lg:flex-row gap-4">
          <div class="flex-shrink-0 flex order-2 lg:order-1">
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
          <div
            v-if="hasSlot('footer-middle')"
            class="flex-shrink flex lg:mx-auto order-1 lg:order-2"
          >
            <div class="my-auto">
              <!-- @slot Footer middle (top in mobile) content. -->
              <slot name="footer-middle" />
            </div>
          </div>
          <div class="flex-shrink-0 flex lg:ml-auto order-3">
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

        <div
          v-if="hasSlot('actions-bar')"
          class="sticky bottom-0 z-40"
        >
          <!-- @slot Actions content. Great for application-specific actionable content. -->
          <slot name="actions-bar" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SdsLink from '../Link/Link.vue'
import wordmark from '../../assets/images/Software_Engineering_Institute_Unitmark_White.svg'

interface LayoutAppSidebarNavItem {
  id: number | string
  href: string
  active: boolean
  title: string
  badgeCount?: number
  iconUrl?: string
  items?: LayoutAppSidebarNavItem[]
}

export default defineComponent({
  name: 'SdsLayoutAppSimple',
  components: {
    SdsLink,
  },
  props: {
    /**
     * The app suite name's prefix (styled in red) for the layout.
     */
    appSuitePrefix: { type: String, default: 'SEI' },
    /**
     * The app suite name for the layout.
     */
    appSuite: { type: String, default: null },
    /**
     * The app suite url for the layout.
     */
    appSuiteUrl: { type: String, default: null },
    /**
     * The app name for the layout.
     */
    appName: { type: String, default: null },
    /**
     * The page title for the layout.
     */
    pageTitle: { type: String, default: null },
    /**
     * Determines whether to hide the page header.
     */
    hidePageHeader: { type: Boolean, default: false },
  },
  emits: ['navigate'],
  computed: {
    wordmark() {
      return wordmark
    },
    year() {
      const d = new Date();
      return d.getFullYear();
    },
  },
  methods: {
    hasSlot(title: string) {
      return !!this.$slots[title]
    },
    navigate(group: LayoutAppSidebarNavItem | null, item: Pick<LayoutAppSidebarNavItem, 'title' | 'href'>, event: Event) {
      /**
       * Emmited when the app suite has been clicked.
       *
       * Sends a payload of the clicked item and the click event: { group, item, event }
       */
      this.$emit('navigate', { group, item, event })
    },
  }
})
</script>
