<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <sds-section
      type="accented"
      class="my-6"
    >
      <template #title>
        <h2 class="font-semibold uppercase">
          Typography Scale
        </h2>
      </template>
      <template #subtitle>
        <p>
          Theme-aware text scale utilities for SDS headings, body copy, leads, and captions.
        </p>
        <p class="mt-2">
          Use the theme toggle in the page header to compare Forge and Plaid styles.
        </p>
      </template>

      <div class="space-y-10">
        <section
          v-for="example in examples"
          :key="example.className"
          class="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0 dark:border-gray-700"
        >
          <div class="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 class="text-base font-semibold">
              {{ example.label }}
            </h3>
            <code class="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
              .{{ example.className }}
            </code>
          </div>

          <component
            :is="example.tag"
            :class="example.className"
          >
            <template v-if="example.className === 'text-body'">
              <p>
                Clear body text helps users understand context, compare details, and complete their work without unnecessary strain.
              </p>
              <p>
                A second paragraph shows the paragraph spacing included in the body utility.
              </p>
            </template>
            <template v-else>
              {{ example.text }}
            </template>
          </component>
        </section>
      </div>
    </sds-section>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CssTypographyScalePage'
})

definePage({
  meta: {
    title: 'CSS Typography Scale'
  }
})

useHead({
  title: 'CSS Typography Scale'
})

const examples = [
  {
    label: 'Heading 1',
    className: 'text-h1',
    tag: 'h1',
    text: 'SDS typography scale'
  },
  {
    label: 'Heading 2',
    className: 'text-h2',
    tag: 'h2',
    text: 'Design system guidance'
  },
  {
    label: 'Heading 3',
    className: 'text-h3',
    tag: 'h3',
    text: 'Build consistent interfaces'
  },
  {
    label: 'Heading 4',
    className: 'text-h4',
    tag: 'h4',
    text: 'Research and development'
  },
  {
    label: 'Heading 5',
    className: 'text-h5',
    tag: 'h5',
    text: 'Implementation details'
  },
  {
    label: 'Heading 6',
    className: 'text-h6',
    tag: 'h6',
    text: 'Supporting information'
  },
  {
    label: 'Lead',
    className: 'text-lead',
    tag: 'p',
    text: 'Lead text introduces a page, section, or important content area with a little more visual emphasis.'
  },
  {
    label: 'Body',
    className: 'text-body',
    tag: 'div',
    text: ''
  },
  {
    label: 'Caption 1',
    className: 'text-caption1',
    tag: 'p',
    text: 'Caption text can provide context for figures, charts, images, or supporting media.'
  },
  {
    label: 'Caption 2',
    className: 'text-caption2',
    tag: 'p',
    text: 'Source: Software Engineering Institute'
  }
]
</script>
