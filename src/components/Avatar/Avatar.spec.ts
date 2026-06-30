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

  describe('slot content', () => {
    it('renders slot content when provided', () => {
      const wrapper = mount(Component, {
        props: { variant: 'blue', name: 'User' },
        slots: {
          default: '<span class="test-icon">Icon</span>'
        }
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
      expect(wrapper.find('.test-icon').text()).toBe('Icon')
    })

    it('slot content takes priority over src prop', () => {
      const wrapper = mount(Component, {
        props: { 
          variant: 'blue', 
          name: 'User',
          src: 'https://example.com/image.jpg'
        },
        slots: {
          default: '<span class="test-icon">Icon</span>'
        }
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
      expect(wrapper.find('[style*="background-image"]').exists()).toBe(false)
    })

    it('slot content takes priority over initials', () => {
      const wrapper = mount(Component, {
        props: { 
          variant: 'blue', 
          name: 'John Doe'
        },
        slots: {
          default: '<span class="test-icon">Icon</span>'
        }
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
      expect(wrapper.text()).not.toContain('JD')
    })

    it('applies correct icon size classes for xs size', () => {
      const wrapper = mount(Component, {
        props: { size: 'xs', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-4')
      expect(iconContainer.classes()).toContain('h-4')
    })

    it('applies correct icon size classes for sm size', () => {
      const wrapper = mount(Component, {
        props: { size: 'sm', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-5')
      expect(iconContainer.classes()).toContain('h-5')
    })

    it('applies correct icon size classes for md size', () => {
      const wrapper = mount(Component, {
        props: { size: 'md', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-8')
      expect(iconContainer.classes()).toContain('h-8')
    })

    it('applies correct icon size classes for lg size', () => {
      const wrapper = mount(Component, {
        props: { size: 'lg', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-10')
      expect(iconContainer.classes()).toContain('h-10')
    })

    it('applies correct icon size classes for xl size', () => {
      const wrapper = mount(Component, {
        props: { size: 'xl', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-16')
      expect(iconContainer.classes()).toContain('h-16')
    })

    it('applies correct icon size classes for 2xl size', () => {
      const wrapper = mount(Component, {
        props: { size: '2xl', variant: 'blue' },
        slots: { default: '<span>Icon</span>' }
      })
      const iconContainer = wrapper.find('[data-id="sds-avatar"] > div')
      expect(iconContainer.classes()).toContain('w-24')
      expect(iconContainer.classes()).toContain('h-24')
    })

    it('matches snapshot with slot content and lg size', () => {
      const wrapper = mount(Component, {
        props: { size: 'lg', variant: 'blue', name: 'User' },
        slots: { default: '<svg class="icon-user"><path d="M0 0"/></svg>' }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('matches snapshot with slot content and circle shape', () => {
      const wrapper = mount(Component, {
        props: { shape: 'circle', variant: 'green', name: 'User' },
        slots: { default: '<svg class="icon-user"><path d="M0 0"/></svg>' }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
