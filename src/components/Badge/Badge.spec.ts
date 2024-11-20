import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Badge.vue'

describe('Badge', () => {
  /* Default badge snapshot. Tests slot content. */
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Badge' },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toEqual('Badge')
  })

  /* All props */
  const variants = ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green']
  const types = ['light-border', 'light', 'medium', 'dark']

  /* Loop through props and test against each one */
  variants.forEach(variant => {
    it(`should match its variant (${variant}) snapshot`, () => {
      const badgeVariant = `Badge ${variant}`
      const wrapper = mount(Component, {
        slots: { default: badgeVariant },
        props: { variant: variant }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(badgeVariant)
    })
  })

  types.forEach(type => {
    it(`should match its type (${type}) snapshot`, () => {
      const badgeType = `Badge ${type}`
      const wrapper = mount(Component, {
        slots: { default: badgeType },
        props: { type: type }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(badgeType)
    })
  })
})
