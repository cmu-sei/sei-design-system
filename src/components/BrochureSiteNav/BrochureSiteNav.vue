<template>
  <div
    data-id="sds-brochure-site-nav"
    class="space-y-4"
  >
    <div
      v-for="item in page.nav"
      :key="item.title"
      class="p-4 space-y-2 bg-gray-50"
    >
      <h3 class="text-xl text-gray-400 wrap-break-words">
        {{ item.title }}
      </h3>
      <ul class="pb-2 space-y-2">
        <li
          v-for="link in item.items"
          :key="link.title"
        >
          <a
            :href="link.url"
            class="text-red-600 wrap-break-words hover:text-red-700 hover:underline"
          >{{ link.title }}</a>
        </li>
      </ul>
      <div
        v-if="item.seeAll"
        class="pt-2 border-t border-t-gray-100"
      >
        <a
          :href="item.seeAll.url"
          class="inline-flex font-bold uppercase group text-gray-600"
        >
          <span class="group-hover:underline">{{ item.seeAll.title }}</span>
          <IconFa7SolidChevronRight
            class="w-5 h-5 my-auto"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsBrochureSiteNav'
})

defineProps({
  /**
   * An object containing various properties that determine the navigation.
   */
  page: {
    type: Object,
    default: () => ({}),
  },
})
</script>
