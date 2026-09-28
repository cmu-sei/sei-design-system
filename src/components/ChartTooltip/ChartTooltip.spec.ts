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
    expect(tooltip.classes()).toContain('p-4')
    expect(tooltip.attributes('style')).toContain('translate3d(62px, 80px, 0)')
    expect(tooltip.attributes('style')).toContain('overflow-wrap: anywhere')
    expect(wrapper.find('svg').classes()).toEqual(expect.arrayContaining(['h-6', 'w-3']))
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 12 24')
    expect(wrapper.find('svg').attributes('style')).toContain('top: 8px')
    expect(wrapper.find('svg').attributes('style')).toContain('translateX(calc(-100% + 1px))')

    wrapper.unmount()
  })

  it('flips to the left of the anchor when there is insufficient space to the right', async () => {
    const wrapper = mount(ChartTooltip, {
      props: { visible: true, x: 280, y: 100 },
      slots: { default: 'Datapoint' },
    })
    await vi.waitFor(() => {
      expect(wrapper.find('div.fixed').attributes('style')).toContain('translate3d(168px, 80px, 0)')
    })
    expect(wrapper.find('svg').attributes('style')).toContain('translateX(calc(100% - 1px)) scaleX(-1)')
    expect(wrapper.find('svg').attributes('style')).toContain('top: 8px')

    wrapper.unmount()
  })

  it('keeps the pointer base inside the tooltip at top and bottom viewport edges', async () => {
    const wrapper = mount(ChartTooltip, {
      props: { visible: true, x: 50, y: 10 },
      slots: { default: 'Datapoint' },
    })
    await vi.waitFor(() => {
      expect(wrapper.find('svg').attributes('style')).toContain('top: 0px')
    })

    await wrapper.setProps({ y: 190 })
    await vi.waitFor(() => {
      expect(wrapper.find('svg').attributes('style')).toContain('top: 16px')
    })

    wrapper.unmount()
  })
})
