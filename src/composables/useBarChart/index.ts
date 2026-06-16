import type { ComputedRef, Ref } from 'vue'
import type { ScaleLinear } from '@/lib/d3'
import type { ChartLegendItem } from '@/components'
import { scaleBand, scaleLinear, stack, stackOrderNone, stackOffsetNone, max } from '@/lib/d3'
import { useChartAxis } from '@/composables/useChartAxis'
import { useChartConfig } from '@/composables/useChartConfig'
import { useDarkMode } from '@/composables/useDarkMode'
import {
  defaultSingleColor,
  defaultSingleColorDark,
  resolveColor,
  resolveItemColor,
} from '@/helpers/charts/colors'

/**
 * A single bar in a bar chart: a category label paired with its numeric value.
 * @interface BarItem
 * @property {string} label - Category label for this bar.
 * @property {number} value - Numeric value represented by bar height/width.
 * @property {Object} [color] - Optional color override as a plain string or { light, dark } object for mode-specific colors.
 */
export interface BarItem {
  label: string
  value: number
  /** Optional color override. Use `{ light, dark }` to provide mode-specific colors, or a plain string for both modes. */
  color?: { light: string; dark: string } | string
}

/**
 * A named data series for grouped or stacked bar charts.
 * Each series contains one bar per category (from the `data` array).
 * @interface BarSeries
 * @property {string} [id] - Optional unique identifier for this series. Falls back to `label` when omitted.
 * @property {string} label - Display label shown in tooltip and legend. Also used as grouping key when `id` is omitted.
 * @property {BarItem[]} data - Array of bars in this series.
 * @property {Object} [color] - Optional explicit color for all bars in this series, as a plain string or { light, dark } object.
 */
export interface BarSeries {
  /** Optional unique id for grouping/stacking. Falls back to `label` when omitted. */
  id?: string
  /** Display label shown in tooltip and legend. Also used as grouping key when `id` is omitted. */
  label: string
  data: BarItem[]
  /** Optional explicit color for every bar in this series. Use `{ light, dark }` to provide mode-specific colors, or a plain string for both modes. */
  color?: { light: string; dark: string } | string
}

/**
 * Orientation of bars in a bar chart.
 * @type {('vertical' | 'horizontal')} BarOrientation
 */
export type BarOrientation = 'vertical' | 'horizontal'

/**
 * Display mode for multi-series bar charts.
 * @type {('grouped' | 'stacked')} BarMode
 */
export type BarMode = 'grouped' | 'stacked'

/**
 * Union type for bar chart data: either single-series BarItem[] or multi-series BarSeries[].
 * @type {(BarItem[] | BarSeries[])} BarData
 */
export type BarData = BarItem[] | BarSeries[]

/**
 * Type guard to distinguish between single-series and multi-series bar data.
 *
 * @param {BarData} data - The data array to check.
 * @returns {data is BarSeries[]} True if data contains BarSeries objects (multi-series), false if BarItem[] (single-series).
 *
 * @example
 * if (isBarSeries(data)) {
 *   // handle multi-series bars
 * } else {
 *   // handle single-series bars
 * }
 */
export function isBarSeries(data: BarData): data is BarSeries[] {
  const first = data[0]
  return first !== undefined && 'data' in first
}

/**
 * A resolved, positioned bar rectangle ready to render as an SVG element.
 * Contains position, dimensions, color, and data context.
 * @interface BarRect
 * @property {number} x - SVG x-coordinate of the top-left corner.
 * @property {number} y - SVG y-coordinate of the top-left corner.
 * @property {number} width - Width in SVG units.
 * @property {number} height - Height in SVG units.
 * @property {string} color - Resolved color for this bar.
 * @property {string} [seriesName] - Series display name (only for multi-series charts).
 * @property {string} label - Category label for this bar.
 * @property {number} value - Numeric value represented by this bar.
 */
export interface BarRect {
  x: number
  y: number
  width: number
  height: number
  color: string
  /** Present only for multi-series charts. */
  seriesName?: string
  label: string
  value: number
}

export interface BarTooltipData {
  label: string
  /** Present only for multi-series charts. */
  seriesName?: string
  value: number
  color: string
}

interface NormalizedGroup {
  label: string
  values: Record<string, number>
}

/**
 * Composable that computes D3 scales, axis generators, bar rectangles, and legend items from bar chart data.
 *
 * Automatically detects data shape (single-series BarItem[] vs. multi-series BarSeries[]) and computes
 * appropriate scales and rectangles. Returns reactive ComputedRefs for use in templates.
 *
 * @param {Ref<BarData | undefined> | ComputedRef<BarData | undefined>} data - Bar chart data (BarItem[] or BarSeries[]).
 * @param {Ref<BarOrientation> | ComputedRef<BarOrientation>} orientation - 'vertical' or 'horizontal'.
 * @param {Ref<BarMode> | ComputedRef<BarMode>} mode - 'grouped' or 'stacked' for multi-series.
 * @param {Ref<number> | ComputedRef<number>} innerWidth - Inner SVG width (after margin subtraction).
 * @param {Ref<number> | ComputedRef<number>} innerHeight - Inner SVG height (after margin subtraction).
 * @param {Ref<string | Function> | ComputedRef<string | Function>} [valueFormat='~s'] - D3 format string or formatter function for numeric axis labels.
 *
 * @returns {{ data: BarData, categoryScale: ScaleBand<string>, valueScale: ScaleLinear<number, number>, xAxis: any, yAxis: any, bars: ComputedRef<BarRect[]>, legendItems: ComputedRef<ChartLegendItem[]> }} Reactive computed values:
 *   - categoryScale: ScaleBand for category axis
 *   - valueScale: ScaleLinear for value axis
 *   - xAxis: Computed D3 axis generator for x-axis
 *   - yAxis: Computed D3 axis generator for y-axis
 *   - bars: ComputedRef<BarRect[]> positioned and colored bars
 *   - legendItems: ComputedRef<ChartLegendItem[]> legend items for all series/items
 *
 * @example
 * const { xAxis, yAxis, bars, legendItems } = useBarChart(
 *   data,
 *   computed(() => 'vertical'),
 *   computed(() => 'grouped'),
 *   computed(() => 800),
 *   computed(() => 400)
 * )
 */
export function useBarChart(
  data: Ref<BarData | undefined> | ComputedRef<BarData | undefined>,
  orientation: Ref<BarOrientation> | ComputedRef<BarOrientation>,
  mode: Ref<BarMode> | ComputedRef<BarMode>,
  innerWidth: Ref<number> | ComputedRef<number>,
  innerHeight: Ref<number> | ComputedRef<number>,
  valueFormat:
    | Ref<string | ((v: number) => string)>
    | ComputedRef<string | ((v: number) => string)> = computed(() => '~s'),
) {
  const isVertical = computed(() => orientation.value === 'vertical')
  const isStacked = computed(() => mode.value === 'stacked')
  const isMultiSeries = computed(() => !!data.value?.length && isBarSeries(data.value))

  const items = computed<BarItem[] | undefined>(() =>
    !isMultiSeries.value ? (data.value as BarItem[] | undefined) : undefined,
  )

  const seriesData = computed<BarSeries[] | undefined>(() =>
    isMultiSeries.value ? (data.value as BarSeries[] | undefined) : undefined,
  )

  // Normalize to internal structure

  /** Resolve the grouping key for a series: id if provided, otherwise label. */
  function seriesKey(s: BarSeries): string {
    return s.id ?? s.label
  }

  const normalizedData = computed<NormalizedGroup[]>(() => {
    if (isMultiSeries.value && seriesData.value) {
      const allLabels = [...new Set(seriesData.value.flatMap((s) => s.data.map((d) => d.label)))]
      return allLabels.map((label) => ({
        label,
        values: Object.fromEntries(
          seriesData.value!.map((s) => [
            seriesKey(s),
            s.data.find((d) => d.label === label)?.value ?? 0,
          ]),
        ),
      }))
    }
    return (items.value ?? []).map((item) => ({ label: item.label, values: { _: item.value } }))
  })

  const resolvedSeriesIds = computed<string[]>(() =>
    isMultiSeries.value ? (seriesData.value?.map((s) => seriesKey(s)) ?? []) : ['_'],
  )

  const seriesNameById = computed<Record<string, string>>(() =>
    Object.fromEntries((seriesData.value ?? []).map((s) => [seriesKey(s), s.label])),
  )

  function resolveSeriesName(seriesId: string): string | undefined {
    return isMultiSeries.value ? (seriesNameById.value[seriesId] ?? seriesId) : undefined
  }

  const labels = computed(() => normalizedData.value.map((d) => d.label))

  // Color resolution
  const _bodyDark = useDarkMode()
  const config = useChartConfig()
  const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

  function resolveBarColor(seriesIndex: number, groupIndex: number): string {
    if (isMultiSeries.value) {
      const s = seriesData.value?.[seriesIndex]
      const color = resolveItemColor(s?.color, isDark.value)
      return color ?? resolveColor(undefined, seriesIndex, isDark.value, config)
    }
    const item = items.value?.[groupIndex]
    const color = resolveItemColor(item?.color, isDark.value)
    return color ?? (isDark.value ? defaultSingleColorDark : defaultSingleColor)
  }

  // Max value helpers
  const maxGroupedValue = computed(
    () =>
      max(normalizedData.value, (group) =>
        max(resolvedSeriesIds.value, (id) => group.values[id] ?? 0),
      ) ?? 0,
  )

  const maxStackedValue = computed(
    () =>
      max(normalizedData.value, (group) =>
        resolvedSeriesIds.value.reduce((sum, id) => sum + (group.values[id] ?? 0), 0),
      ) ?? 0,
  )

  const maxValue = computed(() => (isStacked.value ? maxStackedValue.value : maxGroupedValue.value))

  // Categorical scale (band)
  const categoryScale = computed(() =>
    scaleBand<string>()
      .domain(labels.value)
      .range(isVertical.value ? [0, innerWidth.value] : [0, innerHeight.value])
      .padding(0.2),
  )

  // Sub-scale (nested band for grouped mode)
  const subScale = computed(() =>
    scaleBand<string>()
      .domain(resolvedSeriesIds.value)
      .range([0, categoryScale.value.bandwidth()])
      .padding(0.05),
  )

  // Value scale (linear)
  const valueScale = computed<ScaleLinear<number, number>>(() => {
    const linear = scaleLinear<number, number>()
      .domain([0, maxValue.value * 1.05])
      .nice()
    return isVertical.value
      ? linear.range([innerHeight.value, 0])
      : linear.range([0, innerWidth.value])
  })

  // D3 axis generators
  const xAxisScale = computed(() => (isVertical.value ? categoryScale.value : valueScale.value))
  const xAxisDirection = computed(() => 'bottom' as const)
  const xAxisFormat = computed(() => (isVertical.value ? undefined : valueFormat.value))
  // Only limit ticks on the linear (value) x-axis (horizontal orientation); band axes show all categories
  const xAxisTicks = computed(() =>
    isVertical.value ? undefined : Math.max(2, Math.floor(innerWidth.value / 60)),
  )
  const xAxis = useChartAxis(xAxisScale, xAxisDirection, xAxisFormat, xAxisTicks)

  const yAxisScale = computed(() => (isVertical.value ? valueScale.value : categoryScale.value))
  const yAxisDirection = computed(() => 'left' as const)
  const yAxisFormat = computed(() => (isVertical.value ? valueFormat.value : undefined))
  // Only limit ticks on the linear (value) y-axis (vertical orientation); band axes show all categories
  const yAxisTicks = computed(() =>
    isVertical.value ? Math.max(2, Math.floor(innerHeight.value / 40)) : undefined,
  )
  const yAxis = useChartAxis(yAxisScale, yAxisDirection, yAxisFormat, yAxisTicks)

  // Bar rectangles
  const bars = computed<BarRect[]>(() =>
    isStacked.value ? computeStackedBars() : computeGroupedBars(),
  )

  /**
   * Computes grouped bar rectangles (side-by-side bars for multi-series).
   * Each series is positioned next to others within a category group.
   * @private
   * @returns {BarRect[]} Array of bar rectangles for grouped layout
   */
  function computeGroupedBars(): BarRect[] {
    const result: BarRect[] = []
    normalizedData.value.forEach((group, gi) => {
      const catPos = categoryScale.value(group.label) ?? 0
      resolvedSeriesIds.value.forEach((seriesId, ki) => {
        const value = group.values[seriesId] ?? 0
        const subPos = subScale.value(seriesId) ?? 0
        const color = resolveBarColor(ki, gi)
        const seriesName = resolveSeriesName(seriesId)

        if (isVertical.value) {
          const y = valueScale.value(value)
          result.push({
            x: catPos + subPos,
            y,
            width: subScale.value.bandwidth(),
            height: innerHeight.value - y,
            color,
            seriesName,
            label: group.label,
            value,
          })
        } else {
          const w = valueScale.value(value)
          result.push({
            x: 0,
            y: catPos + subPos,
            width: w,
            height: subScale.value.bandwidth(),
            color,
            seriesName,
            label: group.label,
            value,
          })
        }
      })
    })
    return result
  }

  /**
   * Computes stacked bar rectangles (bars stacked on top of each other).
   * Each series contributes its value to the total bar height/width.
   * @private
   * @returns {BarRect[]} Array of bar rectangles for stacked layout
   */
  function computeStackedBars(): BarRect[] {
    const result: BarRect[] = []
    const stackData = normalizedData.value.map((group) => ({
      label: group.label,
      ...Object.fromEntries(resolvedSeriesIds.value.map((id) => [id, group.values[id] ?? 0])),
    }))

    const stackGen = stack<(typeof stackData)[0]>()
      .keys(resolvedSeriesIds.value)
      .order(stackOrderNone)
      .offset(stackOffsetNone)

    const stackSeries = stackGen(stackData)

    resolvedSeriesIds.value.forEach((seriesId, ki) => {
      const layer = stackSeries[ki]
      if (!layer) return
      const color = resolveBarColor(ki, 0)
      const seriesName = resolveSeriesName(seriesId)
      layer.forEach((point) => {
        const datum = point.data as Record<string, unknown>
        const label = datum.label as string
        const catPos = categoryScale.value(label) ?? 0
        const value = (datum[seriesId] as number) ?? 0

        if (isVertical.value) {
          const y0 = valueScale.value(point[1])
          const y1 = valueScale.value(point[0])
          result.push({
            x: catPos,
            y: y0,
            width: categoryScale.value.bandwidth(),
            height: y1 - y0,
            color,
            seriesName,
            label,
            value,
          })
        } else {
          const x0 = valueScale.value(point[0])
          const x1 = valueScale.value(point[1])
          result.push({
            x: x0,
            y: catPos,
            width: x1 - x0,
            height: categoryScale.value.bandwidth(),
            color,
            seriesName,
            label,
            value,
          })
        }
      })
    })
    return result
  }

  // Legend items (multi-series only)
  const legendItems = computed<ChartLegendItem[]>(() => {
    if (!isMultiSeries.value) return []
    return (seriesData.value ?? []).map((s, i) => ({
      label: s.label,
      color: resolveBarColor(i, 0),
    }))
  })

  return { bars, xAxis, yAxis, legendItems, categoryScale, valueScale }
}