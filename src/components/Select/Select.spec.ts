import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Select.vue'

const defaultOptions = [
  { id: 1, value: 1, text: 'Option 1' },
  { id: 2, value: 2, text: 'Option 2' },
  { id: 3, value: 3, text: 'Option 3' }
]

describe('Select', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: 1,
        options: defaultOptions
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      attrs: { 'aria-label': 'Select an option' },
      props: { modelValue: 1, options: defaultOptions }
    })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
