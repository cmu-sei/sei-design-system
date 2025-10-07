<template>
  <div class="inline-block">
    <div
      ref="triggerRef"
      class="inline-block w-full"
    >
      <slot
        name="trigger"
        :is-open="open"
        :open="onOpen"
        :close="onClose"
        :toggle="onToggle"
      />
    </div>
    <client-only>
      <teleport to="body">
        <transition
          :css="!disableAnimation"
          :enter-active-class="animationEnterActiveClass"
          :enter-from-class="animationEnterFromClass"
          :enter-to-class="animationEnterToClass"
          :leave-active-class="animationLeaveActiveClass"
          :leave-from-class="animationLeaveFromClass"
          :leave-to-class="animationLeaveToClass"
        >
          <div
            v-if="open"
            ref="popperRef"
            :class="popperClass"
            :style="popperPosition"
          >
            <div
              v-if="!hideArrow"
              ref="arrowRef"
              :class="[arrowClass, arrowPlacementClass]"
              :style="arrowPosition"
            />
            <slot
              :is-open="open"
              :open="onOpen"
              :close="onClose"
              :toggle="onToggle"
            />
          </div>
        </transition>
      </teleport>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import {
  autoUpdate,
  autoPlacement,
  computePosition,
  offset as fuiOffset,
  inline as fuiInline,
  shift as fuiShift,
  flip,
  arrow,
} from '@floating-ui/dom'
import ClientOnly from '../ClientOnly/ClientOnly.vue'
import mitt from 'mitt'

import type { Placement as BasePlacement, ComputePositionConfig, Alignment, Strategy } from '@floating-ui/dom'
export type FloatingUiPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

defineOptions({
  name: 'SdsFloatingUi'
})

/**
 * Props for FloatingUi component.
 *
 * @prop {Boolean} disabled - Disables the floating UI functionality when true.
 * @prop {FloatingUiPlacement} placement - Preferred placement of the floating element (e.g., 'top', 'bottom', 'auto').
 * @prop {Strategy} strategy - Positioning strategy for the floating element ('absolute' or 'fixed').
 * @prop {Number} overflowPadding - Padding to apply to prevent overflow from the viewport.
 * @prop {Number} arrowPadding - Padding between the arrow and the edge of the floating element.
 * @prop {Number} offset - Distance in pixels between the reference and the floating element.
 * @prop {Boolean} inline - Positions the floating element inline with the reference.
 * @prop {Boolean} shift - Enables shifting the floating element to fit within the viewport.
 * @prop {Boolean} disableAnimation - Disables transition animations when true.
 * @prop {String} animationEnterActiveClass - CSS class for the active state during enter animation.
 * @prop {String} animationEnterFromClass - CSS class for the initial state of the enter animation.
 * @prop {String} animationEnterToClass - CSS class for the final state of the enter animation.
 * @prop {String} animationLeaveActiveClass - CSS class for the active state during leave animation.
 * @prop {String} animationLeaveFromClass - CSS class for the initial state of the leave animation.
 * @prop {String} animationLeaveToClass - CSS class for the final state of the leave animation.
 * @prop {String|Array|Object} popperClass - Custom classes to apply to the floating element.
 * @prop {Boolean} hideArrow - Hides the arrow indicator when true.
 * @prop {String} arrowClass - Custom class for the arrow element.
 * @prop {String} placementTopArrowClass - Custom class for the arrow when placed at the top.
 * @prop {String} placementRightArrowClass - Custom class for the arrow when placed at the right.
 * @prop {String} placementBottomArrowClass - Custom class for the arrow when placed at the bottom.
 * @prop {String} placementLeftArrowClass - Custom class for the arrow when placed at the left.
 * @prop {GenericFunctionType|null} willOpen - Callback function invoked before the floating element opens.
 * @prop {GenericFunctionType|null} willClose - Callback function invoked before the floating element closes.
 */
const props = defineProps({
  disabled: { type: Boolean, default: false },
  placement: { type: String as PropType<FloatingUiPlacement>, default: 'auto' },
  strategy: { type: String as PropType<Strategy>, default: 'absolute' },
  overflowPadding: { type: Number, default: 5 },
  arrowPadding: { type: Number, default: 5 },
  offset: { type: Number, default: 10 },
  inline: { type: Boolean, default: false },
  shift: { type: Boolean, default: false },
  disableAnimation: { type: Boolean, default: false },
  animationEnterActiveClass: { type: String, default: 'transition duration-75 ease-out' },
  animationEnterFromClass: { type: String, default: 'transform scale-95 opacity-0' },
  animationEnterToClass: { type: String, default: 'transform scale-100 opacity-100' },
  animationLeaveActiveClass: { type: String, default: 'transition duration-50 ease-in' },
  animationLeaveFromClass: { type: String, default: 'transform scale-100 opacity-100' },
  animationLeaveToClass: { type: String, default: 'transform scale-95 opacity-0' },
  popperClass: { type: [String, Array, Object], default: undefined },
  hideArrow: { type: Boolean, default: false },
  arrowClass: { type: String, default: undefined },
  placementTopArrowClass: { type: String, default: undefined },
  placementRightArrowClass: { type: String, default: undefined },
  placementBottomArrowClass: { type: String, default: undefined },
  placementLeftArrowClass: { type: String, default: undefined },
  willOpen: { type: Function as PropType<GenericFunctionType>, default: null },
  willClose: { type: Function as PropType<GenericFunctionType>, default: null },
})

/**
 * Holds the cleanup function returned by autoUpdate.
 * Used to stop automatic position updates when the floating UI closes.
 */
let cleanup: null | GenericFunctionType = null

const triggerRef = ref(null)
const popperRef = ref(null)
const arrowRef = ref(null)
const open = ref(false)
const popperPosition = ref({ left: `0px`, top: `0px` })
const arrowPosition = ref({ left: `0px`, top: `0px` })
const currentPlacement = ref('')

const openStateTimeout = ref<null | ReturnType<typeof setTimeout>>(null)
const shouldOpen = ref(false)

const arrowPlacementClass = computed(() => {
  if (currentPlacement.value.includes('top')) {
    return props.placementTopArrowClass
  } else if (currentPlacement.value.includes('right')) {
    return props.placementRightArrowClass
  } else if (currentPlacement.value.includes('bottom')) {
    return props.placementBottomArrowClass
  } else if (currentPlacement.value.includes('left')) {
    return props.placementLeftArrowClass
  } else {
    return ''
  }
})

/**
 * Delays the open state by a specified number of milliseconds.
 * Clears any existing timeout before setting a new one.
 * Returns a Promise that resolves after the delay.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 */
const openStateDelay = (ms: number): Promise<void> => new Promise(res => {
  if (openStateTimeout.value) {
    clearTimeout(openStateTimeout.value)
  }
  openStateTimeout.value = setTimeout(res, ms)
  return openStateTimeout.value
})

/**
 * Executes a provided function with resolve and reject callbacks, returning a Promise.
 * If the argument is not a function, nothing is returned.
 *
 * @param {GenericFunctionType} fn - The function to execute, which receives resolve and reject callbacks.
 * @returns {Promise<void>|void} A Promise that resolves or rejects based on the function execution, or void if fn is not a function.
 */
const willOpenStateDelay = (fn: GenericFunctionType): Promise<void> | void => {
  if (typeof fn !== 'function') return
  return new Promise<void>((resolve, reject) => {
    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Handles the logic for opening the floating UI component.
 * - Prevents opening if the component is disabled.
 * - Sets the `shouldOpen` state and waits for an optional delay.
 * - If still allowed, waits for an additional "will open" delay.
 * - Opens the component if not already open and still allowed.
 * - Handles errors by resetting the `shouldOpen` state.
 *
 * @async
 * @param {number} [ms=0] - Optional delay in milliseconds before attempting to open.
 * @returns {Promise<void>}
 */
const onOpen = async (ms: number = 0): Promise<void> => {
  if (props.disabled) return
  try {
    shouldOpen.value = true
    await openStateDelay(ms)
    if (shouldOpen.value) {
      await willOpenStateDelay(props.willOpen)
      if (open.value || !shouldOpen.value) return
      shouldOpen.value = false
      open.value = true
    }
  } catch {
    shouldOpen.value = false
  }
}

/**
 * Closes the floating UI component.
 * Sets `shouldOpen` to false, waits for the specified delay, then waits for the `willClose` delay.
 * If the component is still open after the delays, sets `open` to false.
 * Handles any errors silently.
 *
 * @async
 * @param {number} [ms=0] - The delay in milliseconds before starting the close sequence.
 * @returns {Promise<void>}
 */
const onClose = async (ms: number = 0): Promise<void> => {
  try {
    shouldOpen.value = false
    await openStateDelay(ms)
    await willOpenStateDelay(props.willClose)
    if (!open.value) return
    open.value = false
  } catch {
    return
  }
}

/**
 * Toggles the floating UI component open or closed.
 * If currently open, calls `onClose` with the specified close delay.
 * If currently closed, calls `onOpen` with the specified open delay.
 *
 * @async
 * @param {number} [openMs=0] - The delay in milliseconds before opening.
 * @param {number} [closeMs=0] - The delay in milliseconds before closing.
 * @returns {Promise<void>}
 */
const onToggle = async (openMs: number = 0, closeMs: number = 0): Promise<void> => {
  if (open.value) {
    onClose(closeMs)
  } else {
    onOpen(openMs)
  }
}

/**
 * Updates the floating UI position and state.
 * This asynchronous function recalculates and applies the necessary changes
 * to ensure the floating element is correctly positioned relative to its reference.
 *
 * @async
 * @returns {Promise<void>} Resolves when the update is complete.
 */
const update = async (): Promise<void> => {
  if (!triggerRef.value || !popperRef.value) return

  const options: Required<Pick<ComputePositionConfig, 'middleware' | 'placement' | 'strategy'>> = {
    middleware: [],
    placement: props.placement as BasePlacement,
    strategy: props.strategy
  }
  const isPlacementAuto = props.placement.startsWith('auto')

  // Offset
  if (props.offset) {
    options.middleware.push(fuiOffset(props.offset))
  }

  // Placement (auto vs specified)
  if (isPlacementAuto) {
    options.middleware.push(autoPlacement({
      alignment: props.placement.split('-')[1] ?? '',
    } as { alignment: Alignment }))
  } else {
    options.placement = props.placement as BasePlacement
  }

  // Inline
  if (props.inline) {
    options.middleware.push(fuiInline())
  }

  // Flip - not used with auto placement
  if (!isPlacementAuto) {
    options.middleware.push(flip({
      padding: props.overflowPadding
    }))
  }

  // Shift
  if (props.shift) {
    options.middleware.push(fuiShift({
      padding: props.overflowPadding
    }))
  }

  // Arrow
  if (!props.hideArrow && arrowRef.value) {
    options.middleware.push(arrow({
      element: arrowRef.value,
      padding: props.arrowPadding,
    }))
  }

  // Compute Position
  const data = await computePosition(triggerRef.value, popperRef.value, options)
  const { x, y, placement, middlewareData } = data

  popperPosition.value = {
    left: x ? `${x}px` : '',
    top: y ? `${y}px` : ''
  }

  if (!props.hideArrow) {
    const { x: arrowX, y: arrowY } = middlewareData.arrow as { x: number, y: number }
    currentPlacement.value = placement
    arrowPosition.value = {
      left: arrowX ? `${arrowX}px` : '',
      top: arrowY ? `${arrowY}px` : ''
    }
  }
}

const emitter = mitt()
provide('emitter', emitter)
emitter.on("floating-ui-toggle", (value) => {
  if (value) {
    if (!open.value) {
      onOpen()
    }
  } else {
    if (open.value) {
      onClose()
    }
  }
})

onClickOutside(popperRef, (event: Event) => {
  if (triggerRef.value && event.target && (triggerRef.value as HTMLElement)?.contains(event.target as HTMLElement)) return
  if (!open.value) return
  onClose()
})

onKeyStroke('Escape', (e) => {
  if (!open.value) return
  e.preventDefault()
  onClose()
})

/**
 * Watches the `open` state to manage the floating UI's lifecycle.
 * When `open` becomes true:
 *   - Waits for the next DOM update cycle.
 *   - Calls `update()` to position the floating UI.
 *   - If both `triggerRef` and `popperRef` are available, sets up auto-update
 *     to keep the floating UI positioned correctly, storing the cleanup function.
 * When `open` becomes false:
 *   - If an auto-update cleanup function exists, calls it to remove listeners and stop updates.
 *
 * @param {boolean} value - The current state of the `open` property.
 */
watch(open, async (value) => {
  if (value) {
    await nextTick()
    update()
    if (triggerRef.value && popperRef.value) {
      cleanup = autoUpdate(triggerRef.value, popperRef.value, update)
    }
  } else {
    if (cleanup) {
      cleanup()
    }
  }
})
</script>
