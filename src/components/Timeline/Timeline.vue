<template>
  <div class="flex flex-col">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex space-x-2 pb-1"
    >
      <!-- Icon and connector -->
      <div class="flex flex-col items-center gap-1">
        <!-- Icon wrapper: custom slot renders at natural size; default dot gets fixed 24px container -->
        <slot
          name="icon"
          :item="item"
        >
          <div class="flex items-center justify-center h-6 w-6 shrink-0">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                width="8"
                height="8"
                rx="4"
                class="fill-gray-100"
              />
            </svg>
          </div>
        </slot>
        <!-- Connector (hidden on last item) -->
        <div
          v-if="index < items.length - 1"
          class="w-0.5 flex-1 bg-gray-100"
        />
      </div>
      <!-- Item data -->
      <div>
        <div class="pb-1">
          <a
            v-if="item.href"
            :href="item.href"
            class="block font-semibold leading-6 text-gray-900"
            :class="{
              'link': item.href
            }"
          >{{ item.title }}</a>
          <button
            v-else-if="hasNavigateListener"
            class="block font-semibold leading-6 text-gray-900"
            @click="emit('navigate', item)"
          >
            {{ item.title }}
          </button>
          <span
            v-else
            class="block font-semibold leading-6 text-gray-900"
          >{{ item.title }}</span>
          <span
            v-if="item.subtitle"
            class="block text-gray-900"
          >{{ item.subtitle }}</span>
        </div>
        <div
          v-if="item.description"
          class="text-sm leading-5 text-gray-700 pb-2"
        >
          <span>{{ item.description }}</span>
        </div>
        <div
          v-if="item.timestamp"
          class="text-gray-500 text-xs leading-4 pb-4"
        >
          <span>{{ item.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsTimeline'
})

export interface TimelineItem {
  /**
   * The title of the timeline item. Can be rendered as a link or button if href or navigate is present.
   */
  title: string
  /**
   * Optional subtitle displayed below the title.
   */
  subtitle?: string
  /**
   * Optional description text.
   */
  description?: string
  /**
   * Optional timestamp or date string.
   */
  timestamp?: string
  /**
   * If provided, the title renders as an anchor tag linking to this URL.
   */
  href?: string
}

interface TimelineProps {
  /**
   * Array of timeline items to render.
   */
  items?: TimelineItem[]
}

withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
})

const emit = defineEmits<{
  /**
   * Emitted when a title is clicked and no href is present on the item.
   * Passes the full item object for the consumer to handle navigation.
   */
  navigate: [item: TimelineItem]
}>()

const attrs = useAttrs()
const hasNavigateListener = computed(() => !!attrs.onNavigate)
</script>