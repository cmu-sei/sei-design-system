import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Calendar.vue'

describe('Calendar', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      props: {
        modelValue: null
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
