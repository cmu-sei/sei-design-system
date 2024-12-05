import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Datapoint.vue'

describe('Datapoint', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: '4000',
        label: 'label',
        context: 'context'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toEqual('label4000context')
  })

  /* All props */
  const sizes = ['sm', 'md', 'lg']
  const variants = ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green']

  sizes.forEach(size => {
    it(`should match its size (${size}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Datapoint ${size}` },
        props: { size: size }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Datapoint ${size}`)
    })
  })

  variants.forEach(variant => {
    it(`should match its variant (${variant}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Datapoint ${variant}` },
        props: { variant: variant }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Datapoint ${variant}`)
    })
  })
})
