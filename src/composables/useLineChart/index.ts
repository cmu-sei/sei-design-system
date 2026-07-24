import type { ComputedRef, Ref } from 'vue'
import type { ChartLegendItem } from '@/components'
import type { AxisDomain, ScaleLinear, ScaleTime } from '@/lib/d3'
import { line, max, min, scaleLinear, scaleTime, scaleUtc } from '@/lib/d3'
import { useChartAxis, type TickFormatter } from '@/composables/useChartAxis'
import { useChartConfig } from '@/composables/useChartConfig'
import { useDarkMode } from '@/composables/useDarkMode'
import { resolveColor } from '@/helpers/charts/colors'

/**
 * A single line-chart point.
 */
export interface LineDatum {
  x: string | number | Date
  y: number | null
}

export type LineXScaleType = 'category' | 'linear' | 'time' | 'utc'

/**
 * A named series of line-chart points.
 */
export interface LineSeries {
  id?: string
  label: string
  data: LineDatum[]
}

export type LineData = LineDatum[] | LineSeries[]

export interface LineChartPoint extends LineDatum {
  xKey: string
  xLabel: string
  xIndex: number
  xPosition: number | Date
}

export interface LinePath {
  seriesId: string
  seriesLabel: string
  points: LineChartPoint[]
  path: string
  color: string
}

export interface LineGapSegment {
  seriesId: string
  seriesLabel: string
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}

export interface LineTooltipData {
  xLabel: string
  seriesLabel: string
  value: number
  color: string
}

interface InternalSeries {
  id: string
  label: string
  data: LineDatum[]
}

type XScale = ScaleLinear<number, number> | ScaleTime<number, number>

const SINGLE_SERIES_ID = '_'
const SINGLE_SERIES_LABEL = 'Series'

/**
 * Type guard that detects multi-series line-chart input.
 *
 * @param data - Line chart input data.
 * @returns True when the data is an array of line series.
 */
export function isLineSeries(data: LineData): data is LineSeries[] {
  const first = data[0]
  return first !== undefined && 'data' in first
}

/**
 * Converts an x value into a stable map key.
 *
 * @param value - Raw x value from the source dataset.
 * @returns Normalized string key.
 */
function normalizeKey(value: string | number | Date): string {
  if (value instanceof Date) return value.toISOString()
  return String(value)
}

/**
 * Converts an x value into a human-readable axis label.
 *
 * @param value - Raw x value from the source dataset.
 * @returns Display label for axis/tooltip usage.
 */
function displayLabel(value: string | number | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

/**
 * Resolves an x value into a numeric or date position for non-category scales.
 *
 * @param value - Raw x value from the source dataset.
 * @param scaleType - Active x-axis scale mode.
 * @returns Resolved position value for the active scale.
 */
function resolvePosition(value: string | number | Date, scaleType: LineXScaleType): number | Date {
  if (scaleType === 'category') return 0
  if (scaleType === 'time' || scaleType === 'utc') {
    if (value instanceof Date) return value
    if (typeof value === 'number') return new Date(value)
    const parsed = Date.parse(value.trim())
    return Number.isNaN(parsed) ? new Date(value) : new Date(parsed)
  }

  if (value instanceof Date) return value.getTime()
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return 0

  const trimmed = value.trim()
  if (!trimmed) return 0

  const asNumber = Number(trimmed)
  if (Number.isFinite(asNumber) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return asNumber
  }

  const asDate = Date.parse(trimmed)
  return Number.isNaN(asDate) ? 0 : asDate
}

/**
 * Converts x values into comparable numeric values for optional domain sorting.
 *
 * @param value - Raw x value from the source dataset.
 * @returns Comparable numeric value when available; otherwise null.
 */
function toComparableValue(value: string | number | Date): number | null {
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  if (!trimmed) return null

  const asNumber = Number(trimmed)
  if (Number.isFinite(asNumber) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return asNumber
  }

  const asDate = Date.parse(trimmed)
  return Number.isNaN(asDate) ? null : asDate
}

/**
 * Builds category tick indices based on available width.
 *
 * @param pointCount - Number of x-domain points.
 * @param width - Available inner chart width in pixels.
 * @returns Index values used for category-axis tick placement.
 */
function buildTickIndices(pointCount: number, width: number): number[] {
  if (pointCount <= 0) return []
  if (pointCount <= 1) return [0]

  const targetTicks = Math.max(2, Math.floor(width / 80))
  if (pointCount <= targetTicks) {
    return Array.from({ length: pointCount }, (_, i) => i)
  }

  const step = Math.max(1, Math.ceil((pointCount - 1) / (targetTicks - 1)))
  const ticks: number[] = []
  for (let i = 0; i < pointCount; i += step) ticks.push(i)
  if (ticks[ticks.length - 1] !== pointCount - 1) ticks.push(pointCount - 1)
  return ticks
}

/**
 * Resolves a stable series id from optional id or fallback label.
 *
 * @param series - Source line series.
 * @returns Stable identifier for series joins and lookup.
 */
function resolveSeriesId(series: LineSeries): string {
  return series.id ?? series.label
}

/**
 * Composable that normalizes line-chart data and exposes scales, axes, lines, and gap segments.
 *
 * @param data - Source line chart data (single- or multi-series).
 * @param innerWidth - Reactive inner chart width in pixels.
 * @param innerHeight - Reactive inner chart height in pixels.
 * @param yTickFormatter - Formatter for numeric y-axis ticks.
 * @param xScaleType - X-axis scale mode.
 * @param xTickValuesOverride - Optional explicit x-axis tick values.
 * @param xTickFormatterOverride - Optional explicit x-axis tick formatter.
 * @returns Reactive chart primitives used by the LineChart component.
 */
export function useLineChart(
  data: Ref<LineData | undefined> | ComputedRef<LineData | undefined>,
  innerWidth: Ref<number> | ComputedRef<number>,
  innerHeight: Ref<number> | ComputedRef<number>,
  yTickFormatter:
    | Ref<string | ((v: number) => string)>
    | ComputedRef<string | ((v: number) => string)> = computed(() => '~s'),
  xScaleType: Ref<LineXScaleType> | ComputedRef<LineXScaleType> = computed(() => 'category'),
  xTickValuesOverride?: Ref<AxisDomain[] | undefined> | ComputedRef<AxisDomain[] | undefined>,
  xTickFormatterOverride?: Ref<TickFormatter | undefined> | ComputedRef<TickFormatter | undefined>,
) {
  const _bodyDark = useDarkMode()
  const config = useChartConfig() ?? {}
  /** Effective dark-mode state resolved from chart config with document fallback. */
  const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

  /** Normalized internal series representation for both single- and multi-series inputs. */
  const series = computed<InternalSeries[]>(() => {
    const values = data.value
    if (!values?.length) return []

    if (isLineSeries(values)) {
      return values.map((item) => ({
        id: resolveSeriesId(item),
        label: item.label,
        data: item.data,
      }))
    }

    return [
      {
        id: SINGLE_SERIES_ID,
        label: SINGLE_SERIES_LABEL,
        data: values,
      },
    ]
  })

  /** Aggregated x-domain metadata including stable keys, labels, values, and scale positions. */
  const xDomainMeta = computed(() => {
    const keySet = new Set<string>()
    const entries: Array<{ key: string; comparable: number | null; position: number | Date }> = []
    const labels = new Map<string, string>()
    const values = new Map<string, string | number | Date>()
    const positions = new Map<string, number | Date>()
    const currentScaleType = xScaleType.value

    series.value.forEach((lineSeries) => {
      lineSeries.data.forEach((point) => {
        const key = normalizeKey(point.x)
        if (!keySet.has(key)) {
          keySet.add(key)
          values.set(key, point.x)
          labels.set(key, displayLabel(point.x))
          if (currentScaleType !== 'category') {
            const position = resolvePosition(point.x, currentScaleType)
            positions.set(key, position)
          }
          entries.push({
            key,
            comparable: toComparableValue(point.x),
            position: currentScaleType === 'category' ? 0 : resolvePosition(point.x, currentScaleType),
          })
        }
      })
    })

    const canSort = entries.every((entry) => entry.comparable != null)
    const keys = canSort
      ? [...entries]
        .sort((a, b) => (a.comparable ?? 0) - (b.comparable ?? 0))
        .map((entry) => entry.key)
      : entries.map((entry) => entry.key)

    return { keys, labels, values, positions }
  })

  /** Series-aligned point arrays with null placeholders for missing x positions. */
  const pointsBySeries = computed<LinePath[]>(() => {
    const xKeys = xDomainMeta.value.keys
    return series.value.map((lineSeries, seriesIndex) => {
      const valuesByKey = new Map<string, LineDatum>()
      lineSeries.data.forEach((point) => valuesByKey.set(normalizeKey(point.x), point))

      const points: LineChartPoint[] = xKeys.map((xKey, xIndex) => {
        const point = valuesByKey.get(xKey)
        const xValue = xDomainMeta.value.values.get(xKey)
        return {
          x: xValue ?? xKey,
          y: point?.y ?? null,
          xKey,
          xLabel: xDomainMeta.value.labels.get(xKey) ?? xKey,
          xIndex,
          xPosition:
            xScaleType.value === 'category'
              ? xIndex
              : (xDomainMeta.value.positions.get(xKey) ?? xIndex),
        }
      })

      return {
        seriesId: lineSeries.id,
        seriesLabel: lineSeries.label,
        points,
        path: '',
        color: resolveColor(undefined, seriesIndex, isDark.value, config),
      }
    })
  })

  /** Flattened list of finite y values used for domain calculation. */
  const allYValues = computed<number[]>(() =>
    pointsBySeries.value.flatMap((lineSeries) =>
      lineSeries.points.flatMap((point) => (point.y == null ? [] : [point.y])),
    ),
  )

  /** Y-axis domain with padding and single-value expansion handling. */
  const yDomain = computed<[number, number]>(() => {
    if (!allYValues.value.length) return [0, 1]

    const minValue = min(allYValues.value) ?? 0
    const maxValue = max(allYValues.value) ?? 1
    if (minValue === maxValue) {
      const padding = minValue === 0 ? 1 : Math.abs(minValue) * 0.1
      return [minValue - padding, maxValue + padding]
    }

    const span = maxValue - minValue
    const padding = span * 0.08
    return [minValue - padding, maxValue + padding]
  })

  /** X scale resolved by mode (category, linear, time, or utc). */
  const xScale = computed<XScale>(() => {
    const currentScaleType = xScaleType.value
    if (currentScaleType === 'time' || currentScaleType === 'utc') {
      const positions = xDomainMeta.value.keys
        .map((key) => xDomainMeta.value.positions.get(key))
        .filter((value): value is Date => value instanceof Date)
      const [minValue, maxValue] = positions.length
        ? [positions[0], positions[positions.length - 1]]
        : [new Date(), new Date()]

      const scale = currentScaleType === 'utc'
        ? scaleUtc<number, number>()
        : scaleTime<number, number>()
      return scale
        .domain([minValue, maxValue])
        .range([0, innerWidth.value])
    }

    if (currentScaleType === 'linear') {
      const positions = xDomainMeta.value.keys
        .map((key) => xDomainMeta.value.positions.get(key))
        .filter((value): value is number => typeof value === 'number')
      const minValue = positions[0] ?? 0
      const maxValue = positions[positions.length - 1] ?? 1
      return scaleLinear<number, number>()
        .domain([minValue, maxValue])
        .range([0, innerWidth.value])
    }

    const lastIndex = Math.max(0, xDomainMeta.value.keys.length - 1)
    return scaleLinear<number, number>()
      .domain([0, lastIndex])
      .range([0, innerWidth.value])
  })

  /** Nice linear y scale spanning the padded y domain. */
  const yScale = computed<ScaleLinear<number, number>>(() =>
    scaleLinear<number, number>()
      .domain(yDomain.value)
      .nice()
      .range([innerHeight.value, 0]),
  )

  /** X-axis tick values from explicit overrides or scale-derived defaults. */
  const xTickValues = computed<AxisDomain[]>(() => {
    const override = xTickValuesOverride?.value
    if (override?.length) return override

    const currentScaleType = xScaleType.value
    if (currentScaleType === 'category') {
      return buildTickIndices(xDomainMeta.value.keys.length, innerWidth.value)
    }

    const scale = xScale.value
    if ('ticks' in scale && typeof scale.ticks === 'function') {
      return scale.ticks(Math.max(2, Math.floor(innerWidth.value / 80)))
    }
    return []
  })

  /** X-axis tick formatter using explicit overrides or category label mapping. */
  const xTickFormatter = computed(() => (value: AxisDomain) => {
    const override = xTickFormatterOverride?.value
    if (override) return override(value)

    const currentScaleType = xScaleType.value
    if (currentScaleType !== 'category') return ''

    const numericValue = typeof value === 'number' ? value : Number(value)
    const index = Number.isFinite(numericValue) ? Math.round(numericValue) : 0
    const xKey = xDomainMeta.value.keys[index]
    return xKey ? (xDomainMeta.value.labels.get(xKey) ?? xKey) : ''
  })

  /** Configured D3 bottom x-axis generator for the current x scale mode. */
  const xAxis = useChartAxis(
    computed(() => xScale.value),
    computed(() => 'bottom' as const),
    undefined,
    computed(() =>
      xScaleType.value === 'category' || xTickValuesOverride?.value?.length
        ? undefined
        : Math.max(2, Math.floor(innerWidth.value / 80)),
    ),
    computed(() =>
      xScaleType.value === 'category' || xTickFormatterOverride?.value
        ? xTickFormatter.value
        : undefined,
    ),
    computed(() => xTickValues.value),
  )

  /** Responsive target tick count for the y-axis based on chart height. */
  const yAxisTicks = computed(() => Math.max(2, Math.floor(innerHeight.value / 42)))
  /** Configured D3 left y-axis generator with numeric tick formatting. */
  const yAxis = useChartAxis(
    computed(() => yScale.value),
    computed(() => 'left' as const),
    yTickFormatter,
    computed(() => yAxisTicks.value),
  )

  /** D3 line generator configured for the active x-scale type and current y scale. */
  const lineGenerator = computed(() =>
    line<LineChartPoint>()
      .defined((point) => point.y != null && Number.isFinite(point.y))
      .x((point) =>
        xScaleType.value === 'category'
          ? (xScale.value as ScaleLinear<number, number>)(point.xIndex)
          : (xScale.value as ScaleLinear<number, number> | ScaleTime<number, number>)(point.xPosition as never),
      )
      .y((point) => yScale.value(point.y ?? 0)),
  )

  /** Series paths with SVG path strings generated from aligned point sets. */
  const lines = computed<LinePath[]>(() =>
    pointsBySeries.value.map((lineSeries) => ({
      ...lineSeries,
      path: lineGenerator.value(lineSeries.points) ?? '',
    })),
  )

  /** Dashed connector segments bridging runs of null values between known points. */
  const gapSegments = computed<LineGapSegment[]>(() => {
    const segments: LineGapSegment[] = []

    lines.value.forEach((lineSeries) => {
      const points = lineSeries.points
      if (points.length < 3) return

      let index = 0
      while (index < points.length) {
        const point = points[index]
        if (point?.y != null) {
          index += 1
          continue
        }

        const start = index
        while (index < points.length && points[index]?.y == null) index += 1
        const end = index - 1

        const previous = points[start - 1]
        const next = points[end + 1]
        if (previous?.y == null || next?.y == null) continue

        segments.push({
          seriesId: lineSeries.seriesId,
          seriesLabel: lineSeries.seriesLabel,
          x1: xScaleType.value === 'category'
            ? (xScale.value as ScaleLinear<number, number>)(previous.xIndex)
            : (xScale.value as ScaleLinear<number, number> | ScaleTime<number, number>)(previous.xPosition as never),
          y1: yScale.value(previous.y),
          x2: xScaleType.value === 'category'
            ? (xScale.value as ScaleLinear<number, number>)(next.xIndex)
            : (xScale.value as ScaleLinear<number, number> | ScaleTime<number, number>)(next.xPosition as never),
          y2: yScale.value(next.y),
          color: lineSeries.color,
        })
      }
    })

    return segments
  })

  /** Legend items for multi-series datasets only. */
  const legendItems = computed<ChartLegendItem[]>(() => {
    if (!isLineSeries(data.value ?? [])) return []
    return lines.value.map((lineSeries) => ({
      label: lineSeries.seriesLabel,
      color: lineSeries.color,
    }))
  })

  /** X-axis domain labels derived from the metadata map. */
  const xDomainLabels = computed(() => xDomainMeta.value.keys.map((key) => xDomainMeta.value.labels.get(key) ?? key))

  return {
    lines,
    gapSegments,
    xAxis,
    yAxis,
    xScale,
    yScale,
    legendItems,
    xTickValues,
    xDomainLabels,
  }
}