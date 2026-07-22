import { describe, it, expect, vi } from 'vitest'
import { effectScope, ref } from 'vue'
import { useLineChart, isLineSeries, type LineData } from './useLineChart'

vi.mock('@/composables/useDarkMode', () => ({
  useDarkMode: () => ref(false),
}))

vi.mock('@/composables/useChartConfig', () => ({
  useChartConfig: () => ({}),
}))

function createLineChart(data: LineData) {
  const scope = effectScope()
  const chart = scope.run(() =>
    useLineChart(ref(data), ref(480), ref(240), ref('~s')),
  )

  if (!chart) throw new Error('Failed to create line chart composable scope.')

  return { scope, chart }
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
    const { scope, chart } = createLineChart([
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

    scope.stop()
  })

  it('creates dashed-gap segments between valid points around null runs', () => {
    const { scope, chart } = createLineChart([
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

    scope.stop()
  })

  it('keeps sortable x values in ascending order when earlier series are sparse', () => {
    const { scope, chart } = createLineChart([
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
    scope.stop()
  })

  it('returns empty legend items for single-series input and populated items for multi-series', () => {
    const single = createLineChart([
      { x: '2021', y: 10 },
      { x: '2022', y: 15 },
    ])
    expect(single.chart.legendItems.value).toEqual([])
    single.scope.stop()

    const multi = createLineChart([
      { label: 'Series A', data: [{ x: '2021', y: 10 }] },
      { label: 'Series B', data: [{ x: '2021', y: 15 }] },
    ])
    expect(multi.chart.legendItems.value).toHaveLength(2)
    expect(multi.chart.legendItems.value[0]?.label).toBe('Series A')
    multi.scope.stop()
  })
})
