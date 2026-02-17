import { onKeyStroke } from '@vueuse/core'

/**
 * Composable for handling Escape key to close overlays, modals, and dropdowns.
 * 
 * This provides a consistent keyboard interaction pattern across all overlay components
 * in the design system, improving accessibility and user experience.
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useCloseOnEscape } from '@/composables/useCloseOnEscape'
 * 
 * const isOpen = ref(false)
 * 
 * const close = () => {
 *   isOpen.value = false
 * }
 * 
 * // Automatically closes when Escape is pressed
 * useCloseOnEscape(isOpen, close)
 * </script>
 * ```
 * 
 * @param isOpen - Ref or getter function that returns whether the overlay is open
 * @param onClose - Callback function to close the overlay
 * @param options - Optional configuration
 * @param options.disabled - Disable the escape key handler
 */
export function useCloseOnEscape(
  isOpen: (() => boolean) | { value: boolean },
  onClose: () => void,
  options?: {
    disabled?: (() => boolean) | { value: boolean }
  }
) {
  onKeyStroke('Escape', (e) => {
    const open = typeof isOpen === 'function' ? isOpen() : isOpen.value
    const disabled = options?.disabled 
      ? (typeof options.disabled === 'function' ? options.disabled() : options.disabled.value)
      : false

    if (open && !disabled) {
      e.preventDefault()
      onClose()
    }
  }, { eventName: 'keyup', target: typeof document !== 'undefined' ? document : undefined })
}
