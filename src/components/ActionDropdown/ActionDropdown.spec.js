import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './ActionDropdown.vue'

describe('ActionDropdown', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
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
