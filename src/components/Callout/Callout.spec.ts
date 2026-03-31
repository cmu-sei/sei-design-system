import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Callout.vue'

describe('Callout', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        type: undefined,
        variant: undefined,
        size: undefined
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a title, description, timestamp, and be size sm', () => {
    const wrapper = mount(Component, {
      props: {
        type: undefined,
        variant: undefined,
        size: 'sm',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a title, description, timestamp, and be size md', () => {
    const wrapper = mount(Component, {
      props: {
        type: undefined,
        variant: undefined,
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a bold gray variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'bold',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a bold orange variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'bold',
        variant: 'orange',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a bold red variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'bold',
        variant: 'red',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have an outline purple variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'outline',
        variant: 'purple',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have an outline indigo variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'outline',
        variant: 'indigo',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have an outline blue variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'outline',
        variant: 'blue',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a subtle teal variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'teal',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a subtle green variant', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'green',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should override description with slot', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      },
      // @ts-expect-error - partial slots are valid in tests
      slots: {
        default: 'This is an overridden description'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have default styling on slot for a link', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        timestamp: new Date('December 4, 2012 03:20:00')
      },
      // @ts-expect-error - partial slots are valid in tests
      slots: {
        default: '<a href="https://sei.cmu.edu">This is a description</a>'
      }
    })
    const linkContainer = wrapper.find('div.opacity-90 > div')
    expect(linkContainer.exists()).toBe(true)
    expect(linkContainer.attributes('class')).toContain('[&_a:not([class*=\'no-underline\'])]:underline')
  })

  it('should have icon in leftSlot', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      },
      // @ts-expect-error - partial slots are valid in tests
      slots: {
        leftIcon: 'Left Icon Here'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have button in button slot', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00')
      },
      // @ts-expect-error - partial slots are valid in tests
      slots: {
        buttons: '<button>This is a button</button>'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have dismissable icon', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00'),
        dismissable: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have inset', () => {
    const wrapper = mount(Component, {
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description',
        timestamp: new Date('December 4, 2012 03:20:00'),
        dismissable: true,
        inset: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'This is a title',
        description: 'This is a description'
      }
    })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
