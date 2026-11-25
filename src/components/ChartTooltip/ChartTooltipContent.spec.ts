import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Component from './ChartTooltipContent.vue'

describe('ChartTooltipContent', () => {
  it('renders the title, label, datapoint, and swatch with consistent typography', () => {
    const wrapper = mount(Component, {
      props: { title: 'Series', label: 'January', datapoint: '42%', color: '#123456' },
    })

    const title = wrapper.find('[data-id="sds-chart-tooltip-content"] > span')
    const label = wrapper.find('[data-id="sds-chart-tooltip-label"]')
    const datapoint = wrapper.find('[data-id="sds-chart-tooltip-datapoint"]')
    const swatch = wrapper.find('[data-id="sds-chart-tooltip-swatch"]')

    expect(title.text()).toBe('Series')
    expect(title.classes()).toEqual(expect.arrayContaining(['text-xs', 'leading-none', 'text-gray-900', 'dark:text-gray-100', 'font-semibold']))
    expect(label.text()).toBe('January')
    expect(label.classes()).toEqual(expect.arrayContaining(['text-xs', 'leading-none', 'text-gray-600', 'dark:text-gray-400', 'font-normal']))
    expect(datapoint.text()).toBe('42%')
    expect(datapoint.classes()).toEqual(expect.arrayContaining(['text-xs', 'leading-none', 'text-gray-900', 'dark:text-gray-100', 'font-semibold']))
    expect(swatch.attributes('style')).toContain('background-color: rgb(18, 52, 86)')
    expect(swatch.attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('[data-id="sds-chart-tooltip-content"]').classes()).toContain('gap-y-3')
    expect(wrapper.find('[data-id="sds-chart-tooltip-details"]').classes())
      .toEqual(expect.arrayContaining(['justify-between', 'gap-x-6', 'w-full']))
  })

  it('omits the label and optional swatch when absent while preserving a zero datapoint', () => {
    const wrapper = mount(Component, { props: { title: 'Slice', datapoint: 0 } })

    expect(wrapper.find('[data-id="sds-chart-tooltip-label"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-chart-tooltip-swatch"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-chart-tooltip-datapoint"]').text()).toBe('0')
    expect(wrapper.find('[data-id="sds-chart-tooltip-details"]').classes()).toContain('gap-x-6')
  })

  it('separates an unlabelled swatch and datapoint by at least twenty-four pixels', () => {
    const wrapper = mount(Component, {
      props: { title: 'Slice', datapoint: '42%', color: '#123456' },
    })

    expect(wrapper.find('[data-id="sds-chart-tooltip-swatch"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-chart-tooltip-details"]').classes())
      .toEqual(expect.arrayContaining(['justify-between', 'gap-x-6', 'w-full']))
  })
})
