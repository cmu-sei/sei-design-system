<template>
  <nav
    v-if="totalPages > 1"
    data-id="sds-paginator"
    class="paginator"
    aria-label="Page navigation"
  >
    <ul
      class="btn-toolbar flex space-x-2"
      role="toolbar"
    >
      <li class="flex items-center grow-1 shrink-1">
        <button
          :disabled="prevDisabled"
          :aria-disabled="prevDisabled"
          aria-label="Previous page"
          class="
            flex items-center justify-center grow-0 shrink-0
            bg-white hover:bg-gray-600/10
            border rounded
            w-[2.125rem] h-[2.125rem]
            p-2
          "
          :class="{
            'border-gray-600/10 pointer-events-none': prevDisabled,
            'border-gray-600/20': !prevDisabled
          }"
          @click.prevent="goToPage(currentPage - 1, $event)"
        >
          <SdsSvgIcon
            aria-hidden="true"
            class="w-2 h-[0.813rem] relative right-px pointer-events-none"
            :class="{
              'text-gray-600/10 dark:text-gray-400/10': prevDisabled,
              'text-gray-600 dark:text-gray-400': !prevDisabled
            }"
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
        v-for="(page, key) in pageList"
        :key="key"
        class="hidden md:flex grow-1 shrink-1"
      >
        <button
          :disabled="page === currentPage || loading"
          :aria-disabled="page === currentPage || loading"
          :aria-current="page === currentPage ? 'page' : undefined"
          :aria-label="page.toLocaleString() === '...' ? 'Jump to page &quot;x&quot;' : page === currentPage ? `Current page, page ${page}` : `Go to page ${page}` "
          class="
            flex items-center justify-center grow-1 shrink-1
            border rounded
            text-gray-600 dark:text-gray-400
            font-semibold
            min-w-[2.125rem] h-[2.125rem]
            p-2
          "
          :class="{
            'bg-transparent hover:bg-gray-600/10 border-0': page === '...',
            'bg-white hover:bg-gray-600/10 border-gray-600/20 ': page !== '...' && page !== currentPage && !loading,
            'bg-white border-gray-600/10 text-gray-600/10 dark:text-gray-400/10': page !== '...' && page !== currentPage && loading,
            'bg-blue-50 dark:bg-blue-900 border-blue-600 dark:border-blue-400 shadow-inner shadow-blue-600/15': page === currentPage
          }"
          @click.prevent="goToPage(page, $event)"
        >
          <SdsSvgIcon
            v-if="page === '...'"
            aria-hidden="true"
            class="pointer-events-none"
            :class="{
              'text-gray-600/10 dark:text-gray-400/10': loading,
              'text-gray-600 dark:text-gray-400': !loading
            }"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :height="icons['ellipsis'].height"
            :path="icons['ellipsis'].path"
            :view-box="icons['ellipsis'].viewBox"
            :width="icons['ellipsis'].width"
          />
          <template v-else>
            {{ page.toLocaleString() }}
          </template>
        </button>
      </li>
      <li class="flex md:hidden">
        <span class="m-auto text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Page {{ currentPage.toLocaleString() }}
        </span>
      </li>
      <li class="flex grow-1 shrink-1">
        <button
          :disabled="nextDisabled"
          :aria-disabled="nextDisabled"
          aria-label="Next page"
          class="
            flex items-center justify-center grow-0 shrink-0
            bg-white hover:bg-gray-600/10
            border rounded
            w-[2.125rem] h-[2.125rem]
            p-2
          "
          :class="{
            'border-gray-600/10 pointer-events-none': nextDisabled,
            'border-gray-600/20': !nextDisabled
          }"
          @click.prevent="goToPage(currentPage + 1, $event)"
        >
          <SdsSvgIcon
            aria-hidden="true"
            class="w-2 h-[0.813rem] relative left-px pointer-events-none"
            :class="{
              'text-gray-600/10 dark:text-gray-400/10': nextDisabled,
              'text-gray-600 dark:text-gray-400': !nextDisabled
            }"
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
  },
  'ellipsis': {
    height: 4,
    path: 'M3.15625 1.75C3.15625 2.59766 2.44531 3.28125 1.625 3.28125C0.777344 3.28125 0.09375 2.59766 0.09375 1.75C0.09375 0.929688 0.777344 0.21875 1.625 0.21875C2.44531 0.21875 3.15625 0.929688 3.15625 1.75ZM7.53125 1.75C7.53125 2.59766 6.82031 3.28125 6 3.28125C5.15234 3.28125 4.46875 2.59766 4.46875 1.75C4.46875 0.929688 5.15234 0.21875 6 0.21875C6.82031 0.21875 7.53125 0.929688 7.53125 1.75ZM8.84375 1.75C8.84375 0.929688 9.52734 0.21875 10.375 0.21875C11.1953 0.21875 11.9062 0.929688 11.9062 1.75C11.9062 2.59766 11.1953 3.28125 10.375 3.28125C9.52734 3.28125 8.84375 2.59766 8.84375 1.75Z',
    viewBox: '0 0 12 4',
    width: 12
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
