import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Tag.vue'

describe('Tag', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el: HTMLDivElement) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})