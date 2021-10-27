import { shallowMount } from '@vue/test-utils'
import Component from './Button.vue'

describe('Button', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Default slot'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant primary snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Default slot'
      },
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})