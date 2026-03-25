import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Tooltip.vue'
import FloatingUi from '../FloatingUi/FloatingUi.vue'

describe('Tooltip', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper.vm).toBeTruthy()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('matches snapshot with no props assigned', () => {
    const wrapper = mount(Component, { props: {} })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        placement: 'bottom',
        size: 'sm',
        tooltipClass: 'test',
        triggerClass: 'test'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('computes z-50 class by default', () => {
    const wrapper = mount(Component)
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-50')
  })

  it('computes z-0 class when zIndex is 0', () => {
    const wrapper = mount(Component, { props: { zIndex: '0' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-0')
  })

  it('computes z-10 class when zIndex is 10', () => {
    const wrapper = mount(Component, { props: { zIndex: '10' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-10')
  })

  it('computes z-20 class when zIndex is 20', () => {
    const wrapper = mount(Component, { props: { zIndex: '20' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-20')
  })

  it('computes z-30 class when zIndex is 30', () => {
    const wrapper = mount(Component, { props: { zIndex: '30' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-30')
  })

  it('computes z-40 class when zIndex is 40', () => {
    const wrapper = mount(Component, { props: { zIndex: '40' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-40')
  })

  it('computes z-auto class when zIndex is auto', () => {
    const wrapper = mount(Component, { props: { zIndex: 'auto' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('z-auto')
  })

  it('computes empty string for default case', () => {
    // @ts-expect-error - intentionally testing fallthrough case with invalid prop value
    const wrapper = mount(Component, { props: { zIndex: '' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).not.toContain('z-')
  })

  it('computes dark variant classes by default', () => {
    const wrapper = mount(Component)
    const floatingUi = wrapper.findComponent(FloatingUi)
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass).toContain('bg-black')
    expect(popperClass).toContain('text-gray-50')
    expect(popperClass).toContain('border-gray-800')
  })

  it('computes dark variant classes when type is dark', () => {
    const wrapper = mount(Component, { props: { type: 'dark' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass).toContain('bg-black')
    expect(popperClass).toContain('text-gray-50')
  })

  it('computes light variant classes when type is light', () => {
    const wrapper = mount(Component, { props: { type: 'light' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass).toContain('bg-gray-25')
    expect(popperClass).toContain('text-gray-900')
    expect(popperClass).toContain('border-gray-200')
  })

  it('computes dark arrow classes by default', () => {
    const wrapper = mount(Component)
    const floatingUi = wrapper.findComponent(FloatingUi)
    const arrowClass = floatingUi.props('arrowClass')
    expect(arrowClass).toContain('bg-black')
    expect(arrowClass).toContain('border-gray-800')
  })

  it('computes dark arrow classes when type is dark', () => {
    const wrapper = mount(Component, { props: { type: 'dark' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const arrowClass = floatingUi.props('arrowClass')
    expect(arrowClass).toContain('bg-black')
    expect(arrowClass).toContain('border-gray-800')
  })

  it('computes light arrow classes when type is light', () => {
    const wrapper = mount(Component, { props: { type: 'light' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const arrowClass = floatingUi.props('arrowClass')
    expect(arrowClass).toContain('bg-gray-25')
    expect(arrowClass).toContain('border-gray-200')
  })

  it('computes w-32 class by default', () => {
    const wrapper = mount(Component)
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-32')
  })

  it('computes w-32 class when size is sm', () => {
    const wrapper = mount(Component, { props: { size: 'sm' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-32')
  })

  it('computes w-48 class when size is md', () => {
    const wrapper = mount(Component, { props: { size: 'md' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-48')
  })

  it('computes w-56 class when size is lg', () => {
    const wrapper = mount(Component, { props: { size: 'lg' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-56')
  })

  it('computes w-72 class when size is xl', () => {
    const wrapper = mount(Component, { props: { size: 'xl' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-72')
  })

  it('computes w-auto class when size is auto', () => {
    const wrapper = mount(Component, { props: { size: 'auto' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-auto')
  })

  it('computes w-32 class for default case', () => {
    // @ts-expect-error - intentionally testing fallthrough case with invalid prop value
    const wrapper = mount(Component, { props: { size: '' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-32')
  })

  it('is not disabled by default', () => {
    const wrapper = mount(Component)
    expect(wrapper.props('disabled')).toBe(false)
  })

  it('renders the data-id attribute', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('[data-id="sds-tooltip"]').exists()).toBe(true)
  })

  it('renders with trigger slot', () => {
    const wrapper = mount(Component, {
      slots: {
        trigger: '<button>Hover me</button>'
      }
    })
    expect(wrapper.html()).toContain('Hover me')
  })

  it('passes props to FloatingUi component', () => {
    const wrapper = mount(Component, {
      props: {
        placement: 'bottom',
        strategy: 'fixed',
        disabled: true
      }
    })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('placement')).toBe('bottom')
    expect(floatingUi.props('strategy')).toBe('fixed')
    expect(floatingUi.props('disabled')).toBe(true)
  })

  it('passes willOpen callback to FloatingUi', () => {
    const willOpenFn = () => {}
    const wrapper = mount(Component, {
      props: { willOpen: willOpenFn }
    })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('willOpen')).toBe(willOpenFn)
  })

  it('passes willClose callback to FloatingUi', () => {
    const willCloseFn = () => {}
    const wrapper = mount(Component, {
      props: { willClose: willCloseFn }
    })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('willClose')).toBe(willCloseFn)
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, { attachTo: document.body })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
