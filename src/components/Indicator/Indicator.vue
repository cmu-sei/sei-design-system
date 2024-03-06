<template>
  <div
    data-id="sds-indicator"
    class="flex relative"
  >
    <!-- @slot Indicator content.  -->
    <slot />
    <div
      v-if="!hideIndicator"
      role="status"
      class="absolute rounded-full"
      :class="[placementClass, sizeClass, variantClass]"
    >
      <span
        v-if="status"
        class="sr-only"
      >{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsIndicator'
})

const props = defineProps({
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
      return 'h-3 w-3'
    case 'lg':
      return 'h-10 w-10'
    case 'md':
    default:
      return 'h-4 w-4'
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'gray':
      return 'bg-gray-300'
    case 'green':
      return 'bg-green-500 dark:bg-green-300'
    case 'orange':
      return 'bg-orange-500 dark:bg-orange-300'
    case 'red':
      return 'bg-red-500 dark:bg-red-300'
    case 'blue':
    default:
      return 'bg-blue-500 dark:bg-blue-300'
  }
})

const maskSpec = computed(() => {
  let vbWidth = 1000
  let vbHeight = 1000

  let maskX = 0
  let maskY = 0

  let maskRadius = 0
  let offset = 0

  switch (props.size) {
    case 'sm':
      offset = props.placementOver === 'circle' ? 0 : -2
      maskRadius = 8
      break
    case 'md':
      offset = props.placementOver === 'circle' ? -1 : -4
      maskRadius = 11
      break
    case 'lg':
      offset = props.placementOver === 'circle' ? 1 : -2
      maskRadius = 25
      break
  }

  if (props.placementOver === 'circle') {
    switch (props.placement) {
      case 'top-left':
        maskX = maskRadius + offset
        maskY = maskRadius + offset
        break
      case 'top-right':
        maskX = vbWidth - maskRadius - offset
        maskY = maskRadius + offset
        break
      case 'bottom-right':
        maskX = vbWidth - maskRadius - offset
        maskY = vbHeight - maskRadius - offset
        break
      case 'bottom-left':
        maskX = maskRadius + offset
        maskY = vbHeight - maskRadius - offset
    }
  } else {
    switch (props.placement) {
      case 'top-left':
        maskX = maskRadius/2 + offset
        maskY = maskRadius/2 + offset
        break
      case 'top-right':
        maskX = vbWidth - maskRadius/2 - offset
        maskY = maskRadius/2 + offset
        break
      case 'bottom-right':
        maskX = vbWidth - maskRadius/2 - offset
        maskY = vbHeight - maskRadius/2 - offset
        break
      case 'bottom-left':
        maskX = maskRadius/2 + offset
        maskY = vbHeight - maskRadius/2 - offset
    }
  }

  return props.hideIndicator ? 'none' : `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><circle cx="${maskX}" cy="${maskY}" r="${maskRadius}" /></svg>'), linear-gradient(#fff, #fff)`
})

const maskAlign = computed(() => {
  switch (props.placement) {
    case 'top-left':
      return '0 0'
    case 'top-right':
      return '100% 0'
    case 'bottom-right':
      return '100% 100%'
    case 'bottom-left':
      return '0 100%'
  }
})
</script>

<style scoped>
:slotted(div[data-id="sds-avatar"]),
:slotted(.btn) {
  mask: v-bind('maskSpec');
  mask-clip: no-clip;
  mask-repeat: no-repeat;
  mask-composite: exclude;
  mask-position: v-bind('maskAlign');
  mask-origin: border-box;
  mask-size: 1000px 1000px;
}
</style>
