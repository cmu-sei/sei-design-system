import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './ActionButton.vue'

describe('ActionButton', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant primary snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})