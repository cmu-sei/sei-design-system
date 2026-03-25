import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './FormGroup.vue'

describe('Form Group', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        uid: {
          created(el: Element) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const wrapper = mount(Component, {
      attachTo: div,
      directives: {
        uid: {
          created(el: Element) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    const results = await axe.run(div)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
    document.body.removeChild(div)
  })
})
