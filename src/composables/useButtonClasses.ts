import { computed, type ComputedRef } from 'vue'

/**
 * Button class variants and configurations
 */
export type ButtonKind = 'primary' | 'secondary' | 'tertiary' | 'ghost'
export type ButtonVariant = 'gray' | 'blue' | 'red' | 'white'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ActionButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonClassConfig {
  prefix?: 'btn' | 'action-btn'
  kind?: ButtonKind
  variant?: ButtonVariant
  size?: ButtonSize | ActionButtonSize
  disabled?: boolean
  active?: boolean
  block?: boolean
  pending?: boolean
  cta?: boolean
}

export interface ButtonClasses {
  btnClass: ComputedRef<string>
  kindClass: ComputedRef<string>
  variantClass: ComputedRef<string>
  sizeClass: ComputedRef<string>
  disabledClass: ComputedRef<string>
  activeClass: ComputedRef<string>
  blockClass: ComputedRef<string>
  pendingClass: ComputedRef<string>
  ctaClass: ComputedRef<string>
  allClasses: ComputedRef<string[]>
}

type ButtonPrefix = 'btn' | 'action-btn'

type ButtonClassMap = {
  base: string
  kind: Record<ButtonKind, string>
  variant: Record<ButtonVariant, string>
  size: Record<string, string>
  block: string
  cta: string
}

const buttonClassMaps: Record<ButtonPrefix, ButtonClassMap> = {
  btn: {
    base: 'btn',
    kind: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      tertiary: 'btn-tertiary',
      ghost: 'btn-ghost'
    },
    variant: {
      gray: 'btn-gray',
      blue: 'btn-blue',
      red: 'btn-red',
      white: 'btn-white'
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl'
    },
    block: 'btn-block flex items-center justify-center',
    cta: 'btn-cta'
  },
  'action-btn': {
    base: 'action-btn',
    kind: {
      primary: 'action-btn-primary',
      secondary: 'action-btn-secondary',
      tertiary: '',
      ghost: 'action-btn-ghost'
    },
    variant: {
      gray: 'action-btn-gray',
      blue: 'action-btn-blue',
      red: 'action-btn-red',
      white: 'action-btn-white'
    },
    size: {
      xs: 'action-btn-xs',
      sm: 'action-btn-sm',
      md: 'action-btn-md',
      lg: 'action-btn-lg'
    },
    block: 'action-btn-block',
    cta: ''
  }
}

/**
 * Composable for generating standardized button CSS classes across components.
 * 
 * This composable centralizes the logic for button styling classes used throughout
 * the design system, eliminating code duplication and ensuring consistency.
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useButtonClasses } from '@/composables/useButtonClasses'
 * 
 * const props = defineProps({
 *   kind: { type: String as PropType<ButtonKind>, default: 'secondary' },
 *   variant: { type: String as PropType<ButtonVariant>, default: 'gray' },
 *   size: { type: String as PropType<ButtonSize>, default: 'md' },
 *   disabled: { type: Boolean, default: false },
 *   active: { type: Boolean, default: false },
 *   block: { type: Boolean, default: false },
 *   pending: { type: Boolean, default: false }
 * })
 * 
 * const { allClasses } = useButtonClasses({
 *   prefix: 'btn',
 *   kind: () => props.kind,
 *   variant: () => props.variant,
 *   size: () => props.size,
 *   disabled: () => props.disabled,
 *   active: () => props.active,
 *   block: () => props.block,
 *   pending: () => props.pending
 * })
 * </script>
 * 
 * <template>
 *   <button :class="allClasses">
 *     <slot />
 *   </button>
 * </template>
 * ```
 * 
 * @param config - Configuration object with button properties
 * @param config.prefix - Type of button ('btn' or 'action-btn')
 * @param config.kind - Button kind/purpose (primary, secondary, tertiary, ghost)
 * @param config.variant - Color variant (gray, blue, red, white)
 * @param config.size - Size variant (xs, sm, md, lg)
 * @param config.disabled - Whether button is disabled
 * @param config.active - Whether button is in active state
 * @param config.block - Whether button should be full-width
 * @param config.pending - Whether button is in pending/loading state
 * @param config.cta - Whether button should have CTA styling (btn prefix only)
 * @returns Object containing individual class computeds and combined allClasses array
 */
export function useButtonClasses(
  config: {
    prefix?: (() => 'btn' | 'action-btn') | 'btn' | 'action-btn'
    kind?: (() => ButtonKind | '') | ButtonKind | ''
    variant?: (() => ButtonVariant | '') | ButtonVariant | ''
    size?: (() => ButtonSize | ActionButtonSize | '') | ButtonSize | ActionButtonSize | ''
    disabled?: (() => boolean) | boolean
    active?: (() => boolean) | boolean
    block?: (() => boolean) | boolean
    pending?: (() => boolean) | boolean
    cta?: (() => boolean) | boolean
  }
): ButtonClasses {
  // Helper to normalize values to getters
  const getValue = <T>(value: T | (() => T)): T => {
    return typeof value === 'function' ? (value as () => T)() : value
  }

  const prefix = computed(() => getValue(config.prefix ?? 'btn'))
  const kind = computed(() => getValue(config.kind ?? ''))
  const variant = computed(() => getValue(config.variant ?? ''))
  const size = computed(() => getValue(config.size ?? ''))
  const disabled = computed(() => getValue(config.disabled ?? false))
  const active = computed(() => getValue(config.active ?? false))
  const block = computed(() => getValue(config.block ?? false))
  const pending = computed(() => getValue(config.pending ?? false))
  const cta = computed(() => getValue(config.cta ?? false))
  const classMap = computed(() => buttonClassMaps[prefix.value])

  const btnClass = computed(() => {
    return kind.value ? classMap.value.base : ''
  })

  const kindClass = computed(() => {
    if (!kind.value) return ''

    return classMap.value.kind[kind.value as ButtonKind] || ''
  })

  const variantClass = computed(() => {
    if (!variant.value) return ''

    return classMap.value.variant[variant.value as ButtonVariant] || ''
  })

  const sizeClass = computed(() => {
    if (!size.value) return ''

    return classMap.value.size[size.value] || ''
  })

  const disabledClass = computed(() => {
    return disabled.value ? 'disabled' : ''
  })

  const activeClass = computed(() => {
    // For regular buttons, pending also triggers active state
    if (prefix.value === 'btn') {
      return active.value || pending.value ? 'active' : ''
    }
    // For action buttons, only explicit active
    return active.value ? 'active' : ''
  })

  const blockClass = computed(() => {
    if (!block.value) return ''

    return classMap.value.block
  })

  const pendingClass = computed(() => {
    return pending.value ? 'active pointer-events-none' : ''
  })

  const ctaClass = computed(() => {
    // CTA only applies to regular buttons
    return cta.value ? classMap.value.cta : ''
  })

  const allClasses = computed(() => {
    return [
      btnClass.value,
      kindClass.value,
      variantClass.value,
      sizeClass.value,
      disabledClass.value,
      activeClass.value,
      blockClass.value,
      pendingClass.value,
      ctaClass.value
    ].filter(Boolean)
  })

  return {
    btnClass,
    kindClass,
    variantClass,
    sizeClass,
    disabledClass,
    activeClass,
    blockClass,
    pendingClass,
    ctaClass,
    allClasses
  }
}
