import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Resizer.vue'


describe('Resizer', () => {
  it('Should match its default snapshot', () => {
    const wrapper = mount(Component, {
      /* Put default props here or leave empty */
      props: {}
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match with specific props and src snapshot', () => {
    const wrapper = mount(Component, {
      /* Put specific (non-default) props here to test */
      props: {
        clamp: false,
        direction: 'right'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
