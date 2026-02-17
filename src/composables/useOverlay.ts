import { watch, toValue, type Ref, type MaybeRefOrGetter } from 'vue'
import { useZIndex, useCloseOnEscape, useFocusTrap, type ZIndexValue } from '@/composables'

export interface UseOverlayOptions {
  /**
   * The z-index level for the overlay
   */
  zIndex?: MaybeRefOrGetter<ZIndexValue>
  /**
   * Whether to close overlay when ESC key is pressed
   */
  closeOnEscape?: boolean
  /**
   * Whether to trap focus within the overlay
   */
  focusTrap?: boolean
  /**
   * Whether to lock body scroll when overlay is open
   */
  lockBodyScroll?: boolean
  /**
   * Whether to automatically focus first interactive element when overlay opens
   */
  autoFocus?: boolean
  /**
   * Transition duration in milliseconds (used for timing focus management)
   * Default: 250ms
   */
  transitionDuration?: number
  /**
   * Whether to restore focus to previously focused element when overlay closes
   */
  restoreFocus?: boolean
  /**
   * Callback function when overlay opens
   */
  onOpen?: () => void
  /**
   * Callback function when overlay closes
   */
  onClose?: () => void
  /**
   * Options to pass to useFocusTrap
   */
  focusTrapOptions?: {
    initialFocus?: () => HTMLElement | number
  }
}

export interface UseOverlayReturn {
  /**
   * Computed z-index class for the overlay
   */
  zIndexClass: Ref<string>
  /**
   * Function to close the overlay
   */
  close: () => void
  /**
   * Function to open the overlay
   */
  open: () => void
  /**
   * Function to handle focus trap keyboard events
   */
  trapFocus: (event: KeyboardEvent) => void
}

/**
 * Composable for shared overlay component logic (Modal, Panel, etc).
 * 
 * Provides consistent behavior for:
 * - Z-index management
 * - Close on escape key
 * - Focus trap
 * - Body scroll locking
 * - Open/close callbacks
 * 
 * This ensures all overlay components behave consistently and reduces code duplication.
 * 
 * @param isVisible - Reactive boolean controlling overlay visibility
 * @param containerRef - Ref to the overlay container element (for focus trap)
 * @param options - Configuration options
 * @returns Overlay utilities and state
 * 
 * @example
 * ```ts
 * const showModal = ref(false)
 * const modalContainer = ref<HTMLElement>()
 * 
 * const { zIndexClass, close, trapFocus } = useOverlay(
 *   showModal,
 *   modalContainer,
 *   {
 *     zIndex: () => props.zIndex,
 *     closeOnEscape: true,
 *     focusTrap: true,
 *     lockBodyScroll: true,
 *     onClose: () => emit('close')
 *   }
 * )
 * ```
 */
export function useOverlay(
  isVisible: Ref<boolean>,
  containerRef: Ref<HTMLElement | null | undefined, HTMLElement | null | undefined>,
  options: UseOverlayOptions = {}
): UseOverlayReturn {
  const {
    zIndex = '50',
    closeOnEscape = true,
    focusTrap = true,
    lockBodyScroll = true,
    autoFocus = false,
    transitionDuration = 250,
    restoreFocus = false,
    onClose,
    onOpen,
    focusTrapOptions = {}
  } = options

  let previousActiveElement: HTMLElement | null = null

  const { zIndexClass } = useZIndex(() => toValue(zIndex))

  const close = () => {
    isVisible.value = false
    onClose?.()
  }

  const open = () => {
    isVisible.value = true
    onOpen?.()
  }

  // Close on escape key
  if (closeOnEscape) {
    useCloseOnEscape(isVisible, close)
  }

  // Focus trap
  const { trapFocus } = focusTrap 
    ? useFocusTrap(containerRef, { 
      enabled: isVisible,
      ...focusTrapOptions
    })
    : { trapFocus: () => {} }

  // Body scroll lock - use CSS class for better control and to prevent layout shift
  if (lockBodyScroll) {
    watch(isVisible, (visible) => {
      if (typeof document === 'undefined') return
      
      if (visible) {
        document.documentElement.classList.add('sds-overlay-prevent-scroll')
      } else {
        document.documentElement.classList.remove('sds-overlay-prevent-scroll')
      }
    }, { immediate: true })
  }

  // Focus management
  if (autoFocus || restoreFocus) {
    watch(isVisible, (visible) => {
      if (typeof document === 'undefined') return

      if (visible) {
        // Store currently focused element for restoration on close
        if (restoreFocus) {
          previousActiveElement = document.activeElement as HTMLElement
        }

        // Auto-focus first interactive element after overlay opens
        if (autoFocus) {
          // Use setTimeout to handle edge cases:
          // 1. Overlay mounted in already-open state (no transition → @after-enter won't fire)
          // 2. Test environments with fake timers where transition events may not fire reliably
          setTimeout(() => {
            if (!containerRef.value) return

            // Try to find first focusable element in main content area
            const mainContent = containerRef.value.querySelector('main')
            if (mainContent) {
              const focusableElements = mainContent.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
              )
              if (focusableElements.length > 0) {
                focusableElements[0].focus()
                return
              }
            }

            // Fall back to any focusable element in container
            const allFocusable = containerRef.value.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
            )
            if (allFocusable.length > 0) {
              allFocusable[0].focus()
            }
          }, transitionDuration)
        }
      } else {
        // Restore focus to previously focused element when closing
        if (restoreFocus && previousActiveElement && typeof previousActiveElement.focus === 'function') {
          // Wait for leave transition to complete before restoring focus
          setTimeout(() => {
            previousActiveElement?.focus()
            previousActiveElement = null
          }, 200)
        }
      }
    }, { immediate: true })
  }

  return {
    zIndexClass,
    close,
    open,
    trapFocus
  }
}
