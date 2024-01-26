<template>
  <button
    data-id="sds-button"
    :class="[btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass]"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <!-- @slot Button content. -->
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsButton'
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'ghost'>, default: '' },
  /**
   * Determines the color of the component.
   */
  variant: { type: String as PropType<'blue' | 'red'>, default: '' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<'lg' | 'md' | 'sm' | 'xs'>, default: '' },
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
  return props.kind ? 'btn' : ''
})

const kindClass = computed(() => {
  switch (props.kind) {
    case 'primary':
      return 'btn-primary'
    case 'secondary':
      return 'btn-secondary'
    case 'tertiary':
      return 'btn-tertiary'
    case 'ghost':
      return 'btn-ghost'
    default:
      return ''
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'btn-blue'
    case 'red':
      return 'btn-red'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'btn-lg'
    case 'sm':
      return 'btn-sm'
    case 'xs':
      return 'btn-xs'
    default:
      return ''
  }
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