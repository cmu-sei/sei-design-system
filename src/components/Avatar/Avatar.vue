<template>
  <div
    data-id="sds-avatar"
    :class="['inline-flex items-center justify-center', variantOuterClass, sizeClass, shapeClass]"
    role="img"
    :aria-label="name || 'Avatar'"
  >
    <div
      v-if="src"
      :title="name"
      :class="['bg-cover', positionClass, sizeClass, shapeClass]"
      :style="`background-image: url(${src})`"
    />
    <span
      v-else
      :title="name"
      :class="['leading-none text-black cursor-default uppercase', textClass, variantInnerClass]"
    >
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
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
    type: String as PropType<'portrait' | 'square' | 'circle'>,
    default: 'portrait'
  },
  /**
   * Determines the size of the avatar.
   */
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto'>,
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
  switch (props.size) {
    case '2xl':
      return 'w-44'
    case 'xl':
      return 'w-[88px]'
    case 'md':
      return 'w-12'
    case 'sm':
      return 'w-8'
    case 'xs':
      return 'w-6'
    case 'auto':
      return 'w-full'
    case 'lg':
    default:
      return 'w-16'
  }
})

const textClass = computed(() => {
  switch (props.size) {
    case '2xl':
      return 'text-6xl font-light'
    case 'xl':
      return 'text-3xl font-medium'
    case 'md':
      return 'text-xl font-medium'
    case 'sm':
      return 'text-sm font-semibold'
    case 'xs':
      return 'text-xs font-semibold'
    default:
    case 'lg':
      return 'text-2xl font-medium'
  }
})

const shapeClass = computed(() => {
  const classes = []
  if (props.shape === 'circle')
    classes.push('rounded-full aspect-square')
  if (props.shape === 'portrait')
    classes.push('aspect-[4/5]')
  if (props.shape === 'square')
    classes.push('aspect-square')
  if (
    props.shape === 'square' ||
    props.shape === 'portrait'
  ) {
    if (['xs', 'sm'].includes(props.size))
      classes.push('rounded-sm')
    if (['md', 'lg'].includes(props.size))
      classes.push('rounded-md')
    if (['xl', '2xl'].includes(props.size))
      classes.push('rounded-lg')
  }
  return classes
})

const variantOuterClass = computed(() => {
  const shapeVariants = [
    'bg-gray-100 dark:bg-gray-900',
    'bg-red-100 dark:bg-red-900',
    'bg-yellow-25 dark:bg-yellow-900',
    'bg-green-50 dark:bg-green-900',
    'bg-blue-50 dark:bg-blue-900',
    'bg-purple-100 dark:bg-purple-900'
  ]
  if (props.variant && props.variant !== 'random') {
    return shapeVariants.filter((color) => color.includes(props.variant))[0]
  } else {
    const randomNumber = Math.floor(Math.random() * shapeVariants.length)
    return shapeVariants[randomNumber]
  }
})

const variantInnerClass = computed(() => {
  const textVariants = [
    'dark:text-gray-400',
    'dark:text-red-500',
    'dark:text-yellow-400',
    'dark:text-green-400',
    'dark:text-blue-400',
    'dark:text-purple-400'
  ]
  if (props.variant && props.variant !== 'random') {
    return textVariants.filter((color) => color.includes(props.variant))[0]
  } else {
    const randomNumber = Math.floor(Math.random() * shapeVariants.length)
    return textVariants[randomNumber]
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
