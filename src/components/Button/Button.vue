<template>
  <button
    class="btn"
    :class="[variantClass, sizeClass, outlineClass, disabledClass, blockClass]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsButton',
  props: {
    variant: { type: String, default: '' },
    size: { type: String, default: '' },
    outline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false }
  },
  emits: ['click'],
  computed: {
    variantClass() {
      switch (this.variant) {
        case 'default':
          return 'btn-default'
        case 'primary':
          return 'btn-primary'
        case 'success':
          return 'btn-success'
        case 'info':
          return 'btn-info'
        case 'warning':
          return 'btn-warning'
        case 'danger':
          return 'btn-danger'
        case 'light':
          return 'btn-light'
        case 'dark':
          return 'btn-dark'
        default:
          return ''
      }
    },
    sizeClass() {
      switch (this.size) {
        case 'sm':
          return 'btn-sm'
        default:
          return ''
      }
    },
    outlineClass() {
      return this.outline ? 'btn-outline' : ''
    },
    disabledClass() {
      return this.disabled ? 'disabled' : ''
    },
    blockClass() {
      return this.block ? 'btn-block' : ''
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
})
</script>