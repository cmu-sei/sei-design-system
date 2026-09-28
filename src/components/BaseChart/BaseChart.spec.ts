import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { axisBottom, axisLeft, scaleLinear } from '@/lib/d3'
import BaseChart from './BaseChart.vue'

const ChartAxisStub = {
  name: 'SdsChartAxis',
  props: ['axis', 'orientation', 'innerWidth', 'innerHeight', 'minFontSize', 'maxFontSize', 'maxLabelWidth'],
  template: '<g data-id="axis" :data-orientation="orientation" />',
}

const ChartTooltipStub = {
  name: 'SdsChartTooltip',
  props: ['visible', 'x', 'y'],
  template: '<div v-if="visible" data-id="tooltip"><slot /></div>',
}

const global = {
  stubs: { SdsChartAxis: ChartAxisStub, SdsChartTooltip: ChartTooltipStub },
}

const margin = { top: 10, right: 20, bottom: 30, left: 40 }
let resize: (width: number) => void
const disconnect = vi.fn()

describe('BaseChart', () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(480)
    disconnect.mockClear()
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: ResizeObserverCallback) {
        resize = (width: number) => callback(
          [{
            contentRect: new DOMRect(0, 0, width, 0),
            contentBoxSize: [],
            borderBoxSize: [],
            devicePixelContentBoxSize: [],
            target: document.createElement('div'),
          }],
          this,
        )
      }

      observe = vi.fn()
      disconnect = disconnect
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders an accessible SVG and exposes measured dimensions to the default slot', async () => {
    const wrapper = mount(BaseChart, {
      props: { title: 'Quarterly revenue', width: '75%', height: 240, margin },
      slots: {
        default: '<text data-id="dimensions">{{ containerWidth }},{{ innerWidth }},{{ innerHeight }},{{ containerRef?.tagName }}</text>',
      },
      attrs: { 'data-chart': 'revenue' },
      global,
    })
    await nextTick()

    expect(wrapper.find('[data-id="sds-base-chart"] > div').attributes('style')).toContain('width: 75%')
    expect(wrapper.find('svg').attributes()).toMatchObject({
      'aria-label': 'Quarterly revenue',
      'data-chart': 'revenue',
      height: '240',
      role: 'img',
    })
    expect(wrapper.find('svg title').text()).toBe('Quarterly revenue')
    expect(wrapper.find('[data-id="dimensions"]').text()).toBe('480,420,200,DIV')

    resize(280)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-id="dimensions"]').text()).toBe('280,220,200,DIV')

    wrapper.unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('derives the SVG height from aspect ratio and recomputes dimensions when props change', async () => {
    const wrapper = mount(BaseChart, {
      props: { height: 360, aspectRatio: 2, margin },
      slots: {
        default: '<text data-id="inner-height">{{ innerHeight }}</text>',
      },
      global,
    })
    await nextTick()

    expect(wrapper.find('svg').attributes('height')).toBe('240')
    expect(wrapper.find('[data-id="inner-height"]').text()).toBe('200')

    await wrapper.setProps({ aspectRatio: 4 })
    expect(wrapper.find('svg').attributes('height')).toBe('120')
    expect(wrapper.find('[data-id="inner-height"]').text()).toBe('80')

    await wrapper.setProps({ aspectRatio: undefined })
    expect(wrapper.find('svg').attributes('height')).toBe('360')
    wrapper.unmount()
  })

  it('places fallback axes at the plot edges and forwards axis sizing', async () => {
    const xAxis = axisBottom(scaleLinear())
    const yAxis = axisLeft(scaleLinear())
    const wrapper = mount(BaseChart, {
      props: { margin, height: 240, xAxis, yAxis, axisMinFontSize: 8, axisMaxFontSize: 16 },
      global,
    })
    await nextTick()

    const axes = wrapper.findAllComponents(ChartAxisStub)
    expect(axes).toHaveLength(2)
    expect(axes[0].props()).toMatchObject({
      axis: xAxis,
      orientation: 'x',
      innerWidth: 420,
      innerHeight: 200,
      minFontSize: 8,
      maxFontSize: 16,
    })
    expect(axes[1].props()).toMatchObject({
      axis: yAxis,
      orientation: 'y',
      innerWidth: 420,
      innerHeight: 200,
      maxLabelWidth: 30,
    })
    const groups = wrapper.findAll('svg > g')
    expect(groups.map((group) => group.attributes('transform'))).toEqual([
      'translate(40, 210)',
      'translate(40, 10)',
    ])
    wrapper.unmount()
  })

  it('prefers custom axis slots to fallback axes and supplies plot dimensions', async () => {
    const wrapper = mount(BaseChart, {
      props: { margin, height: 240, xAxis: axisBottom(scaleLinear()), yAxis: axisLeft(scaleLinear()) },
      slots: {
        'x-axis': '<text data-id="custom-x">{{ innerWidth }},{{ innerHeight }}</text>',
        'y-axis': '<text data-id="custom-y">{{ innerWidth }},{{ innerHeight }}</text>',
      },
      global,
    })
    await nextTick()

    expect(wrapper.findAllComponents(ChartAxisStub)).toHaveLength(0)
    expect(wrapper.find('[data-id="custom-x"]').text()).toBe('420,200')
    expect(wrapper.find('[data-id="custom-y"]').text()).toBe('420,200')
    wrapper.unmount()
  })

  it('only mounts the tooltip when visibility is specified and forwards content and coordinates', async () => {
    const wrapper = mount(BaseChart, {
      slots: { tooltip: '<span>Value: 42</span>' },
      global,
    })

    expect(wrapper.findComponent(ChartTooltipStub).exists()).toBe(false)

    await wrapper.setProps({ tooltipVisible: false, tooltipX: 120, tooltipY: 90 })
    const tooltip = wrapper.findComponent(ChartTooltipStub)
    expect(tooltip.props()).toMatchObject({ visible: false, x: 120, y: 90 })
    expect(wrapper.find('[data-id="tooltip"]').exists()).toBe(false)

    await wrapper.setProps({ tooltipVisible: true })
    expect(wrapper.find('[data-id="tooltip"]').text()).toBe('Value: 42')

    await wrapper.setProps({ tooltipVisible: undefined })
    expect(wrapper.findComponent(ChartTooltipStub).exists()).toBe(false)
    wrapper.unmount()
  })

  it('renders the built-in legend only when enabled and emits hover changes', async () => {
    const wrapper = mount(BaseChart, {
      props: { legend: { items: [{ label: 'Revenue', color: '#123456' }] } },
      global,
    })

    expect(wrapper.find('.sds-legend').exists()).toBe(false)
    await wrapper.setProps({ showLegend: true })
    const item = wrapper.find('.sds-legend li')
    expect(item.text()).toBe('Revenue')
    await item.trigger('mouseenter')
    await item.trigger('mouseleave')
    expect(wrapper.emitted('update:hoveredIndex')).toEqual([[0], [null]])
    wrapper.unmount()
  })

  it('passes legend items and hover controls to a custom legend slot', async () => {
    const wrapper = mount(BaseChart, {
      props: { showLegend: true, hoveredIndex: 1, legend: { items: [{ label: 'Revenue' }] } },
      slots: {
        legend: `
          <button data-id="custom-legend" @click="updateHoveredIndex(0)">
            {{ items[0].label }}: {{ hoveredIndex }}
          </button>
        `,
      },
      global,
    })

    expect(wrapper.find('.sds-legend').exists()).toBe(false)
    const legend = wrapper.find('[data-id="custom-legend"]')
    expect(legend.text()).toBe('Revenue: 1')
    await legend.trigger('click')
    expect(wrapper.emitted('update:hoveredIndex')).toEqual([[0]])
    wrapper.unmount()
  })
})