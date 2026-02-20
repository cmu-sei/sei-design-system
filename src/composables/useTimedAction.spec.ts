import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useTimedAction } from './useTimedAction'

describe('useTimedAction', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should call onTrigger after delay', () => {
    const onTrigger = vi.fn()
    const { start } = useTimedAction(onTrigger, { delay: 1000 })

    start()
    expect(onTrigger).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should use default delay of 5000ms', () => {
    const onTrigger = vi.fn()
    const { start } = useTimedAction(onTrigger)

    start()
    vi.advanceTimersByTime(4999)
    expect(onTrigger).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should clear timer before it triggers', () => {
    const onTrigger = vi.fn()
    const { start, clear } = useTimedAction(onTrigger, { delay: 1000 })

    start()
    vi.advanceTimersByTime(500)
    
    clear()
    vi.advanceTimersByTime(1000)
    
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('should reset timer', () => {
    const onTrigger = vi.fn()
    const { start, reset } = useTimedAction(onTrigger, { delay: 1000 })

    start()
    vi.advanceTimersByTime(500)
    
    reset()
    vi.advanceTimersByTime(500)
    expect(onTrigger).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(500)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should track isActive state', () => {
    const onTrigger = vi.fn()
    const { start, clear, isActive } = useTimedAction(onTrigger, { delay: 1000 })

    expect(isActive.value).toBe(false)

    start()
    expect(isActive.value).toBe(true)

    clear()
    expect(isActive.value).toBe(false)
  })

  it('should set isActive to false after timer completes', () => {
    const onTrigger = vi.fn()
    const { start, isActive } = useTimedAction(onTrigger, { delay: 1000 })

    start()
    expect(isActive.value).toBe(true)

    vi.advanceTimersByTime(1000)
    expect(isActive.value).toBe(false)
  })

  it('should auto-start if autoStart is true', async () => {
    const onTrigger = vi.fn()
    
    // Need to mount in a component to trigger onMounted
    const TestComponent = {
      setup() {
        const { isActive } = useTimedAction(onTrigger, { 
          delay: 1000, 
          autoStart: true 
        })
        return { isActive }
      },
      template: '<div>{{ isActive }}</div>'
    }

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(wrapper.vm.isActive).toBe(true)

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(onTrigger).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.unmount()
  })

  it('should not start if enabled is false', () => {
    const onTrigger = vi.fn()
    const enabled = ref(false)
    const { start } = useTimedAction(onTrigger, { 
      delay: 1000,
      enabled 
    })

    start()
    vi.advanceTimersByTime(1000)
    
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('should start when enabled becomes true', () => {
    const onTrigger = vi.fn()
    const enabled = ref(false)
    const { start } = useTimedAction(onTrigger, { 
      delay: 1000,
      enabled 
    })

    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).not.toHaveBeenCalled()

    enabled.value = true
    start()
    vi.advanceTimersByTime(1000)
    
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should support reactive delay', () => {
    const onTrigger = vi.fn()
    const delay = ref(1000)
    const { start } = useTimedAction(onTrigger, { delay })

    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)

    onTrigger.mockClear()
    delay.value = 2000
    start()
    
    vi.advanceTimersByTime(1000)
    expect(onTrigger).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should clear timer on component unmount', async () => {
    const onTrigger = vi.fn()
    
    const TestComponent = {
      setup() {
        const { start } = useTimedAction(onTrigger, { delay: 1000 })
        start()
        return {}
      },
      template: '<div>Test</div>'
    }

    const wrapper = mount(TestComponent)
    await nextTick()

    wrapper.unmount()
    vi.advanceTimersByTime(1000)
    
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('should clear existing timer when start is called again', () => {
    const onTrigger = vi.fn()
    const { start } = useTimedAction(onTrigger, { delay: 1000 })

    start()
    vi.advanceTimersByTime(500)
    
    start() // Should restart timer
    vi.advanceTimersByTime(500)
    expect(onTrigger).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(500)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple reset calls', () => {
    const onTrigger = vi.fn()
    const { reset } = useTimedAction(onTrigger, { delay: 1000 })

    reset()
    vi.advanceTimersByTime(500)
    
    reset()
    vi.advanceTimersByTime(500)
    expect(onTrigger).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(500)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should not throw when clearing without an active timer', () => {
    const onTrigger = vi.fn()
    const { clear } = useTimedAction(onTrigger)

    expect(() => clear()).not.toThrow()
    expect(() => clear()).not.toThrow() // Multiple calls
  })

  it('should work with enabled as static boolean', () => {
    const onTrigger = vi.fn()
    const { start } = useTimedAction(onTrigger, { 
      delay: 1000, 
      enabled: true 
    })

    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('should work with enabled as getter function', () => {
    const onTrigger = vi.fn()
    const shouldRun = ref(true)
    const { start } = useTimedAction(onTrigger, { 
      delay: 1000,
      enabled: () => shouldRun.value 
    })

    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)

    onTrigger.mockClear()
    shouldRun.value = false
    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('should work with delay as getter function', () => {
    const onTrigger = vi.fn()
    const delayMs = ref(1000)
    const { start } = useTimedAction(onTrigger, { 
      delay: () => delayMs.value 
    })

    start()
    vi.advanceTimersByTime(1000)
    expect(onTrigger).toHaveBeenCalledTimes(1)

    onTrigger.mockClear()
    delayMs.value = 2000
    start()
    vi.advanceTimersByTime(2000)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })
})
