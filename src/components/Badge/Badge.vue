<template>
  <div
    data-id="sds-badge"
    role="status"
    class="inline-flex items-center justify-center gap-1 tracking-wide max-w-full uppercase px-2 py-1 text-xs font-bold text-center text-ellipsis whitespace-nowrap overflow-hidden align-baseline rounded-theme-sm"
    :class="variantClass"
  >
    <!-- @slot Badge content.  -->
    <slot />
  </div>
</template>

<script setup lang="ts">
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
    type: String as PropType<'gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green'>,
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
        borderClass = props.type === 'light-border' ? borderClass : 'border border-blue-25 dark:border-blue-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-blue-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-blue-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-blue-700 dark:bg-blue-800'
        textClass = 'text-white dark:text-blue-50'
        borderClass = 'border border-blue-700 dark:border-blue-800'
      }
      break
    case 'green':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-green-25 dark:bg-green-900'
        textClass = 'text-green-700 dark:text-green-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-green-25 dark:border-green-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-green-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-green-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-green-700 dark:bg-green-800'
        textClass = 'text-white dark:text-green-50'
        borderClass = 'border border-green-700 dark:border-green-800'
      }
      break
    case 'teal':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-teal-25 dark:bg-teal-900'
        textClass = 'text-teal-700 dark:text-teal-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-teal-25 dark:border-teal-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-teal-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-teal-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-teal-700 dark:bg-teal-800'
        textClass = 'text-white dark:text-teal-50'
        borderClass = 'border border-teal-700 dark:border-teal-800'
      }
      break
    case 'orange':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-orange-25 dark:bg-orange-900'
        textClass = 'text-orange-900 dark:text-orange-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-orange-25 dark:border-orange-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-orange-200'
        textClass = 'text-orange-800 dark:text-black'
        borderClass = 'border border-orange-200'
      } else if (props.type === 'dark') {
        bgClass = 'bg-orange-500 dark:bg-orange-600'
        textClass = 'text-white dark:text-orange-50'
        borderClass = 'border border-orange-500 dark:border-orange-600'
      }
      break
    case 'red':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-red-25 dark:bg-red-900'
        textClass = 'text-red-600 dark:text-red-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-red-25 dark:border-red-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-red-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-red-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-red-700 dark:bg-red-800'
        textClass = 'text-white dark:text-red-100'
        borderClass = 'border border-red-700 dark:border-red-800'
      }
      break
    case 'tan':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-tan-50 dark:bg-tan-900'
        textClass = 'text-tan-900 dark:text-tan-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-tan-50 dark:border-tan-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-tan-200'
        textClass = 'text-tan-900 dark:text-black'
        borderClass = 'border border-tan-200'
      } else if (props.type === 'dark') {
        bgClass = 'bg-tan-600 dark:bg-tan-700'
        textClass = 'text-white dark:text-tan-50'
        borderClass = 'border border-tan-600 dark:border-tan-700'
      }
      break
    case 'yellow':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-yellow-25 dark:bg-yellow-900'
        textClass = 'text-yellow-900 dark:text-yellow-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-yellow-25 dark:border-yellow-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-yellow-100 dark:bg-yellow-200'
        textClass = 'text-yellow-800 dark:text-black'
        borderClass = 'border border-yellow-100 dark:border-yellow-200'
      } else if (props.type === 'dark') {
        bgClass = 'bg-yellow-500 dark:bg-yellow-600'
        textClass = 'text-white dark:text-yellow-25'
        borderClass = 'border border-yellow-500 dark:border-yellow-600'
      }
      break

    case 'purple':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-purple-25 dark:bg-purple-900'
        textClass = 'text-purple-600 dark:text-purple-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-purple-25 dark:border-purple-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-purple-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-purple-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-purple-700 dark:bg-purple-800'
        textClass = 'text-white dark:text-purple-50'
        borderClass = 'border border-purple-700 dark:border-purple-800'
      }
      break
    case 'indigo':
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-indigo-25 dark:bg-indigo-900'
        textClass = 'text-indigo-600 dark:text-indigo-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-indigo-25 dark:border-indigo-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-indigo-500'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-indigo-500'
      } else if (props.type === 'dark') {
        bgClass = 'bg-indigo-700 dark:bg-indigo-800'
        textClass = 'text-white dark:text-indigo-50'
        borderClass = 'border border-indigo-700 dark:border-indigo-800'
      }
      break
    case 'gray':
    default:
      if (props.type === 'light-border' || props.type === 'light') {
        bgClass = 'bg-gray-100 dark:bg-gray-900'
        textClass = 'text-gray-700 dark:text-gray-300'
        borderClass = props.type === 'light-border' ? borderClass : 'border border-gray-100 dark:border-gray-900'
      } else if (props.type === 'medium') {
        bgClass = 'bg-gray-500 dark:bg-gray-400'
        textClass = 'text-white dark:text-black'
        borderClass = 'border border-gray-500 dark:border-blue-400'
      } else if (props.type === 'dark') {
        bgClass = 'bg-gray-700'
        textClass = 'text-white dark:text-gray-50'
        borderClass = 'border border-gray-700'
      }
      break
  }

  return [textClass, bgClass, borderClass]
})
</script>
