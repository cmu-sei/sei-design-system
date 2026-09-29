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

  it('should render info icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'info',
        type: 'subtle',
        variant: 'blue',
        size: 'md',
        title: 'Information',
        description: 'This is an informational callout'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-blue-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render tip icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'tip',
        type: 'subtle',
        variant: 'teal',
        size: 'md',
        title: 'Tip',
        description: 'This is a helpful tip'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-teal-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render success icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'success',
        type: 'subtle',
        variant: 'green',
        size: 'md',
        title: 'Success',
        description: 'Operation completed successfully'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-green-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render warning icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'warning',
        type: 'subtle',
        variant: 'orange',
        size: 'md',
        title: 'Warning',
        description: 'Please be cautious'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-orange-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render danger icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'danger',
        type: 'subtle',
        variant: 'red',
        size: 'md',
        title: 'Danger',
        description: 'Critical error occurred'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-red-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render ai icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'ai',
        type: 'outline',
        variant: 'purple',
        size: 'md',
        title: 'AI Generated',
        description: 'Content generated by AI'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-purple-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render help icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'help',
        type: 'outline',
        variant: 'indigo',
        size: 'md',
        title: 'Need Help?',
        description: 'Contact support for assistance'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-indigo-600')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render announcement icon', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'announcement',
        type: 'bold',
        variant: 'blue',
        size: 'md',
        title: 'Announcement',
        description: 'Important update available'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('class')).toContain('fill-white')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should apply correct fillClass for bold type', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'danger',
        type: 'bold',
        variant: 'red',
        size: 'md',
        title: 'Bold Danger',
        description: 'Bold red callout'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('fill-white')
  })

  it('should apply correct fillClass for outline type', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'info',
        type: 'outline',
        variant: 'blue',
        size: 'md',
        title: 'Outline Info',
        description: 'Outline blue callout'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('fill-blue-600')
  })

  it('should prioritize leftIcon slot over icon prop', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'info',
        type: 'subtle',
        variant: 'blue',
        size: 'md',
        title: 'Slot Priority Test',
        description: 'leftIcon slot should take precedence'
      },
      slots: {
        leftIcon: '<span class="custom-icon">Custom Icon</span>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('should not render icon when icon prop is null', () => {
    const wrapper = mount(Component, {
      props: {
        icon: null,
        type: 'subtle',
        variant: 'gray',
        size: 'md',
        title: 'No Icon',
        description: 'This callout has no icon'
      }
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('should render icon with dismissable button', () => {
    const wrapper = mount(Component, {
      props: {
        icon: 'warning',
        type: 'subtle',
        variant: 'orange',
        size: 'md',
        title: 'Dismissable Warning',
        description: 'This warning can be dismissed',
        dismissable: true
      }
    })
    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(2) // icon + dismiss button icon
    expect(wrapper.element).toMatchSnapshot()
  })
})
