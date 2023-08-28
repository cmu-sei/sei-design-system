<template>
  <div
    data-id="sds-avatar"
    :class="['inline-flex items-center justify-center', variantClass, sizeClass, shapeClass]"
  >
    <div
      v-if="src"
      :title="name"
      :class="['bg-cover', positionClass, sizeClass, shapeClass]"
      :style="`background-image: url(${src})`"
    />
    <span
      v-else
      role="img"
      :title="name"
      :class="['leading-none text-black cursor-default uppercase', textClass]"
    >
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {computed, PropType} from 'vue'

defineOptions({
  name: 'SdsAvatar'
})

const props = defineProps({
  /**
   * Determines the background color of the avatar when no image is present.
   */
  variant: {
    type: String as PropType<'random' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple'>,
    default: 'gray'
  },
  /**
   * Determines the position of the image.
   */
  position: {
    type: String as PropType<'bottom' | 'center' | 'left' | 'right' | 'top'>,
    default: 'center'
  },
  /**
   * Determines the shape of the avatar.
   */
  shape: {
    type: String as PropType<'portrait' | 'circle'>,
    default: 'portrait'
  },
  /**
   * Determines the size of the avatar.
   */
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'auto'>,
    default: 'md'
  },
  /**
   * Determines the text name (ex. John Doe) will show "JD" initials as a placeholder when no image is present.
   * 
   * The full name, "John Doe" will display on hover with or without an image present.
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * Set the image of the avatar.
   */
  src: {
    type: String,
    default: ''
  }
})
const positionClass = computed(() => {
  switch(props.position) {
    case 'bottom':
      return 'bg-bottom'
    case 'left':
      return 'bg-left'
    case 'right':
      return 'bg-right'
    case 'top':
      return 'bg-top'
    case 'center':
    default:
      return 'bg-center'
  }
})
const sizeClass = computed(() => {
  if (props.shape === 'circle') {
    switch (props.size) {
      case 'lg':
        return 'w-44'
      case 'md':
        return 'w-16'
      case 'sm':
        return 'w-12'
      case 'xs':
        return 'w-8'
    }
  } else if (props.shape === 'portrait') {
    switch (props.size) {
      case 'lg':
        return 'w-44'
      case 'md':
        return 'w-16'
      case 'sm':
        return 'w-10'
      case 'xs':
        return 'w-6'
    }
  }
  return 'w-full'
})
const textClass = computed(() => {
  if (props.size === 'lg') {
    return 'text-6xl font-light'
  } else if (props.size === 'sm') {
    return 'text-xl font-medium'
  } else if (props.size === 'xs') {
    return 'text-sm font-semibold'
  }
  return 'text-2xl'

})
const shapeClass = computed(() => {
  if (props.shape === 'circle') {
    return 'rounded-full aspect-square'
  }
  return 'aspect-[4/5]'
})

const variantClass = computed(() => {
  const colorOptions = ['bg-gray-200', 'bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200']
  if (props.variant && props.variant !== 'random') {
    return colorOptions.filter((color) => color.includes(props.variant))[0]
  } else {
    const randomNumber = Math.floor(Math.random() * colorOptions.length)
    return colorOptions[randomNumber]
  }
})
const initials = computed(() => {
  if (!props.name) {
    return
  }
  let name = props.name.trim().toUpperCase()
  if (name.length > 2) {
    if (name.includes(" ")) {
      // Reduce full name to name. Ex: Matt Winwood yields MW
      name = name.split(" ").map((n) => n[0]).join("")
    }
    if (name.length > 2) {
      // Return first and last initial. Ex: Matt Danger Winwood yields MW
      return name.charAt(0) + name.charAt(name.length - 1)
    }
  }
  return name.substring(0, 2)
})
</script>
