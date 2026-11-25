import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { ref, type Ref } from 'vue'
import type { TickFormatter } from '../useChartAxis'
import { CHART_CONFIG_KEY, type ChartConfig } from '../useChartConfig'
import { heatmapColors, heatmapColorsDark } from '../../helpers/charts/colors'
import {
  useHeatmapChart,
  type HeatmapAxisOptions,
  type HeatmapCell,
  type HeatmapColors,
  type HeatmapLayoutOptions,
  type HeatmapLegendItem,
  type HeatmapRect,
} from './index'

enableAutoUnmount(afterEach)

function createHeatmap(
  data: Ref<HeatmapCell[]>,
  options: {
    width?: Ref<number>
    height?: Ref<number>
    colors?: Ref<HeatmapColors | undefined>
    axes?: HeatmapAxisOptions
    layout?: HeatmapLayoutOptions
    config?: ChartConfig
  } = {},
) {
  let chart: ReturnType<typeof useHeatmapChart> | undefined
  mount({
    setup() {
      chart = useHeatmapChart(
        data,
        options.width ?? ref(240),
        options.height ?? ref(120),
        options.colors,
        options.axes,
        options.layout,
      )
      return {}
    },
    template: '<div />',
  }, {
    global: {
      provide: { [CHART_CONFIG_KEY]: options.config ?? { isDarkMode: ref(false) } },
    },
  })

  if (!chart) throw new Error('Failed to create heatmap composable scope')
  return chart
}

describe('useHeatmapChart', () => {
  it('preserves category order without filling sparse cells and drops stale categories on data replacement', () => {
    const data = ref<HeatmapCell[]>([
      { x: 'Tuesday', y: 'Evening', value: -5 },
      { x: 'Monday', y: 'Morning', value: 10 },
      { x: 'Tuesday', y: 'Morning', value: 15 },
    ])
    const chart = createHeatmap(data)

    expect(chart.xAxis.value.scale().domain()).toEqual(['Tuesday', 'Monday'])
    expect(chart.yAxis.value.scale().domain()).toEqual(['Evening', 'Morning'])
    expect(chart.cells.value.map((cell: HeatmapRect) => cell.data)).toEqual(data.value)
    expect(chart.cells.value[0].x).toBe(chart.cells.value[2].x)
    expect(chart.cells.value[1].y).toBe(chart.cells.value[2].y)

    data.value = [{ x: 'Wednesday', y: 'Night', value: 42 }]
    expect(chart.xAxis.value.scale().domain()).toEqual(['Wednesday'])
    expect(chart.yAxis.value.scale().domain()).toEqual(['Night'])
    expect(chart.cells.value.map((cell: HeatmapRect) => cell.data)).toEqual(data.value)
  })

  it('fits square cells within either dimension and reacts to layout and size changes', () => {
    const width = ref(300)
    const height = ref(100)
    const squareCells = ref(false)
    const chart = createHeatmap(ref([
      { x: 'A', y: 'Morning', value: 0 },
      { x: 'B', y: 'Evening', value: 1 },
      { x: 'C', y: 'Morning', value: 2 },
    ]), { width, height, layout: { squareCells } })

    expect(chart.cells.value[0].width).toBeGreaterThan(chart.cells.value[0].height)

    squareCells.value = true
    expect(chart.xAxis.value.scale().range()).toEqual([0, 150])
    expect(chart.yAxis.value.scale().range()).toEqual([0, 100])
    for (const cell of chart.cells.value) {
      expect(cell.width).toBeCloseTo(cell.height)
      expect(cell.x + cell.width).toBeLessThanOrEqual(150)
      expect(cell.y + cell.height).toBeLessThanOrEqual(100)
    }

    width.value = 90
    height.value = 300
    expect(chart.xAxis.value.scale().range()).toEqual([0, 90])
    expect(chart.yAxis.value.scale().range()).toEqual([0, 60])
    for (const cell of chart.cells.value) {
      expect(cell.width).toBeCloseTo(cell.height)
      expect(cell.x + cell.width).toBeLessThanOrEqual(90)
      expect(cell.y + cell.height).toBeLessThanOrEqual(60)
    }
  })

  it('keeps color ranges usable when data is empty or all values are equal', () => {
    const data = ref<HeatmapCell[]>([])
    const chart = createHeatmap(data, {
      colors: ref({ light: ['#111111', '#eeeeee'], dark: ['#111111', '#eeeeee'] }),
    })

    expect(chart.cells.value).toEqual([])
    expect(chart.colorScale.value.domain()).toEqual([0, 1])

    data.value = [
      { x: 'Monday', y: 'Morning', value: 42 },
      { x: 'Tuesday', y: 'Morning', value: 42 },
    ]
    expect(chart.colorScale.value.domain()).toEqual([42, 43])
    expect(chart.cells.value.map((cell: HeatmapRect) => cell.binIndex)).toEqual([0, 0])
    expect(chart.legendItems.value).toMatchObject([{ label: '42 - 42.5' }, { label: '42.5 - 43' }])

    data.value = []
    expect(chart.cells.value).toEqual([])
    expect(chart.colorScale.value.domain()).toEqual([0, 1])
    expect(chart.legendItems.value.map((item: HeatmapLegendItem) => item.range)).toEqual([[0, 0.5], [0.5, 1]])
  })

  it('assigns negative values, zero, thresholds, and endpoints to the matching legend bins', () => {
    const chart = createHeatmap(ref([-3, -1, 0, 1, 3].map((value) => ({
      x: String(value), y: 'Morning', value,
    }))), {
      colors: ref({
        light: ['#111111', '#777777', '#eeeeee'],
        dark: ['#111111', '#777777', '#eeeeee'],
      }),
    })

    expect(chart.cells.value.map(({ color, binIndex }: HeatmapRect) => ({ color, binIndex }))).toEqual([
      { color: '#111111', binIndex: 0 },
      { color: '#777777', binIndex: 1 },
      { color: '#777777', binIndex: 1 },
      { color: '#eeeeee', binIndex: 2 },
      { color: '#eeeeee', binIndex: 2 },
    ])
    expect(chart.legendItems.value).toEqual([
      { label: '-3 - -1', color: '#111111', range: [-3, -1], binIndex: 0 },
      { label: '-1 - 1', color: '#777777', range: [-1, 1], binIndex: 1 },
      { label: '1 - 3', color: '#eeeeee', range: [1, 3], binIndex: 2 },
    ])
  })

  it.each([
    { min: 0.02, max: 0.04, labels: ['0.02 - 0.03', '0.03 - 0.04'] },
    { min: 10, max: 11, labels: ['10 - 10.5', '10.5 - 11'] },
  ])('formats fractional legend ranges without floating-point noise for $min to $max', ({ min, max, labels }) => {
    const chart = createHeatmap(ref([
      { x: 'Monday', y: 'Morning', value: min },
      { x: 'Tuesday', y: 'Morning', value: max },
    ]), {
      colors: ref({ light: ['#111111', '#eeeeee'], dark: ['#111111', '#eeeeee'] }),
    })

    expect(chart.legendItems.value).toMatchObject(labels.map((label) => ({ label })))
  })

  it('prefers local palettes over chart configuration and falls back safely for empty palettes in either theme', () => {
    const isDarkMode = ref(false)
    const colors = ref<HeatmapColors>()
    const configured = { light: ['#111111', '#222222'], dark: ['#aaaaaa', '#bbbbbb'] }
    const override = { light: ['#123456', '#654321'], dark: ['#abcdef', '#fedcba'] }
    const chart = createHeatmap(ref([
      { x: 'Monday', y: 'Morning', value: 0 },
      { x: 'Tuesday', y: 'Morning', value: 100 },
    ]), { colors, config: { isDarkMode, colors: configured } })
    const expectPalette = (palette: string[]) => {
      expect(chart.legendItems.value).toMatchObject(palette.map((color) => ({ color })))
      expect(chart.cells.value.map((cell: HeatmapRect) => cell.color)).toEqual([palette[0], palette.at(-1)])
    }

    expectPalette(configured.light)
    colors.value = override
    expectPalette(override.light)
    isDarkMode.value = true
    expectPalette(override.dark)
    colors.value = undefined
    expectPalette(configured.dark)
    colors.value = { light: [], dark: [] }
    expectPalette(heatmapColorsDark)
    isDarkMode.value = false
    expectPalette(heatmapColors)
  })

  it('reacts to tick filters and formatters without filtering out data cells', () => {
    const xTickValues = ref(['Tuesday'])
    const yTickValues = ref(['Morning'])
    const xTickFormatter = ref<TickFormatter | undefined>((value) => `Day: ${value}`)
    const yTickFormatter = ref<TickFormatter | undefined>((value) => `Time: ${value}`)
    const chart = createHeatmap(ref([
      { x: 'Monday', y: 'Morning', value: 0 },
      { x: 'Tuesday', y: 'Evening', value: 1 },
    ]), { axes: { xTickValues, yTickValues, xTickFormatter, yTickFormatter } })

    expect(chart.xAxis.value.tickValues()).toEqual(['Tuesday'])
    expect(chart.yAxis.value.tickValues()).toEqual(['Morning'])
    expect(chart.xAxis.value.tickFormat()).toBe(xTickFormatter.value)
    expect(chart.yAxis.value.tickFormat()).toBe(yTickFormatter.value)
    expect(chart.cells.value).toHaveLength(2)

    xTickValues.value = ['Monday']
    yTickValues.value = ['Evening']
    xTickFormatter.value = (value) => String(value).slice(0, 3)
    expect(chart.xAxis.value.tickValues()).toEqual(['Monday'])
    expect(chart.yAxis.value.tickValues()).toEqual(['Evening'])
    expect(chart.xAxis.value.tickFormat()).toBe(xTickFormatter.value)

    xTickValues.value = []
    yTickValues.value = []
    xTickFormatter.value = undefined
    yTickFormatter.value = undefined
    expect(chart.xAxis.value.tickValues()).toBeNull()
    expect(chart.yAxis.value.tickValues()).toBeNull()
    expect(chart.xAxis.value.tickFormat()).toBeNull()
    expect(chart.yAxis.value.tickFormat()).toBeNull()
    expect(chart.cells.value).toHaveLength(2)
  })
})
