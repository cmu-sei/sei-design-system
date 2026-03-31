import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Toaster.vue'

describe('Toaster', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, { attachTo: document.body })
    // Toaster renders no HTML when there are no active toasts;
    // run axe against document.body to confirm the surrounding context is clean
    const results = await axe.run(document.body)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
