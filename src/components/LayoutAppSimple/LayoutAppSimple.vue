<template>
  <div
    data-id="sds-layout-app-simple"
    class="flex flex-col h-screen dark:text-gray-50"
  >
    <header class="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 py-2 flex shrink-0">
      <div class="my-auto">
        <h1
          v-if="appSuite"
          class="block"
        >
          <a
            v-if="appSuiteUrl"
            :href="appSuiteUrl"
            class="flex hover:underline"
            @click="navigate(null, { title: appSuite, href: appSuiteUrl }, $event)"
          >
            <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </a>
          <p
            v-else
            class="flex"
          >
            <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </p>
        </h1>
      </div>
      <div class="ml-auto my-auto items-center flex gap-2 shrink-0">
        <!-- @slot User section content. -->
        <slot
          name="user-section"
        />
      </div>
    </header>
    <div class="flex grow shrink-0">
      <!-- Main content -->
      <div class="bg-gray-50 dark:bg-black flex flex-col items-stretch grow min-w-0">
        <main class="grow pb-4">
          <div
            v-if="!hidePageHeader"
            class="bg-gray-25 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-40 flex flex-col gap-4 md:flex-row"
          >
            <div class="grow my-auto flex flex-row gap-2">
              <!-- @slot Page title content. -->
              <slot
                name="page-title"
                class-list="text-xl font-light text-gray-900 dark:text-gray-100"
              >
                <p class="text-xl font-light text-gray-900 dark:text-gray-100">
                  {{ pageTitle }}
                </p>
              </slot>
            </div>
            <div
              v-if="hasSlot('page-header')"
              class="shrink-0 my-auto flex flex-col md:flex-row gap-2"
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

        <!-- Footer -->
        <footer>
          <div
            v-if="hasSlot('footer-top')"
            class="p-4"
          >
            <!-- @slot Footer top content. Great for application-specific footer content. -->
            <slot name="footer-top" />
          </div>

          <hr class="mx-4 border-t border-gray-200 dark:border-gray-800">

          <div class="text-xs p-4 flex flex-col lg:flex-row gap-4 pt-4">
            <div class="shrink-0 flex order-2 lg:order-1">
              <sds-link
                href="https://sei.cmu.edu"
                title="Software Engineering Institute"
                class="my-auto text-black dark:text-white"
                external
              >
                <SdsSeiWordmark class="h-10" />
                <span class="sr-only">Software Engineering Institute</span>
              </sds-link>
            </div>
            <div
              v-if="hasSlot('footer-middle')"
              class="shrink flex lg:mx-auto order-1 lg:order-2"
            >
              <div class="my-auto">
                <!-- @slot Footer middle (top in mobile) content. -->
                <slot name="footer-middle" />
              </div>
            </div>
            <div class="shrink-0 flex lg:ml-auto order-3">
              <div class="my-auto">
                <!-- @slot Footer right (bottom in mobile) content. @binding year -->
                <slot
                  name="footer-right"
                  :year="year"
                >
                  <div class="flex flex-col">
                    <p class="ml-auto">
                      &copy; {{ year }} Carnegie Mellon University
                    </p>
                    <p class="ml-auto">
                      Proprietary. SEI Internal Use Only
                    </p>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </footer>

        <!-- Action bar -->
        <aside
          v-if="!hideActionBar && hasSlot('action-bar')"
          class="bg-blue-500 text-white dark:bg-blue-700 p-4 sticky bottom-0 z-40"
        >
          <div class="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
            <!-- @slot Action content. Great for application-specific actionable content. -->
            <slot name="action-bar" />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SdsLink from '../Link/Link.vue'
import SdsSeiWordmark from '../SeiWordmark/SeiWordmark.vue'

import type { LayoutAppSidebarNavItem } from '../LayoutApp/LayoutApp.vue'

const slots = defineSlots<{
  default: () => unknown
  'user-section': () => unknown
  'page-header': () => unknown
  'page-title': () => unknown
  'footer-top': () => unknown
  'footer-left': () => unknown
  'footer-middle': () => unknown
  'footer-right': () => unknown
  'action-bar': () => unknown
}>()

defineOptions({
  name: 'SdsLayoutAppSimple'
})

defineProps({
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
  /**
   * Determines whether to hide the action bar slot.
   */
   hideActionBar: { type: Boolean, default: false },
})

const emit = defineEmits(['navigate'])

const year = computed(() => {
  const d = new Date();
  return d.getFullYear();
})

const hasSlot = (title: 'default' | 'user-section' | 'page-header' | 'page-title' | 'footer-top' | 'footer-left' | 'footer-middle' | 'footer-right' | 'action-bar') => {
  return !!slots[title]
}

const navigate = (group: LayoutAppSidebarNavItem | null, item: Pick<LayoutAppSidebarNavItem, 'title' | 'href'>, event: Event) => {
  /**
   * Emmited when the app suite has been clicked.
   *
   * Sends a payload of the clicked item and the click event: { group, item, event }
   */
  emit('navigate', { group, item, event })
}
</script>
