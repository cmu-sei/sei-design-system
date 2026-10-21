import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Component from './FloatingUi.vue'

describe('FloatingUi', () => {
  // Define a type-safe interface for all FloatingUi props
  interface FloatingUiProps {
    disabled?: boolean
    placement?: string
    strategy?: string
    overflowPadding?: number
    arrowPadding?: number
    offset?: number
    inline?: boolean
    shift?: boolean
    disableAnimation?: boolean
    animationEnterActiveClass?: string
    animationEnterFromClass?: string
    animationEnterToClass?: string
    animationLeaveActiveClass?: string
    animationLeaveFromClass?: string
    animationLeaveToClass?: string
    popperClass?: string
    hideArrow?: boolean
    arrowClass?: string
    placementTopArrowClass?: string
    placementRightArrowClass?: string
    placementBottomArrowClass?: string
    placementLeftArrowClass?: string
    willOpen?: () => void
    willClose?: () => void
  }

  // Type-safe prop getter for wrapper.props()
  function getProp<K extends keyof FloatingUiProps>(wrapper: ReturnType<typeof mount>, key: K): FloatingUiProps[K] {
    const prop = key as keyof typeof wrapper.props
    return wrapper.props(prop)
  }

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
    /**
     * Mocking `document.body.clientWidth` ensures consistent layout calculations for FloatingUi tests.
     * This prevents flaky results due to varying viewport sizes, especially when verifying arrow positioning for placements like "right".
     */
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1440)
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

  it('closes without waiting for a timer when no delay or close hook is configured', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props, slots })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening
    expect(document.getElementById('teleported')).not.toBeNull()

    const closing = wrapper.vm.onClose()
    await nextTick()

    expect(document.getElementById('teleported')).toBeNull()
    expect(wrapper.emitted('close')).toHaveLength(1)
    await closing
  })

  it.each([false, true])('waits for an explicit close delay with a close hook configured=%s', async (hasCloseHook) => {
    const willClose = vi.fn((resolve: () => void) => resolve())
    const wrapper = mount(Component, {
      attachTo: document.body, props: { ...props, willClose: hasCloseHook ? willClose : undefined }, slots
    })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening

    const closing = wrapper.vm.onClose(100)
    await vi.advanceTimersByTimeAsync(99)
    expect(document.getElementById('teleported')).not.toBeNull()
    expect(willClose).not.toHaveBeenCalled()
    expect(wrapper.emitted('close')).toBeUndefined()
    await vi.advanceTimersByTimeAsync(1)
    await closing
    await nextTick()

    expect(willClose).toHaveBeenCalledTimes(hasCloseHook ? 1 : 0)
    expect(document.getElementById('teleported')).toBeNull()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('defers a zero-delay close hook until after the caller and Vue updates finish', async () => {
    const callOrder: string[] = []
    const willClose = vi.fn((resolve: () => void) => {
      callOrder.push('hook')
      resolve()
    })
    const wrapper = mount(Component, {
      attachTo: document.body, props: { ...props, willClose }, slots
    })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening

    const closing = wrapper.vm.onClose(0)
    callOrder.push('caller')
    await nextTick()
    callOrder.push('Vue update')
    expect(willClose).not.toHaveBeenCalled()
    expect(document.getElementById('teleported')).not.toBeNull()
    expect(wrapper.emitted('close')).toBeUndefined()
    await vi.runAllTimersAsync()
    await closing
    await nextTick()

    expect(callOrder).toEqual(['caller', 'Vue update', 'hook'])
    expect(willClose).toHaveBeenCalledOnce()
    expect(document.getElementById('teleported')).toBeNull()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('keeps the popup open until the close hook resolves', async () => {
    let resolveClose: () => void = () => { throw new Error('Expected the close hook to run') }
    const willClose = vi.fn((resolve: () => void) => { resolveClose = resolve })
    const wrapper = mount(Component, {
      attachTo: document.body, props: { ...props, willClose }, slots
    })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening

    const closing = wrapper.vm.onClose()
    await vi.runAllTimersAsync()
    expect(willClose).toHaveBeenCalledOnce()
    expect(document.getElementById('teleported')).not.toBeNull()
    expect(wrapper.emitted('close')).toBeUndefined()
    resolveClose()
    await closing
    await nextTick()

    expect(document.getElementById('teleported')).toBeNull()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('keeps the popup open when the close hook cancels closing', async () => {
    const willClose = vi.fn((_resolve: () => void, reject: (reason: Error) => void) => {
      reject(new Error('Close cancelled'))
    })
    const wrapper = mount(Component, {
      attachTo: document.body, props: { ...props, willClose }, slots
    })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening

    const closing = wrapper.vm.onClose()
    await vi.runAllTimersAsync()
    await closing
    await nextTick()

    expect(willClose).toHaveBeenCalledOnce()
    expect(document.getElementById('teleported')).not.toBeNull()
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('cancels a pending open when closed immediately', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props, slots })
    void wrapper.vm.onOpen(100)
    await vi.advanceTimersByTimeAsync(50)

    const closing = wrapper.vm.onClose()
    await vi.runAllTimersAsync()
    await closing

    expect(document.getElementById('teleported')).toBeNull()
    expect(wrapper.emitted('open')).toBeUndefined()
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('cancels an earlier delayed close before reopening', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props, slots })
    const opening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await opening
    void wrapper.vm.onClose(100)

    const closing = wrapper.vm.onClose()
    await nextTick()
    expect(document.getElementById('teleported')).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
    await closing
    const reopening = wrapper.vm.onOpen()
    await vi.runAllTimersAsync()
    await reopening

    expect(document.getElementById('teleported')).not.toBeNull()
    expect(wrapper.emitted('open')).toHaveLength(2)
    expect(wrapper.emitted('close')).toHaveLength(1)
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

  it('applies `placementTopArrowClass` props for top placement values', async () => {
    const { value, arrowClass, prop }: { value: string; arrowClass: string; prop: keyof FloatingUiProps } = {
      value: 'top',
      arrowClass: 'top-arrow',
      prop: 'placementTopArrowClass'
    }
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
    expect(getProp(wrapper, prop)).toBe(arrowClass)
    // Check that the arrow class is present in the DOM
    expect(document.body.innerHTML).toContain(arrowClass)
  })

  it('applies `placementBottomArrowClass` props for bottom placement values', async () => {
    const { value, arrowClass, prop }: { value: string; arrowClass: string; prop: keyof FloatingUiProps } = {
      value: 'bottom',
      arrowClass: 'bottom-arrow',
      prop: 'placementBottomArrowClass'
    }
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
    expect(getProp(wrapper, prop)).toBe(arrowClass)
    // Check that the arrow class is present in the DOM
    expect(document.body.innerHTML).toContain(arrowClass)
  })

  it('applies `placementLeftArrowClass` props for left placement values', async () => {
    const { value, arrowClass, prop }: { value: string; arrowClass: string; prop: keyof FloatingUiProps } = {
      value: 'left',
      arrowClass: 'left-arrow',
      prop: 'placementLeftArrowClass'
    }
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
    expect(getProp(wrapper, prop)).toBe(arrowClass)
    // Check that the arrow class is present in the DOM
    expect(document.body.innerHTML).toContain(arrowClass)
  })

  it('applies `placementRightArrowClass` props for right placement values', async () => {
    const { value, arrowClass, prop }: { value: string; arrowClass: string; prop: keyof FloatingUiProps } = {
      value: 'right',
      arrowClass: 'right-arrow',
      prop: 'placementRightArrowClass'
    }
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
    expect(getProp(wrapper, prop)).toBe(arrowClass)
    // Check that the arrow class is present in the DOM
    expect(document.body.innerHTML).toContain(arrowClass)
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
