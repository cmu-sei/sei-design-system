<template>
  <div
    v-if="!dismiss"
    :class="[
      styleClass,
      {
        'relative': true,
        'p-2': size === 'xs',
        'p-3': size === 'sm',
        'p-4': size === 'md' || size === 'lg',
        'rounded-none': inset,
        'rounded-lg sds-theme-plaid:rounded-none': !inset
      }
    ]"
  >
    <div class="flex items-top space-x-2">
      <!-- Icon -->
      <div v-if="slots.leftIcon">
        <slot name="leftIcon" />
      </div>
      <!-- Title and content -->
      <div 
        class="flex flex-col"
      >
        <span
          v-if="title" 
          :class="{
            'text-xs leading-4 font-semibold': size === 'xs',
            'text-sm leading-5 font-semibold': size === 'sm',
            'text-md leading-5.5 font-semibold': size === 'md',
            'text-lg leading-6.5 font-semibold': size === 'lg',
            'pb-1': description,
            'pb-2': !description && timestamp
          }"
        >{{ title }}</span>
        <div
          class="opacity-90"
          :class="{
            'text-xs leading-4': size === 'xs',
            'text-sm leading-5': size === 'sm',
            'text-md leading-6': size === 'md',
            'text-lg leading-7': size === 'lg',
            'pb-2': timestamp
          }"
        >
          <div class="[&_a:not([class*='no-underline'])]:underline">
            <slot>{{ description }}</slot>
          </div>
        </div>
        <span
          v-if="timestamp"
          class="text-xs leading-4 opacity-90 italic"
        >{{ format(timestamp, `MMM dd, yyyy 'at' hh:mm aaa`) }}</span>
        <!-- Buttons -->
        <div
          v-if="slots.buttons"
          class="justify-center space-x-2"
          :class="size !== 'xs' ? 'pt-4' : 'pt-3'"
        >
          <slot name="buttons" />
        </div>
        <div />
      </div>
      <!-- Close icon -->
      <div
        v-if="dismissable"
        class="absolute top-2 right-2"
      >
        <button @click="dismiss = true">
          <IconFa7SolidXmark
            :class="[fillClass, size === 'xs' ? 'w-3 h-3' : 'w-4 h-4']"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { format } from 'date-fns/format';

defineOptions({
  name: 'SdsCallout'
})

interface CalloutProps {
  /**
   * Determines the look of the callout
   */
  type?: 'bold' | 'outline' | 'subtle'
  /**
   * Determines the color of the callout
   */
  variant?: 'gray' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green'
  /**
   * Determines the size of the callout
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * Determines the title of the Callout.
   */
  title?: string | null
  /**
   * Determines the description of the Callout. If there is a description slot active, it overrides this.
   */
  description?: string | null
  /**
   * Determines the timestamp of the Callout.
   */
  timestamp?: Date | null
  /**
   * Determines if the Callout can be dismissed or if it is persistent.
   */
  dismissable?: boolean
  /**
   * Determines whether to use block styling or not.
   */
  inset?: boolean
}

const props = withDefaults(defineProps<CalloutProps>(), {
  type: 'subtle',
  variant: 'gray',
  size: 'md',
  title: null,
  description: null,
  timestamp: null,
  dismissable: false,
  inset: false
})

const dismiss = defineModel<boolean>({ type: Boolean, default: false })

const slots = defineSlots<{
  default: () => unknown,
  buttons: () => unknown,
  leftIcon: () => unknown
}>()

// Class for style of callout
const styleClass = computed(() => {
  switch(props.variant) {
    case 'gray':
      return props.type === 'bold' ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' :
        (props.type === 'outline' ? 'bg-white border border-gray-900 text-gray-900 dark:bg-black dark:border-gray-300 dark:text-gray-300' : 
          'border border-gray-900 bg-gray-25 text-gray-900 dark:border-gray-300 dark:bg-gray-900 dark:text-gray-300')
    case 'orange':
      return props.type === 'bold' ? 'bg-orange-200 text-black dark:bg-orange-200 dark:text-black' :
        (props.type === 'outline' ? 'bg-white border border-orange-300 text-orange-600 dark:bg-black dark:border-orange-300 dark:text-orange-300' : 
          'border border-orange-300 bg-orange-25/40 text-orange-600 dark:border-orange-300 dark:bg-orange-900 dark:text-orange-300')
    case 'red': 
      return props.type === 'bold' ? 'bg-red-600 text-white dark:bg-red-500 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-red-600 text-red-600 dark:bg-black dark:border-red-300 dark:text-red-300' : 
          'border border-red-600 bg-red-25 text-red-600 dark:border-red-300 dark:bg-red-950 dark:text-red-300')
    case 'purple': 
      return props.type === 'bold' ? 'bg-purple-600 text-white dark:bg-purple-500 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-purple-600 text-purple-600 dark:bg-black dark:border-purple-300 dark:text-purple-300' : 
          'border border-purple-600 bg-purple-25/60 text-purple-600 dark:border-purple-300 dark:bg-purple-950 dark:text-purple-300')
    case 'indigo': 
      return props.type === 'bold' ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-indigo-600 text-indigo-600 dark:bg-black dark:border-indigo-300 dark:text-indigo-300' : 
          'border border-indigo-600 bg-indigo-25/60 text-indigo-600 dark:border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300')
    case 'blue': 
      return props.type === 'bold' ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-blue-600 text-blue-600 dark:bg-black dark:border-blue-300 dark:text-blue-300' : 
          'border border-blue-600 bg-blue-25 text-blue-600 dark:border-blue-300 dark:bg-blue-950 dark:text-blue-300')
    case 'teal': 
      return props.type === 'bold' ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-teal-600 text-teal-600 dark:bg-black dark:border-teal-300 dark:text-teal-300' : 
          'border border-teal-600 bg-teal-25/60 text-teal-600 dark:border-teal-300 dark:bg-teal-900 dark:text-teal-300')
    case 'green': 
      return props.type === 'bold' ? 'bg-green-600 text-white dark:bg-green-500 dark:text-black' : (
        props.type === 'outline' ? 'bg-white border border-green-600 text-green-600 dark:bg-black dark:border-green-300 dark:text-green-300' : 
          'border border-green-600 bg-green-25/60 text-green-600 dark:border-green-300 dark:bg-green-900 dark:text-green-300')
    default:
      return props.type === 'bold' ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-black' : 
        (props.type === 'outline' ? 'bg-white border border-gray-900 text-gray-900 dark:bg-black dark:border-gray-300 dark:text-gray-300' : 
          'border border-gray-900 bg-gray-25 text-gray-900 dark:border-gray-300 dark:bg-gray-900 dark:text-gray-300')
  }
})

// Class for close button fill
const fillClass = computed(() => {
  switch(props.variant) {
    case 'gray':
      return props.type === 'bold' ? 'fill-gray-900 dark:fill-white' :'fill-gray-900 dark:fill-gray-300'
    case 'orange':
      return props.type === 'bold' ? 'fill-black dark:fill-black' : 'fill-orange-600 dark:fill-orange-300'
    case 'red': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-red-600 dark:fill-red-300'
    case 'purple': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-purple-600 dark:fill-purple-300'
    case 'indigo': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' :'fill-indigo-600 dark:fill-indigo-300'
    case 'blue': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-blue-600 dark:fill-blue-300'
    case 'teal': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-teal-600 dark:fill-teal-300'
    case 'green': 
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-green-600 dark:fill-green-300'
    default:
      return props.type === 'bold' ? 'fill-white dark:fill-black' : 'fill-gray-900 dark:fill-gray-300'
  }
})
</script>