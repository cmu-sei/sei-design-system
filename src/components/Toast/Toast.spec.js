import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Toast.vue'

describe('Toast', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        id: 1,
        title: 'Title',
        text: 'Lorem ipsum...'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
