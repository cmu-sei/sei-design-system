<template>
  <button
    data-id="sds-expand-collapse"
    type="button"
    class="link link-cta"
    :class="{
      disabled,
      'link-cta-up': model,
      'link-cta-down': !model,
      'link-primary': kind === 'primary',
      'link-secondary': kind === 'secondary',
      'link-tertiary': kind === 'tertiary',
      'link-blue': variant === 'blue',
      'link-red': variant === 'red',
    }"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="onClick"
  >
    {{ model ? collapseLabel : expandLabel }}
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsExpandCollapse'
})

interface ExpandCollapseProps {
  /**
   * Determines the purpose and particular function of the component.
   */
  kind?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Determines the color variant of the component.
   */
  variant?: 'blue' | 'red'
  /**
   * Determines the label for the expanded state.
   */
  expandLabel?: string
  /**
   * Determines the label for the collapse state.
   */
  collapseLabel?: string
  /**
   * Determines the disabled state of the component.
   */
  disabled?: boolean
}

withDefaults(defineProps<ExpandCollapseProps>(), {
  kind: 'primary',
  variant: 'blue',
  expandLabel: 'Show more',
  collapseLabel: 'Show less',
  disabled: false
})

/**
 * Determines the expanded state of the component.
 */
const model = defineModel<boolean>({ type: Boolean, default: false })

const onClick = () => model.value = !model.value
</script>