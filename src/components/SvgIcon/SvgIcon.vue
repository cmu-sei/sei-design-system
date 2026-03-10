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
defineOptions({
  name: 'SdsSvgIcon'
})

interface SvgIconProps {
  /** The color of the SVG path */
  color?: string
  /** The height of the SVG */
  height?: number
  /** The SVG path data */
  path: string
  /** The viewBox attribute of the SVG */
  viewBox?: string
  /** The width of the SVG */
  width?: number
}

withDefaults(defineProps<SvgIconProps>(), {
  color: 'currentColor',
  height: 16,
  viewBox: '0 0 16 16',
  width: 16
})
</script>