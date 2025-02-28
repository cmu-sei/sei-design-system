import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './ExpandCollapse.vue'

describe('ExpandCollapse', () => {
  /* Default button snapshot. Tests slot content. */
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        expandLabel: 'ExpandCollapse'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toEqual('ExpandCollapse')
  })

  /* All props */
  const modelValue = [true, false]
  const kinds = ['primary' , 'secondary' , 'tertiary']
  const variants = ['blue', 'red']
  const disabled = [true, false]

  /* Loop through options and test against each one */
  modelValue.forEach(option => {
    it(`should match its modelValue (${option}) snapshot`, () => {
      const wrapper = mount(Component, {
        props: { modelValue: option }
      })
      expect(wrapper.html()).toMatchSnapshot()
      if (option === true)
        expect(wrapper.text()).toEqual('Show less')
      if (option === false)
        expect(wrapper.text()).toEqual('Show more')
    })
  })

  kinds.forEach(kind => {
    it(`should match its kind (${kind}) snapshot`, () => {
      const wrapper = mount(Component, {
        props: {
          kind: kind,
          expandLabel: `Show more: ${kind}`
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Show more: ${kind}`)
      expect(wrapper.element.classList).toContain(`link-${kind}`)
    })
  })

  variants.forEach(variant => {
    it(`should match its variant (${variant}) snapshot`, () => {
      const wrapper = mount(Component, {
        props: {
          variant: variant,
          expandLabel: `Show more: ${variant}`
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Show more: ${variant}`)
      expect(wrapper.element.classList).toContain(`link-${variant}`)
    })
  })

  disabled.forEach(option => {
    it(`should match its disabled (${option}) snapshot`, () => {
      const wrapper = mount(Component, {
        props: {
          disabled: option,
          expandLabel: `Show more: ${option}`
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Show more: ${option}`)
      expect(wrapper.element.disabled).toEqual(option)
    })
  })
})
