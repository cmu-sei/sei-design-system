<template>
  <div
    data-id="sds-brochure-site-header-content"
    class="space-y-4"
  >
    <h3
      v-if="page.title"
      class="text-3xl text-gray-500 break-words font-extralight"
    >
      {{ page.title }}
    </h3>
    <h4
      v-if="page.subtitle"
      class="text-xl text-gray-500 break-words"
    >
      {{ page.subtitle }}
    </h4>
    <div
      v-if="page.description"
      class="max-w-screen-md prose break-words prose-red"
      v-html="page.description"
    />
  </div>
</template>

<script setup lang="ts">
interface BrochureSiteHeaderContentProps {
  /**
   * An object containing various properties that display in the content.
   */
  page?: Record<string, unknown>;
}

defineOptions({
  name: 'SdsBrochureSiteHeaderContent'
})

withDefaults(defineProps<BrochureSiteHeaderContentProps>(), {
  page: () => ({})
})
</script>
