<template>
  <a
    data-id="sds-link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="['link', kindClass, typeClass, variantClass, decorationClass, sizeClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
  >
    <!-- @slot Link content. -->
    <slot />
  </a>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsLink'
})

interface LinkProps {
  /**
   * Determines the purpose and particular function of the component.
   */
  kind?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Determines the type of the component.
   */
  type?: 'standalone' | 'inline' | 'cta'
  /**
   * Determines the color variant of the component.
   */
  variant?: 'blue' | 'red' | 'white'
  /**
   * Determines whether to display a decorated underline.
   */
  decoration?: 'underline'
  /**
   * Determines the size of the component.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external?: boolean
  /**
   * Disables the component to prevent user interaction.
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<LinkProps>(), {
  kind: 'primary',
  type: 'standalone',
  variant: 'blue',
  decoration: undefined,
  size: undefined,
  external: false,
  disabled: false
})

const kindClass = computed(() => {
  const kind = (props.kind as 'primary' | 'secondary' | 'tertiary')
  switch (kind) {
    case 'secondary':
      return 'link-secondary'
    case 'tertiary':
      return 'link-tertiary'
    case 'primary':
    default:
      return 'link-primary'
  }
})

const typeClass = computed(() => {
  const type = (props.type as 'standalone' | 'inline' | 'cta')
  switch (type) {
    case 'inline':
      return 'link-inline'
    case 'cta':
      return 'link-cta'
    case 'standalone':
    default:
      return ''
  }
})

const variantClass = computed(() => {
  const variant = props.variant
  switch (variant) {
    case 'red':
      return 'link-red'
    case 'white':
      return 'link-white'
    case 'blue':
    default:
      return 'link-blue'
  }
})

const decorationClass = computed(() => {
  const decoration = (props.decoration as 'underline' | undefined)
  const variant = props.variant
  if (decoration) {
    switch (variant) {
      case 'red':
        return 'underline underline-offset-2 decoration-red-500'
      case 'white':
        return 'underline underline-offset-2 decoration-white'
      case 'blue':
      default:
        return 'underline underline-offset-2 decoration-blue-500'
    }
  }
  return ''
})

const sizeClass = computed(() => {
  const size = (props.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined)
  if (size) {
    switch (size) {
      case 'xs':
        return 'text-xs'
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      case 'md':
      default:
        return 'text-base'
    }
  }
  return ''
})

const disabledClass = computed(() => {
  return props.disabled ? 'disabled' : ''
})
</script>
