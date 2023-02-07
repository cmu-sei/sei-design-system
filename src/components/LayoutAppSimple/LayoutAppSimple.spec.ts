import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './LayoutAppSimple.vue'

describe('LayoutAppSimple', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
