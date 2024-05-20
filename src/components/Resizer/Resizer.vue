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
      :onmousedown="(e: MouseEvent) => handleDown(e, direction)"
      :ontouchstart="(e: TouchEvent) => handleDown(e, direction)"
      class="flex peer justify-center self-center hover:cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 relative z-20"
      :class="{
        'flex-col ml-0 -mr-4 h-full w-4': direction === 'right',
        'flex-row mx-auto -mb-4 w-full h-4': direction === 'bottom'
      }"
    >
      <div
        class="absolute"
        :class="{
          'h-4': direction === 'bottom',
          'w-4': direction === 'right',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="direction === 'bottom' ? 64 : 16"
          :height="direction === 'bottom' ? 16 : 64"
          :class="{
            'mx-auto': direction === 'bottom',
            'my-auto': direction === 'right'
          }"
          viewBox="0 0 10 10"
        >
          <rect
            :width="direction === 'bottom' ? 32 : 4"
            :height="direction === 'bottom' ? 4 : 32"
            :x="direction === 'bottom' ? -11.5 : 4"
            :y="direction === 'bottom' ? 4 : -11.5"
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
      class="border-solid border-transparent peer-hover:dark:border-white peer-hover:border-black after:content-[''] after:border-solid after:to-transparent after:border-transparent after:z-30 dark:after:via-black/5 dark:after:from-black/40 after:from-black/5"
      :class="{
        'border-b overflow-y-auto overflow-x-hidden peer-hover:after:border-b peer-hover:after:w-full peer-hover:after:-mt-12 peer-hover:after:h-12 peer-hover:after:bg-gradient-to-t after:block after:sticky after:bottom-0 after:w-fit': direction === 'bottom',
        'border-r overflow-x-auto overflow-y-hidden peer-hover:after:border-r peer-hover:after:h-full peer-hover:after:-ml-12 peer-hover:after:w-12 peer-hover:after:bg-gradient-to-l after:block after:relative after:-right-full after:-top-full after:h-[calc(100%+8em)]': direction === 'right',
      }"
    >
      <div
        :style="slotSizerInner()"
      >
        <!-- @slot The slot contains the content to be resized (either vertically or horizontally).  -->
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
  /**
   * If the "clamp" property is set,
   * the slot content can not be
   * resized beyond its original size.
   */
  clamp: { type: Boolean, default: true },
  /**
   * Set the direction you'd like the
   * resizer to grow/shrink. This is
   * the side of the slot content that
   * can be clicked and dragged.
   */
  direction: { type: String as PropType<'right' | 'bottom'>, default: 'bottom' },
  /**
   * Set the max width (if direction right)
   * or max height (if direction bottom) of
   * the resizer. If no max is set, the original
   * width or height will be used (if clamp is true).
   */
  max: { type: Number, default: null },
  /**
   * Set the min width (if direction right)
   * or min height (if direction bottom) of
   * the resizer. If no min is set, resizer
   * will be able to shrink to 0.
   */
  min: { type: Number, default: null }
})

const scrollArea = ref<null | HTMLElement>(null)

// Variables to keep track of the resizing state
let isDraggingRight = false
let isDraggingBottom = false

/**
 * Get the distance of the mouse from the
 * right (x) and bottom (y) edges of the scroll area
 */
let xDist = 0;
let yDist = 0;

// Starting width/height of the slot content
const originalWidth = props.max ? props.direction === 'right' ? ref(props.max) : ref() : ref();
const originalHeight = props.max ? props.direction === 'bottom' ? ref(props.max) : ref() : ref();

// Dynamic width/height as the slot content is being resized
const dynamicWidth = ref('');
const dynamicHeight = ref('');

const handleDownRight = (e: MouseEvent | TouchEvent) => {
  /**
   * Resizer event on mouse down, starts
   * the horizontal re-sizing function by
   * setting isDraggingRight
   */
  e.preventDefault()
  isDraggingRight = true
}

const handleDownBottom = (e: MouseEvent | TouchEvent) => {
  /**
   * Resizer event on mouse down, starts
   * the vertical re-sizing function by
   * setting isDraggingBottom
   */
  e.preventDefault()
  isDraggingBottom = true
}

const handleDown = (e: MouseEvent | TouchEvent, direction: 'bottom' | 'right') => {
  /**
   * Handle mouse down event,
   * pass to appropriate callback
   * based on direction.
   */
  switch (direction) {
    case 'bottom':
      handleDownBottom(e)
      break
    case 'right':
      handleDownRight(e)
      break
    default:
      handleDownBottom(e)
      break
  }
}

const handleMove = (e: MouseEvent | TouchEvent) => {
  // Return immediately if the mouse isn't being dragged
  if (!isDraggingRight && !isDraggingBottom) return
  // Handle mouse resizing horizontally
  if (isDraggingRight) {
    if (scrollArea.value !== null) { // Make sure it's slot content is reachable
      // Get the bounding rectangle of the scroll area
      const rect = scrollArea.value.getBoundingClientRect()
      if (e instanceof TouchEvent) {
        xDist = e.touches[0].clientX - rect.right;
      }
      if (e instanceof MouseEvent) {
        xDist = e.clientX - rect.right;
      }
      // Set the new width of the scroll area
      const newWidth = (xDist + scrollArea.value.offsetWidth) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetWidth + xDist)}px !important`
      // If "clamp" property is set, limit the width to the original width
      if (props.clamp) {
        const nextValue = originalWidth.value ? (scrollArea.value.offsetWidth + xDist) > originalWidth.value ? dynamicWidth.value : newWidth : newWidth
        if (parseInt(nextValue) > props.min) {
          dynamicWidth.value = nextValue
        }
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
      if (e instanceof TouchEvent) {
        yDist = e.touches[0].clientY - rect.bottom;
      }
      if (e instanceof MouseEvent) {
        yDist = e.clientY - rect.bottom;
      }
      // Set the new height of the scroll area
      const newHeight = (yDist + scrollArea.value.offsetHeight) < 1
                        ? '0px !important'
                        : `${(scrollArea.value.offsetHeight + yDist)}px !important`
      // If "clamp" property is set, limit the height to the original height
      if (props.clamp) {
        const nextValue = originalHeight.value ? (scrollArea.value.offsetHeight + yDist) > originalHeight.value ? dynamicHeight.value : newHeight : newHeight
        if (parseInt(nextValue) > props.min) {
          dynamicHeight.value = nextValue
        }
      } else {
        dynamicHeight.value = newHeight
      }
    }
  }
}

const handleUp = (_e: MouseEvent | TouchEvent) => {
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
    width: slotOuterWidth(),
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
    width: slotInnerWidth(),
  } as StyleValue
}

onMounted(() => {
  /**
   * Get the original width/height of the scroll
   * area and save that initial value for reference.
   */
  originalHeight.value = originalHeight.value ? originalHeight.value : scrollArea.value?.offsetHeight;
  originalWidth.value = originalWidth.value ? originalWidth.value : scrollArea.value?.offsetWidth;
  // Setup mouse handler events on the document
  document?.addEventListener("mousemove", handleMove);
  document?.addEventListener("touchmove", handleMove);
  document?.addEventListener("mouseup", handleUp);
  document?.addEventListener("touchend", handleUp);
})

onUnmounted(() => {
  // Clean up mouse handlers on unmount
  document?.removeEventListener("mousemove", handleMove);
  document?.removeEventListener("touchmove", handleMove);
  document?.removeEventListener("mouseup", handleUp);
  document?.removeEventListener("touchend", handleUp);
})
</script>
