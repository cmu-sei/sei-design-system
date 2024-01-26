<template>
  <a
    data-id="sds-link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="['link', kindClass, typeClass, variantClass, disabledClass]"
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
  variant: { type: String as PropType<'blue' | 'red'>, default: 'blue' },
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
  const variant = (props.variant as 'blue' | 'red')
  switch (variant) {
    case 'red':
      return 'link-red'
    case 'blue':
    default:
      return 'link-blue'
  }
})

const disabledClass = computed(() => {
  return props.disabled ? 'disabled' : ''
})
</script>
