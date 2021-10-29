<template>
  <a
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, variantClass, ctaClass, disabledClass]"
  ><slot /></a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SdsLink',
  props: {
    variant: { type: String, default: '' },
    external: { type: Boolean, default: false },
    cta: { type: Boolean, default: false },
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