<template>
  <component
    :is="tag"
    :class="[variantClass, typeClass, activeClass, disabledClass]"
    class="tab"
  >
    <!-- @slot Tab content. -->
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsTab',
  props: {
    /**
     * Determines the theme color of the component.
     */
    variant: { type: String, default: '' },
    /**
     * The tag used for the component.
     */
    tag: { type: String, default: 'button' },
    /**
     * The overall look and feel of the component.
     */
    type: { type: String, default: '' },
    /**
     * Determines the active state of the component.
     */
    active: { type: Boolean, default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false }
  },
  computed: {
    variantClass() {
      switch (this.variant) {
        case 'primary':
          return 'tab-primary'
        case 'success':
          return 'tab-success'
        case 'info':
          return 'tab-info'
        case 'warning':
          return 'tab-warning'
        case 'danger':
          return 'tab-danger'
        case 'light':
          return 'tab-light'
        case 'dark':
          return 'tab-dark'
        default:
          return ''
      }
    },
    typeClass() {
      switch(this.type) {
        case 'underline':
          return 'tab-underline'
        case 'overline':
          return 'tab-overline'
        case 'pill':
          return 'tab-pill'
        case 'block':
          return 'tab-block'
        default:
          return ''
      }
    },
    activeClass() {
      return this.active ? 'active' : ''
    },
    disabledClass() {
      return this.disabled ? 'disabled' : ''
    }
  }
})
</script>