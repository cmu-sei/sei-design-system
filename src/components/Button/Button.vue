<template>
  <button
    data-id="sds-button"
    :data-pending="pending || undefined"
    :type="typeAttribute"
    :class="[btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass, pendingClass, ctaClass]"
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
      <!-- <SdsCtaArrow
        v-if="props.type === 'cta' && (props.kind === 'primary' || props.kind === 'secondary')"
        symbol="arrow"
        class="hidden sds-theme-plaid:!flex h-[0.9375rem] w-[0.8125rem]"
      /> -->
    </template>
  </button>
</template>

<script setup lang="ts">
// import SdsCtaArrow from '../CtaArrow'

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
   * Determines both the HTML type attribute and "theme" for the button.
   */
  type: { type: String as PropType<'button' | 'cta' | 'submit'>, default: 'button' },
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

const typeAttribute = computed(() => {
  switch (props.type) {
    case 'submit':
      return 'submit'
    case 'button':
    case 'cta':
    default:
      return 'button'
  }
})

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

const ctaClass = computed(() => {
  return props.type === 'cta' ? 'btn-cta' : ''
})

const onClick = () => {
  if (props.pending) return
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>
