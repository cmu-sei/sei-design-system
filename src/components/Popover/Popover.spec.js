import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./Popover.vue"
import FloatingUi from "../FloatingUi/FloatingUi.vue"

describe("Popover.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component)
    expect(wrapper.vm).toBeTruthy()
  })
  
  it("matches snapshot", () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it("matches snapshot with no props assigned", () => {
    const propsData = {}
    const wrapper = mount(Component, { propsData })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("matches snapshot with prop assigned", () => {
    const propsData = {
      placement: 'bottom',
      size: 'sm',
      popoverClass: 'test',
      triggerClass: 'test'
    }
    const wrapper = mount(Component, { propsData })
    expect(wrapper.html()).toMatchSnapshot()
  })

  // zIndex computed property tests
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

  it('does not add z-index class when zIndex is empty string', () => {
    const wrapper = mount(Component, { props: { zIndex: '' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass).not.toContain('z-0')
    expect(popperClass).not.toContain('z-10')
    expect(popperClass).not.toContain('z-20')
    expect(popperClass).not.toContain('z-30')
    expect(popperClass).not.toContain('z-40')
    expect(popperClass).not.toContain('z-50')
    expect(popperClass).not.toContain('z-auto')
  })

  // sizeClass computed property tests
  it('computes w-96 class by default', () => {
    const wrapper = mount(Component)
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-96')
  })

  it('computes w-64 class when size is sm', () => {
    const wrapper = mount(Component, { props: { size: 'sm' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-64')
  })

  it('computes w-80 class when size is md', () => {
    const wrapper = mount(Component, { props: { size: 'md' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-80')
  })

  it('computes w-96 class when size is lg', () => {
    const wrapper = mount(Component, { props: { size: 'lg' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-96')
  })

  it('computes min-w-96 w-auto classes when size is auto', () => {
    const wrapper = mount(Component, { props: { size: 'auto' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass).toContain('min-w-96')
    expect(popperClass).toContain('w-auto')
  })

  it('computes w-64 class when size is empty string (default case)', () => {
    const wrapper = mount(Component, { props: { size: '' } })
    const floatingUi = wrapper.findComponent(FloatingUi)
    expect(floatingUi.props('popperClass')).toContain('w-64')
  })
})
