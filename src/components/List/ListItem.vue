<template>
  <li
    data-id="sds-list-item"
    role="listitem"
    class="min-w-0"
    :class="{ [`grid ${list?.markerGridClass.value ?? 'grid-cols-[auto_1fr]'} gap-x-3`]: $slots.marker }"
  >
    <div
      v-if="$slots.marker"
      data-id="sds-list-item-marker"
      class="flex items-start justify-center"
      :class="[list?.markerFrameClass.value, markerVariantClass]"
    >
      <!-- @slot Optional marker displayed next to the list item body. -->
      <slot name="marker" />
    </div>
    <div
      v-if="title || $slots.description"
      data-id="sds-list-item-body"
      class="min-w-0"
      :class="{ 'self-center': $slots.marker && !$slots.description }"
    >
      <h3
        v-if="title"
        :class="list?.titleClass.value ?? 'text-sm font-semibold text-gray-900 dark:text-gray-50'"
      >
        {{ title }}
      </h3>
      <div
        v-if="$slots.description"
        class="mt-1 text-sm text-gray-700 dark:text-gray-300"
      >
        <!-- @slot Optional list item description. -->
        <slot name="description" />
      </div>
    </div>
    <div
      v-if="contentTitle || contentDescription || $slots.default"
      data-id="sds-list-item-content"
      :class="{
        'col-start-2': $slots.marker && contentLayout === 'body',
        'col-span-2': $slots.marker && contentLayout === 'full',
        'mt-3': $slots.default && (title || $slots.description)
      }"
    >
      <div
        v-if="contentTitle"
        class="text-base leading-6 text-gray-900 dark:text-gray-50"
      >
        {{ contentTitle }}
      </div>
      <div
        v-if="contentDescription"
        class="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300"
      >
        {{ contentDescription }}
      </div>
      <!-- @slot Custom list item content. -->
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsListItem'
})

interface ListItemProps {
  /** Determines whether custom content aligns with the body or spans the full item. */
  contentLayout?: 'body' | 'full'
  /** Optional content description displayed beneath the content title. */
  contentDescription?: string
  /** Optional content title displayed beneath the item body. */
  contentTitle?: string
  /** Applies a framed marker treatment. */
  markerVariant?: 'gray'
  /** Optional title displayed at the top of the list item. */
  title?: string
}

interface ListContext {
  markerFrameClass: Ref<string>
  markerGridClass: Ref<string>
  titleClass: Ref<string>
}

const props = withDefaults(defineProps<ListItemProps>(), {
  contentLayout: 'body',
  contentDescription: undefined,
  contentTitle: undefined,
  markerVariant: undefined,
  title: undefined
})

const list = inject<ListContext | null>('sdsList', null)

const markerVariantClass = computed(() => {
  switch (props.markerVariant) {
    case 'gray': return 'rounded-theme-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
    default: return ''
  }
})
</script>
