import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import HeatmapChart from './HeatmapChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  props: ['legend', 'hoveredIndex', 'xAxisLabel', 'yAxisLabel', 'xAxis', 'yAxis', 'width', 'height', 'minPlotWidth'],
  emits: ['update:hoveredIndex'],
  template: `
    <div>
      <svg><slot :inner-width="typeof width === 'number' ? Math.max(width, minPlotWidth) : 400" :inner-height="height - 64" /></svg>
      <slot
        name="legend"
        :items="legend.items"
        :hovered-index="hoveredIndex"
        :update-hovered-index="(index) => $emit('update:hoveredIndex', index)"
      />
    </div>
  `,
}

describe('HeatmapChart', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('keeps cells 32 pixels square with rounded corners as the data and layout change', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    expect(wrapper.find('rect').attributes()).toMatchObject({ width: '32', height: '32', rx: '2' })

    await wrapper.setProps({
      data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Tuesday', y: 'Evening', value: 100 },
      ],
      squareCells: true,
    })

    const cells = wrapper.findAll('rect')
    expect(cells).toHaveLength(2)
    for (const cell of cells) {
      expect(cell.attributes()).toMatchObject({ width: '32', height: '32', rx: '2' })
    }
  })

  it('keeps a four pixel gap and aligned axis ticks when the chart is resized', async () => {
    const wrapper = mount(HeatmapChart, {
      props: {
        width: 80,
        height: 100,
        data: [
          { x: 'Monday', y: 'Morning', value: 0 },
          { x: 'Tuesday', y: 'Morning', value: 1 },
          { x: 'Monday', y: 'Evening', value: 2 },
        ],
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    for (const width of [80, 600]) {
      await wrapper.setProps({ width, squareCells: width === 600 })
      const cells = wrapper.findAll('rect')
      const x0 = Number(cells[0]?.attributes('x'))
      const x1 = Number(cells[1]?.attributes('x'))
      const y0 = Number(cells[0]?.attributes('y'))
      const y1 = Number(cells[2]?.attributes('y'))
      expect(x1 - x0 - 32).toBeCloseTo(4)
      expect(y1 - y0 - 32).toBeCloseTo(4)

      const chart = wrapper.findComponent(BaseChartStub)
      const xScale = chart.props('xAxis').scale()
      const yScale = chart.props('yAxis').scale()
      expect(xScale('Monday') + xScale.bandwidth() / 2).toBeCloseTo(x0 + 16)
      expect(yScale('Morning') + yScale.bandwidth() / 2).toBeCloseTo(y0 + 16)
    }
  })

  it('allows horizontal scrolling and grows vertically for a large grid', async () => {
    const wrapper = mount(HeatmapChart, {
      props: {
        width: 100,
        height: 100,
        margin: { left: 20, right: 10, top: 10, bottom: 20 },
        data: Array.from({ length: 10 }, (_, i) => ({ x: `x${i}`, y: `y${i}`, value: i })),
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    expect(wrapper.classes()).toContain('overflow-x-auto')
    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      minPlotWidth: 356,
      height: 386,
    })

    await wrapper.setProps({ data: [{ x: 'only', y: 'only', value: 1 }] })
    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      minPlotWidth: 32,
      height: 100,
    })
  })

  it('reserves enough space for a large grid in the real chart', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(386)
    vi.stubGlobal('ResizeObserver', class {
      observe() {}
      disconnect() {}
    })
    const wrapper = mount(HeatmapChart, {
      props: {
        width: 100,
        height: 100,
        margin: { left: 20, right: 10, top: 10, bottom: 20 },
        data: Array.from({ length: 10 }, (_, i) => ({ x: `x${i}`, y: `y${i}`, value: i })),
      },
      global: { stubs: { SdsChartAxis: true } },
    })
    await wrapper.vm.$nextTick()

    const svg = wrapper.find('svg')
    expect(svg.attributes('height')).toBe('386')
    expect(svg.element.parentElement?.getAttribute('style')).toContain('min-width: 386px')
    const cells = wrapper.findAll('rect')
    expect(Number(cells[9]?.attributes('x')) + 32).toBeCloseTo(356)
    expect(Number(cells[9]?.attributes('y')) + 32).toBeCloseTo(356)
    wrapper.unmount()
  })

  it('forwards optional axis labels to BaseChart', () => {
    const wrapper = mount(HeatmapChart, {
      props: {
        data: [{ x: 'Monday', y: 'Morning', value: 0 }],
        xAxisLabel: 'Hour',
        yAxisLabel: 'Day',
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      xAxisLabel: 'Hour',
      yAxisLabel: 'Day',
    })
  })

  it('renders borderless square color bins that respond to hover', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Tuesday', y: 'Morning', value: 100 },
      ] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    const bin = wrapper.find('.sds-heatmap-legend button')
    expect(bin.classes()).toEqual(expect.arrayContaining(['size-[16px]', 'shrink-0', 'rounded-[2px]', 'border-0']))
    expect(bin.attributes('style')).toContain('background-color:')
    expect(bin.find('span').exists()).toBe(false)

    await bin.trigger('mouseenter')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBe(0)
  })
})
