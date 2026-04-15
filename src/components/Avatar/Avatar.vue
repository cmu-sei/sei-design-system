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

interface AvatarProps {
  /**
   * Determines the background color of the avatar when no image is present.
   */
  type?: 'subtle' | 'outline'
  /**
   * Determines the background color of the avatar when no image is present.
   */
  variant?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'orange'
  /**
   * Determines the position of the image.
   */
  position?: 'bottom' | 'center' | 'left' | 'right' | 'top'
  /**
   * Determines the shape of the avatar.
   */
  shape?: 'circle' | 'square' | 'portrait'
  /**
   * Determines the size of the avatar.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto'
  /**
   * Determines the text name (ex. John Doe) will show "JD" initials as a placeholder when no image is present.
   *
   * The full name, "John Doe" will display on hover with or without an image present.
   */
  name?: string
  /**
   * Set the image of the avatar.
   */
  src?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  type: 'subtle',
  variant: 'gray',
  position: 'center',
  shape: 'portrait',
  size: 'md',
  name: '',
  src: ''
})

// Consolidated computed properties for better performance
const avatarClasses = computed(() => {
  const position = (() => {
    switch(props.position) {
      case 'bottom': return 'bg-bottom'
      case 'left': return 'bg-left'
      case 'right': return 'bg-right'
      case 'top': return 'bg-top'
      case 'center':
      default: return 'bg-center'
    }
  })()

  const size = (() => {
    switch (props.size) {
      case '2xl': return 'w-44 border-2'
      case 'xl': return 'w-[88px] border-2'
      case 'md': return 'w-12 border'
      case 'sm': return 'w-8 border'
      case 'xs': return 'w-6 border'
      case 'auto': return 'w-full border'
      case 'lg':
      default: return 'w-16 border-2'
    }
  })()

  const text = (() => {
    switch (props.size) {
      case '2xl': return 'text-6xl font-light'
      case 'xl': return 'text-3xl font-regular'
      case 'md': return 'text-xl font-regular'
      case 'sm': return 'text-sm font-semibold'
      case 'xs': return 'text-xs font-semibold'
      default:
      case 'lg': return 'text-2xl font-regular'
    }
  })()

  const shape = (() => {
    const classes = []
    if (props.shape === 'circle') classes.push('rounded-full aspect-square')
    if (props.shape === 'portrait') classes.push('aspect-[4/5]')
    if (props.shape === 'square') classes.push('aspect-square')
    if (props.shape === 'square' || props.shape === 'portrait') {
      if (['xs', 'sm'].includes(props.size)) classes.push('rounded-theme-sm')
      if (['md', 'lg'].includes(props.size)) classes.push('rounded-theme-md')
      if (['xl', '2xl'].includes(props.size)) classes.push('rounded-theme-lg')
    }
    return classes.join(' ')
  })()

  const variantOuter = (() => {
    const shapeVariants = [
      props.type === 'outline' ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-black' : 'border-gray-100 dark:border-gray-850 bg-gray-100 dark:bg-gray-850',
      props.type === 'outline' ? 'border-red-200 dark:border-red-700 bg-white dark:bg-black' : 'border-red-100 dark:border-red-900 bg-red-100 dark:bg-red-900',
      props.type === 'outline' ? 'border-yellow-100 dark:border-yellow-700 bg-white dark:bg-black' : 'border-yellow-50 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900',
      props.type === 'outline' ? 'border-green-200 dark:border-green-700 bg-white dark:bg-black' : 'border-green-50 dark:border-green-900 bg-green-50 dark:bg-green-900',
      props.type === 'outline' ? 'border-blue-200 dark:border-blue-700 bg-white dark:bg-black' : 'border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900',
      props.type === 'outline' ? 'border-purple-200 dark:border-purple-700 bg-white dark:bg-black' : 'border-purple-100 dark:border-purple-900 bg-purple-100 dark:bg-purple-900',
      props.type === 'outline' ? 'border-orange-100 dark:border-orange-700 bg-white dark:bg-black' : 'border-orange-50 dark:border-orange-900 bg-orange-50 dark:bg-orange-900'
    ]
    return props.variant ? shapeVariants.filter((color) => color.includes(props.variant))[0] : ''
  })()

  const variantInner = (() => {
    const textVariants = [
      'text-black dark:text-gray-300',
      'text-red-600 dark:text-red-500',
      'text-yellow-600 dark:text-yellow-400',
      'text-green-600 dark:text-green-400',
      'text-blue-600 dark:text-blue-400',
      'text-purple-600 dark:text-purple-400',
      'text-orange-600 dark:text-orange-400'
    ]
    return props.variant ? textVariants.filter((color) => color.includes(props.variant))[0] : ''
  })()

  return {
    position,
    size,
    text,
    shape,
    variantOuter,
    variantInner
  }
})

// Keep backward compatibility - expose individual properties if needed
const positionClass = computed(() => avatarClasses.value.position)
const sizeClass = computed(() => avatarClasses.value.size)
const textClass = computed(() => avatarClasses.value.text)
const shapeClass = computed(() => avatarClasses.value.shape)
const variantOuterClass = computed(() => avatarClasses.value.variantOuter)
const variantInnerClass = computed(() => avatarClasses.value.variantInner)

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
