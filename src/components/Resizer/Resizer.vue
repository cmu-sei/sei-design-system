<template>
  <div class="flex flex-col-reverse">
    <div
      :onmousedown="handleMouseDown"
      :class="[
        'flex',
        'flex-row',
        'peer',
        'justify-center',
        'hover:cursor-grab',
        'active:cursor-grabbing',
        'opacity-40',
        'hover:opacity-100',
        'w-full',
        'mx-auto',
        'relative',
      ]"
    >
      <svg
        v-if="handle === 'arrow'"
        class="-top-3 relative"
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
      data-id="sds-resizer"
      :style="{ height: dynamicHeight }"
      class="overflow-auto border-b border-solid border-opacity-0 border-black dark:border-white"
      :class="{
        'peer-hover:border-opacity-100': props.border === 'hover',
        'border-opacity-100': props.border === 'on',
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
  border: {
    type: String as PropType<'on' | 'hover'>,
    default: 'hover'
  },
  handle: {
    type: String as PropType<'arrow' | 'bar' | 'dots'>,
    default: 'arrow'
  },
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
