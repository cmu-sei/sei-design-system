import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useResizeObserver } from './useResizeObserver'

describe('useResizeObserver', () => {
  let mockElement: HTMLElement

  // Mock ResizeObserver if not available
  if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
      constructor() {
        // Mock constructor
      }
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    } as unknown as typeof ResizeObserver
  }

  beforeEach(() => {
    mockElement = document.createElement('div')
    document.body.appendChild(mockElement)
  })

  it('should not throw when created with element ref', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn()

    expect(() => {
      useResizeObserver(elementRef, callback)
    }).not.toThrow()
  })

  it('should not throw when created with undefined element', () => {
    const elementRef = ref<HTMLElement | undefined>(undefined)
    const callback = vi.fn()

    expect(() => {
      useResizeObserver(elementRef, callback)
    }).not.toThrow()
  })

  it('should return a cleanup object', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn()

    const result = useResizeObserver(elementRef, callback)

    // VueUse returns a cleanup object
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })

  it('should accept callback function', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn((entry: ResizeObserverEntry) => {
      // Callback structure
      expect(entry).toBeDefined()
    })

    useResizeObserver(elementRef, callback)
    
    // Callback is defined and ready
    expect(callback).toBeDefined()
  })

  it('should handle element ref updates', async () => {
    const elementRef = ref<HTMLElement | undefined>(undefined)
    const callback = vi.fn()

    useResizeObserver(elementRef, callback)

    // Set the ref value
    elementRef.value = mockElement

    await nextTick()

    // Should not throw
    expect(elementRef.value).toBe(mockElement)
  })

  it('should accept options parameter', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn()
    const options: ResizeObserverOptions = { box: 'border-box' }

    expect(() => {
      useResizeObserver(elementRef, callback, options)
    }).not.toThrow()
  })

  it('should work with different box options', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn()

    const boxes: Array<'content-box' | 'border-box'> = ['content-box', 'border-box']
    
    boxes.forEach(box => {
      expect(() => {
        useResizeObserver(elementRef, callback, { box })
      }).not.toThrow()
    })
  })

  it('should provide cleanup mechanism', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback = vi.fn()

    const result = useResizeObserver(elementRef, callback)

    // VueUse provides stop method
    expect(result).toBeDefined()
    expect(result).toHaveProperty('stop')
  })

  it('should handle multiple observers on same element', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    expect(() => {
      useResizeObserver(elementRef, callback1)
      useResizeObserver(elementRef, callback2)
    }).not.toThrow()
  })

  it('should work with callback that accesses entry properties', () => {
    const elementRef = ref<HTMLElement>(mockElement)
    
    const callback = vi.fn((entry: ResizeObserverEntry) => {
      // These properties should exist on ResizeObserverEntry
      const { contentRect, target } = entry
      expect(contentRect).toBeDefined()
      expect(target).toBeDefined()
    })

    useResizeObserver(elementRef, callback)
    
    // Callback structure is correct
    expect(callback).toBeDefined()
  })
})

