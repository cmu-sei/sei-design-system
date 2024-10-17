import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Datapoint.vue'

describe('Datapoint', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: '4000',
        label: 'label',
        context: 'context'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant green, size sm, label, and context slots snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: '2000'
      },
      props: {
        variant: 'green',
        size: 'sm',
        label: 'label',
        context: 'context'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})