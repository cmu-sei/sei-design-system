import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './FormGroup.vue'

describe('Form Group', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
