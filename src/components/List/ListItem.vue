<template>
  <li
    data-id="sds-list-item"
    role="listitem"
    class="min-w-0"
    :class="{ [`grid ${list?.markerGridClass ?? 'grid-cols-[var(--sds-list-item-marker-column-width,auto)_1fr]'} gap-x-3`]: $slots.marker }"
    :style="listItemStyle"
  >
    <div
      v-if="$slots.marker"
      data-id="sds-list-item-marker"
      class="flex items-start justify-center"
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
        :class="list?.titleClass ?? 'text-sm font-semibold text-gray-900 dark:text-gray-50'"
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
      v-if="$slots.default"
      data-id="sds-list-item-content"
      :class="{
        'col-span-2': $slots.marker,
        'mt-3': $slots.default && (title || $slots.description)
      }"
    >
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
  /** Optional title displayed at the top of the list item. */
  title?: string
  /** Width reserved for the marker column. */
  markerColumnWidth?: string
}

interface ListContext {
  markerGridClass: string
  titleClass: string
}

interface ListItemContext {
  markerColumnWidth: { value: string | undefined }
}

const props = withDefaults(defineProps<ListItemProps>(), {
  title: undefined,
  markerColumnWidth: undefined
})

const list = inject<ListContext | null>('sdsList', null)
const markerColumnWidth = computed(() => props.markerColumnWidth)
const listItemStyle = computed(() => markerColumnWidth.value ? { '--sds-list-item-marker-column-width': markerColumnWidth.value } : undefined)

provide<ListItemContext>('sdsListItem', {
  markerColumnWidth
})
</script>
