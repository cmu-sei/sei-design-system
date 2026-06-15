import type { ComputedRef, Ref } from 'vue'
import type { ChartLegendItem } from '@/components'
import type { AxisDomain } from '@/lib/d3'
import { useChartAxis } from '@/composables/useChartAxis'
import { useDarkMode } from '@/composables/useDarkMode'
import { useChartConfig } from '@/composables/useChartConfig'
import { BAND_PADDING } from '@/helpers/charts/constants'
import { heatmapColors, heatmapColorsDark } from '@/helpers/charts/colors'
import { scaleBand, scaleQuantize, min, max } from '@/lib/d3'

export interface HeatmapCell {
  x: string
  y: string
  value: number
}

export interface HeatmapColors {
  light: string[]
  dark: string[]
}

export interface HeatmapRect {
  x: number
  y: number
  width: number
  height: number
  color: string
  binIndex: number
  data: HeatmapCell
}

export interface HeatmapTooltipData extends HeatmapCell {
  color: string
  binIndex: number
}

export interface HeatmapLegendItem extends ChartLegendItem {
  binIndex: number
  range: [number, number]
}

export interface HeatmapAxisOptions {
  xTickFormatter?: Ref<((value: AxisDomain) => string) | undefined> | ComputedRef<((value: AxisDomain) => string) | undefined>
  xTickValues?: Ref<string[] | undefined> | ComputedRef<string[] | undefined>
  yTickFormatter?: Ref<((value: AxisDomain) => string) | undefined> | ComputedRef<((value: AxisDomain) => string) | undefined>
  yTickValues?: Ref<string[] | undefined> | ComputedRef<string[] | undefined>
}

export interface HeatmapLayoutOptions {
  squareCells?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
}

function toDomain(values: string[]): string[] {
  return [...new Set(values)]
}

function formatRangeValue(value: number): string {
  if (Number.isInteger(value)) return String(value)
  const abs = Math.abs(value)
  const fractionDigits = abs >= 10 ? 1 : 2
  return value
    .toFixed(fractionDigits)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1')
}

function formatRangeLabel(range: [number, number]): string {
  return `${formatRangeValue(range[0])} - ${formatRangeValue(range[1])}`
}

export function useHeatmapChart(
  data: Ref<HeatmapCell[]> | ComputedRef<HeatmapCell[]>,
  innerWidth: Ref<number> | ComputedRef<number>,
  innerHeight: Ref<number> | ComputedRef<number>,
  colors?: Ref<HeatmapColors | undefined> | ComputedRef<HeatmapColors | undefined>,
  axisOptions?: HeatmapAxisOptions,
  layoutOptions?: HeatmapLayoutOptions,
) {
  const _bodyDark = useDarkMode()
  const config = useChartConfig()
  const isDark = computed(() => config.isDarkMode?.value ?? _bodyDark.value)

  const palette = computed(() => {
    const override = colors?.value
    const configured = config.colors
    const active = isDark.value
      ? (override?.dark ?? configured?.dark ?? heatmapColorsDark)
      : (override?.light ?? configured?.light ?? heatmapColors)

    return active.length > 0 ? active : isDark.value ? heatmapColorsDark : heatmapColors
  })

  const xDomain = computed(() => toDomain(data.value.map((d) => d.x)))
  const yDomain = computed(() => toDomain(data.value.map((d) => d.y)))

  const squareCells = computed(() => layoutOptions?.squareCells?.value ?? false)
  
  const resolvedPlotSize = computed(() => {
    if (!squareCells.value) {
      return {
        width: innerWidth.value,
        height: innerHeight.value,
      }
    }

    const xCount = Math.max(1, xDomain.value.length)
    const yCount = Math.max(1, yDomain.value.length)
    const heightLimitedWidth = (innerHeight.value * xCount) / yCount
    const width = Math.min(innerWidth.value, heightLimitedWidth)
    const height = (width * yCount) / xCount

    return {
      width,
      height
    }
  })

  const xScale = computed(() =>
    scaleBand<string>().domain(xDomain.value).range([0, resolvedPlotSize.value.width]).padding(BAND_PADDING),
  )

  const yScale = computed(() =>
    scaleBand<string>().domain(yDomain.value).range([0, resolvedPlotSize.value.height]).padding(BAND_PADDING),
  )

  const valueExtent = computed<[number, number]>(() => {
    if (!data.value.length) return [0, 1]
    const minValue = min(data.value, (d) => d.value) ?? 0
    const maxValue = max(data.value, (d) => d.value) ?? 0
    if (minValue === maxValue) return [minValue, minValue + 1]
    return [minValue, maxValue]
  })

  const colorScale = computed(() =>
    scaleQuantize<string>().domain(valueExtent.value).range(palette.value),
  )

  const rangeColors = computed(() => colorScale.value.range())
  const rangeIndex = computed(() => new Map(rangeColors.value.map((color, i) => [color, i])))

  const cells = computed<HeatmapRect[]>(() =>
    data.value.map((cell) => {
      const bandWidth = xScale.value.bandwidth()
      const bandHeight = yScale.value.bandwidth()
      const side = squareCells.value ? Math.min(bandWidth, bandHeight) : 0
      const width = squareCells.value ? side : bandWidth
      const height = squareCells.value ? side : bandHeight
      const offsetX = squareCells.value ? (bandWidth - width) / 2 : 0
      const offsetY = squareCells.value ? (bandHeight - height) / 2 : 0
      const color = colorScale.value(cell.value)
      return {
        x: (xScale.value(cell.x) ?? 0) + offsetX,
        y: (yScale.value(cell.y) ?? 0) + offsetY,
        width,
        height,
        color,
        binIndex: rangeIndex.value.get(color) ?? 0,
        data: cell
      }
    })
  )

  const xAxis = useChartAxis(
    computed(() => xScale.value),
    computed(() => 'bottom' as const),
    undefined,
    undefined,
    computed(() => axisOptions?.xTickFormatter?.value),
    computed(() => axisOptions?.xTickValues?.value)
  )

  const yAxis = useChartAxis(
    computed(() => yScale.value),
    computed(() => 'left' as const),
    undefined,
    undefined,
    computed(() => axisOptions?.yTickFormatter?.value),
    computed(() => axisOptions?.yTickValues?.value)
  )

  const legendItems = computed<HeatmapLegendItem[]>(() =>
    rangeColors.value.map((color, i) => {
      const [start, end] = colorScale.value.invertExtent(color)
      const range: [number, number] = [start ?? valueExtent.value[0], end ?? valueExtent.value[1]]
      return {
        label: formatRangeLabel(range),
        color,
        range,
        binIndex: i
      }
    })
  )

  return {
    cells,
    xAxis,
    yAxis,
    legendItems,
    colorScale
  }
}