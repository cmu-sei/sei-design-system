/**
 * Composable that manages a nullable hovered item index for interactive chart components.
 *
 * Tracks which bar, slice, or legend item is currently hovered.
 * Can be shared across related components via v-model:hoveredIndex binding
 * while keeping components independently testable.
 *
 * @returns {{ hoveredIndex: Ref<number | null>; setHovered: (i: number | null) => void }} Hovered index state and methods:
 *   - hoveredIndex: Ref<number | null> current hovered item index (null if none)
 *   - setHovered: Function(i: number | null) set the hovered index
 *
 * @example
 * const { hoveredIndex, setHovered } = useHoveredIndex()
 *
 * @example
 * // Share hovered state via v-model
 * <BarChart v-model:hoveredIndex="hoveredIndex" />
 * <ChartLegend v-model:hoveredIndex="hoveredIndex" />
 */
export function useHoveredIndex(): { hoveredIndex: Ref<number | null>; setHovered: (i: number | null) => void; } {
  const hoveredIndex = ref<number | null>(null)

  function setHovered(i: number | null) {
    hoveredIndex.value = i
  }

  return { hoveredIndex, setHovered }
}