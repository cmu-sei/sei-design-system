import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './ActionButton.vue'

describe('ActionButton', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind primary, variant blue snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind secondary, variant gray snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'secondary',
        variant: 'gray'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its kind ghost, variant red snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'ghost',
        variant: 'red'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a submit button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue',
        type: "submit"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a xs button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue',
        size: "xs"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a md button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue',
        size: "md"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a lg button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'blue',
        size: "lg"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be an active button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'secondary',
        variant: 'red',
        active: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a disabled button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'ghost',
        variant: 'gray',
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be a block button', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Action Button'
      },
      props: {
        kind: 'primary',
        variant: 'gray',
        block: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})