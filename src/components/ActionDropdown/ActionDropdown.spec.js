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

})
