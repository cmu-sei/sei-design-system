import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './ActionDropdown.vue'

describe('ActionDropdown', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have the proper title', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        title: "Title for the action dropdown",
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a primary kind with a gray variant', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "primary",
        variant: "gray"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind primary, variant white snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'white'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a secondary kind with a red variant', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "secondary",
        variant: "red"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind secondary, variant white snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'secondary',
        variant: 'white'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a ghost kind with a blue variant', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "ghost",
        variant: "blue"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind ghost, variant white snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'ghost',
        variant: 'white'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have an xs size', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "primary",
        variant: "blue",
        size: "xs"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  
  it('should have a md size', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "secondary",
        variant: "red",
        size: "md"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a lg size', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "ghost",
        variant: "gray",
        size: "lg"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should hide the arrow', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "secondary",
        variant: "red",
        size: "md",
        hideArrow: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be block styling', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "secondary",
        variant: "red",
        size: "md",
        block: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be disabled', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        kind: "primary",
        variant: "blue",
        size: "lg",
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders trigger button that can be clicked', async () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        title: 'Test Dropdown'
      }
    })

    // Find and click the button
    const button = wrapper.find('button')
    await button.trigger('click')

    // Verify the button exists and is interactive
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-haspopup')).toBe('true')
  })

  it('passes openDelay prop correctly', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        title: 'Test Dropdown',
        openDelay: 300
      }
    })

    expect(wrapper.props('openDelay')).toBe(300)
  })

  it('passes closeDelay prop correctly', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        title: 'Test Dropdown',
        closeDelay: 200
      }
    })

    // Verify the prop was set correctly
    expect(wrapper.props('closeDelay')).toBe(200)
  })

  it('disabled button cannot be clicked', async () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        title: 'Test Dropdown',
        disabled: true
      }
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('applies z-0 class when zIndex is "0"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: '0'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-0': true })
  })

  it('applies z-10 class when zIndex is "10"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: '10'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-10': true })
  })

  it('applies z-20 class when zIndex is "20"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: '20'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-20': true })
  })

  it('applies z-30 class when zIndex is "30"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: '30'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-30': true })
  })

  it('applies z-40 class when zIndex is "40"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: '40'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-40': true })
  })

  it('applies z-50 class when zIndex is "50" (default)', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-50': true })
  })

  it('applies z-auto class when zIndex is "auto"', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: 'auto'
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    expect(floatingUi.props('popperClass')).toMatchObject({ 'z-auto': true })
  })

  it('applies no z-index class when zIndex is empty string', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props: {
        zIndex: ''
      }
    })

    const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
    const popperClass = floatingUi.props('popperClass')
    expect(popperClass['z-0']).toBeUndefined()
    expect(popperClass['z-10']).toBeUndefined()
    expect(popperClass['z-20']).toBeUndefined()
    expect(popperClass['z-30']).toBeUndefined()
    expect(popperClass['z-40']).toBeUndefined()
    expect(popperClass['z-50']).toBeUndefined()
    expect(popperClass['z-auto']).toBeUndefined()
  })
})



