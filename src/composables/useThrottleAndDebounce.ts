import { throttleAndDebounce } from '@/helpers/throttleAndDebounce'

/**
 * Composable that combines throttle and debounce behaviors.
 * 
 * Creates a function that:
 * 1. Executes immediately on first call (throttle)
 * 2. Debounces subsequent rapid calls during the throttle period
 * 3. Ensures a final execution when calls settle
 * 
 * This hybrid approach is particularly useful for scroll events where you want:
 * - Immediate feedback when scrolling starts
 * - Regular updates during continuous scrolling
 * - A final update when scrolling stops for accuracy
 * 
 * @param fn - The function to throttle and debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns Function with combined throttle and debounce behavior
 * 
 * @example
 * Basic usage with scroll spy:
 * ```vue
 * <script setup lang="ts">
 * import { useThrottleAndDebounce, useEventListener } from '@/composables'
 * 
 * const updateActiveSection = () => {
 *   // Check which section is in viewport
 *   console.log('Updating active section')
 * }
 * 
 * const handleScroll = useThrottleAndDebounce(updateActiveSection, 100)
 * 
 * useEventListener(window, 'scroll', handleScroll)
 * </script>
 * ```
 * 
 * @example
 * Window resize with final update:
 * ```ts
 * const recalculateLayout = () => {
 *   console.log('Recalculating layout')
 * }
 * 
 * const handleResize = useThrottleAndDebounce(recalculateLayout, 150)
 * 
 * useEventListener(window, 'resize', handleResize)
 * ```
 * 
 * @example
 * Comparison with pure throttle:
 * ```ts
 * // Pure throttle: calls every 100ms, may miss final position
 * const throttled = useThrottle(update, 100)
 * 
 * // Throttle + debounce: calls immediately, then ensures final update
 * const throttledDebounced = useThrottleAndDebounce(update, 100)
 * ```
 */
export function useThrottleAndDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  return throttleAndDebounce(fn as () => void, delay) as (...args: Parameters<T>) => void
}
