<template>
  <button
    data-id="sds-expand-collapse"
    type="button"
    class="link link-cta"
    :class="{
      disabled,
      'link-cta-up': modelValue,
      'link-cta-down': !modelValue,
      'link-primary': kind === 'primary',
      'link-secondary': kind === 'secondary',
      'link-tertiary': kind === 'tertiary',
      'link-blue': variant === 'blue',
      'link-red': variant === 'red',
    }"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="$emit('update:model-value', !modelValue)"
  >
    {{ modelValue ? collapseLabel : expandLabel }}
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsExpandCollapse'
})

defineProps({
  /**
   * Determines the expanded state of the component.
   */
  modelValue: { type: Boolean, default: false },
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'tertiary'>, default: 'primary' },
  /**
   * Determines the color variant of the component.
   */
  variant: { type: String as PropType<'blue' | 'red'>, default: 'blue' },
  /**
   * Determines the label for the expanded state.
   */
  expandLabel: { type: String, default: 'Show more' },
  /**
   * Determines the label for the collapse state.
   */
  collapseLabel: { type: String, default: 'Show less' },
  /**
   * Determines the disabled state of the component.
   */
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:model-value'])
</script>