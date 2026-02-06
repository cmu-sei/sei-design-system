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
            'h-4 w-4': size !== 'lg' && size !== 'xs',
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
    </template>
  </button>
</template>

<script setup lang="ts">
import { useButtonClasses, type ButtonKind, type ButtonVariant, type ButtonSize } from '@/composables'

defineOptions({
  name: 'SdsButton'
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<ButtonKind>, default: '' },
  /**
   * Determines the color of the component.
   */
  variant: { type: String as PropType<ButtonVariant>, default: '' },
  /**
   * Determines both the HTML type attribute and "theme" for the button.
   */
  type: { type: String as PropType<'button' | 'cta' | 'submit'>, default: 'button' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<ButtonSize>, default: '' },
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

// Use composable for button classes - single source of truth!
const { btnClass, kindClass, variantClass, sizeClass, disabledClass, activeClass, blockClass, pendingClass, ctaClass } = useButtonClasses({
  prefix: 'btn',
  kind: () => props.kind,
  variant: () => props.variant,
  size: () => props.size,
  disabled: () => props.disabled,
  active: () => props.active,
  block: () => props.block,
  pending: () => props.pending,
  cta: () => props.type === 'cta'
})

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

const onClick = () => {
  if (props.pending) return
  /**
   * Emitted when the button is clicked.
   */
  emit('click')
}
</script>
