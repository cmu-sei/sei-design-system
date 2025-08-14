import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
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

  it('closes when onClose is called after open', async () => {
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

  it('toggles open/close state with onToggle', async () => {
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

  it('responds to emitter events to open and close the floating Ui', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots
    })
    // @ts-expect-error: Accessing internal Vue instance provides for testing emitter
    const emitter = wrapper.vm.$.provides.emitter
    // Open via emitter event
    emitter.emit('floating-ui-toggle', true)
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')
    // Close via emitter event
    emitter.emit('floating-ui-toggle', false)
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Teleported content')
  })

  it('closes when Escape key is pressed', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props,
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')
    // Simulate Escape key
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(event)
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

  it('applies custom `popperClass`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        popperClass: 'custom-popper-class'
      },
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('custom-popper-class')
  })

  it('applies custom `arrowPadding` and `overflowPadding`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        arrowPadding: 20,
        overflowPadding: 15
      },
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(wrapper.props('arrowPadding')).toBe(20)
    expect(wrapper.props('overflowPadding')).toBe(15)
  })

  it('applies `offset`, `inline`, and `shift` props', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        offset: 30,
        inline: true,
        shift: true
      },
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(wrapper.props('offset')).toBe(30)
    expect(wrapper.props('inline')).toBe(true)
    expect(wrapper.props('shift')).toBe(true)
  })

  it('applies custom animation classes', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        animationEnterActiveClass: 'custom-enter-active',
        animationEnterFromClass: 'custom-enter-from',
        animationEnterToClass: 'custom-enter-to',
        animationLeaveActiveClass: 'custom-leave-active',
        animationLeaveFromClass: 'custom-leave-from',
        animationLeaveToClass: 'custom-leave-to'
      },
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(wrapper.props('animationEnterActiveClass')).toBe('custom-enter-active')
    expect(wrapper.props('animationLeaveToClass')).toBe('custom-leave-to')
  })

  it('applies `strategy` prop', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        strategy: 'fixed'
      },
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(wrapper.props('strategy')).toBe('fixed')
  })

  it('uses "auto" as the default placement when no placement prop is provided', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      slots
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported content')
    expect(wrapper.props('placement')).toBe('auto')
  })

  it('applies `placement*ArrowClass` props for all placement values', async () => {
    const placements = [
      { value: 'top', arrowClass: 'top-arrow', prop: 'placementTopArrowClass' },
      { value: 'right', arrowClass: 'right-arrow', prop: 'placementRightArrowClass' },
      { value: 'bottom', arrowClass: 'bottom-arrow', prop: 'placementBottomArrowClass' },
      { value: 'left', arrowClass: 'left-arrow', prop: 'placementLeftArrowClass' },
    ]
    for (const { value, arrowClass, prop } of placements) {
      const wrapper = mount(Component, {
        attachTo: document.body,
        props: {
          ...props,
          placement: value,
          placementTopArrowClass: 'top-arrow',
          placementRightArrowClass: 'right-arrow',
          placementBottomArrowClass: 'bottom-arrow',
          placementLeftArrowClass: 'left-arrow'
        },
        slots
      })
      await wrapper.find('button').trigger('click')
      vi.runAllTimers()
      await flushPromises()
      expect(wrapper.props()[prop]).toBe(arrowClass)
      // Check that the arrow class is present in the DOM
      expect(document.body.innerHTML).toContain(arrowClass)
    }
  })

  it('calls `willOpen` and `willClose` functions', async () => {
    const willOpen = vi.fn()
    const willClose = vi.fn()
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        ...props,
        willOpen,
        willClose
      },
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
    expect(willOpen).toHaveBeenCalled()
    await wrapper.findAll('button')[1].trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(willClose).toHaveBeenCalled()
  })
})
