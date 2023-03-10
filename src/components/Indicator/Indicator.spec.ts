import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Indicator.vue'

describe('Indicator', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Indicator'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant green, placement bottom-right snapshot', () => {
    const wrapper = shallowMount(Component, {
      slots: {
        default: 'Indicator'
      },
      props: {
        variant: 'green',
        placement: 'bottom-right'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})