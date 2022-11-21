<template>
  <a
    data-id="sds-link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, variantClass, ctaClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
  ><!-- @slot Link content. --><slot /></a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  name: 'SdsLink',
  props: {
    /**
     * Determines the theme color of the component.
     */
    variant: { type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'danger' | 'light' | 'dark' | ''>, default: '' },
    /**
     * Applies the appropriate attributes for external links.
     */
    external: { type: Boolean, default: false },
    /**
     * Gives the link a "Call to Action" styling.
     */
    cta: { type: [Boolean,String], default: false },
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
      return props.cta ? ctaType : ''
      const ctaType = computed(() => {
        switch (props.cta) {
          case 'link-cta-right':
            return 'link-cta link-cta-right'
          case 'link-cta-left':
            return 'link-cta link-cta-left'
          case 'link-cta-up':
            return 'link-cta link-cta-up'
          case 'link-cta-down':
            return 'link-cta link-cta-down'
          default:
            return 'link-cta'
        }
      })
    })

    const disabledClass = computed(() => {
      return props.disabled ? 'disabled' : ''
    })

    return { linkClass, variantClass, ctaClass, disabledClass }
  }
})
</script>
