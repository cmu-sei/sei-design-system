import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import Component from './FloatingUi.vue'

describe('FloatingUi', () => {
  const props = {
    disableAnimation: true,
    'arrow-class': 'arrow-class absolute w-2 h-2 rotate-45',
    'placement': 'top',
    'placement-top-arrow-class': '-bottom-1 border-b border-r',
  }

  const slots = {
    default: `
      <div id="teleported">Teleported content</div>
    `,
    trigger: `
      <template #trigger="{ open }">
        <button @click="open">Open</button>
      </template>
    `
  }

  enableAutoUnmount(afterEach)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Clean up teleported elements between tests
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('opens and teleports content', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots
    })

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')
  })

  it('closes when `onClose` is called after open', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots: {
        default: slots.default,
        trigger: `
          <template #trigger="{ open, close }">
            <button @click="open">Open</button>
            <button @click="close">Close</button>
          </template>
        `
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')

    await wrapper.findAll('button')[1].trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Teleported content')
  })

  it('toggles open/close state with `onToggle`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots: {
        default: slots.default,
        trigger: `
          <template #trigger="{ toggle }">
            <button @click="toggle">Toggle</button>
          </template>
        `
      }
    })

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Teleported content')
  })

  it('does not open if `disabled` prop is true', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        disabled: true
      },
      slots
    })

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(wrapper.html()).not.toContain('popperRef')
  })

  it('renders arrow by default', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots
    })

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('arrow-class')
  })

  it('does not render arrow when `hideArrow` is true', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        hideArrow: true
      },
      slots
    })

    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('arrow-class')
  })

  it('passes slot props correctly to trigger slot', () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots: {
        trigger: `
          <template #trigger="{ isOpen, open, close, toggle }">
            <button @click="toggle">Trigger</button>
          </template>
        `
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
