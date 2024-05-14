import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Resizer.vue'


describe('Resizer', () => {
  it('Should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      /* Put default props here or leave empty */
      props: {}
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match with specific props and src snapshot', () => {
    const wrapper = shallowMount(Component, {
      /* Put specific props here to test */
      props: {
        /* Props here */
        clamp: false,
        direction: 'right'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
