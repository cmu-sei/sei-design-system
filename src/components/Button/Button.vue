<template>
  <button
    data-id="sds-button"
    :class="[btnClass, variantClass, sizeClass, outlineClass, disabledClass, activeClass, blockClass]"
    :disabled="disabled"
    @click="onClick"
  >
    <!-- @slot Button content. -->
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SdsButton',
  props: {
    /**
     * Determines the purpose and particular function of the component.
     */
     kind: { type: String as PropType<'default' | 'primary' | 'success' | 'danger' | 'light'>, default: null },
    /**
     * Determines the color of the component.
     * 
     * **Deprecated**: Will be removed in 3.0. Use `kind` instead.
     * 
     * @deprecated since version 2.12.
     */
    variant: { type: String as PropType<'default' | 'primary' | 'success' | 'danger' | 'light' | ''>, default: '' },
    /**
     * Determines the size.
     */
    size: { type: String as PropType<'md' | 'sm' | ''>, default: '' },
    /**
     * Determines whether to use the outline styling or not.
     */
    outline: { type: Boolean, default: false },
    /**
     * Sets the active state of a button.
     */
    active: { type: Boolean, default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false },
    /**
     * Determines whether to use the block styling or not.
     */
    block: { type: Boolean, default: false }
  },
  emits: ['click'],
  computed: {
    btnClass() {
      // @deprecated remove variant from this list
      return this.kind || this.variant !== '' || this.size !== '' || this.outline || this.block ? 'btn' : ''
    },
    variantClass() {
      const kind = this.kind || this.variant
      switch (kind) {
        case 'default':
          return 'btn-default'
        case 'primary':
          return 'btn-primary'
        case 'success':
          return 'btn-success'
        case 'danger':
          return 'btn-danger'
        case 'light':
          return 'btn-light'
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
    activeClass() {
      return this.active ? 'active' : ''
    },
    blockClass() {
      return this.block ? 'btn-block' : ''
    }
  },
  methods: {
    onClick() {
      /**
       * Emitted when the button is clicked.
       */
      this.$emit('click')
    }
  }
})
</script>