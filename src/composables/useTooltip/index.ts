import type { Ref } from 'vue'

/**
 * Tooltip state object with visibility, position, and data.
 * @template T - Type of data stored in the tooltip
 * @interface TooltipState
 * @property {Ref<boolean>} visible - Whether the tooltip is currently shown.
 * @property {Ref<number>} x - Tooltip x-coordinate in pixels.
 * @property {Ref<number>} y - Tooltip y-coordinate in pixels.
 * @property {Ref<T | null>} data - Tooltip data payload (null when hidden).
 * @property {Function} show - Show tooltip at position with data: (posX: number, posY: number, payload: T) => void
 * @property {Function} hide - Hide the tooltip: () => void
 */
export interface TooltipState<T> {
  visible: Ref<boolean>
  x: Ref<number>
  y: Ref<number>
  data: Ref<T | null>
  show: (posX: number, posY: number, payload: T) => void
  hide: () => void
}

/** Small delay to preserve tooltip continuity while moving between nearby chart targets. */
const HIDE_DELAY_MS = 120

/**
 * Composable that manages generic tooltip state with position and data.
 *
 * Returns reactive refs for visibility, position (x, y), and data payload,
 * along with show() and hide() methods. Suitable for use with hover interactions,
 * click handlers, or mouse tracking.
 *
 * @template T - Type of data object to store in the tooltip
 *
 * @returns {TooltipState<T>} Tooltip state object with:
 *   - visible: Ref<boolean> visibility flag
 *   - x, y: Ref<number> position coordinates
 *   - data: Ref<T | null> data payload
 *   - show(posX, posY, payload): display tooltip at position with data
 *   - hide(): hide the tooltip
 *
 * @example
 * const tooltip = useTooltip<{label: string; value: number}>()
 *
 * function handleMouseMove(event: MouseEvent, item: any) {
 *   tooltip.show(event.clientX, event.clientY, {
 *     label: item.label,
 *     value: item.value
 *   })
 * }
 *
 * function handleMouseLeave() {
 *   tooltip.hide()
 * }
 */
export function useTooltip<T = unknown>(): TooltipState<T> {
  const visible = ref(false)
  const x = ref(0)
  const y = ref(0)
  const data = shallowRef<T | null>(null)
  let hideTimeoutId: ReturnType<typeof setTimeout> | null = null

  function clearHideTimeout() {
    if (hideTimeoutId == null) return
    clearTimeout(hideTimeoutId)
    hideTimeoutId = null
  }

  function show(posX: number, posY: number, payload: T) {
    clearHideTimeout()
    x.value = posX
    y.value = posY
    data.value = payload
    visible.value = true
  }

  function hide() {
    clearHideTimeout()
    hideTimeoutId = setTimeout(() => {
      visible.value = false
      hideTimeoutId = null
    }, HIDE_DELAY_MS)
  }

  onScopeDispose(() => clearHideTimeout())

  return { visible, x, y, data, show, hide }
}