<template>
  <div class="flex flex-col items-center">
    <div class="py-1 pb-2">
      <svg
        class="h-8 w-8 text-gray-500"
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          :d="outerTone.search" 
          fill="currentColor"
        />
        <path 
          class="opacity-40" 
          fill-rule="evenodd" 
          clip-rule="evenodd" 
          :d="innerTone.search" 
          fill="currentColor" 
        />
      </svg>
    </div>
    <span class="block pb-1 text-black text-center text-lg font-semibold leading-7">Lorem ipsum</span>
    <span class="block text-gray-600 text-center text-sm leading-5">Lorem ipsum dolor sit amet consectetur.</span>
    <div class="flex gap-x-4 pt-4">
      <SdsButton
        kind="secondary"
        variant="blue"
        size="sm"
      >Label</SdsButton>
      <SdsButton
        kind="primary"
        variant="blue"
        size="sm"
      >Label</SdsButton>
    </div>
  </div>
</template>
<script setup lang="ts">

defineOptions({
  name: 'SdsEmptyState'
})

interface EmptyStateProps {
  /**
   * Determines the color of the Empty State icon
   */
  variant?: 'gray' | 'blue'
  /**
   * Determines the title of the Empty State.
   */
  title?: string | null
  /**
   * Determines the description of the Empty State.
   */
  description?: string | null
  /**
   * Determines the icon of the Empty State.
   */
  icon?: 'search' | 'empty' | 'not-found' | 'locked' | 'configure' | 'success' | 'warning' | 'danger' | 'info' | null
}

// TODO: Add buttons here
const props = withDefaults(defineProps<EmptyStateProps>(), {
  variant: 'gray',
  title: null,
  description: null,
  icon: null
})

const outerTone = {
  'search': 'M26 13C26 15.875 25.0625 18.5 23.5 20.6875L31.4375 28.5625C32.1875 29.375 32.1875 30.625 31.4375 31.4375C30.625 32.1875 29.375 32.1875 28.5625 31.4375L20.6875 23.5C18.5 25.0625 15.875 26 13 26C5.8125 26 0 20.1875 0 13C0 5.8125 5.8125 0 13 0C20.1875 0 26 5.8125 26 13ZM13 22C18 22 22 18 22 13C22 8 18 4 13 4C8 4 4 8 4 13C4 18 8 22 13 22Z'
}

const innerTone = {
  'search': 'M22 13C22 18 18 22 13 22C8 22 4 18 4 13C4 8 8 4 13 4C18 4 22 8 22 13Z'
}
</script>