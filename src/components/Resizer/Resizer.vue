<template>
  <div
    ref="scrollArea"
    data-id="sds-resizer"
    :style="{ height: dynamicHeight }"
  >
    <!-- @slot content.  -->
    <slot />
    <div
      :onmousedown="handleMouseDown"
      class="flex flex-row justify-center hover:cursor-row-resize opacity-50 hover:opacity-100 -top-3 w-full mx-auto relative"
    >
      <svg
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'SdsResizer'
})

const props = defineProps({
  /* Define props, like so:
   * ---
   * type: {
   * type: String as PropType<'light-border' | 'light' | 'medium' | 'dark'>,
   * default: 'medium'
   * },
   */
})

const scrollArea = ref<null | HTMLElement>(null)

let isDragging = false

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging = true
}

const dynamicHeight = ref('');

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  if (scrollArea.value !== null) {
    const rect = scrollArea.value.getBoundingClientRect()
    const dist = e.clientY - rect.bottom;
    const newHeight = (dist + scrollArea.value.offsetHeight) < 1
                      ? '0px !important'
                      : `${(scrollArea.value.offsetHeight + dist)}px !important`

    dynamicHeight.value = newHeight.toString()
  }
}

const handleMouseUp = () => {
  if (isDragging) {
    isDragging = false
  }
}

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
})

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
})
</script>
