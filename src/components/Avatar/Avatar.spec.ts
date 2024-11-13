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
})
