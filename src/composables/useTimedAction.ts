import { computed, onMounted, onUnmounted, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

/**
 * Options for configuring a timed action.
 */
export interface UseTimedActionOptions {
  /**
   * Delay in milliseconds before the action is triggered.
   * Can be reactive.
   * @default 5000
   */
  delay?: MaybeRefOrGetter<number>
  
  /**
   * Whether the timer is enabled.
   * When false, timer will not start/run.
   * @default true
   */
  enabled?: MaybeRefOrGetter<boolean>
  
  /**
   * Whether to start the timer automatically on mount.
   * @default false
   */
  autoStart?: boolean
}

/**
 * Return type for useTimedAction composable.
 */
export interface UseTimedActionReturn {
  /**
   * Start the timer.
   */
  start: () => void
  
  /**
   * Clear/stop the timer.
   */
  clear: () => void
  
  /**
   * Reset and restart the timer.
   */
  reset: () => void
  
  /**
   * Whether the timer is currently active.
   */
  isActive: Readonly<Ref<boolean>>
}

/**
 * Composable for managing timed actions with automatic cleanup.
 * 
 * Creates a timer that triggers a callback after a specified delay.
 * Includes methods to start, clear, and reset the timer.
 * Automatically cleans up on component unmount.
 * 
 * This is useful for:
 * - Auto-hide notifications/toasts
 * - Auto-close modals/dialogs
 * - Session timeout warnings
 * - Temporary UI state
 * - Debounced auto-save
 * 
 * @param onTrigger - Callback function to execute when timer completes
 * @param options - Optional configuration (delay, enabled, autoStart)
 * @returns Timer control methods and state
 * 
 * @example
 * Auto-hide toast:
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useTimedAction } from '@/composables'
 * 
 * const isVisible = ref(true)
 * 
 * const { start, clear, reset } = useTimedAction(
 *   () => { isVisible.value = false },
 *   {
 *     delay: 5000,
 *     autoStart: true
 *   }
 * )
 * 
 * const onMouseEnter = () => clear() // Pause on hover
 * const onMouseLeave = () => start() // Resume on leave
 * </script>
 * 
 * <template>
 *   <div 
 *     v-if="isVisible" 
 *     @mouseenter="onMouseEnter"
 *     @mouseleave="onMouseLeave"
 *   >
 *     Toast message
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * Session timeout warning:
 * ```ts
 * import { useTimedAction } from '@/composables'
 * 
 * const showWarning = ref(false)
 * 
 * const { reset } = useTimedAction({
 *   delay: 15 * 60 * 1000, // 15 minutes
 *   onTrigger: () => {
 *     showWarning.value = true
 *   },
 *   autoStart: true
 * })
 * 
 * // Reset timer on user activity
 * useEventListener(document, 'click', reset)
 * useEventListener(document, 'keypress', reset)
 * ```
 * 
 * @example
 * Conditional timer:
 * ```ts
 * const autoSaveEnabled = ref(true)
 * 
 * useTimedAction({
 *   delay: 30000, // 30 seconds
 *   enabled: () => autoSaveEnabled.value,
 *   onTrigger: saveForm,
 *   autoStart: true
 * })
 * ```
 */
export function useTimedAction(
  onTrigger: () => void,
  options: UseTimedActionOptions = {}): UseTimedActionReturn {
  const { 
    delay = 5000, 
    enabled = true, 
    autoStart = false 
  } = options
  
  const timer = ref<ReturnType<typeof setTimeout>>()

  const clear = () => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = undefined
    }
  }

  const start = () => {
    clear()
    
    const isEnabled = toValue(enabled)
    if (!isEnabled) return

    const delayMs = toValue(delay)
    timer.value = setTimeout(() => {
      onTrigger()
      timer.value = undefined
    }, delayMs)
  }

  const reset = () => {
    clear()
    start()
  }

  const isActive = computed(() => timer.value !== undefined)

  onMounted(() => {
    if (autoStart) {
      start()
    }
  })

  onUnmounted(() => {
    clear()
  })

  return {
    start,
    clear,
    reset,
    isActive
  }
}
