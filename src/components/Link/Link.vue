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
    <SdsCtaArrow
      v-if="props.type === 'cta'"
      symbol="arrow"
      :theme="props.theme"
      class="hidden sds-theme-plaid:!flex h-[0.9375rem] w-[0.8125rem]"
    />
  </a>
</template>

<script setup lang="ts">
import SdsCtaArrow from '../CtaArrow'

defineOptions({
  name: 'SdsLink'
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'tertiary'>, default: 'primary' },
  /**
   * Determines the type of the component.
   */
  type: { type: String as PropType<'standalone' | 'inline' | 'cta'>, default: 'standalone' },
  /**
   * Determines the color variant of the component.
   */
  variant: { type: String as PropType<'blue' | 'red' | 'white'>, default: 'blue' },
  /**
   * Determines the color of the CTA arrow component.
   */
  theme: { type: String as PropType<'blue' | 'gray' | 'red' | 'white'>, default: 'blue' },
  /**
   * Determines whether to display a decorated underline.
   */
  decoration: { type: String as PropType<'underline'>, default: undefined },
  /**
   * Determines the size of the component.
   */
  size: { type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>, default: undefined },
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external: { type: Boolean, default: false },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false }
})

const kindClass = computed(() => {
  const kind = (props.kind as 'primary' | 'secondary' | 'tertiary')
  switch (kind) {
    case 'primary':
      return 'link-primary'
    case 'secondary':
      return 'link-secondary'
    case 'tertiary':
      return 'link-tertiary'
    default:
      return ''
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
