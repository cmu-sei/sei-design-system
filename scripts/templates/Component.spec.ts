import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './---NAME---.vue'


describe('---NAME---', () => {
  it('Should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      props: {
        /* Put default props here or leave empty */
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Should match with specific props and src snapshot', () => {
    const wrapper = shallowMount(Component, {
      props: {
        /* Put specific props here */
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
