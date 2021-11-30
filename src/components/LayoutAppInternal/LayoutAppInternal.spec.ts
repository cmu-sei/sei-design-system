import { shallowMount } from '@vue/test-utils'
import Component from './LayoutAppInternal.vue'

describe('LayoutAppInternal', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})