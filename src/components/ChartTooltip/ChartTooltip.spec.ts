import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ChartTooltip from './ChartTooltip.vue'

describe('ChartTooltip', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', class {
      observe = vi.fn()
      disconnect = vi.fn()
    })
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 40))
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(300)
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(200)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('only renders content when visible and uses the shared tooltip shell spacing', async () => {
    const wrapper = mount(ChartTooltip, {
      props: { visible: false, x: 50, y: 100 },
      slots: { default: '<span>January: 42</span>' },
    })

    expect(wrapper.find('span').exists()).toBe(false)

    await wrapper.setProps({ visible: true })
    const tooltip = wrapper.find('div.fixed')
    expect(tooltip.text()).toBe('January: 42')
    expect(tooltip.classes()).toContain('p-3')
    expect(tooltip.attributes('style')).toContain('translate3d(70px, 80px, 0)')
    expect(tooltip.attributes('style')).toContain('overflow-wrap: anywhere')
    expect(wrapper.find('svg').exists()).toBe(false)

    wrapper.unmount()
  })

  it('flips to the left of the anchor when there is insufficient space to the right', async () => {
    const wrapper = mount(ChartTooltip, {
      props: { visible: true, x: 280, y: 100 },
      slots: { default: 'Datapoint' },
    })
    await vi.waitFor(() => {
      expect(wrapper.find('div.fixed').attributes('style')).toContain('translate3d(160px, 80px, 0)')
    })

    wrapper.unmount()
  })

  it('keeps the tooltip eight pixels inside the top and bottom viewport edges', async () => {
    const wrapper = mount(ChartTooltip, {
      props: { visible: true, x: 50, y: 10 },
      slots: { default: 'Datapoint' },
    })
    await vi.waitFor(() => {
      expect(wrapper.find('div.fixed').attributes('style')).toContain('translate3d(70px, 8px, 0)')
    })

    await wrapper.setProps({ y: 190 })
    await vi.waitFor(() => {
      expect(wrapper.find('div.fixed').attributes('style')).toContain('translate3d(70px, 152px, 0)')
    })

    wrapper.unmount()
  })
})