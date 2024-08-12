<template>
  <button
    data-id="sds-button"
    :type="type"
    :class="[btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass, pendingClass]"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-busy="pending"
    @click="onClick"
  >
    <span
      v-if="pending"
      :class="{
        'gap-0.5': size === 'xs',
        'gap-1': size !== 'xs'
      }"
    >
      <svg
        class="animate-spin text-current inline-block -mt-0.5"
        :class="{
          'h-2.5 w-2.5': size === 'xs',
          'h-3 w-3': size === 'sm',
          'h-3.5 w-3.5': size === 'md' || size === '',
          'h-4 w-4': size === 'lg'
        }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="graphics-symbol"
      >
        <title>Pending</title>
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot />
    </span>
    <template v-else>
      <!-- @slot Button content. -->
      <slot />
    </template>
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
  variant: { type: String as PropType<'blue' | 'red' | 'white'>, default: '' },
  /**
   * Determines the HTML type attribute for the button.
   */
  type: { type: String as PropType<'button' | 'submit'>, default: 'button' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<'lg' | 'md' | 'sm' | 'xs' | ''>, default: '' },
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
  block: { type: Boolean, default: false },
  /**
   * Determines whether to display a loading indicator and set the button to an active state.
   */
  pending: { type: Boolean, default: false }
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
    case 'white':
      return 'btn-white'
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
  return props.active || props.pending ? 'active' : ''
})

const pendingClass = computed(() => {
  if (!props.pending) return ''
  switch (props.size) {
    case 'lg':
      return 'active pointer-events-none px-[2.355rem]'
    case 'sm':
      return 'active pointer-events-none px-[0.5125rem]'
    case 'xs':
      return 'active pointer-events-none px-[0.085rem]'
    case 'md':
    default:
      return 'active pointer-events-none px-[1.4379rem]'
  }
})

const blockClass = computed(() => {
  return props.block ? 'btn-block' : ''
})

const onClick = () => {
  if (props.pending) return
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>