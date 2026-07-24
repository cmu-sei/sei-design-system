import type { AxisDomain } from '../../lib/d3'
import { useLineChart, isLineSeries, type LineData, type LineXScaleType, type LineChartPoint } from './index'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/composables/useDarkMode', () => ({
  useDarkMode: () => ref(false),
}))

vi.mock('@/composables/useDarkMode/index.ts', () => ({
  useDarkMode: () => ref(false),
}))

vi.mock('@/composables/useChartConfig', () => ({
  useChartConfig: () => ({}),
}))

vi.mock('@/composables/useChartConfig/index.ts', () => ({
  useChartConfig: () => ({}),
}))

function createLineChart(
  data: LineData,
  options?: {
    xScaleType?: LineXScaleType
    xTickValues?: AxisDomain[]
    xTickFormatter?: (value: AxisDomain) => string
    innerWidth?: number
    innerHeight?: number
  },
) {
  let chart: ReturnType<typeof useLineChart> | undefined
  const wrapper = mount({
    setup() {
      chart = useLineChart(
        ref(data),
        ref(options?.innerWidth ?? 480),
        ref(options?.innerHeight ?? 240),
        ref('~s'),
        ref(options?.xScaleType ?? 'category'),
        ref(options?.xTickValues),
        ref(options?.xTickFormatter),
      )
      return {}
    },
    template: '<div />',
  })

  if (!chart) throw new Error('Failed to create line chart composable scope.')

  return { chart, stop: () => wrapper.unmount() }
}

describe('useLineChart', () => {
  it('detects multi-series datasets with isLineSeries', () => {
    expect(isLineSeries([{ x: '2023', y: 10 }])).toBe(false)
    expect(
      isLineSeries([
        {
          label: 'Series A',
          data: [{ x: '2023', y: 10 }],
        },
      ]),
    ).toBe(true)
  })

  it('aligns series to a shared x-domain and inserts nulls for missing points', () => {
    const { stop, chart } = createLineChart([
      {
        label: 'Series A',
        data: [
          { x: '2021', y: 10 },
          { x: '2022', y: 20 },
          { x: '2023', y: 30 },
        ],
      },
      {
        label: 'Series B',
        data: [
          { x: '2021', y: 5 },
          { x: '2023', y: 25 },
        ],
      },
    ])

    const secondSeries = chart.lines.value[1]
    expect(secondSeries?.points).toHaveLength(3)
    expect(secondSeries?.points[1]?.xLabel).toBe('2022')
    expect(secondSeries?.points[1]?.y).toBeNull()

    stop()
  })

  it('creates dashed-gap segments between valid points around null runs', () => {
    const { stop, chart } = createLineChart([
      {
        label: 'Series A',
        data: [
          { x: 'Q1', y: 10 },
          { x: 'Q2', y: null },
          { x: 'Q3', y: null },
          { x: 'Q4', y: 40 },
        ],
      },
    ])

    expect(chart.gapSegments.value).toHaveLength(1)
    const gap = chart.gapSegments.value[0]
    expect(gap?.x2).toBeGreaterThan(gap?.x1 ?? 0)
    expect(gap?.seriesLabel).toBe('Series A')

    stop()
  })

  it('keeps sortable x values in ascending order when earlier series are sparse', () => {
    const { stop, chart } = createLineChart([
      {
        label: 'Series A',
        data: [
          { x: '2021', y: 10 },
          { x: '2023', y: 30 },
        ],
      },
      {
        label: 'Series B',
        data: [
          { x: '2021', y: 5 },
          { x: '2022', y: 15 },
          { x: '2023', y: 25 },
        ],
      },
    ])

    expect(chart.xDomainLabels.value).toEqual(['2021', '2022', '2023'])
    stop()
  })

  it('returns empty legend items for single-series input and populated items for multi-series', () => {
    const single = createLineChart([
      { x: '2021', y: 10 },
      { x: '2022', y: 15 },
    ])
    expect(single.chart.legendItems.value).toEqual([])
    single.stop()

    const multi = createLineChart([
      { label: 'Series A', data: [{ x: '2021', y: 10 }] },
      { label: 'Series B', data: [{ x: '2021', y: 15 }] },
    ])
    expect(multi.chart.legendItems.value).toHaveLength(2)
    expect(multi.chart.legendItems.value[0]?.label).toBe('Series A')
    multi.stop()
  })

  it('uses explicit UTC tick values and formatter when provided', () => {
    const months = [new Date(Date.UTC(2025, 0, 1)), new Date(Date.UTC(2025, 11, 1))]
    const { stop, chart } = createLineChart(
      [
        {
          label: 'Series A',
          data: months.map((month, index) => ({ x: month, y: index + 1 })),
        },
      ],
      {
        xScaleType: 'utc',
        xTickValues: months,
        xTickFormatter: (value) =>
          new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(
            value instanceof Date ? value : new Date(value as number),
          ),
      },
    )

    expect(chart.xTickValues.value).toEqual(months)
    expect(chart.xAxis.value.tickValues?.()).toEqual(months)
    expect(chart.xAxis.value.tickFormat?.()?.(months[0] as never)).toBe('Jan')
    stop()
  })

  it('uses linear x positions when xScaleType is linear', () => {
    const { stop, chart } = createLineChart(
      [
        {
          label: 'Series A',
          data: [
            { x: 0, y: 10 },
            { x: 50, y: 20 },
            { x: 100, y: 30 },
          ],
        },
      ],
      { xScaleType: 'linear' },
    )

    const points: LineChartPoint[] = chart.lines.value[0]?.points ?? []
    expect(points.map((point) => point.xPosition)).toEqual([0, 50, 100])
    expect(chart.xTickValues.value.length).toBeGreaterThan(1)
    stop()
  })

  it('uses Date-based x positions when xScaleType is time', () => {
    const dates = [
      new Date(2026, 0, 1),
      new Date(2026, 0, 8),
      new Date(2026, 0, 15),
    ]
    const { stop, chart } = createLineChart(
      [
        {
          label: 'Series A',
          data: dates.map((date, index) => ({ x: date, y: index + 1 })),
        },
      ],
      { xScaleType: 'time' },
    )

    const points: LineChartPoint[] = chart.lines.value[0]?.points ?? []
    expect(points.every((point) => point.xPosition instanceof Date)).toBe(true)
    expect(chart.xTickValues.value.length).toBeGreaterThan(1)
    stop()
  })

  it('preserves original x order when values are not sortable', () => {
    const { stop, chart } = createLineChart([
      {
        label: 'Series A',
        data: [
          { x: 'Backlog', y: 10 },
          { x: 'In Progress', y: 20 },
          { x: 'Review', y: 15 },
          { x: 'Done', y: 30 },
        ],
      },
    ])

    expect(chart.xDomainLabels.value).toEqual(['Backlog', 'In Progress', 'Review', 'Done'])
    stop()
  })

  it('returns empty lines and default y-domain behavior for empty data', () => {
    const { stop, chart } = createLineChart([])

    expect(chart.lines.value).toEqual([])
    expect(chart.gapSegments.value).toEqual([])
    expect(chart.legendItems.value).toEqual([])
    expect(chart.xDomainLabels.value).toEqual([])
    expect(chart.xTickValues.value).toEqual([])
    expect(chart.yScale.value.domain()[0]).toBeLessThan(chart.yScale.value.domain()[1])
    stop()
  })

  it('downsamples category ticks for narrow widths while keeping the final category', () => {
    const points = Array.from({ length: 20 }, (_, i) => ({ x: `P${i + 1}`, y: i + 1 }))
    const { stop, chart } = createLineChart([{ label: 'Series A', data: points }], {
      innerWidth: 120,
    })

    const ticks = chart.xTickValues.value
    expect(ticks.length).toBeLessThan(points.length)
    expect(ticks[ticks.length - 1]).toBe(points.length - 1)
    stop()
  })

  it('does not create gap segments when null values are only at series edges', () => {
    const { stop, chart } = createLineChart([
      {
        label: 'Series A',
        data: [
          { x: 'Q1', y: null },
          { x: 'Q2', y: 10 },
          { x: 'Q3', y: 20 },
          { x: 'Q4', y: null },
        ],
      },
    ])

    expect(chart.gapSegments.value).toEqual([])
    stop()
  })

  it('uses custom category tick formatter when provided', () => {
    const formatter = (value: AxisDomain) => `Tick ${String(value)}`
    const { stop, chart } = createLineChart(
      [
        {
          label: 'Series A',
          data: [
            { x: 'A', y: 1 },
            { x: 'B', y: 2 },
          ],
        },
      ],
      {
        xScaleType: 'category',
        xTickFormatter: formatter,
      },
    )

    const tickFormatter = chart.xAxis.value.tickFormat?.()
    expect(tickFormatter?.(0 as never, 0)).toBe('Tick 0')
    stop()
  })
})