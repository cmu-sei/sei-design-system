<template>
  <button
    data-id="sds-action-button"
    :type="type"
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
  name: 'SdsActionButton'
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'ghost'>, default: 'ghost' },
  /**
   * Determines the color of the component.
   */
  variant: { type: String as PropType<'gray' | 'red' | 'blue'>, default: 'gray' },
  /**
   * Determines the HTML type attribute for the button.
   */
  type: { type: String as PropType<'button' | 'submit'>, default: 'button' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>, default: 'sm' },
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
  return props.kind ? 'action-btn' : ''
})

const kindClass = computed(() => {
  switch (props.kind) {
    case 'primary':
      return 'action-btn-primary'
    case 'secondary':
      return 'action-btn-secondary'
    case 'ghost':
      return 'action-btn-ghost'
    default:
      return ''
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'gray':
      return 'action-btn-gray'
    case 'red':
      return 'action-btn-red'
    case 'blue':
      return 'action-btn-blue'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'action-btn-lg'
    case 'sm':
      return 'action-btn-sm'
    case 'xs':
      return 'action-btn-xs'
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
  return props.block ? 'action-btn-block' : ''
})

const onClick = () => {
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>