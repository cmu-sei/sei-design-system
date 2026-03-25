import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Toast.vue'

describe('Toast', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        id: 1,
        title: 'Title',
        text: 'Lorem ipsum...'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { id: 1, title: 'Title', text: 'Lorem ipsum...' }
    })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
