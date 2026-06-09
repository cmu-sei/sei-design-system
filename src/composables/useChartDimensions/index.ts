import type { ChartMargin } from '@/helpers/charts'

/**
 * Composable that tracks container dimensions and derives SVG dimensions.
 *
 * Monitors the width of a container element via ResizeObserver and calculates
 * inner chart dimensions by subtracting margins. When an `aspectRatio` is provided,
 * the SVG height is derived from container width (containerWidth / aspectRatio),
 * and the `height` prop is ignored.
 *
 * @param {Ref<HTMLElement | null>} containerRef - Reactive reference to the container DOM element.
 * @param {Ref<string | number>} height - SVG height (CSS units or pixels). Ignored if aspectRatio is provided.
 * @param {Ref<ChartMargin>} margin - Chart margins { top, right, bottom, left }.
 * @param {Ref<number | undefined>} [aspectRatio] - Optional width-to-height ratio for responsive sizing.
 *
 * @returns {Object} Reactive computed dimensions:
 *   - containerWidth: Ref<number> outer container width in pixels
 *   - innerWidth: ComputedRef<number> width minus left and right margins
 *   - svgHeight: ComputedRef<number> SVG height (from aspectRatio or height prop)
 *   - innerHeight: ComputedRef<number> height minus top and bottom margins
 *
 * @example
 * const { innerWidth, innerHeight } = useChartDimensions(
 *   containerRef,
 *   computed(() => 400),
 *   computed(() => ({ top: 20, right: 20, bottom: 20, left: 20 }))
 * )
 *
 * @example
 * // With responsive aspect ratio
 * const { innerWidth, innerHeight } = useChartDimensions(
 *   containerRef,
 *   computed(() => 400),
 *   computed(() => ({ top: 20, right: 20, bottom: 20, left: 20 })),
 *   computed(() => 16 / 9)  // maintain 16:9 ratio
 * )
 */
export function useChartDimensions(
  containerRef: Ref<HTMLElement | null>,
  height: Ref<string | number>,
  margin: Ref<ChartMargin>,
  aspectRatio?: Ref<number | undefined>,
): object {
  const containerWidth = ref(0)

  const innerWidth = computed(() =>
    Math.max(0, containerWidth.value - margin.value.left - margin.value.right),
  )

  /** Resolved SVG height — driven by aspectRatio when provided, otherwise by the height prop. */
  const svgHeight = computed(() => {
    if (aspectRatio?.value != null && containerWidth.value > 0) {
      return containerWidth.value / aspectRatio.value
    }
    return typeof height.value === 'number' ? height.value : parseInt(height.value, 10)
  })

  const innerHeight = computed(() =>
    Math.max(0, svgHeight.value - margin.value.top - margin.value.bottom),
  )

  let observer: ResizeObserver | null = null

  watchEffect((onCleanup) => {
    const el = containerRef.value
    if (!el) return
    containerWidth.value = el.clientWidth
    observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        containerWidth.value = entry.contentRect.width
      }
    })
    observer.observe(el)
    onCleanup(() => {
      observer?.disconnect()
      observer = null
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { containerWidth, innerWidth, innerHeight, svgHeight }
}