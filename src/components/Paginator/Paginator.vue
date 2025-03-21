<template>
  <nav
    v-if="totalPages > 1"
    data-id="sds-paginator"
    class="paginator"
    aria-label="Page navigation"
  >
    <ul
      class="btn-toolbar"
      role="toolbar"
    >
      <li class="mr-2 btn-group">
        <button
          :disabled="prevDisabled"
          :aria-disabled="prevDisabled"
          aria-label="Previous page"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          @click.prevent="goToPage(currentPage - 1, $event)"
        >
          <SdsSvgIcon
            aria-hidden="true"
            class="text-gray-600 dark:text-gray-400 my-auto w-2 h-[0.813rem]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :height="icons['chevron-left'].height"
            :path="icons['chevron-left'].path"
            :view-box="icons['chevron-left'].viewBox"
            :width="icons['chevron-left'].width"
          />
        </button>
      </li>
      <li
        v-if="totalPages > 1"
        class="hidden btn-group md:block"
      >
        <template
          v-for="(page, key) in pageList"
          :key="key"
        >
          <button
            :class="{
              'shadow-none border-transparent': page === '...'
            }"
            :disabled="page === '...' || loading || currentPage === page"
            :aria-disabled="page === '...' || loading || currentPage === page"
            :aria-label="currentPage === page ? `Current page, page ${page}` : `Go to page ${page}`"
            class="btn btn-ghost btn-sm py-2"
            @click.prevent="goToPage(page, $event)"
          >
            {{ page.toLocaleString() }}
          </button>
        </template>
      </li>
      <li class="flex md:hidden mx-3">
        <span
          class="m-auto text-sm font-semibold"
        >Page {{ currentPage.toLocaleString() }}</span>
      </li>
      <li class="ml-2 btn-group">
        <button
          :disabled="nextDisabled"
          :aria-disabled="nextDisabled"
          aria-label="Next page"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          @click.prevent="goToPage(currentPage + 1, $event)"
        >
          <SdsSvgIcon
            aria-hidden="true"
            class="text-gray-600 dark:text-gray-400 my-auto w-2 h-[0.813rem]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :height="icons['chevron-right'].height"
            :path="icons['chevron-right'].path"
            :view-box="icons['chevron-right'].viewBox"
            :width="icons['chevron-right'].width"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsPaginator'
})

const props = defineProps({
  /**
   * The active page number.
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * The total number of pages.
   */
  totalPages: {
    type: Number,
    default: 0,
  },
  /**
   * Determines whether to show the loading state or not.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines the page threshold before the ellipsis truncation begins.
   */
  threshold: {
    type: Number,
    default: 5,
  },
})

const icons = Object.freeze({
  'chevron-left': {
    height: 13,
    path: 'M0.871094 6.14844L6.12109 0.898438C6.44922 0.542969 7.02344 0.542969 7.35156 0.898438C7.70703 1.22656 7.70703 1.80078 7.35156 2.12891L2.73047 6.75L7.35156 11.3984C7.70703 11.7266 7.70703 12.3008 7.35156 12.6289C7.02344 12.9844 6.44922 12.9844 6.12109 12.6289L0.871094 7.37891C0.515625 7.05078 0.515625 6.47656 0.871094 6.14844Z',
    viewBox: '0 0 8 13',
    width: 8
  },
  'chevron-right': {
    height: 13,
    path: 'M7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.52344 12.9844 0.949219 12.9844 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844Z',
    viewBox: '0 0 8 13',
    width: 8
  }
} as const)

const emit = defineEmits(['go-to-page'])

const prevDisabled = computed(() => {
  return props.currentPage <= 1 || props.loading;
})

const nextDisabled = computed(() => {
  return props.currentPage >= props.totalPages || props.loading;
})

const pageList = computed(() => {
  if (props.totalPages <= props.threshold) {
    return Array.apply(null, Array(props.totalPages)).map((x, i) => {
      return i + 1;
    });
  } else if (props.currentPage < props.threshold) {
    const list: Array<number | string> = Array.apply(null, Array(props.threshold)).map((x, i) => {
      return i + 1;
    });
    return list.concat(["...", props.totalPages]);
  } else if (props.currentPage > props.totalPages - props.threshold + 1) {
    const list = [1, "..."];
    return list.concat(
      Array.apply(null, Array(props.threshold)).map((x, i) => {
        return props.totalPages - props.threshold + i + 1;
      })
    );
  } else {
    let list = [1, "..."];
    list = list.concat(
      Array.apply(null, Array(props.threshold - 3)).map((x, i) => {
        return props.currentPage + i - props.threshold + 3;
      })
    );
    list.push(props.currentPage);
    list = list.concat(
      Array.apply(null, Array(props.threshold - 3)).map((x, i) => {
        return props.currentPage + i + 1;
      })
    );
    return list.concat(["...", props.totalPages]);
  }
})

const goToPage = (page: number | string, event: MouseEvent) => {
  /**
   * Passes an object to be used by a parent component: { page, event }
   */
  emit("go-to-page", { page, event });
}
</script>
