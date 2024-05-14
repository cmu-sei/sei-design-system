<template>
  <div
    data-id="sds-resizer"
    class="flex max-w-full justify-end"
    :class="{
      'flex-col-reverse': direction === 'bottom',
      'flex-row-reverse': direction === 'right',
    }"
  >
    <div
      :onmousedown="(e: MouseEvent) => handleMouseDown(e, direction)"
      class="flex peer justify-center self-center hover:cursor-grab active:cursor-grabbing opacity-40 hover:opacity-100 relative z-20"
      :class="{
        'flex-col ml-0 -mr-2 h-full w-2': direction === 'right',
        'flex-row mx-auto -mb-2 w-full h-2': direction === 'bottom'
      }"
    >
      <div class="absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="direction === 'bottom' ? 64 : 8"
          :height="direction === 'bottom' ? 8 : 64"
          :class="{
            'mx-auto': direction === 'bottom',
            'my-auto': direction === 'right'
          }"
          viewBox="0 0 10 10"
        >
          <rect
            :width="direction === 'bottom' ? 32 : 4"
            :height="direction === 'bottom' ? 4 : 32"
            :x="direction === 'bottom' ? -10 : 3"
            :y="direction === 'bottom' ? 3 : -10"
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0"
            rx="2"
          />
        </svg>
      </div>
    </div>
    <div
      ref="scrollArea"
      :style="slotSizerOuter()"
      class="border-solid border-transparent peer-hover:dark:border-white peer-hover:border-black"
      :class="{
        'border-b overflow-y-auto overflow-x-hidden': direction === 'bottom',
        'border-r overflow-x-auto overflow-y-hidden': direction === 'right',
      }"
    >
      <div
        :style="slotSizerInner()"
      >
        <!-- @slot content to be resized.  -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, StyleValue } from 'vue'

defineOptions({
  name: 'SdsResizer'
})

const props = defineProps({
  /*
   * If the "clamp" property is set,
   * the slot content can not be
   * resized beyond its original size.
   */
  clamp: {
    type: Boolean,
    default: true,
  },
  /*
   * Set the direction you'd like the
   * resizer to grow/shrink. This is
   * the side of the slot content that
   * can be clicked and dragged.
   */
  direction: {
    type: String as PropType<'right' | 'bottom'>,
    default: 'bottom'
  }
})

const scrollArea = ref<null | HTMLElement>(null)
// Variables to keep track of the resizing state
let isDraggingRight = false
let isDraggingBottom = false
// Starting width/height of the slot content
const originalWidth = ref();
const originalHeight = ref();
// Dynamic width/height as the slot content is being resized
const dynamicWidth = ref('');
const dynamicHeight = ref('');

const handleMouseDownRight = (e: MouseEvent) => {
  /* Resizer event on mouse down, starts
   * the horizontal re-sizing function by
   * setting isDraggingRight */
  e.preventDefault()
  isDraggingRight = true
}

const handleMouseDownBottom = (e: MouseEvent) => {
  /* Resizer event on mouse down, starts
   * the vertical re-sizing function by
   * setting isDraggingBottom */
  e.preventDefault()
  isDraggingBottom = true
}

const handleMouseDown = (e: MouseEvent, direction: 'bottom' | 'right') => {
  /* Handle mouse down event,
   * pass to appropriate callback
   * based on direction. */
  switch (direction) {
    case 'bottom':
      handleMouseDownBottom(e)
      break
    case 'right':
      handleMouseDownRight(e)
      break
    default:
      handleMouseDownBottom(e)
      break
  }
}

const handleMouseMove = (e: MouseEvent) => {
  // Return immediately if the mouse isn't being dragged
  if (!isDraggingRight && !isDraggingBottom) return
  // Handle mouse resizing horizontally
  if (isDraggingRight) {
    if (scrollArea.value !== null) { // Make sure it's slot content is reachable
      // Get the bounding rectangle of the scroll area
      const rect = scrollArea.value.getBoundingClientRect()
      // Get the distance of the mouse from the right edge of the scroll area
      const xDist = e.clientX - rect.right;
      // Set the new width of the scroll area
      const newWidth = (xDist + scrollArea.value.offsetWidth) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetWidth + xDist)}px !important`
      // If "clamp" property is set, limit the width to the original width
      if (props.clamp) {
        dynamicWidth.value = originalWidth.value ? (scrollArea.value.offsetWidth + xDist) > originalWidth.value ? dynamicWidth.value : newWidth : newWidth
      } else {
        dynamicWidth.value = newWidth
      }
    }
  }
  // Handle mouse resizing vertically
  if (isDraggingBottom) {
    if (scrollArea.value !== null) { // Make sure it's slot content is reachable
      // Get the bounding rectangle of the scroll area
      const rect = scrollArea.value.getBoundingClientRect()
      // Get the distance of the mouse from the bottom edge of the scroll area
      const yDist = e.clientY - rect.bottom;
      // Set the new height of the scroll area
      const newHeight = (yDist + scrollArea.value.offsetHeight) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetHeight + yDist)}px !important`
      // If "clamp" property is set, limit the height to the original height
      if (props.clamp) {
        dynamicHeight.value = originalHeight.value ? (scrollArea.value.offsetHeight + yDist) > originalHeight.value ? dynamicHeight.value : newHeight : newHeight
      } else {
        dynamicHeight.value = newHeight
      }
    }
  }
}

const handleMouseUp = () => {
  /* Stop resizing when the mouse is released */
  isDraggingRight = false
  isDraggingBottom = false
}

const slotOuterHeight = () => {
  /* Configure outer slot height */
  if (props.direction === 'bottom') {
    if (dynamicHeight.value > originalHeight.value) {
        return 'fit-content'
    } else {
        return dynamicHeight.value
    }
  } else if (props.direction === 'right') {
    return ''
  }
}

const slotOuterWidth = () => {
  /* Configure outer slot width */
  if (props.direction === 'right') {
    return dynamicWidth.value
  } else if (props.direction === 'bottom') {
    return ''
  }
}

const slotSizerOuter = () => {
  /* Configure outer slot dimensions */
  return {
    height: slotOuterHeight(),
    width: slotOuterWidth()
  } as StyleValue
}

const slotInnerHeight = () => {
  /* Configure slot inner height for clamping */
  if (props.direction === 'bottom') {
    if (dynamicHeight.value > originalHeight.value) {
      return 'fit-content'
    } else {
      return dynamicHeight
    }
  } else if (props.direction === 'right') {
    return 'fit-content'
  }
}

const slotInnerWidth = () => {
  /* Configure slot inner width for clamping */
  if (props.direction === 'right') {
    return `${originalWidth.value}px`
  } else if (props.direction === 'bottom') {
    return `${originalWidth.value}px`
  }
}

const slotSizerInner = () => {
  /* Configure inner slot dimensions for clamping */
  return {
    height: slotInnerHeight(),
    width: slotInnerWidth()
  } as StyleValue
}

onMounted(() => {
  /* Get the original width/height of the scroll
   * area and save that initial value for reference. */
  originalHeight.value = scrollArea.value?.offsetHeight;
  originalWidth.value = scrollArea.value?.offsetWidth;
  /* Setup mouse handler events on the document */
  document?.addEventListener("mousemove", handleMouseMove);
  document?.addEventListener("mouseup", handleMouseUp);
})

onUnmounted(() => {
  /* Clean up mouse handlers on unmount */
  document?.removeEventListener("mousemove", handleMouseMove);
  document?.removeEventListener("mouseup", handleMouseUp);
})
</script>
