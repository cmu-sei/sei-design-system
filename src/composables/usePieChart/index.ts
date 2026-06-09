import type { PieArcDatum } from '@/lib/d3'
import { useChartConfig } from '../useChartConfig'
import { useDarkMode } from '../useDarkMode'
import { resolveItemColor, resolveColor } from '@/helpers/charts/colors'
import { arc, pie } from '@/lib/d3'

/**
 * A slice in a pie chart: label, numeric value, and optional color.
 * @interface PieSlice
 * @property {string} label - Display label for this slice.
 * @property {number} value - Numeric value represented by slice size.
 * @property {Object} [color] - Optional color override as a plain string or { light, dark } object.
 */
export interface PieSlice {
  label: string
  value: number
  /** Optional color override. Use `{ light, dark }` to provide mode-specific colors, or a plain string for both modes. */
  color?: { light: string; dark: string } | string
}

/**
 * Computed D3 pie arc path and metadata ready for SVG rendering.
 * @interface PieArcData
 * @property {string} path - SVG path string for the arc (from d3.arc()).
 * @property {string} [color] - Resolved color for this arc.
 * @property {PieSlice} data - Original slice data.
 * @property {[number, number]} centroid - [x, y] coordinates of arc centroid.
 * @property {number} angle - Angular width of this arc in radians.
 */
export interface PieArcData {
  path: string
  color?: string
  data: PieSlice
  centroid: [number, number]
  angle: number
}

/**
 * Pie chart legend item with formatted value.
 * @interface PieLegendItem
 * @property {string} label - Display label.
 * @property {string} value - Formatted value string (e.g., "45%").
 * @property {string} [color] - Resolved color for this item.
 */
export interface PieLegendItem {
  label: string
  value: string
  color?: string
}

/**
 * Composable that computes D3 pie arcs, paths, and legend items from a reactive slices array.
 *
 * All returned values are reactive ComputedRefs that automatically update when inputs change.
 * Handles color resolution, dark mode, and value formatting.
 *
 * @param {Ref<PieSlice[]> | ComputedRef<PieSlice[]>} slices - Array of pie slices with label and value.
 * @param {Ref<number> | ComputedRef<number>} outerRadius - Outer radius of pie arc in pixels.
 * @param {Ref<number> | ComputedRef<number>} [innerRadius=0] - Inner radius for donut charts. @default 0 (solid pie)
 * @param {Ref<Function> | ComputedRef<Function>} [valueFormat] - Formatter function for legend values. @default `v => \`${v}%\``
 *
 * @returns {Object} Reactive computed values:
 *   - arcs: ComputedRef<PieArcData[]> rendered arcs with paths and metadata
 *   - pieData: ComputedRef<PieArcDatum<PieSlice>[]> raw D3 pie data
 *   - legendItems: ComputedRef<PieLegendItem[]> legend items with formatted values
 *
 * @example
 * const { arcs, legendItems } = usePieChart(
 *   computed(() => [
 *     { label: 'A', value: 30 },
 *     { label: 'B', value: 70 }
 *   ]),
 *   computed(() => 100),  // outer radius
 *   computed(() => 0),    // solid pie
 *   computed(() => v => \`${v}%\`)
 * )
 */
export function usePieChart(
  slices: Ref<PieSlice[]> | ComputedRef<PieSlice[]>,
  outerRadius: Ref<number> | ComputedRef<number>,
  innerRadius: Ref<number> | ComputedRef<number> = computed(() => 0),
  valueFormat: Ref<(v: number) => string> | ComputedRef<(v: number) => string> = computed(
    () => (v: number) => `${v}%`,
  ),
): object {
  const pieGenerator = pie<PieSlice>()
    .value((d) => d.value)
    .sort(null)

  const pieData = computed(() => pieGenerator(slices.value))

  const arcGenerator = computed(() =>
    arc<PieArcDatum<PieSlice>>().innerRadius(innerRadius.value).outerRadius(outerRadius.value),
  )

  const _bodyDark = useDarkMode()
  const config = useChartConfig()
  const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

  const arcs = computed<PieArcData[]>(() =>
    pieData.value.map((d, i) => ({
      path: arcGenerator.value(d) ?? '',
      color: resolveColor(resolveItemColor(d.data.color, isDark.value), i, isDark.value, config),
      data: d.data,
      centroid: arcGenerator.value.centroid(d) as [number, number],
      angle: d.endAngle - d.startAngle,
    })),
  )

  const legendItems = computed<PieLegendItem[]>(() =>
    slices.value.map((slice, i) => ({
      label: slice.label,
      value: valueFormat.value(slice.value),
      color: resolveColor(resolveItemColor(slice.color, isDark.value), i, isDark.value, config),
    })),
  )

  return { arcs, pieData, legendItems }
}