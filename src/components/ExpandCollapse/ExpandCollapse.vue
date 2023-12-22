<template>
  <button
    data-id="sds-expand-collapse"
    class="link link-primary link-blue link-cta"
    :class="{
      disabled,
      'link-cta-up': modelValue,
      'link-cta-down': !modelValue,
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
   * Determines the label for the expanded state.
   */
  expandLabel: { type: String, default: 'show more' },
  /**
   * Determines the label for the collapse state.
   */
  collapseLabel: { type: String, default: 'show less' },
  /**
   * Determines the disabled state of the component.
   */
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:model-value'])
</script>