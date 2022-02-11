<template>
  <a
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, variantClass, ctaClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
  ><!-- @slot Link content. --><slot /></a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SdsLink',
  props: {
    /**
     * Determines the theme color of the component.
     */
    variant: { type: String, default: '' },
    /**
     * Applies the appropriate attributes for external links.
     */
    external: { type: Boolean, default: false },
    /**
     * Gives the link a "Call to Action" styling.
     */
    cta: { type: Boolean, default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false }
  },
  setup (props) {
    const linkClass = computed(() => {
      return props.variant !== '' || props.cta ? 'link' : ''
    })

    const variantClass = computed(() => {
      switch (props.variant) {
        case 'primary':
          return 'link-primary'
        case 'secondary':
          return 'link-secondary'
        case 'tertiary':
          return 'link-tertiary'
        case 'success':
          return 'link-success'
        case 'info':
          return 'link-info'
        case 'warning':
          return 'link-warning'
        case 'danger':
          return 'link-danger'
        case 'light':
          return 'link-light'
        case 'dark':
          return 'link-dark'
        default:
          return ''
      }
    })

    const ctaClass = computed(() => {
      return props.cta ? 'link-cta' : ''
    })

    const disabledClass = computed(() => {
      return props.disabled ? 'disabled' : ''
    })

    return { linkClass, variantClass, ctaClass, disabledClass }
  }
})
</script>