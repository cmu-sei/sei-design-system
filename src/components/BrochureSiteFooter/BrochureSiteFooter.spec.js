import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './BrochureSiteFooter.vue'

describe('BrochureSiteFooter', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })
})
