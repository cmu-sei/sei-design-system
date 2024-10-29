<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="path"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  color: {
    type: String,
    default: 'currentColor'
  },
  height: {
    type: Number,
    default: 16
  },
  path: {
    type: String,
    required: true
  },
  viewBox: {
    type: String,
    default: '0 0 16 16'
  },
  width: {
    type: Number,
    default: 16
  }
})
</script>