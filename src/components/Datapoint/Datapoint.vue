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

const props = defineProps({
  /**
   * Determines the content of the label slot.
   * 
   * This is overridden if the label slot is present.
   */
  label: { type: String, default: null },
  /**
   * Determines the content of the context slot.
   * 
   * This is overridden if the context slot is present.
   */
  context: { type: String, default: null },
  /**
   * Determines the overall look and feel of the component.
   */
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  },
  /**
   * Determines the color of the component.
   */
  variant: {
    type: String as PropType<'gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green'>,
    default: null
  }
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
  let textSizeClass = ''

  switch(props.size) {
  case 'sm':
    textSizeClass = 'text-lg'
    break
  case 'md':
    textSizeClass = 'text-3xl'
    break
  default:
    textSizeClass = 'text-5xl'
  }

  return textSizeClass
})

const variantClass = computed(() => {
  let textClass = ''

  switch(props.variant) {
  case 'blue':
    textClass = 'text-blue-600 dark:text-blue-400'
    break
  case 'green':
    textClass = 'text-green-600 dark:text-green-400'
    break
  case 'teal':
    textClass = 'text-teal-600 dark:text-teal-400'
    break
  case 'orange':
    if (props.size === 'lg') {
      textClass = 'text-orange-400 dark:text-orange-300'
    } else if (props.size === 'md') {
      textClass = 'text-orange-500 dark:text-orange-300'
    } else {
      textClass = 'text-orange-600 dark:text-orange-300'
    }
    break
  case 'red':
    textClass = 'text-red-600 dark:text-red-400'
    break
  case 'tan':
    textClass = 'text-tan-600 dark:text-tan-400'
    break
  case 'yellow':
    if (props.size === 'sm') {
      textClass = 'text-yellow-600 dark:text-yellow-300'
    } else {
      textClass = 'text-yellow-500 dark:text-yellow-300'
    }
    break
  case 'purple':
    textClass = 'text-purple-600 dark:text-purple-400'
    break
  case 'indigo':
    textClass = 'text-indigo-600 dark:text-indigo-400'
    break
  case 'gray':
    textClass = 'text-gray-600 dark:text-gray-300'
    break
  default:
    textClass = 'text-black dark:text-white'
    break
  }

  return textClass
})
</script>
