import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { CHART_CONFIG_KEY } from '@/composables/useChartConfig'
import type { ChartLegendPosition } from '../ChartLegend/ChartLegend.vue'
import HeatmapChart from './HeatmapChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  props: ['legend', 'hoveredIndex', 'xAxisLabel', 'yAxisLabel', 'xAxis', 'yAxis', 'width', 'height', 'margin', 'minPlotWidth', 'fitAxisLabels'],
  emits: ['update:hoveredIndex'],
  template: `
    <div>
      <svg><slot :inner-width="typeof width === 'number' ? Math.max(width, minPlotWidth) : 400" :inner-height="height - margin.top - margin.bottom" /></svg>
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

  it('sizes the plot to its data and margins rather than a fixed height', async () => {
    const wrapper = mount(HeatmapChart, {
      props: {
        width: 100,
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
      height: 62,
    })

    await wrapper.setProps({ data: [] })
    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      minPlotWidth: 0,
      height: 30,
    })
  })

  it('fits axis labels by default while preserving explicit margins', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const chart = wrapper.findComponent(BaseChartStub)
    expect(chart.props()).toMatchObject({
      height: 32,
      margin: { top: 0, bottom: 0 },
      fitAxisLabels: true,
    })

    const margin = { top: 10, bottom: 20, left: 30, right: 40 }
    await wrapper.setProps({ margin })
    expect(chart.props()).toMatchObject({ height: 62, margin, fitAxisLabels: false })
  })

  it('hides axis lines while retaining axis labels', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400)
    vi.stubGlobal('ResizeObserver', class {
      observe() {}
      disconnect() {}
    })
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 1 }] },
      global: {
        stubs: {
          SdsChartAxis: {
            props: ['orientation'],
            template: '<g class="sds-chart-axis"><path class="domain"/><g class="tick"><line/><text>{{ orientation }}</text></g></g>',
          },
        },
      },
    })
    await wrapper.vm.$nextTick()

    const svg = wrapper.find('svg')
    expect(svg.classes()).toEqual(expect.arrayContaining([
      '[&_.sds-chart-axis_.domain]:hidden',
      '[&_.sds-chart-axis_.tick_line]:hidden',
    ]))
    expect(svg.findAll('.tick text').map((label) => label.text())).toEqual(['x', 'y'])
    wrapper.unmount()
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
        margin: { left: 20, right: 10, top: 10, bottom: 20 },
        data: Array.from({ length: 10 }, (_, i) => ({ x: `x${i}`, y: `y${i}`, value: i })),
      },
      global: { stubs: { SdsChartAxis: true } },
      attrs: { height: 1000 },
    })
    await wrapper.vm.$nextTick()

    const svg = wrapper.find('svg')
    expect(svg.attributes('height')).toBe('386')
    expect(svg.element.parentElement?.getAttribute('style')).toContain('min-width: 386px')
    const cells = wrapper.findAll('rect')
    expect(Number(cells[9]?.attributes('x')) + 32).toBeCloseTo(356)
    expect(Number(cells[9]?.attributes('y')) + 32).toBeCloseTo(356)
    const legend = wrapper.find('.sds-heatmap-legend').element.parentElement
    expect(legend?.parentElement?.getAttribute('data-id')).toBe('sds-base-chart')
    expect(legend?.parentElement?.classList.contains('gap-y-4')).toBe(true)
    expect(legend?.classList.contains('order-first')).toBe(true)
    await wrapper.setProps({ legendPosition: 'bottom-right', xAxisLabel: 'Hour' })
    expect(legend?.classList.contains('order-first')).toBe(false)
    expect(legend?.parentElement?.classList.contains('gap-y-4')).toBe(true)
    await wrapper.setProps({ showLegend: false })
    expect(wrapper.find('.sds-heatmap-legend').exists()).toBe(false)
    await wrapper.setProps({ data: [{ x: 'only', y: 'only', value: 1 }] })
    expect(svg.attributes('height')).toBe('62')
    expect(Number(wrapper.find('rect').attributes('x'))).toBeCloseTo(0)
    expect(Number(wrapper.find('rect').attributes('y'))).toBeCloseTo(0)
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

  it('positions the legend above and centered by default and supports all chart legend positions', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const legend = wrapper.find('.sds-heatmap-legend').element.parentElement
    expect(legend?.classList.contains('order-first')).toBe(true)
    expect(legend?.classList.contains('justify-center')).toBe(true)
    expect(wrapper.findComponent(BaseChartStub).props('legend').position).toBe('top-center')

    const positions: [ChartLegendPosition, string, boolean][] = [
      ['top-left', 'justify-start', true],
      ['top-center', 'justify-center', true],
      ['top-right', 'justify-end', true],
      ['bottom-left', 'justify-start', false],
      ['bottom-center', 'justify-center', false],
      ['bottom-right', 'justify-end', false],
    ]
    for (const [position, alignment, onTop] of positions) {
      await wrapper.setProps({ legendPosition: position })
      expect(legend?.classList.contains(alignment)).toBe(true)
      expect(legend?.classList.contains('order-first')).toBe(onTop)
      expect(wrapper.findComponent(BaseChartStub).props('legend').position).toBe(position)
    }
  })

  it('positions a custom legend and preserves its hover callback', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }], legendPosition: 'bottom-right' },
      slots: {
        legend: '<template #legend="{ updateHoveredIndex }"><button class="custom-legend" @mouseenter="updateHoveredIndex(1)">Custom</button></template>',
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    const legend = wrapper.find('.custom-legend')
    expect(legend.element.parentElement?.classList.contains('justify-end')).toBe(true)
    expect(legend.element.parentElement?.classList.contains('order-first')).toBe(false)
    await legend.trigger('mouseenter')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBe(1)

    await wrapper.setProps({ legendPosition: 'top-center' })
    expect(legend.element.parentElement?.classList.contains('order-first')).toBe(true)
    expect(legend.element.parentElement?.classList.contains('justify-center')).toBe(true)
  })

  it('supports horizontal and vertical legend layouts', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const legend = wrapper.find('.sds-heatmap-legend')
    expect(legend.classes()).toContain('flex-row')
    expect(wrapper.findComponent(BaseChartStub).props('legend').orientation).toBe('horizontal')

    await wrapper.setProps({ legendOrientation: 'vertical' })
    expect(legend.classes()).toContain('flex-col')
    expect(wrapper.findComponent(BaseChartStub).props('legend').orientation).toBe('vertical')
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
    expect(bin.classes()).toEqual(expect.arrayContaining(['size-4', 'shrink-0', 'rounded-[2px]', 'border-0']))
    expect(bin.attributes('style')).toContain('background-color:')
    expect(bin.find('span').exists()).toBe(false)

    await bin.trigger('mouseenter')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBe(0)
  })

  it('updates cell and legend colors to the default light and dark palettes', async () => {
    const isDarkMode = ref(false)
    const wrapper = mount(HeatmapChart, {
      props: {
        data: Array.from({ length: 6 }, (_, value) => ({ x: `x${value}`, y: 'Morning', value })),
      },
      global: {
        stubs: { SdsBaseChart: BaseChartStub },
        provide: { [CHART_CONFIG_KEY]: { isDarkMode } },
      },
    })
    const lightColors = [
      'var(--color-gray-50)',
      'var(--color-blue-50)',
      'var(--color-blue-200)',
      'var(--color-blue-400)',
      'var(--color-blue-600)',
      'var(--color-blue-800)',
    ]
    const expectColors = (colors: string[]) => {
      expect(wrapper.findAll('rect').map((cell) => cell.attributes('fill'))).toEqual(colors)
      expect(wrapper.findAll('.sds-heatmap-legend button').map((bin) =>
        bin.element.style.backgroundColor,
      )).toEqual(colors)
    }

    expectColors(lightColors)
    isDarkMode.value = true
    await wrapper.vm.$nextTick()
    expectColors([...lightColors].reverse())
    wrapper.unmount()
  })
})
