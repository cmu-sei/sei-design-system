<template>
  <button
    data-id="sds-button"
    :data-pending="pending || undefined"
    :type="type"
    :class="[btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass, pendingClass]"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-busy="pending"
    @click="onClick"
  >
    <span
      v-if="pending"
      class="relative"
    >
      <span class="absolute inset-0 flex items-center justify-center">
        <svg
          data-id="spinner"
          class="animate-spin text-current"
          :class="{
            'h-5 w-5': size === 'lg',
            'h-4 w-4 sds-theme-plaid:size-6': size !== 'lg' && size !== 'xs',
            'h-3 w-3': size === 'xs'
          }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="graphics-symbol"
        >
          <title>Pending</title>
          <circle
            class="opacity-25 fill-transparent"
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
      </span>
      <span class="opacity-0">
        <!-- @slot Action Button content. -->
        <slot />
      </span>
    </span>
    <template v-else>
      <!-- @slot Button content. -->
      <slot />
      <svg
        v-if="props.kind === 'primary' || props.kind === 'secondary'"
        data-id="arrow"
        class="hidden sds-theme-plaid:!flex w-[13px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 13"
      >
        <path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z" />
      </svg>
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
  variant: { type: String as PropType<'gray' | 'blue' | 'red' | 'white'>, default: '' },
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
  case 'gray':
    return 'btn-gray'
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
  return props.pending ? 'active pointer-events-none' : ''
})

const blockClass = computed(() => {
  return props.block ? 'btn-block sds-theme-plaid:flex sds-theme-plaid:justify-center' : ''
})

const onClick = () => {
  if (props.pending) return
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>
