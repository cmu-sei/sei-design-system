/**
 * Design System Composables
 * 
 * Reusable composition functions for Vue 3 components.
 * These composables encapsulate common patterns and logic used throughout
 * the SEI Design System, promoting code reuse and consistency.
 * 
 * All composables are exported for use by consumers of the design system.
 */

export { useButtonClasses } from './useButtonClasses'
export type { 
  ButtonKind, 
  ButtonVariant, 
  ButtonSize, 
  ActionButtonSize,
  ButtonClassConfig,
  ButtonClasses 
} from './useButtonClasses'

export { useDropdown } from './useDropdown'
export type { UseDropdownOptions, UseDropdownReturn } from './useDropdown'

export { useZIndex } from './useZIndex'
export type { ZIndexValue } from './useZIndex'

export { useOverlay } from './useOverlay'
export type { UseOverlayOptions, UseOverlayReturn } from './useOverlay'

export { useCloseOnEscape } from './useCloseOnEscape'

export { useFocusTrap, FOCUSABLE_SELECTOR } from './useFocusTrap'
export type { UseFocusTrapOptions, UseFocusTrapReturn } from './useFocusTrap'

export { default as usePaginationRange } from './usePaginationRange'
