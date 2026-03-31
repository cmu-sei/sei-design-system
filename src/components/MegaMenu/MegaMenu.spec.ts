import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './MegaMenu.vue'

describe('MegaMenu', () => {
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

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, { attachTo: document.body })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
