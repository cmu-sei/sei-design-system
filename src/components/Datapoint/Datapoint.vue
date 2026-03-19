<template>
  <div>
    <div
      v-if="$slots.label || label"
      class="text-base"
    >
      <!-- @slot Label context.  -->
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="flex gap-2">
      <div
        class="font-bold"
        :class="[sizeClass, variantClass]"
      >
        <!-- @slot Datapoint context.  -->
        <slot>{{ modelValueDisplay }}</slot>
      </div>
      <div
        v-if="$slots.context || context"
        class="text-base mt-auto"
      >
        <!-- @slot Context context.  -->
        <slot name="context">
          {{ context }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsDatapoint'
})

interface DatapointProps {
  /**
   * Determines the content of the label slot.
   * 
   * This is overridden if the label slot is present.
   */
  label?: string | null;
  /**
   * Determines the content of the context slot.
   * 
   * This is overridden if the context slot is present.
   */
  context?: string | null;
  /**
   * Determines the overall look and feel of the component.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Determines the color of the component.
   */
  variant?: 'gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green' | null;
}

const props = withDefaults(defineProps<DatapointProps>(), {
  label: null,
  context: null,
  size: 'md',
  variant: null
})

/**
 * Determines the content of the default slot.
 * 
 * This is overridden if the default slot is present.
 */
const model = defineModel<string | number | null>({ type: [String, Number], default: null })

const modelValueDisplay = computed(() =>  {
  if (typeof model.value === 'number') {
    return model.value.toLocaleString()
  }
  return model.value
})

const sizeClass = computed(() => {
  switch(props.size) {
    case 'sm':
      return 'text-lg'
      break
    case 'md':
      return 'text-3xl'
      break
    default:
      return 'text-5xl'
  }
})

const variantClass = computed(() => {
  switch(props.variant) {
    case 'blue':
      return 'text-blue-600 dark:text-blue-400'
    case 'green':
      return 'text-green-600 dark:text-green-400'
    case 'teal':
      return 'text-teal-600 dark:text-teal-400'
    case 'orange':
      if (props.size === 'lg') {
        return 'text-orange-400 dark:text-orange-300'
      } else if (props.size === 'md') {
        return 'text-orange-500 dark:text-orange-300'
      } else {
        return 'text-orange-600 dark:text-orange-300'
      }
    case 'red':
      return 'text-red-600 dark:text-red-400'
    case 'tan':
      return 'text-tan-600 dark:text-tan-400'
    case 'yellow':
      if (props.size === 'sm') {
        return 'text-yellow-600 dark:text-yellow-300'
      } else {
        return 'text-yellow-500 dark:text-yellow-300'
      }
    case 'purple':
      return 'text-purple-600 dark:text-purple-400'
    case 'indigo':
      return 'text-indigo-600 dark:text-indigo-400'
    case 'gray':
      return 'text-gray-600 dark:text-gray-300'
    default:
      return 'text-black dark:text-white'
  }
})
</script>
