import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Avatar.vue'


describe('Avatar', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant: random, size: lg, shape: circle, name: Matt Winwood, and src snapshot', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        variant: 'random',
        size: 'lg',
        shape: 'circle',
        name: 'Matt Winwood',
        src: 'https://seinet.sei.cmu.edu/api/photos/mrwinwood?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
