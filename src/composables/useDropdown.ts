import { computed, ref, toValue, type Ref, type MaybeRefOrGetter } from 'vue'
import { useButtonClasses, useZIndex, type ButtonKind, type ButtonVariant, type ButtonSize, type ActionButtonSize, type ZIndexValue } from '@/composables'

export interface UseDropdownOptions {
  prefix?: MaybeRefOrGetter<'btn' | 'action-btn'>
  title?: MaybeRefOrGetter<string>
  kind?: MaybeRefOrGetter<ButtonKind>
  variant?: MaybeRefOrGetter<ButtonVariant>
  size?: MaybeRefOrGetter<ButtonSize | ActionButtonSize>
  zIndex?: MaybeRefOrGetter<ZIndexValue>
  disabled?: MaybeRefOrGetter<boolean>
  block?: MaybeRefOrGetter<boolean>
  active?: MaybeRefOrGetter<boolean>
  iconOnly?: MaybeRefOrGetter<boolean>
  openDelay?: number
  closeDelay?: number
  darkMode?: MaybeRefOrGetter<boolean>
}

export interface UseDropdownReturn {
  id: string
  buttonRef: Ref<HTMLElement | undefined>
  zIndexClass: Ref<string>
  btnClass: Ref<string>
  kindClass: Ref<string>
  variantClass: Ref<string>
  sizeClass: Ref<string>
  disabledClass: Ref<string>
  blockClass: Ref<string>
  activeClass: Ref<string>
  iconOnlyClasses: Ref<string>
  iconSizeClasses: Ref<string>
  handleClick: (isOpen: boolean, open: GenericFunctionType, close: GenericFunctionType) => void
  dropdownClasses: Ref<Record<string, boolean>>
}

/**
 * Composable for shared dropdown logic between Dropdown and ActionDropdown components.
 * 
 * Provides consistent button styling, z-index management, and interaction handlers
 * for all dropdown variants in the design system.
 * 
 * @param options - Configuration options for the dropdown
 * @returns Dropdown state and utilities
 * 
 * @example
 * ```ts
 * const dropdown = useDropdown({
 *   prefix: 'btn',
 *   kind: () => props.kind,
 *   variant: () => props.variant,
 *   size: () => props.size,
 *   zIndex: () => props.zIndex
 * })
 * ```
 */
export function useDropdown(options: UseDropdownOptions = {}): UseDropdownReturn {
  const {
    prefix = 'btn',
    openDelay = 0,
    closeDelay = 0,
    darkMode = false
  } = options

  const buttonRef = ref<HTMLElement>()
  const id = useId()

  const { zIndexClass } = useZIndex(() => {
    const val = toValue(options.zIndex)
    return val !== undefined ? val : '50'
  })

  const { btnClass, kindClass, variantClass, sizeClass, disabledClass, blockClass, activeClass } = useButtonClasses({
    prefix: () => toValue(prefix),
    kind: options.kind ? () => toValue(options.kind) || '' : undefined,
    variant: options.variant ? () => toValue(options.variant) || '' : undefined,
    size: options.size ? () => toValue(options.size) || '' : undefined,
    disabled: options.disabled ? () => toValue(options.disabled) || false : undefined,
    block: options.block ? () => toValue(options.block) || false : undefined,
    active: options.active ? () => toValue(options.active) || false : undefined
  })

  const handleClick = (isOpen: boolean, open: GenericFunctionType, close: GenericFunctionType) => {
    if (isOpen) {
      close(closeDelay)
    } else {
      open(openDelay)
    }
  }

  const dropdownClasses = computed(() => ({
    '[.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950': toValue(darkMode),
    'bg-white absolute border shadow-lg rounded-theme-md [.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950': true,
    [zIndexClass.value]: true
  }))

  const iconOnlyClasses = computed(() => {
    if (!toValue(options.iconOnly)) return ''

    const prefixValue = toValue(prefix)
    const squareClass = prefixValue === 'btn' ? 'btn-square' : 'action-btn-square'
    
    return squareClass
  })
  
  const iconSizeClasses = computed(() => {
    const size = toValue(options.size) || 'sm'
    const sizeMap: Record<string, string> = {
      xs: 'w-4 h-4',
      sm: 'w-4 h-4',
      md: 'w-4.5 h-4.5',
      lg: 'w-4.5 h-4.5'
    }
    
    return sizeMap[size] || sizeMap.sm
  })

  return {
    id,
    buttonRef,
    zIndexClass,
    btnClass,
    kindClass,
    variantClass,
    sizeClass,
    disabledClass,
    blockClass,
    activeClass,
    iconOnlyClasses,
    iconSizeClasses,
    handleClick,
    dropdownClasses
  }
}
