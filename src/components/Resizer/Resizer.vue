<template>
  <div
    data-id="sds-resizer"
    class="flex justify-end"
    :class="{
      'flex-col max-w-full': direction === 'bottom',
      'flex-row max-w-full': direction === 'right',
    }"
  >
    <div
      ref="scrollAreaOuter"
      :style="slotSizerOuter()"
      class="relative flex"
      :class="[
        direction === 'right' ?
          'overflow-y-auto overflow-x-hidden flex-row' :
          'overflow-x-auto overflow-y-hidden flex-col',
        isHovering ? 'group' : null,
      ]"
    >
      <div
        ref="scrollAreaInner"
        :class="direction === 'right' ? activeRightHandle : activeBottomHandle"
      >
        <!-- @slot The slot contains the content to be resized (either vertically or horizontally).  -->
        <slot />
      </div>
    </div>
    <div
      class="hover:cursor-grab active:cursor-grabbing opacity-30 hover:opacity-90 relative z-0 bg-transparent"
      :class="{
        'w-full h-0 flex-row': direction === 'bottom',
        'h-full w-0 flex-col': direction === 'right',
      }"
      @click="(e: MouseEvent) => handleDouble(e)"
      @touch="(e: TouchEvent) => handleDouble(e)"
      @mouseout="(e:MouseEvent) => handleOut(e)"
      @mouseover="(e:MouseEvent) => handleOver(e)"
      @mousedown="(e: MouseEvent) => handleDown(e, direction)"
      @touchstart="(e: TouchEvent) => handleDown(e, direction)"
    >
      <div
        class="absolute"
        :class="{
          'w-full h-4': direction === 'bottom',
          'h-full w-4': direction === 'right',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="direction === 'bottom' ? 64 : 16"
          :height="direction === 'bottom' ? 16 : 64"
          :class="{
            'mx-auto': direction === 'bottom',
            'my-auto h-full': direction === 'right'
          }"
          viewBox="0 0 10 10"
        >
          <rect
            :width="direction === 'bottom' ? 32 : 4"
            :height="direction === 'bottom' ? 4 : 32"
            :x="direction === 'bottom' ? -11.5 : 3"
            :y="direction === 'bottom' ? 3 : -11.5"
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
   * Set the initial height (if direction == 'bottom') or
   * width (if direction == 'right').
   */
  initial: { type: Number, default: null },
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

const scrollAreaOuter = ref<null | HTMLElement>(null)
const scrollAreaInner = ref<null | HTMLElement>(null)

/**
 * Variables to keep track of the resizing (dragging) state
 */
let isDraggingRight = false
let isDraggingBottom = false
/**
 * Detect if the handle is hovered to add
 * gradient/shadow effect on scroll area.
 */
let isHovering = ref(false)
/**
 * Configure JSON for double-click event.
 * Track click events, set an ephemeral timer to monitor
 * for a second click before the delay amount.
 */
type DoubleClick = {
  clicks: number,
  timer?: number,
  delay: number,
}
let doubleClick = ref<DoubleClick>({
  clicks: 0,
  timer: undefined,
  delay: 300
})

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
const dynamicWidth = ref<null | string>(null);
const dynamicHeight = ref<null | string>(null);

// Classes for styling the active bottom handle
const activeBottomHandle = [
  'flex-col',
  'overflow-y-scroll',
  'after:mx-auto',
  'after:border-solid',
  'after:border-transparent',
  'after:border-b',
  'group-[.relative]:dark:after:border-white',
  'group-[.relative]:after:border-black',
  'after:content-[""]',
  'after:to-transparent',
  'group-[.relative]:after:bg-gradient-to-t',
  'after:from-black/5',
  'dark:after:from-black/40',
  'dark:after:via-black/5',
  'after:w-full',
  'after:h-12',
  'after:block',
  'after:absolute',
  'after:bottom-0',
  'after:w-fit'
]

// Classes for styling the active right handle
const activeRightHandle = [
  'flex-row',
  'overflow-x-scroll',
  'after:border-solid',
  'after:border-transparent',
  'after:border-r',
  'group-[.relative]:dark:after:border-white',
  'group-[.relative]:after:border-black',
  'after:content-[""]',
  'after:to-transparent',
  'group-[.relative]:after:bg-gradient-to-l',
  'after:from-black/5',
  'dark:after:from-black/40',
  'dark:after:via-black/5',
  'after:w-12',
  'after:h-full',
  'after:block',
  'after:absolute',
  'after:right-0',
  'after:top-0',
  'after:h-[calc(100%+8em)]'
]

const resetScroll = (elem: HTMLElement, direction: String) => {
  if (direction === 'bottom') {
    elem.scrollTop = 0
  } else {
    elem.scrollLeft = 0
  }
}

const handleDouble = (e: MouseEvent | TouchEvent) => {
  /**
   * This function is used to detect a second click in
   * quick succession to the first. If a user double-clicks
   * on the handle, the resizer is resized to its original
   * size (props.initial or fit-{width,height} if the prop
   * hasn't been set).
   */
  e.preventDefault()
  // One click
  doubleClick.value['clicks']++
  if (doubleClick.value['clicks'] === 1) {
    // If timeout reached, reset clicks
    doubleClick.value['timer'] = setTimeout(() => {
      doubleClick.value['clicks'] = 0
    }, doubleClick.value['delay'])
  } else {
    // More than 1 click, clear the timer
    if (doubleClick.value['timer'])
      clearTimeout(doubleClick.value['timer'])
    // Reset the resizer size
    dynamicWidth.value = props.initial ? `${props.initial}px` : originalWidth.value ? `${originalWidth.value}px` : null
    dynamicHeight.value = props.initial ? `${props.initial}px` : originalHeight.value ? `${originalHeight.value}px` : null
    // Scroll to the top (or left for "right" resize direction)
    if (scrollAreaInner.value)
      resetScroll(scrollAreaInner.value, props.direction)
    // Reset clicks
    doubleClick.value['clicks'] = 0
  }
}

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

const handleOver = (e: MouseEvent) => {
  e.preventDefault()
  if (isDraggingRight || isDraggingBottom) return
  isHovering.value = true
}

const handleOut = (e: MouseEvent) => {
  e.preventDefault()
  if (isDraggingRight || isDraggingBottom) return
  isHovering.value = false
}

const handleMove = (e: MouseEvent | TouchEvent) => {
  // Return immediately if the mouse isn't being dragged
  if (!isDraggingRight && !isDraggingBottom) return
  // Handle mouse resizing horizontally
  if (isDraggingRight) {
    if (scrollAreaOuter.value !== null) { // Make sure it's slot content is reachable
      // Get the bounding rectangle of the scroll area
      const rect = scrollAreaOuter.value.getBoundingClientRect()
      if (e instanceof MouseEvent) {
        xDist = e.clientX - rect.right;
      } else {
        if (window?.TouchEvent && e instanceof TouchEvent) {
          xDist = e.touches[0].clientX - rect.right;
        }
      }
      // Set the new width of the scroll area
      const newWidth = (xDist + scrollAreaOuter.value.offsetWidth) < 1
                        ? '0px !important'
                        : `${(scrollAreaOuter.value.offsetWidth + xDist)}px !important`
      // If "clamp" property is set, limit the width to the original width
      if (props.clamp) {
        const nextValue = originalWidth.value ? (scrollAreaOuter.value.offsetWidth + xDist) > (props.direction === 'right' ? originalWidth.value : originalWidth.value) ? dynamicWidth.value : newWidth : newWidth
        if (nextValue) {
          if (parseInt(nextValue) > props.min) {
            dynamicWidth.value = nextValue
          }
        }
      } else {
        dynamicWidth.value = newWidth
      }
    }
  }
  // Handle mouse resizing vertically
  if (isDraggingBottom) {
    if (scrollAreaOuter.value !== null) { // Make sure it's slot content is reachable
      // Get the bounding rectangle of the scroll area
      const rect = scrollAreaOuter.value.getBoundingClientRect()
      if (e instanceof MouseEvent) {
        yDist = e.clientY - rect.bottom;
      } else {
        if (window?.TouchEvent && e instanceof TouchEvent) {
          yDist = e.touches[0].clientY - rect.bottom;
        }
      }
      // Set the new height of the scroll area
      const newHeight = (yDist + scrollAreaOuter.value.offsetHeight) < 1
                        ? '0px !important'
                        : `${(scrollAreaOuter.value.offsetHeight + yDist)}px !important`
      // If "clamp" property is set, limit the height to the original height
      if (props.clamp) {
        const nextValue = originalHeight.value ? (scrollAreaOuter.value.offsetHeight + yDist) > originalHeight.value ? dynamicHeight.value : newHeight : newHeight
        if (nextValue) {
          if (parseInt(nextValue) > props.min) {
            dynamicHeight.value = nextValue
          }
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
    if (dynamicHeight.value) {
      if (dynamicHeight.value > originalHeight.value) {
          return 'fit-content'
      } else {
          return dynamicHeight.value
      }
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
  if (props.direction === 'right') {
    return {
      width: slotOuterWidth()
    } as StyleValue
  } else {
    return {
      height: slotOuterHeight()
    } as StyleValue
  }
}

const setDefaults = () => {
  /**
   * Get the original width/height of the scroll
   * area and save that initial value for reference.
   * This calculation uses scrollHeight/scrollWidth
   * to get the entire calculated content dimensions.
   */
  originalHeight.value = originalHeight.value ? originalHeight.value : scrollAreaOuter.value?.scrollHeight;
  originalWidth.value = originalWidth.value ? originalWidth.value : scrollAreaOuter.value?.scrollWidth;
  /**
   * If there is an initial prop and no one has dragged the handle,
   * set the initial size. Which one is used, width or height,
   * is controlled by the "direction" prop.
   */
  if (props.initial && (dynamicWidth.value == null && dynamicHeight.value == null)) {
    if (props.direction === 'bottom') {
      // Set initial height if direction is "bottom"
      dynamicHeight.value = `${props.initial}px`
    } else {
      // Otherwise, it's a "right" resizer, so set the initial width
      dynamicWidth.value = `${props.initial}px`
    }
  }
}

onMounted(() => {
  setDefaults()
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
