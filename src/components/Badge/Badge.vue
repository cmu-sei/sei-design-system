<template>
  <div
    data-id="sds-badge"
    role="status"
    class="inline-flex items-center justify-center gap-1 tracking-wide max-w-full uppercase px-2 py-1 text-xs font-bold text-center text-ellipsis whitespace-nowrap overflow-hidden align-baseline rounded"
    :class="variantClass"
  >
    <!-- @slot Badge content.  -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

defineOptions({
  name: 'SdsBadge'
})

const props = defineProps({
  /**
   * Determines the overall look and feel of the component.
   */
  type: {
    type: String as PropType<'light-border' | 'light' | 'medium' | 'dark'>,
    default: 'medium'
  },
  /**
   * Determines the color of the component.
   */
  variant: {
    type: String as PropType<'gray' | 'tan' | 'yellow' | 'orange' | 'pink' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green'>,
    default: 'gray'
  }
})

const variantClass = computed(() => {
  let textClass = ''
  let bgClass = ''
  let borderClass = ''

  if (props.type === 'light-border') {
    borderClass = 'border border-current'
  }

  switch(props.variant) {
    case 'blue':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-blue-25 dark:bg-blue-900'
        textClass = 'text-blue-700 dark:text-blue-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-blue-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-blue-700'
        textClass = 'text-white'
      }
      break
    case 'green':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-green-25 dark:bg-green-900'
        textClass = 'text-green-700 dark:text-green-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-green-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-green-700'
        textClass = 'text-white'
      }
      break
    case 'teal':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-teal-25 dark:bg-teal-900'
        textClass = 'text-teal-700 dark:text-teal-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-teal-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-teal-700'
        textClass = 'text-white'
      }
      break
    case 'orange':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-orange-25 dark:bg-orange-900'
        textClass = 'text-orange-900 dark:text-orange-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-orange-200'
        textClass = 'text-gray-800'
      } else if (props.type === 'dark') {
        bgClass = 'bg-orange-500'
        textClass = 'text-white'
      }
      break
    case 'red':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-red-25 dark:bg-red-900'
        textClass = 'text-red-600 dark:text-red-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-red-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-red-700'
        textClass = 'text-white'
      }
      break
    case 'tan':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-tan-100 dark:bg-tan-900'
        textClass = 'text-tan-900 dark:text-tan-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-tan-300'
        textClass = 'text-gray-800'
      } else if (props.type === 'dark') {
        bgClass = 'bg-tan-600'
        textClass = 'text-white'
      }
      break
    case 'yellow':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-yellow-25 dark:bg-yellow-900'
        textClass = 'text-yellow-900 dark:text-yellow-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-yellow-100'
        textClass = 'text-gray-800'
      } else if (props.type === 'dark') {
        bgClass = 'bg-yellow-500'
        textClass = 'text-white'
      }
      break
    case 'pink':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-pink-25 dark:bg-pink-900'
        textClass = 'text-pink-700 dark:text-pink-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-pink-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-pink-700'
        textClass = 'text-white'
      }
      break
    case 'purple':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-purple-25 dark:bg-purple-900'
        textClass = 'text-purple-600 dark:text-purple-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-purple-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-purple-700'
        textClass = 'text-white'
      }
      break
    case 'indigo':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-indigo-25 dark:bg-indigo-900'
        textClass = 'text-indigo-600 dark:text-indigo-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-indigo-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-indigo-700'
        textClass = 'text-white'
      }
      break
    case 'gray':
    default:
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-gray-100 dark:bg-gray-900'
        textClass = 'text-gray-700 dark:text-gray-300'
      } else if (props.type === 'medium') {
        bgClass = 'bg-gray-500'
        textClass = 'text-white'
      } else if (props.type === 'dark') {
        bgClass = 'bg-gray-700'
        textClass = 'text-white'
      }
      break
  }

  return [textClass, bgClass, borderClass]
})
</script>
