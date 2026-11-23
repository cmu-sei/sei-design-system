import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChartLegend from './ChartLegend.vue'

describe('ChartLegend', () => {
  it('renders a 3.5 by 3.5 color swatch beside a colored item', () => {
    const wrapper = mount(ChartLegend, {
      props: { items: [{ label: 'Revenue', color: '#123456' }] },
    })

    const swatch = wrapper.find('li > span[aria-hidden="true"]')
    expect(swatch.classes()).toEqual(expect.arrayContaining(['h-3.5', 'w-3.5', 'rounded-xs']))
    expect(swatch.attributes('style')).toContain('background-color: rgb(18, 52, 86)')
    expect(wrapper.find('li').text()).toContain('Revenue')
  })

  it('does not render a color swatch when the item has no color', () => {
    const wrapper = mount(ChartLegend, {
      props: { items: [{ label: 'Revenue' }] },
    })

    expect(wrapper.find('li > span[aria-hidden="true"]').exists()).toBe(false)
  })

  it('positions custom legend content using the same alignment classes', () => {
    const wrapper = mount(ChartLegend, {
      props: { position: 'top-center', items: [{ label: 'Default' }] },
      slots: { default: '<span>Custom</span>' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['flex', 'justify-center', 'order-first']))
    expect(wrapper.text()).toBe('Custom')
    expect(wrapper.find('ul').exists()).toBe(false)
  })
})
