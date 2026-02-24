import { useThrottleFn } from '@vueuse/core'

/**
 * Composable for throttling function calls.
 * 
 * Creates a throttled version of a function that only invokes it at most
 * once per every `delay` milliseconds.
 * 
 * Unlike debounce which delays execution until after the calls stop,
 * throttle ensures the function is called at regular intervals during
 * continuous invocation.
 * 
 * This is useful for:
 * - Scroll position tracking
 * - Mouse move handlers
 * - Window resize handlers that need regular updates
 * - Rate-limiting API calls
 * - Animation frame callbacks
 * 
 * @param fn - The function to throttle
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns Throttled function
 * 
 * @example
 * Basic usage:
 * ```vue
 * <script setup lang="ts">
 * import { useThrottle } from '@/composables'
 * 
 * const handleScroll = () => {
 *   console.log('Scroll position:', window.scrollY)
 * }
 * 
 * const throttledScroll = useThrottle(handleScroll, 100)
 * 
 * // Executes at most once every 100ms
 * useEventListener(window, 'scroll', throttledScroll)
 * </script>
 * ```
 * 
 * @example
 * Mouse tracking:
 * ```ts
 * const trackMouse = (event: MouseEvent) => {
 *   console.log('Mouse at:', event.clientX, event.clientY)
 * }
 * 
 * const throttledTrack = useThrottle(trackMouse, 50)
 * 
 * useEventListener(document, 'mousemove', throttledTrack)
 * ```
 * 
 * @example
 * Scrollspy with throttle:
 * ```ts
 * const updateActiveSection = () => {
 *   // Check which section is in viewport
 * }
 * 
 * const throttledUpdate = useThrottle(updateActiveSection, 100)
 * 
 * useEventListener(window, 'scroll', throttledUpdate)
 * ```
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
) {
  return useThrottleFn(fn, delay)
}
