import { type Ref, computed, unref, type ComputedRef } from 'vue'

/**
 * Standard selector for focusable elements within a container.
 * Includes all interactive elements that can receive keyboard focus.
 */
export const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Options for configuring the focus trap behavior.
 */
export interface UseFocusTrapOptions {
  /**
   * Whether the focus trap is enabled.
   * Can be a ref, getter function, or boolean value.
   * @default true
   */
  enabled?: Ref<boolean> | (() => boolean) | boolean

  /**
   * Custom selector for focusable elements.
   * Use this if you need to include or exclude specific elements from the focus trap.
   * @default FOCUSABLE_SELECTOR
   */
  focusableSelector?: string

  /**
   * Whether to include the Escape key handling.
   * If true, pressing Escape will call the onEscape callback.
   * @default false
   */
  handleEscape?: boolean

  /**
   * Callback function to execute when Escape key is pressed.
   * Only called if handleEscape is true.
   */
  onEscape?: () => void
}

/**
 * Return type for the useFocusTrap composable.
 */
export interface UseFocusTrapReturn {
  /**
   * Handler for keyboard events that manages focus trapping.
   * Should be attached to the container element via @keydown.
   */
  trapFocus: (event: KeyboardEvent) => void

  /**
   * Computed array of all focusable elements within the container.
   * Updates reactively when the container ref changes.
   */
  focusableElements: ComputedRef<HTMLElement[]>
}

/**
 * Composable for trapping keyboard focus within a container element.
 * 
 * This ensures that Tab and Shift+Tab navigation cycles through focusable elements
 * within a modal, panel, or other overlay component without escaping to the background page.
 * This is required for WCAG 2.1 Level A compliance (2.1.2 No Keyboard Trap).
 * 
 * @example
 * Basic usage in a modal component:
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useFocusTrap } from '@/composables'
 * 
 * const modalContainer = ref<HTMLElement | null>(null)
 * const isOpen = ref(false)
 * 
 * const { trapFocus } = useFocusTrap(modalContainer, {
 *   enabled: isOpen,
 *   handleEscape: true,
 *   onEscape: () => { isOpen.value = false }
 * })
 * </script>
 * 
 * <template>
 *   <div v-if="isOpen" ref="modalContainer" @keydown="trapFocus">
 *     <button>First focusable</button>
 *     <input type="text" />
 *     <button>Last focusable</button>
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * With custom focusable selector:
 * ```typescript
 * const { trapFocus } = useFocusTrap(containerRef, {
 *   focusableSelector: 'button:not([disabled]), a[href], input:not([disabled])'
 * })
 * ```
 * 
 * @param containerRef - Ref to the container element that should trap focus
 * @param options - Configuration options for the focus trap behavior
 * @returns Object containing the trapFocus handler and focusableElements computed
 */
export function useFocusTrap(
  containerRef: Ref<HTMLElement | null | undefined, HTMLElement | null | undefined>,
  options: UseFocusTrapOptions = {}
): UseFocusTrapReturn {
  const {
    enabled = true,
    focusableSelector = FOCUSABLE_SELECTOR,
    handleEscape = false,
    onEscape
  } = options

  /**
   * Computed array of all focusable elements within the container.
   * Returns an empty array if the container is null or not yet mounted.
   */
  const focusableElements = computed<HTMLElement[]>(() => {
    if (!containerRef.value) return []
    
    const elements = containerRef.value.querySelectorAll<HTMLElement>(focusableSelector)
    return Array.from(elements)
  })

  /**
   * Main focus trap handler.
   * Intercepts Tab and Shift+Tab keypresses to cycle focus within the container.
   * Optionally handles Escape key to close the overlay.
   */
  const trapFocus = (event: KeyboardEvent): void => {
    // Check if focus trap is enabled
    const isEnabled = typeof enabled === 'function' 
      ? enabled() 
      : unref(enabled)
    
    if (!isEnabled) return

    // Handle Escape key if configured
    if (handleEscape && event.key === 'Escape') {
      event.preventDefault()
      onEscape?.()
      return
    }

    // Only handle Tab key for focus trapping
    if (event.key !== 'Tab') return

    const elements = focusableElements.value
    
    // If no focusable elements or only one, prevent tabbing out
    if (elements.length === 0) {
      event.preventDefault()
      return
    }

    if (elements.length === 1) {
      event.preventDefault()
      elements[0].focus()
      return
    }

    const firstElement = elements[0]
    const lastElement = elements[elements.length - 1]
    const activeElement = document.activeElement as HTMLElement

    // Tab forward: if on last element, cycle to first
    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
      return
    }

    // Tab backward: if on first element, cycle to last
    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
      return
    }
  }

  return {
    trapFocus,
    focusableElements
  }
}
