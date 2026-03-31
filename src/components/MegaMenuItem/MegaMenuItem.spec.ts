import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './MegaMenuItem.vue'

describe('MegaMenuItem', () => {
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

  it('matches snapshot with link kind "simple" prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        kind: 'simple'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with link kind "descriptive" prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        kind: 'descriptive'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with link kind "landing-page" prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        kind: 'landing-page'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const menu = document.createElement('div')
    menu.setAttribute('role', 'menu')
    document.body.appendChild(menu)
    const wrapper = mount(Component, {
      attachTo: menu,
      props: { label: 'Menu item' }
    })
    const results = await axe.run(menu)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
    document.body.removeChild(menu)
  })
})
