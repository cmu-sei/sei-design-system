import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './DropdownDivider.vue'

describe('DropdownDivider', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const menu = document.createElement('div')
    menu.setAttribute('role', 'menu')
    document.body.appendChild(menu)
    const wrapper = mount(Component, { attachTo: menu })
    const results = await axe.run(menu)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
    document.body.removeChild(menu)
  })
})
