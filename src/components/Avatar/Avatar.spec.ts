import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Avatar.vue'


describe('Avatar', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'blue'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant: red, size: lg, shape: circle, name: Matt Winwood, and src snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'red',
        size: 'lg',
        shape: 'circle',
        name: 'Matt Winwood',
        src: 'https://seinet.sei.cmu.edu/api/photos/mrwinwood?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('variant: gray, position: bottom, shape: circle, size: md, name: Brandon Jabout, and src', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'gray',
        position: 'bottom',
        shape: 'circle',
        size: 'md',
        name: 'Brandon Jabout',
        src: 'https://seinet.sei.cmu.edu/api/photos/bjabout?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('variant: yellow, position: center, shape: circle, size: sm, name: Brandon Jabout, and src', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'yellow',
        position: 'center',
        shape: 'circle',
        size: 'sm',
        name: 'Brandon Jabout',
        src: 'https://seinet.sei.cmu.edu/api/photos/bjabout?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('variant: green, position: left, shape: circle, size: xs, name: Brandon Jabout, and src', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'green',
        position: 'left',
        shape: 'circle',
        size: 'xs',
        name: 'Brandon Jabout',
        src: 'https://seinet.sei.cmu.edu/api/photos/bjabout?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('variant: blue, position: right, shape: portrait, size: md, name: Brandon Jabout, and src', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'blue',
        position: 'right',
        shape: 'portrait',
        size: 'md',
        name: 'Brandon Jabout',
        src: 'https://seinet.sei.cmu.edu/api/photos/bjabout?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('variant: purple, position: top, shape: portrait, size: md, name: Brandon Jabout, and src', () => {
    const wrapper = mount(Component, {
      props: {
        variant: 'purple',
        position: 'top',
        shape: 'portrait',
        size: 'md',
        name: 'Brandon Jabout',
        src: 'https://seinet.sei.cmu.edu/api/photos/bjabout?full=true',
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('orange variant', () => {
    it('applies orange text color class to initials span', () => {
      const wrapper = mount(Component, { props: { variant: 'orange', name: 'Jane Doe' } })
      expect(wrapper.find('span').classes()).toContain('text-orange-600')
    })

    it('applies white background and orange border classes when type is outline', () => {
      const wrapper = mount(Component, { props: { variant: 'orange', type: 'outline' } })
      expect(wrapper.classes()).toContain('bg-white')
      expect(wrapper.classes()).toContain('border-orange-100')
    })

    it('matches snapshot with orange variant and subtle type', () => {
      const wrapper = mount(Component, { props: { variant: 'orange', name: 'Jane Doe' } })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('matches snapshot with orange variant and outline type', () => {
      const wrapper = mount(Component, { props: { variant: 'orange', type: 'outline', name: 'Jane Doe' } })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('outline type', () => {
    it('applies white background class when type is outline', () => {
      const wrapper = mount(Component, { props: { variant: 'blue', type: 'outline' } })
      expect(wrapper.classes()).toContain('bg-white')
    })

    it('applies colored border class based on variant when type is outline', () => {
      const wrapper = mount(Component, { props: { variant: 'blue', type: 'outline' } })
      expect(wrapper.classes()).toContain('border-blue-200')
    })

    it('applies colored background class based on variant when type is subtle', () => {
      const wrapper = mount(Component, { props: { variant: 'blue', type: 'subtle' } })
      expect(wrapper.classes()).toContain('bg-blue-50')
    })

    it('outline type does not apply colored background class', () => {
      const wrapper = mount(Component, { props: { variant: 'blue', type: 'outline' } })
      expect(wrapper.classes()).not.toContain('bg-blue-50')
    })

    it('matches snapshot with outline type and blue variant', () => {
      const wrapper = mount(Component, { props: { variant: 'blue', type: 'outline', name: 'Jane Doe' } })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
