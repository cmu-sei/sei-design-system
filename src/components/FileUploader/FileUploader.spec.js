import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './FileUploader.vue'

describe('FileUploader', () => {
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
