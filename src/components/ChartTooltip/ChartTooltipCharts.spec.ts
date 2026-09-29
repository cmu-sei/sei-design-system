import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BarChart from '../BarChart/BarChart.vue'
import HeatmapChart from '../HeatmapChart/HeatmapChart.vue'
import LineChart from '../LineChart/LineChart.vue'
import PieChart from '../PieChart/PieChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  template: `
    <div>
      <svg><slot :inner-width="400" :inner-height="300" :container-width="480" /></svg>
      <slot name="tooltip" />
    </div>
  `,
}

const global = { stubs: { SdsBaseChart: BaseChartStub } }

function tooltipParts(wrapper: ReturnType<typeof mount>) {
  const content = wrapper.find('[data-id="sds-chart-tooltip-content"]')
  return {
    title: content.find('span').text(),
    label: content.find('[data-id="sds-chart-tooltip-label"]'),
    datapoint: content.find('[data-id="sds-chart-tooltip-datapoint"]').text(),
    swatch: content.find('[data-id="sds-chart-tooltip-swatch"]'),
  }
}

describe('chart default tooltips', () => {
  it('shows a category and formatted value without a swatch for a single-color bar', async () => {
    const wrapper = mount(BarChart, {
      props: { data: [{ label: 'January', value: 42 }], tooltipValueFormat: (value: number) => `$${value}` },
      global,
    })

    await wrapper.find('rect[role="img"]').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.title).toBe('January')
    expect(parts.label.exists()).toBe(false)
    expect(parts.datapoint).toBe('$42')
    expect(parts.swatch.exists()).toBe(false)
  })

  it('adds the series label and swatch to a grouped bar tooltip with distinct series colors', async () => {
    const wrapper = mount(BarChart, {
      props: { data: [
        { label: 'Revenue', data: [{ label: 'January', value: 42 }] },
        { label: 'Cost', data: [{ label: 'January', value: 12 }] },
      ] },
      global,
    })

    await wrapper.find('rect[role="img"]').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.title).toBe('January')
    expect(parts.label.text()).toBe('Revenue')
    expect(parts.datapoint).toBe('42')
    expect(parts.swatch.exists()).toBe(true)
  })

  it('shows the series, x label, and formatted point with its color for a multicolor line chart', async () => {
    const wrapper = mount(LineChart, {
      props: {
        data: [
          { id: 'a', label: 'Revenue', data: [{ x: 'January', y: 42 }] },
          { id: 'b', label: 'Cost', data: [{ x: 'January', y: 12 }] },
        ],
        showPoints: true,
        tooltipValueFormat: (value: number) => `$${value}`,
      },
      global,
    })

    await wrapper.find('circle').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.title).toBe('Revenue')
    expect(parts.label.text()).toBe('January')
    expect(parts.datapoint).toBe('$42')
    expect(parts.swatch.exists()).toBe(true)
    expect(parts.swatch.attributes('style')).toContain('var(--color-blue-400)')
  })

  it('shows the highlighted line color in the tooltip above the monochrome threshold', async () => {
    const wrapper = mount(LineChart, {
      props: {
        data: Array.from({ length: 7 }, (_, index) => ({
          label: `Series ${index}`,
          data: [{ x: 'January', y: index + 1 }],
        })),
        lineCountThreshold: 6,
        showPoints: true,
      },
      global,
    })

    await wrapper.find('circle').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.swatch.exists()).toBe(true)
    expect(parts.swatch.attributes('style')).toContain('var(--color-blue-400)')
  })

  it('keeps the swatch when crossing the monochrome threshold', async () => {
    const wrapper = mount(LineChart, {
      props: {
        data: Array.from({ length: 7 }, (_, index) => ({
          label: `Series ${index}`,
          data: [{ x: 'January', y: index + 1 }],
        })),
        lineCountThreshold: 7,
        showPoints: true,
      },
      global,
    })

    await wrapper.find('circle').trigger('mouseenter')
    expect(tooltipParts(wrapper).swatch.exists()).toBe(true)

    await wrapper.setProps({ lineCountThreshold: 6 })
    expect(tooltipParts(wrapper).swatch.exists()).toBe(true)

    await wrapper.setProps({ lineCountThreshold: 7 })
    expect(tooltipParts(wrapper).swatch.exists()).toBe(true)
  })

  it('shows both coordinates, cell value, and cell color for a multicolor heatmap', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Tuesday', y: 'Morning', value: 100 },
      ] },
      global,
    })

    await wrapper.find('rect[role="img"]').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.title).toBe('Monday')
    expect(parts.label.text()).toBe('Morning')
    expect(parts.datapoint).toBe('0')
    expect(parts.swatch.exists()).toBe(true)
  })

  it('shows the slice, formatted value, and rendered slice color for a multicolor pie', async () => {
    const wrapper = mount(PieChart, {
      props: { slices: [{ label: 'Chrome', value: 42 }, { label: 'Firefox', value: 58 }] },
      global,
    })

    const slice = wrapper.find('path[role="img"]')
    await slice.trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.title).toBe('Chrome')
    expect(parts.label.exists()).toBe(false)
    expect(parts.datapoint).toBe('42%')
    expect(parts.swatch.exists()).toBe(true)
    expect(parts.swatch.attributes('style')).toBe(`background-color: ${slice.attributes('fill')};`)
  })

  it('shows a swatch for single-series bars when individual bars have different colors', async () => {
    const wrapper = mount(BarChart, {
      props: { data: [
        { label: 'January', value: 42, color: '#123456' },
        { label: 'February', value: 12, color: '#654321' },
      ] },
      global,
    })

    await wrapper.find('rect[role="img"]').trigger('mouseenter')
    const parts = tooltipParts(wrapper)
    expect(parts.label.exists()).toBe(false)
    expect(parts.swatch.exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-chart-tooltip-details"]').classes()).toContain('gap-x-2')
  })

  it('omits swatches when multiple items share one rendered color', async () => {
    const bar = mount(BarChart, {
      props: { data: [
        { label: 'January', value: 42, color: '#123456' },
        { label: 'February', value: 12, color: '#123456' },
      ] },
      global,
    })
    const heatmap = mount(HeatmapChart, {
      props: { data: [
        { x: 'Monday', y: 'Morning', value: 5 },
        { x: 'Tuesday', y: 'Morning', value: 5 },
      ] },
      global,
    })
    const pie = mount(PieChart, {
      props: { slices: [
        { label: 'Chrome', value: 42, color: '#123456' },
        { label: 'Firefox', value: 58, color: '#123456' },
      ] },
      global,
    })
    const line = mount(LineChart, {
      props: { data: [{ x: 'January', y: 42 }], showPoints: true },
      global,
    })

    await bar.find('rect[role="img"]').trigger('mouseenter')
    await heatmap.find('rect[role="img"]').trigger('mouseenter')
    await pie.find('path[role="img"]').trigger('mouseenter')
    await line.find('circle').trigger('mouseenter')

    for (const wrapper of [bar, heatmap, pie, line]) {
      expect(tooltipParts(wrapper).swatch.exists()).toBe(false)
    }
  })

  it('leaves custom tooltip slot content in place of the shared default', async () => {
    const wrapper = mount(BarChart, {
      props: { data: [{ label: 'January', value: 42 }] },
      slots: { tooltip: '<div data-id="custom-tooltip">Custom</div>' },
      global,
    })

    await wrapper.find('rect[role="img"]').trigger('mouseenter')
    expect(wrapper.find('[data-id="custom-tooltip"]').text()).toBe('Custom')
    expect(wrapper.find('[data-id="sds-chart-tooltip-content"]').exists()).toBe(false)
  })
})
