<template>
  <div
    data-id="sds-loading-spinner"
    role="status"
  >
    <svg
      class="animate-spin"
      :class="sizeClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span
      v-if="label"
      class="sr-only"
    >{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { useVariantClasses } from '@/composables'
defineOptions({
  name: 'SdsLoadingSpinner'
})

interface LoadingSpinnerProps {
  /**
   * Sets the size of the spinner.
   */
  size?: 'lg' | 'md' | 'sm' | 'auto' | ''
  /**
   * Sets the accessiblity label for the spinner.
   */
  label?: string | null
}

const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: 'md',
  label: null
})

const sizeClass = useVariantClasses(() => props.size, {
  lg: 'h-20 w-20',
  sm: 'h-4 w-4',
  auto: ''
}, 'h-12 w-12')
</script>
