<template>
  <a
    data-id="sds-link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, variantClass, ctaClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
  >
    <!-- @slot Link content. --><slot />
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      stroke="currentColor"
      stroke-weight="2px"
      class="w-3 h-3 inline-block leading-3 pb-0.5"
    >
      <path
        d="M21.68,21.67L4.8,38.55c-0.55,0.55-1.27,0.82-1.99,0.82s-1.44-0.27-1.99-0.82c-1.1-1.1-1.1-2.88,0-3.98l14.89-14.89
           L0.82,4.8c-1.1-1.1-1.1-2.88,0-3.98s2.88-1.1,3.98,0L21.67,17.7C22.77,18.8,22.77,20.57,21.68,21.67z M38.55,21.67L21.68,38.55
           c-0.55,0.55-1.27,0.82-1.99,0.82s-1.44-0.27-1.99-0.82c-1.1-1.1-1.1-2.88,0-3.98l14.89-14.89L17.7,4.8c-1.1-1.1-1.1-2.88,0-3.98
           s2.88-1.1,3.98,0L38.55,17.7C39.65,18.8,39.65,20.57,38.55,21.67z"
      />
    </svg>
  </a>
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
