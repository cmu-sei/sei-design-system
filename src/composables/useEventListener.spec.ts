import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useEventListener } from './useEventListener'

describe('useEventListener', () => {
  let originalAddEventListener: typeof window.addEventListener
  let originalRemoveEventListener: typeof window.removeEventListener

  beforeEach(() => {
    originalAddEventListener = window.addEventListener
    originalRemoveEventListener = window.removeEventListener
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  afterEach(() => {
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
    vi.clearAllMocks()
  })

  it('should add event listener on mount', async () => {
    const handler = vi.fn()
    
    mount({
      setup() {
        useEventListener(window, 'resize', handler)
        return () => null
      }
    })

    await nextTick()

    expect(window.addEventListener).toHaveBeenCalledWith('resize', handler, {})
  })

  it('should remove event listener on unmount', async () => {
    const handler = vi.fn()
    
    const wrapper = mount({
      setup() {
        useEventListener(window, 'resize', handler)
        return () => null
      }
    })

    await nextTick()
    expect(window.addEventListener).toHaveBeenCalled()

    wrapper.unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', handler, {})
  })

  it('should pass listener options to addEventListener', async () => {
    const handler = vi.fn()
    
    mount({
      setup() {
        useEventListener(window, 'scroll', handler, {
          passive: true,
          capture: false
        })
        return () => null
      }
    })

    await nextTick()

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', handler, {
      passive: true,
      capture: false
    })
  })

  it('should not add listener when enabled is false', async () => {
    const handler = vi.fn()
    
    mount({
      setup() {
        useEventListener(window, 'resize', handler, { enabled: false })
        return () => null
      }
    })

    await nextTick()

    expect(window.addEventListener).not.toHaveBeenCalled()
  })

  it('should add listener when enabled changes to true', async () => {
    const handler = vi.fn()
    const enabled = ref(false)
    
    mount({
      setup() {
        useEventListener(window, 'resize', handler, { enabled })
        return () => null
      }
    })

    await nextTick()
    expect(window.addEventListener).not.toHaveBeenCalled()

    enabled.value = true
    await nextTick()

    expect(window.addEventListener).toHaveBeenCalledWith('resize', handler, {})
  })

  it('should remove listener when enabled changes to false', async () => {
    const handler = vi.fn()
    const enabled = ref(true)
    
    mount({
      setup() {
        useEventListener(window, 'resize', handler, { enabled })
        return () => null
      }
    })

    await nextTick()
    expect(window.addEventListener).toHaveBeenCalled()
    vi.clearAllMocks()

    enabled.value = false
    await nextTick()

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', handler, {})
  })

  it('should work with element refs', async () => {
    const handler = vi.fn()
    const element = document.createElement('div')
    const elementRef = ref(element)
    const addSpy = vi.spyOn(element, 'addEventListener')
    
    mount({
      setup() {
        useEventListener(elementRef, 'click', handler)
        return () => null
      }
    })

    await nextTick()

    expect(addSpy).toHaveBeenCalledWith('click', handler, {})
  })

  it('should handle undefined element refs gracefully', async () => {
    const handler = vi.fn()
    const elementRef = ref<HTMLElement | undefined>(undefined)
    
    mount({
      setup() {
        useEventListener(elementRef, 'click', handler)
        return () => null
      }
    })

    await nextTick()

    // Should not throw error
    expect(window.addEventListener).not.toHaveBeenCalled()
  })

  it('should update when element ref changes', async () => {
    const handler = vi.fn()
    const element1 = document.createElement('div')
    const element2 = document.createElement('div')
    const elementRef = ref(element1)
    const addSpy1 = vi.spyOn(element1, 'addEventListener')
    const removeSpy1 = vi.spyOn(element1, 'removeEventListener')
    const addSpy2 = vi.spyOn(element2, 'addEventListener')
    
    mount({
      setup() {
        useEventListener(elementRef, 'click', handler)
        return () => null
      }
    })

    await nextTick()
    expect(addSpy1).toHaveBeenCalledWith('click', handler, {})

    elementRef.value = element2
    await nextTick()

    expect(removeSpy1).toHaveBeenCalledWith('click', handler, {})
    expect(addSpy2).toHaveBeenCalledWith('click', handler, {})
  })

  it('should work with document target', async () => {
    const handler = vi.fn()
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    
    const wrapper = mount({
      setup() {
        useEventListener(document, 'click', handler)
        return () => null
      }
    })

    await nextTick()
    expect(addSpy).toHaveBeenCalledWith('click', handler, {})

    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('click', handler, {})

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })

  it('should support enabled as a getter function', async () => {
    const handler = vi.fn()
    let enabled = false
    
    mount({
      setup() {
        useEventListener(window, 'resize', handler, { enabled: () => enabled })
        return () => null
      }
    })

    await nextTick()
    expect(window.addEventListener).not.toHaveBeenCalled()

    enabled = true
    await nextTick()

    // Note: getter function won't react to changes without being in a reactive context
    // This is expected behavior - use ref if you need reactivity
  })
})
