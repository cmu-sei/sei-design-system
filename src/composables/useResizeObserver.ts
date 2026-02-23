import { useResizeObserver as vueUseResizeObserver } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * Composable for observing element resize events.
 * 
 * Uses the ResizeObserver API to watch for changes in an element's size.
 * Automatically cleans up the observer on component unmount.
 * 
 * This is useful for:
 * - Responsive component layouts
 * - Dynamic content sizing
 * - Overflow detection
 * - Canvas/chart resizing
 * - Layout calculations
 * 
 * @param target - The element ref to observe for size changes
 * @param callback - Function called when element is resized
 * @param options - ResizeObserver options
 * @returns Cleanup function to stop observing
 * 
 * @example
 * Basic usage:
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useResizeObserver } from '@/composables'
 * 
 * const containerRef = ref<HTMLElement>()
 * const width = ref(0)
 * const height = ref(0)
 * 
 * useResizeObserver(containerRef, (entry) => {
 *   width.value = entry.contentRect.width
 *   height.value = entry.contentRect.height
 * })
 * </script>
 * 
 * <template>
 *   <div ref="containerRef">
 *     Size: {{ width }}x{{ height }}
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * Detecting overflow:
 * ```ts
 * const panelRef = ref<HTMLElement>()
 * const hasOverflow = ref(false)
 * 
 * useResizeObserver(panelRef, (entry) => {
 *   const target = entry.target as HTMLElement
 *   hasOverflow.value = target.scrollHeight > target.clientHeight
 * })
 * ```
 * 
 * @example
 * Responsive chart:
 * ```ts
 * const chartRef = ref<HTMLElement>()
 * 
 * useResizeObserver(chartRef, (entry) => {
 *   const { width, height } = entry.contentRect
 *   updateChartDimensions(width, height)
 * })
 * ```
 */
export function useResizeObserver(
  target: Ref<HTMLElement | undefined>,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions
) {
  return vueUseResizeObserver(target, ([entry]) => callback(entry), options)
}
