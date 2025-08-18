<template>
  <svg
    v-if="!!props.symbol"
    data-id="sds-cta-icon"
    xmlns="http://www.w3.org/2000/svg"
    :class="themeClass"
  >
    <defs>
      <symbol
        id="arrow"
        viewBox="0 0 15 13"
      >
        <title>Arrow</title>
        <path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z" />
      </symbol>
    </defs>
    <use
      href="#arrow"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SdsCtaArrow'
})

const props = defineProps({
  symbol: {
    type: String as PropType<'arrow' | 'chevrons'>,
    default: ''
  },
  theme: {
    type: String as PropType<'blue' | 'gray' | 'red' | 'white'>,
    default: ''
  }
})

const themeClass = computed(() => {
  switch (props.theme) {
    case 'blue':
      return 'text-blue-600'
    case 'gray':
      return 'text-gray-800'
    case 'red':
      return 'text-red-600'
    case 'white':
      return 'text-white'
    default:
      return ''
  }
})
</script>