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
     * Determines the purpose and particular function of the component.
     */
    kind: { type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'danger' | 'light' | 'dark'>, default: null },
    /**
     * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
     */
    external: { type: Boolean, default: false },
    /**
     * Gives the link a "Call to Action" styling.
     */
    cta: { type: [Boolean, String] as PropType<'up' | 'right' | 'down' | 'left' | boolean> , default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false }
  },
  setup (props) {
    const linkClass = computed(() => {
      return props.kind || props.cta ? 'link' : ''
    })

    const variantClass = computed(() => {
      const kind = (props.kind as 'primary' | 'secondary' | 'tertiary' | 'danger' | 'light' | 'dark')
      switch (kind) {
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
      switch (props.cta) {
        case 'right':
          return 'link-cta link-cta-right'
        case 'left':
          return 'link-cta link-cta-left'
        case 'up':
          return 'link-cta link-cta-up'
        case 'down':
          return 'link-cta link-cta-down'
        case true:
          return 'link-cta'
        default:
          return ''
      }
    })

    const disabledClass = computed(() => {
      return props.disabled ? 'disabled' : ''
    })

    return { linkClass, variantClass, ctaClass, disabledClass }
  }
})
</script>
