import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Input.vue'

describe('Input', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with maxlength prop assigned', () => {
    const wrapper = shallowMount(Component, {
      props: {
        maxlength: 200
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with countCharacters prop assigned', () => {
    const wrapper = shallowMount(Component, {
      props: {
        countCharacters: true,
        type: 'number'
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with id prop assigned', () => {
    const wrapper = shallowMount(Component, {
      props: {
        id: 'unique-identifier'
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with placeholder prop assigned', () => {
    const wrapper = shallowMount(Component, {
      props: {
        placeholder: 'Firstname Lastname'
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  })
})
