import { mount } from '@vue/test-utils'
import Component from './Button.vue'

describe('Button', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Default slot'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})