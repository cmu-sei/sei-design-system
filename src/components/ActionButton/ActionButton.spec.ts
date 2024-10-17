import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './ActionButton.vue'

describe('ActionButton', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind primary, variant blue snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})