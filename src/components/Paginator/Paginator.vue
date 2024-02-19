<template>
  <nav
    v-if="totalPages > 1"
    data-id="sds-paginator"
    class="paginator"
    aria-label="Page navigation"
  >
    <div
      class="btn-toolbar"
      role="toolbar"
    >
      <div class="mr-2 btn-group">
        <button
          :disabled="prevDisabled"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          title="First"
          @click.prevent="goToPage(1, $event)"
        >
          <svg
            class="w-3 h-3 my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>First</span>
        </button>
      </div>
      <div class="mr-2 btn-group">
        <button
          :disabled="prevDisabled"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          title="Prev"
          @click.prevent="goToPage(currentPage - 1, $event)"
        >
          <svg
            class="w-3 h-3 my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Prev</span>
        </button>
      </div>
      <div
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
            class="btn btn-ghost btn-sm py-2"
            @click.prevent="goToPage(page, $event)"
          >
            {{ page.toLocaleString() }}
          </button>
        </template>
      </div>
      <div class="flex md:hidden mx-3">
        <span
          class="m-auto text-sm font-semibold"
        >Page {{ currentPage.toLocaleString() }}</span>
      </div>
      <div class="ml-2 btn-group">
        <button
          :disabled="nextDisabled"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          title="Next"
          @click.prevent="goToPage(currentPage + 1, $event)"
        >
          <span>Next</span>
          <svg
            class="w-3 h-3 my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div class="ml-2 btn-group">
        <button
          :disabled="nextDisabled"
          class="flex space-x-1 btn btn-ghost btn-sm py-2"
          title="Last"
          @click.prevent="goToPage(totalPages, $event)"
        >
          <span>Last</span>
          <svg
            class="w-3 h-3 my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
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
