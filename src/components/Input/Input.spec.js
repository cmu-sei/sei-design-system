import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Input.vue'

describe('Input', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('matches snapshot with placeholder prop assigned', () => {
    const wrapper = shallowMount(Component, {
      props: {
        placeholder: 'Firstname Lastname'
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  })
})
