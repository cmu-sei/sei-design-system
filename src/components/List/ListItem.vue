<template>
  <li
    data-id="sds-list-item"
    role="listitem"
    class="min-w-0"
    :class="{ 'grid grid-cols-[var(--sds-list-item-marker-column-width,auto)_1fr] gap-x-3': hasMarker }"
    :style="listItemStyle"
  >
    <div
      v-if="hasMarker"
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
      :class="{ 'self-center': hasMarker && !$slots.description }"
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
        'col-span-2': hasMarker,
        'mt-3': $slots.default && (title || $slots.description)
      }"
    >
      <!-- @slot Custom list item content. -->
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
import {
  listContextKey,
  listItemContextKey,
  type ListContext,
  type ListItemContext
} from './listContext'

defineOptions({
  name: 'SdsListItem'
})

interface ListItemProps {
  /** Optional title displayed at the top of the list item. */
  title?: string
  /** Width reserved for the marker column. Defaults to the custom marker's intrinsic width. */
  markerColumnWidth?: string
}

const props = withDefaults(defineProps<ListItemProps>(), {
  title: undefined,
  markerColumnWidth: undefined
})

const list = inject<ListContext | null>(listContextKey, null)
const slots = useSlots()
const hasMarker = ref(Boolean(slots.marker))
const markerColumnWidth = computed(() => props.markerColumnWidth)
const resolvedMarkerColumnWidth = computed(() => markerColumnWidth.value ?? (hasMarker.value ? 'auto' : undefined))
const listItemStyle = computed(() => resolvedMarkerColumnWidth.value ? { '--sds-list-item-marker-column-width': resolvedMarkerColumnWidth.value } : undefined)

onBeforeUpdate(() => {
  hasMarker.value = Boolean(slots.marker)
})

provide<ListItemContext>(listItemContextKey, {
  markerColumnWidth
})
</script>
