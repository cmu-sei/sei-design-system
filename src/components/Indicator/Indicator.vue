<template>
  <div
    data-id="sds-indicator"
    class="inline-block"
  >
    <div class="flex items-start relative">
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
  </div>
</template>

<script setup lang="ts">
import { getIndicatorMaskSpec, getIndicatorMaskAlign } from '@/helpers/indicatorMask'
defineOptions({
  name: 'SdsIndicator'
})

interface IndicatorProps {
  /**
   * Determines whether to display the indicator or not.
   */
  hideIndicator?: boolean
  /**
   * Determines the placement of the indicator.
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /**
   * Determines whether the indicator is placed over a portrait (rectangle) or a circle.
   */
  placementOver?: 'portrait' | 'circle' | 'square'
  /**
   * Determines the size of the component.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * Determines the status of the indicator (used for accessibility).
   */
  status?: string | null
  /**
   * Determines the color of the component.
   */
  variant?: 'gray' | 'blue' | 'green' | 'orange' | 'red'
}

const props = withDefaults(defineProps<IndicatorProps>(), {
  hideIndicator: false,
  placement: 'top-right',
  placementOver: 'portrait',
  size: 'md',
  status: null,
  variant: 'blue'
})

const placementClass = computed(() => {
  switch (props.size) {
    case 'xs':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? '-top-0.5 -right-0.5' : '-top-1 -right-1'
        case 'top-left':
          return props.placementOver === 'circle' ? '-top-0.5 -left-0.5' : '-top-1 -left-1'
        case 'bottom-right':
          return props.placementOver === 'circle' ? '-bottom-0.5 -right-0.5' : '-bottom-1 -right-1'
        case 'bottom-left':
          return props.placementOver === 'circle' ? '-bottom-0.5 -left-0.5' : '-bottom-1 -left-1'
        default:
          return null
      }
    case 'sm':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? '-top-0.5 -right-0.5' : '-top-0.75 -right-0.75'
        case 'top-left':
          return props.placementOver === 'circle' ? '-top-0.5 -left-0.5' : '-top-0.75 -left-0.75'
        case 'bottom-right':
          return props.placementOver === 'circle' ? '-bottom-0.5 -right-0.5' : '-bottom-0.75 -right-0.75'
        case 'bottom-left':
          return props.placementOver === 'circle' ? '-bottom-0.5 -left-0.5' : '-bottom-0.75 -left-0.75'
        default:
          return null
      }
    case 'lg':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? '-top-1 -right-1' : '-top-2 -right-2'
        case 'top-left':
          return props.placementOver === 'circle' ? '-top-1 -left-1' : '-top-2 -left-2'
        case 'bottom-right':
          return props.placementOver === 'circle' ? '-bottom-1 -right-1' : '-bottom-2 -right-2'
        case 'bottom-left':
          return props.placementOver === 'circle' ? '-bottom-1 -left-1' : '-bottom-2 -left-2'
        default:
          return null
      }
    case 'xl':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? '-top-1 -right-1' : '-top-2.5 -right-2.5'
        case 'top-left':
          return props.placementOver === 'circle' ? '-top-1 -left-1' : '-top-2.5 -left-2.5'
        case 'bottom-right':
          return props.placementOver === 'circle' ? '-bottom-1 -right-1' : '-bottom-2.5 -right-2.5'
        case 'bottom-left':
          return props.placementOver === 'circle' ? '-bottom-1 -left-1' : '-bottom-2.5 -left-2.5'
        default:
          return null
      }
    case '2xl':
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? 'top-1.5 right-1.5' : '-top-2.5 -right-2.5'
        case 'top-left':
          return props.placementOver === 'circle' ? 'top-1.5 left-1.5' : '-top-2.5 -left-2.5'
        case 'bottom-right':
          return props.placementOver === 'circle' ? 'bottom-1.5 right-1.5' : '-bottom-2.5 -right-2.5'
        case 'bottom-left':
          return props.placementOver === 'circle' ? 'bottom-1.5 left-1.5' : '-bottom-2.5 -left-2.5'
        default:
          return null
      }
    case 'md':
    default:
      switch (props.placement) {
        case 'top-right':
          return props.placementOver === 'circle' ? '-top-0.5 -right-0.5' : '-top-1.75 -right-1.75'
        case 'top-left':
          return props.placementOver === 'circle' ? '-top-0.5 -left-0.5' : '-top-1.75 -left-1.75'
        case 'bottom-right':
          return props.placementOver === 'circle' ? '-bottom-0.5 -right-0.5' : '-bottom-1.75 -right-1.75'
        case 'bottom-left':
          return props.placementOver === 'circle' ? '-bottom-0.5 -left-0.5' : '-bottom-1.75 -left-1.75'
        default:
          return null
      }
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-2 w-2'
    case 'sm':
      return 'h-2.5 w-2.5'
    case 'lg':
      return 'h-6 w-6'
    case 'xl':
      return 'h-8 w-8'
    case '2xl':
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
      return 'bg-red-600 dark:bg-red-400'
    case 'blue':
    default:
      return 'bg-blue-600 dark:bg-blue-400'
  }
})

const maskSpec = computed(() =>
  getIndicatorMaskSpec(props.size, props.placement, props.placementOver, props.hideIndicator)
)

const maskAlign = computed(() =>
  getIndicatorMaskAlign(props.placement)
)
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
