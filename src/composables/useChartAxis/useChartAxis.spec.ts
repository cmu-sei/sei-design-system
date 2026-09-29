import { computed, ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { scaleLinear, scaleTime } from '../../lib/d3'
import { useChartAxis } from './index'

describe('useChartAxis', () => {
  it('creates axes for all directions with tick padding', () => {
    const scale = ref(scaleLinear<number, number>().domain([0, 10]).range([0, 100]))

    const bottom = useChartAxis(scale, computed(() => 'bottom'))
    const left = useChartAxis(scale, computed(() => 'left'))
    const top = useChartAxis(scale, computed(() => 'top'))
    const right = useChartAxis(scale, computed(() => 'right'))

    expect(bottom.value.scale()).toBe(scale.value)
    expect(left.value.scale()).toBe(scale.value)
    expect(top.value.scale()).toBe(scale.value)
    expect(right.value.scale()).toBe(scale.value)
    expect(bottom.value.tickPadding()).toBe(8)
  })

  it('applies numeric tick count and value formatter', () => {
    const scale = ref(scaleLinear<number, number>().domain([0, 100]).range([0, 100]))
    const axis = useChartAxis(
      scale,
      computed(() => 'left'),
      computed(() => ',.0f'),
      computed(() => 5),
    )

    expect(axis.value.tickArguments()).toEqual([5])
    const formatter = axis.value.tickFormat()
    expect(formatter?.(1000 as never, 0)).toBe('1,000')
  })

  it('supports custom formatter functions for numeric axes', () => {
    const scale = ref(scaleLinear<number, number>().domain([0, 100]).range([0, 100]))
    const axis = useChartAxis(
      scale,
      computed(() => 'left'),
      computed(() => (value: number) => `Value:${value}`),
    )

    const formatter = axis.value.tickFormat()
    expect(formatter?.(12 as never, 0)).toBe('Value:12')
  })

  it('applies explicit tick values and categorical tick formatter', () => {
    const scale = ref(scaleLinear<number, number>().domain([0, 3]).range([0, 300]))
    const axis = useChartAxis(
      scale,
      computed(() => 'bottom'),
      computed(() => ',.0f'),
      computed(() => undefined),
      computed(() => (value) => `Label:${String(value)}`),
      computed(() => [0, 2]),
    )

    expect(axis.value.tickValues()).toEqual([0, 2])
    const formatter = axis.value.tickFormat()
    expect(formatter?.(2 as never, 0)).toBe('Label:2')
  })

  it('supports time scales for axis creation', () => {
    const start = new Date('2026-01-01T00:00:00.000Z')
    const end = new Date('2026-01-02T00:00:00.000Z')
    const timeScale = ref(scaleTime<number, number>().domain([start, end]).range([0, 240]))
    const axis = useChartAxis(timeScale, computed(() => 'bottom'))

    expect(axis.value.scale()).toBe(timeScale.value)
  })
})