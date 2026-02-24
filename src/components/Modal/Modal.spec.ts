import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Component from './Modal.vue'

/**
 * In these tests, we need to await for the wrapper's next tick, and we need to compare against document.body.outHTML.
 * The reason for this is Modal uses the Teleport and Client Only components. These two components (especially Teleport),
 * are causing the DOM to be rendered outside of the component. Because of this, outerHTML is needed. nextTick() makes sure
 * that the components are fully mounted.
 */

describe('Modal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.outerHTML = ''
  })

  it('should match its default snapshot', async () => {
    // const wrapper = mount(Component, {
    //   attachTo: document.body,
    // })
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: md, title: Wonderful SEI modal, hideHeader: false', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: 'md',
        title: 'Wonderful SEI modal',
        hideHeader: false
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: md, title: Wonderful SEI modal, hideHeader: true', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: 'md',
        title: 'Wonderful SEI modal',
        hideHeader: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: sm, title: Wonderful SEI modal, hideHeader: false, z-index: 40', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: 'sm',
        title: 'Wonderful SEI modal',
        hideHeader: false,
        zIndex: '40'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: lg, title: Wonderful SEI modal, hideHeader: false, z-index: 30', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: 'lg',
        title: 'Wonderful SEI modal',
        hideHeader: false,
        zIndex: '30'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: xl, title: Wonderful SEI modal, hideHeader: false, z-index: 20', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: 'xl',
        title: 'Wonderful SEI modal',
        hideHeader: false,
        zIndex: '20'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('modelValue: true, size: 2xl, title: Wonderful SEI modal, hideHeader: false, z-index: 10', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        size: '2xl',
        title: 'Wonderful SEI modal',
        hideHeader: false,
        zIndex: '10'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.outerHTML).toMatchSnapshot()
  })

  it('should focus element with autofocus attribute when modal opens', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: 'Test Modal'
      },
      slots: {
        default: `
          <button id="not-autofocus">Regular Button</button>
          <input id="autofocus-input" type="text" autofocus />
        `
      }
    })
    
    await nextTick()
    // Advance timers to complete transition and autofocus logic
    vi.advanceTimersByTime(300)
    await nextTick()

    const input = document.getElementById('autofocus-input')
    expect(document.activeElement).toBe(input)
    wrapper.unmount()
  })

  it('should focus first focusable element in main content when no autofocus attribute', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: 'Test Modal'
      },
      slots: {
        default: `
          <input id="first-input" type="text" />
          <button id="second-button">Button</button>
        `
      }
    })
    
    await nextTick()
    // Advance timers to complete transition and autofocus logic
    vi.advanceTimersByTime(300)
    await nextTick()

    const input = document.getElementById('first-input')
    expect(document.activeElement).toBe(input)
    wrapper.unmount()
  })
})
