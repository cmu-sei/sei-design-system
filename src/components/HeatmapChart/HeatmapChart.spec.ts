import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { CHART_CONFIG_KEY } from '../../composables/useChartConfig'
import HeatmapChart from './HeatmapChart.vue'

type HeatmapLegendPosition = NonNullable<InstanceType<typeof HeatmapChart>['$props']['legendPosition']>

enableAutoUnmount(afterEach)

const BaseChartStub = {
  name: 'BaseChart',
  props: ['legend', 'hoveredIndex', 'xAxisLabel', 'xAxisLabelPosition', 'xAxisLabelPlotWidth', 'yAxisLabel', 'xAxis', 'xAxisPosition', 'yAxis', 'width', 'height', 'margin', 'minPlotWidth', 'fitPlotWidth', 'fitAxisLabels', 'alignXAxisLabelsToPlot', 'tooltipVisible', 'tooltipX', 'tooltipY'],
  emits: ['update:hoveredIndex'],
  template: `
    <div>
      <svg><slot :inner-width="typeof width === 'number' ? Math.max(width, minPlotWidth) : 400" :inner-height="height - margin.top - margin.bottom" /></svg>
      <slot
        name="legend"
        :items="legend.items"
        :hovered-index="hoveredIndex"
        :plot-left="margin.left"
        :update-hovered-index="(index) => $emit('update:hoveredIndex', index)"
      />
      <slot v-if="tooltipVisible" name="tooltip" />
    </div>
  `,
}

describe('HeatmapChart', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
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

  it('keeps axis labels eight pixels from the cell grid', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const chart = wrapper.findComponent(BaseChartStub)
    expect(chart.props('alignXAxisLabelsToPlot')).toBe(true)
    for (const axisName of ['xAxis', 'yAxis']) {
      const axis = chart.props(axisName)
      expect(axis.tickSizeInner()).toBe(0)
      expect(axis.tickPadding()).toBe(8)
    }

    await wrapper.setProps({ data: [{ x: 'Tuesday', y: 'Evening', value: 1 }] })
    expect(chart.props('xAxis').tickSizeInner()).toBe(0)
    expect(chart.props('yAxis').tickSizeInner()).toBe(0)
    wrapper.unmount()
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

    expect(wrapper.classes().some((name) => name.startsWith('overflow-'))).toBe(false)
    expect(wrapper.classes()).toContain('contain-[inline-size]')
    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      minPlotWidth: 356,
      fitPlotWidth: true,
      height: 386,
    })

    await wrapper.setProps({ data: [{ x: 'only', y: 'only', value: 1 }] })
    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      minPlotWidth: 32,
      height: 62,
    })

    await wrapper.setProps({ data: [] })
    expect(wrapper.findAll('rect')).toHaveLength(0)
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

  it('aligns the legend with the cell grid as columns and margins change', async () => {
    const wrapper = mount(HeatmapChart, {
      props: {
        width: 300,
        data: [{ x: 'Monday', y: 'Morning', value: 0 }],
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const legend = wrapper.find('.sds-heatmap-legend').element.parentElement
    expect(legend?.style.width).toBe('32px')
    expect(legend?.style.marginLeft).toBe('72px')
    expect(wrapper.element.style.width).toBe('300px')

    await wrapper.setProps({
      width: '75%',
      margin: { left: 40, right: 20, top: 0, bottom: 0 },
      data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Tuesday', y: 'Morning', value: 1 },
      ],
    })
    expect(legend?.style.width).toBe('68px')
    expect(legend?.style.marginLeft).toBe('40px')
    expect(wrapper.element.style.width).toBe('75%')
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
      xAxisLabelPosition: 'top',
      xAxisLabelPlotWidth: 32,
      xAxisPosition: 'top',
      yAxisLabel: 'Day',
    })
  })

  it('centers the legend above the chart by default and supports bottom-right positioning', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const legend = wrapper.find('.sds-heatmap-legend').element.parentElement
    expect(legend?.classList.contains('order-first')).toBe(true)
    expect(legend?.classList.contains('justify-center')).toBe(true)
    expect(wrapper.findComponent(BaseChartStub).props('legend').position).toBe('top-center')

    const positions: [HeatmapLegendPosition, string, boolean][] = [
      ['top-center', 'justify-center', true],
      ['bottom-right', 'justify-end', false],
    ]
    for (const [position, alignment, onTop] of positions) {
      await wrapper.setProps({ legendPosition: position })
      expect(legend?.classList.contains(alignment)).toBe(true)
      expect(legend?.classList.contains('order-first')).toBe(onTop)
      expect(wrapper.findComponent(BaseChartStub).props('legend').position).toBe(position)
    }
    wrapper.unmount()
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

  it('renders borderless color bins and dims only cells outside the hovered range until the pointer leaves', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Monday', y: 'Evening', value: 25 },
        { x: 'Tuesday', y: 'Morning', value: 100 },
      ], colors: { light: ['#123456', '#abcdef'], dark: ['#123456', '#abcdef'] } },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    const bin = wrapper.find('.sds-heatmap-legend button')
    expect(bin.classes()).toEqual(expect.arrayContaining(['size-4', 'shrink-0', 'rounded-[2px]', 'border-0']))
    expect(bin.attributes('style')).toContain('background-color:')
    expect(bin.find('span').exists()).toBe(false)

    await bin.trigger('mouseenter')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBe(0)
    expect(wrapper.findAll('rect').map((cell) => cell.classes().includes('opacity-40')))
      .toEqual([false, false, true])
    expect(wrapper.findAll('.sds-heatmap-legend button').map((item) => item.classes().includes('opacity-40')))
      .toEqual([false, true])

    await bin.trigger('mouseleave')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBeNull()
    expect(wrapper.findAll('rect').every((cell) => cell.classes().includes('opacity-100'))).toBe(true)

    await bin.trigger('mouseenter')
    await wrapper.trigger('mouseleave')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBeNull()
    expect(wrapper.findAll('rect').every((cell) => cell.classes().includes('opacity-100'))).toBe(true)
    expect(wrapper.findAll('.sds-heatmap-legend button').every((item) => item.classes().includes('opacity-100'))).toBe(true)
  })

  it('anchors custom tooltips to cell centers, updates their payload on movement, and hides them on chart leave', async () => {
    vi.useFakeTimers()
    const wrapper = mount(HeatmapChart, {
      props: {
        data: [
          { x: 'Monday', y: 'Morning', value: 0 },
          { x: 'Tuesday', y: 'Evening', value: 100 },
        ],
        colors: { light: ['#123456', '#abcdef'], dark: ['#123456', '#abcdef'] },
      },
      slots: {
        tooltip: '<template #tooltip="{ data }"><output>{{ data.x }}, {{ data.y }}: {{ data.value }}; {{ data.color }}; {{ data.binIndex }}</output></template>',
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const cells = wrapper.findAll('rect')
    vi.spyOn(cells[0].element, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 200, 32, 32))
    vi.spyOn(cells[1].element, 'getBoundingClientRect').mockReturnValue(new DOMRect(136, 236, 32, 32))
    const chart = wrapper.findComponent(BaseChartStub)
    expect(wrapper.find('output').exists()).toBe(false)

    await cells[0].trigger('mouseenter', { clientX: 999, clientY: 999 })
    expect(chart.props()).toMatchObject({ tooltipVisible: true, tooltipX: 116, tooltipY: 216 })
    expect(wrapper.get('output').text()).toBe('Monday, Morning: 0; #123456; 0')
    expect(wrapper.find('[data-id="sds-chart-tooltip-content"]').exists()).toBe(false)

    await cells[1].trigger('mousemove', { clientX: 1, clientY: 1 })
    expect(chart.props()).toMatchObject({ tooltipVisible: true, tooltipX: 152, tooltipY: 252 })
    expect(wrapper.get('output').text()).toBe('Tuesday, Evening: 100; #abcdef; 1')

    await wrapper.trigger('mouseleave')
    await vi.runAllTimersAsync()
    expect(chart.props('tooltipVisible')).toBe(false)
    expect(wrapper.find('output').exists()).toBe(false)
  })

  it('ignores cell entry and movement while tooltips are disabled and permits them when re-enabled', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [{ x: 'Monday', y: 'Morning', value: 0 }], showTooltip: false },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    const cell = wrapper.get('rect')
    const chart = wrapper.findComponent(BaseChartStub)

    await cell.trigger('mouseenter')
    await cell.trigger('mousemove')
    expect(chart.props('tooltipVisible')).toBeUndefined()
    expect(wrapper.find('[data-id="sds-chart-tooltip-content"]').exists()).toBe(false)

    await wrapper.setProps({ showTooltip: true })
    expect(chart.props('tooltipVisible')).toBe(false)
    await cell.trigger('mouseenter')
    expect(chart.props('tooltipVisible')).toBe(true)
    expect(wrapper.get('[data-id="sds-chart-tooltip-datapoint"]').text()).toBe('0')

    await wrapper.setProps({ showTooltip: false })
    expect(chart.props('tooltipVisible')).toBeUndefined()
    expect(wrapper.find('[data-id="sds-chart-tooltip-content"]').exists()).toBe(false)
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
      expect(wrapper.findAll<HTMLButtonElement>('.sds-heatmap-legend button').map((bin) =>
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
