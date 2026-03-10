import { useDebounceFn } from '@vueuse/core'

/**
 * Composable for debouncing function calls.
 * 
 * Creates a debounced version of a function that delays invoking it until
 * after `delay` milliseconds have elapsed since the last time it was called.
 * 
 * This is useful for:
 * - Search input handling
 * - Window resize handlers
 * - Scroll event handlers
 * - Form validation on input
 * - API call throttling
 * 
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns Debounced function with cancel and flush methods
 * 
 * @example
 * Basic usage:
 * ```vue
 * <script setup lang="ts">
 * import { useDebounce } from '@/composables'
 * 
 * const handleSearch = (query: string) => {
 *   console.log('Searching for:', query)
 * }
 * 
 * const debouncedSearch = useDebounce(handleSearch, 500)
 * 
 * // Only executes after 500ms of inactivity
 * debouncedSearch('vue')
 * debouncedSearch('vue composables') // Cancels previous call
 * </script>
 * ```
 * 
 * @example
 * With reactive delay:
 * ```ts
 * const searchDelay = ref(300)
 * const debouncedSearch = useDebounce(handleSearch, searchDelay.value)
 * ```
 * 
 * @example
 * Window resize handler:
 * ```ts
 * const handleResize = () => {
 *   console.log('Window resized to:', window.innerWidth)
 * }
 * 
 * const debouncedResize = useDebounce(handleResize, 250)
 * 
 * useEventListener(window, 'resize', debouncedResize)
 * ```
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
) {
  return useDebounceFn(fn, delay)
}
