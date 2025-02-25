import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Button.vue'

describe('Button', () => {
  /* Default button snapshot. Tests slot content. */
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Button' }
    })
    expect(wrapper.html()).toMatchSnapshot()
    /* Check that text content matches what was provided to the slot. */
    expect(wrapper.text()).toEqual('Button')
  })

  /* All props */
  const kinds = ['primary', 'secondary', 'tertiary', 'ghost']
  const variants = ['gray', 'blue', 'red', 'white']
  const types = ['button', 'submit']
  const sizes = ['lg', 'md', 'sm', 'xs']

  /* Loop through options and test against each one */
  kinds.forEach(kind => {
    it(`should match its kind (${kind}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Button ${kind}` },
        props: { kind: kind }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Button ${kind}`)
      /* Check that the button element has the .btn-{kind} class. */
      expect(wrapper.element.classList).toContain(`btn-${kind}`)
    })
  })

  variants.forEach(variant => {
    it(`should match its variant (${variant}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Button ${variant}` },
        props: { variant: variant }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Button ${variant}`)
      /* Check that the button element takes on the expected variant classes. */
      expect(wrapper.element.classList).toContain(`btn-${variant}`)
    })
  })

  types.forEach(type => {
    it(`should match its type (${type}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Button ${type}` },
        props: { type: type }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Button ${type}`)
      /* Check that the button element has type="button" or type="submit". */
      expect(wrapper.element.getAttribute('type')).toBe(type)
    })
  })

  sizes.forEach(size => {
    it(`should match its size (${size}) snapshot`, () => {
      const wrapper = mount(Component, {
        slots: { default: `Button ${size}` },
        props: { size: size }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual(`Button ${size}`)
      /* Check that the button element has the appropriate size-related classes */
      if (size !== 'md') {  /* no class for md */
        expect(wrapper.classes()).toContain(`btn-${size}`)
      }
    })
  })

  /* Modifiers (boolean: true/false) */
  it('should match its active snapshot', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Button active' },
      props: { active: true }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toEqual('Button active')
    /* Check that the button element has .active class */
    expect(wrapper.classes()).toContain('active')
  })

  it('should match its disabled snapshot', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Button disabled' },
      props: { disabled: true }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toEqual('Button disabled')
    /* Check that the button element has type="button" or type="submit". */
    expect(wrapper.element).toHaveProperty('disabled')
  })

  it('should match its block snapshot', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Button block' },
      props: { block: true }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toEqual('Button block')
    /* Check that the button element has .block class */
    expect(wrapper.classes()).toContain('btn-block')
  })

  it('should match its pending snapshot', () => {
    const wrapper = mount(Component, {
      props: { pending: true }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toEqual('Pending')
    /* Check that the button element has svg with .animate-spin class */
    expect(wrapper.element.querySelector('svg').classList).toContain('animate-spin')
  })

  const App = {
    components: { Component },
    template: `<Component @click="onClick">{{ count }}</Component>`,
    data() {
      return { count: 0 }
    },
    methods: {
      onClick() {
        this.count += 1
      }
    }
  }

  it('should click', async () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toMatchSnapshot()
    /* Test click trigger (increments by one) */
    await wrapper.trigger('click').then(() => {
      expect(wrapper.element.textContent).toEqual('1')
    })
  })
})
