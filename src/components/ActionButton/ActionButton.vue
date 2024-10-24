<template>
  <button
    data-id="sds-action-button"
    :data-pending="pending || undefined"
    :type="type"
    :class="[btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass, pendingClass]"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <span
      v-if="pending"
      class="relative"
    >
      <span
        class="absolute inset-0 flex items-center"
        :class="{
          'justify-center': !block
        }"
      >
        <svg
          class="animate-spin text-current"
          :class="{
            'h-5 w-5': size === 'lg',
            'h-4 w-4': size !== 'lg' && size !== 'xs' && size !== 'sm',
            'h-3.5 w-3.5': size === 'sm',
            'h-3 w-3': size === 'xs'
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
      </span>
      <span
        class="inline-flex opacity-0"
        :class="{
          'gap-2': size !== 'xs',
          'gap-1': size === 'xs'
        }"
      >
        <!-- @slot Action Button content. -->
        <slot />
      </span>
    </span>
    <template v-else>
      <!-- @slot Button content. -->
      <slot />
    </template>
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
  block: { type: Boolean, default: false },
  /**
   * Determines whether to display a loading indicator and set the button to an active state.
   */
  pending: { type: Boolean, default: false }
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

const pendingClass = computed(() => {
  return props.pending ? 'active pointer-events-none' : ''
})

const onClick = () => {
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>