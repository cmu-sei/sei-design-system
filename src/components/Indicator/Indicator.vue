<template>
  <div
    data-id="sds-indicator"
    class="inline-block"
  >
    <div class="relative">
      <!-- @slot Indicator content.  -->
      <slot />
      <div
        v-if="!hideIndicator"
        role="status"
        class="absolute rounded-full"
        :class="[placementClass, sizeClass, surfaceClass, variantClass]"
      >
        <span
          v-if="status"
          class="sr-only"
        >{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsIndicator'
})

const props = defineProps({
  /**
   * Background (border) color for the indicator in dark mode
   */
  darkSurface: {
    type: String as PropType<'darkest' | 'darker' | 'dark'>,
    default: 'dark'
  },
  /**
   * Determines whether to display the indicator or not.
   */
  hideIndicator: {
    type: Boolean, default: false
  },
  /**
   * Determines the placement of the indicator.
   */
  placement: {
    type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
    default: 'top-right'
  },
  /**
   * Determines whether the indicator is placed over a portrait (rectangle) or a circle.
   */
  placementOver: {
    type: String as PropType<'portrait' | 'circle'>,
    default: 'portrait'
  },
  /**
   * Determines the size of the component.
   */
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  },
  /**
   * Determines the status of the indicator (used for accessibility).
   */
  status: {
    type: String, default: null
  },
  /**
   * Background (border) color for the indicator in light mode
   */
  surface: {
    type: String as PropType<'darkest' | 'darker' | 'dark' | 'light' | 'lighter' | 'lightest'>,
    default: 'lightest'
  },
  /**
   * Determines the color of the component.
   */
  variant: {
    type: String as PropType<'gray' | 'blue' | 'green' | 'orange' | 'red'>,
    default: 'primary'
  }
})

const placementClass = computed(() => {
  switch (props.size) {
    case 'sm':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? 'top-0.5 right-0.5' : '-top-1 -right-1'
        case 'top-left':
          return props.placementOver === 'circle' ? 'top-0.5 left-0.5' : '-top-1 -left-1'
        case 'bottom-right':
          return props.placementOver === 'circle' ? 'bottom-0.5 right-0.5' : '-bottom-1 -right-1'
        case 'bottom-left':
          return props.placementOver === 'circle' ? 'bottom-0.5 left-0.5' : '-bottom-1 -left-1'
      }
    case 'lg':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? 'top-1.5 right-1.5' : '-top-2.5 -right-2.5'
        case 'top-left':
          return props.placementOver === 'circle' ? 'top-1.5 left-1.5' : '-top-2.5 -left-2.5'
        case 'bottom-right':
          return props.placementOver === 'circle' ? 'bottom-1.5 right-1.5' : '-bottom-2.5 -right-2.5'
        case 'bottom-left':
          return props.placementOver === 'circle' ? 'bottom-1.5 left-1.5' : '-bottom-2.5 -left-2.5'
      }
    case 'md':
    default:
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? 'top-0.5 right-0.5' : '-top-1.5 -right-1.5'
        case 'top-left':
          return props.placementOver === 'circle' ? 'top-0.5 left-0.5' : '-top-1.5 -left-1.5'
        case 'bottom-right':
          return props.placementOver === 'circle' ? 'bottom-0.5 right-0.5' : '-bottom-1.5 -right-1.5'
        case 'bottom-left':
          return props.placementOver === 'circle' ? 'bottom-0.5 left-0.5' : '-bottom-1.5 -left-1.5'
      }
    return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-3 w-3 border'
    case 'lg':
      return 'h-10 w-10 border-4'
    case 'md':
    default:
      return 'h-4 w-4 border-2'
  }
})

const surfaceClass = computed(() => {
  let joinedClass = []
  switch (props.surface) {
    default:
      joinedClass[0] = 'border-white'
      joinedClass[1] = 'dark:border-gray-900'
      break
    case 'lightest':
      joinedClass[0] = 'border-white'
      joinedClass[1] = 'dark:border-gray-900'
      break
    case 'lighter':
      joinedClass[0] = 'border-gray-50'
      joinedClass[1] = 'dark:border-gray-950'
      break
    case 'light':
      joinedClass[0] = 'border-gray-25'
      joinedClass[1] = 'dark:border-black'
      break
    case 'dark':
      joinedClass[0] = 'border-gray-900'
      joinedClass[1] = 'dark:border-white'
      break
    case 'darker':
      joinedClass[0] = 'border-gray-950'
      joinedClass[1] = 'dark:border-gray-25'
      break
    case 'darkest':
      joinedClass[0] = 'border-black'
      joinedClass[1] = 'dark:border-gray-50'
      break
  }
  switch (props.darkSurface) {
    default:
      joinedClass[1] = 'dark:border-gray-900'
      break
    case 'dark':
      joinedClass[1] = 'dark:border-gray-900'
      break
    case 'darker':
      joinedClass[1] = 'dark:border-gray-25'
      break
    case 'darkest':
      joinedClass[1] = 'dark:border-gray-50'
      break
  }
  return joinedClass.join(' ')
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'gray':
      return 'bg-gray-300'
    case 'green':
      return 'bg-green-500 dark:bg-green-400'
    case 'orange':
      return 'bg-orange-500 dark:bg-orange-400'
    case 'red':
      return 'bg-red-500 dark:bg-red-400'
    case 'blue':
    default:
      return 'bg-blue-500 dark:bg-blue-400'
  }
})
</script>
