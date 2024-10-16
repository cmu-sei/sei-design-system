import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './LayoutAppSimple.vue'

describe('LayoutAppSimple', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
