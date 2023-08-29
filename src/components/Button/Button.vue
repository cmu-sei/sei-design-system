<template>
  <button
    data-id="sds-button"
    :class="[btnClass, variantClass, sizeClass, outlineClass, disabledClass, activeClass, blockClass]"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <!-- @slot Button content. -->
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

defineOptions({
  name: 'SdsButton'
})

const props = defineProps({
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
})
  
const emit = defineEmits(['click'])

const btnClass = computed(() => {
  // @deprecated remove variant from this list
  return props.kind || props.variant !== '' || props.size !== '' || props.outline || props.block ? 'btn' : ''
})

const variantClass = computed(() => {
  const kind = props.kind || props.variant
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
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'btn-sm'
    default:
      return ''
  }
})

const outlineClass = computed(() => {
  return props.outline ? 'btn-outline' : ''
})

const disabledClass = computed(() => {
  return props.disabled ? 'disabled' : ''
})

const activeClass = computed(() => {
  return props.active ? 'active' : ''
})

const blockClass = computed(() => {
  return props.block ? 'btn-block' : ''
})

const onClick = () => {
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>