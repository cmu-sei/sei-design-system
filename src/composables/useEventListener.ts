import { onMounted, onUnmounted, watch, unref, type Ref, type MaybeRefOrGetter } from 'vue'

/**
 * Target types that can receive event listeners.
 */
export type EventTarget = Window | Document | HTMLElement | Ref<HTMLElement | undefined>

/**
 * Options for configuring event listeners.
 */
export interface UseEventListenerOptions extends AddEventListenerOptions {
  /**
   * Whether the event listener is enabled.
   * When false, the listener will not be attached.
   * @default true
   */
  enabled?: MaybeRefOrGetter<boolean>
}

/**
 * Composable for attaching event listeners with automatic cleanup.
 * 
 * This ensures proper event listener management with:
 * - Automatic cleanup on component unmount
 * - Support for conditional listeners (enabled/disabled)
 * - Type-safe event handlers
 * - Consistent API across the design system
 * 
 * Prevents common issues:
 * - Memory leaks from forgotten removeEventListener calls
 * - Multiple listeners being attached
 * - Listeners persisting after component unmount
 * 
 * @param target - The event target (window, document, HTMLElement, or ref)
 * @param event - The event name to listen for
 * @param handler - The event handler function
 * @param options - Optional configuration for the event listener
 * 
 * @example
 * Basic usage with window:
 * ```vue
 * <script setup lang="ts">
 * import { useEventListener } from '@/composables'
 * 
 * const handleResize = () => {
 *   console.log('Window resized:', window.innerWidth)
 * }
 * 
 * useEventListener(window, 'resize', handleResize)
 * </script>
 * ```
 * 
 * @example
 * With element ref:
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useEventListener } from '@/composables'
 * 
 * const buttonRef = ref<HTMLElement>()
 * 
 * const handleClick = (event: MouseEvent) => {
 *   console.log('Button clicked')
 * }
 * 
 * useEventListener(buttonRef, 'click', handleClick)
 * </script>
 * 
 * <template>
 *   <button ref="buttonRef">Click me</button>
 * </template>
 * ```
 * 
 * @example
 * With conditional listener:
 * ```ts
 * const isEnabled = ref(true)
 * 
 * useEventListener(
 *   window,
 *   'scroll',
 *   handleScroll,
 *   { enabled: () => isEnabled.value }
 * )
 * 
 * // Disable listener
 * isEnabled.value = false
 * ```
 * 
 * @example
 * With passive option:
 * ```ts
 * useEventListener(
 *   window,
 *   'scroll',
 *   handleScroll,
 *   { passive: true }
 * )
 * ```
 * 
 * @example
 * Multiple listeners on same element:
 * ```ts
 * const element = ref<HTMLElement>()
 * 
 * useEventListener(element, 'mouseenter', handleEnter)
 * useEventListener(element, 'mouseleave', handleLeave)
 * useEventListener(element, 'click', handleClick)
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Ref<HTMLElement | undefined>,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options: UseEventListenerOptions = {}
): void {
  const { enabled = true, ...listenerOptions } = options
  
  let cleanup: (() => void) | null = null

  const register = () => {
    // Clean up any existing listener first
    if (cleanup) {
      cleanup()
      cleanup = null
    }

    // Check if listener should be enabled
    const isEnabled = typeof enabled === 'function' ? enabled() : unref(enabled)
    if (!isEnabled) return

    // Get the actual target element
    const targetElement = unref(target)
    if (!targetElement) return

    // Add event listener
    targetElement.addEventListener(event, handler, listenerOptions)

    // Store cleanup function
    cleanup = () => {
      targetElement.removeEventListener(event, handler, listenerOptions)
    }
  }

  // Register on mount
  onMounted(() => {
    register()
  })

  // If enabled is reactive, watch for changes
  if (typeof enabled === 'function' || unref(enabled) !== enabled) {
    watch(
      () => (typeof enabled === 'function' ? enabled() : unref(enabled)),
      () => {
        register()
      }
    )
  }

  // If target is a ref, watch for changes
  if (typeof target === 'object' && 'value' in target) {
    watch(target, () => {
      register()
    })
  }

  // Clean up on unmount
  onUnmounted(() => {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  })
}
