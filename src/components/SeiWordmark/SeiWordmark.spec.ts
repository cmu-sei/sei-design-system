import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './SeiWordmark.vue'

describe('SeiWordmark', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders an SVG element', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders with data-id attribute', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('[data-id="sds-sei-wordmark"]').exists()).toBe(true)
  })

  it('renders with aria-hidden to hide decorative SVG from screen readers', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, { attachTo: document.body })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
