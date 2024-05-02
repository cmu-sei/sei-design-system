<template>
  <div
    data-id="sds-resizer"
    class="flex max-w-full"
    :class="{
      'flex-col-reverse': direction === 'y',
      'flex-row-reverse': direction === 'x',
    }"
  >
    <div
      :onmousedown="direction === 'x' ? handleMouseDownX : handleMouseDownY"
      class="flex peer justify-center self-center hover:cursor-grab active:cursor-grabbing opacity-40 hover:opacity-100 relative"
      :class="{
        'flex-col ml-0 mr-auto h-full w-fit': direction === 'x',
        'flex-row mx-auto w-full h-fit': direction === 'y'
      }"
    >
      <svg
        v-if="handle === 'arrow'"
        class="-top-3 relative"
        :class="{
          'rotate-90': direction === 'x'
        }"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 19.15l3.875-3.875q.3-.3.7-.3t.7.3q.3.3.3.713t-.3.712l-3.85 3.875q-.575.575-1.425.575t-1.425-.575L6.7 16.7q-.3-.3-.288-.712t.313-.713q.3-.3.713-.3t.712.3zm0-14.3L8.15 8.7q-.3.3-.7.288t-.7-.288q-.3-.3-.312-.712t.287-.713l3.85-3.85Q11.15 2.85 12 2.85t1.425.575l3.85 3.85q.3.3.288.713t-.313.712q-.3.275-.7.288t-.7-.288z"
        />
      </svg>
      <svg
        v-if="handle === 'bar'"
        :class="{
          'rotate-90 -left-10 relative': direction === 'x'
        }"
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="32"
        viewBox="0 0 24 24"
      >
        <rect
          width="28"
          height="2"
          x="0"
          y="5"
          fill="currentColor"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          rx="1"
        />
      </svg>
      <svg
        v-if="handle === 'dots'"
        :class="{
          'rotate-90': direction === 'x'
        }"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 3 15 15"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M3.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0m5 0a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M12.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      ref="scrollArea"
      :style="{
        height: dynamicHeight,
        width: dynamicWidth
      }"
      class="overflow-auto border-solid border-transparent"
      :class="{
        'peer-hover:dark:border-white peer-hover:border-black': indicator === 'hover',
        'dark:border-white border-black': indicator === 'always',
        'border-b': direction === 'y',
        'border-r': direction === 'x',
      }"
    >
      <!-- @slot content.  -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'SdsResizer'
})

const props = defineProps({
  cap: {
    type: Boolean,
    default: true,
  },
  indicator: {
    type: String as PropType<'always' | 'hover'>,
    default: 'hover'
  },
  handle: {
    type: String as PropType<'arrow' | 'bar' | 'dots'>,
    default: 'arrow'
  },
  direction: {
    type: String as PropType<'x' | 'y'>,
    default: 'y'
  }
})

const scrollArea = ref<null | HTMLElement>(null)

let isDraggingX = false
let isDraggingY = false

const originalWidth = ref();
const originalHeight = ref();

const dynamicWidth = ref('');
const dynamicHeight = ref('');

const handleMouseDownX = (e: MouseEvent) => {
  e.preventDefault()
  isDraggingX = true
}

const handleMouseDownY = (e: MouseEvent) => {
  e.preventDefault()
  isDraggingY = true
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDraggingX && !isDraggingY) return

  if (isDraggingX) {
    if (scrollArea.value !== null) {
      const rect = scrollArea.value.getBoundingClientRect()
      const xDist = e.clientX - rect.right;
      const newWidth = (xDist + scrollArea.value.offsetWidth) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetWidth + xDist)}px !important`

      if (props.cap) {
        dynamicWidth.value = originalWidth.value ? (scrollArea.value.offsetWidth + xDist) > originalWidth.value ? 'fit-content' : newWidth : newWidth
      } else {
        dynamicWidth.value = newWidth
      }
    }
  }

  if (isDraggingY) {
    if (scrollArea.value !== null) {
      const rect = scrollArea.value.getBoundingClientRect()
      const yDist = e.clientY - rect.bottom;
      const newHeight = (yDist + scrollArea.value.offsetHeight) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetHeight + yDist)}px !important`

      if (props.cap) {
        dynamicHeight.value = originalHeight.value ? (scrollArea.value.offsetHeight + yDist) > originalHeight.value ? 'fit-content' : newHeight : newHeight
      } else {
        dynamicHeight.value = newHeight
      }
    }
  }
}

const handleMouseUp = () => {
  isDraggingY = false
  isDraggingX = false
}

onMounted(() => {
  originalHeight.value = scrollArea.value?.offsetHeight;
  originalWidth.value = scrollArea.value?.offsetWidth;

  document?.addEventListener("mousemove", handleMouseMove);
  document?.addEventListener("mouseup", handleMouseUp);
})

onUnmounted(() => {
  document?.removeEventListener("mousemove", handleMouseMove);
  document?.removeEventListener("mouseup", handleMouseUp);
})
</script>
