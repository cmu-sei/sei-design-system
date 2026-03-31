import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './ClientOnly.vue'

describe('ClientOnly', () => {
  it('does not render slot content before mount', () => {
    const wrapper = mount(Component, {
      slots: { default: '<span data-testid="content">Hello</span>' }
    })
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(false)
  })

  it('renders slot content after mount', async () => {
    const wrapper = mount(Component, {
      slots: { default: '<span data-testid="content">Hello</span>' }
    })
    // Trigger the onMounted lifecycle
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true)
  })

  it('renders text slot content after mount', async () => {
    const wrapper = mount(Component, {
      slots: { default: 'Visible content' }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Visible content')
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      slots: { default: '<p>Client-only content</p>' }
    })
    await wrapper.vm.$nextTick()
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
