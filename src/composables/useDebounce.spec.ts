import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should debounce function calls', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 300)

    debounced('call 1')
    debounced('call 2')
    debounced('call 3')

    // Function should not be called yet
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)

    // Function should be called once with the last arguments
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('call 3')
  })

  it('should cancel previous debounced calls', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 200)

    debounced('first')
    vi.advanceTimersByTime(100)

    debounced('second')
    vi.advanceTimersByTime(100)

    // First call should be cancelled, only 100ms has passed
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    // Now second call should execute (200ms total)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('should work with custom delay', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 500)

    debounced()

    vi.advanceTimersByTime(400)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should use default delay of 300ms when not specified', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn)

    debounced()

    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should preserve function arguments', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 100)

    debounced('arg1', 'arg2', 123)

    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should handle multiple sequential calls correctly', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 100)

    // First batch of calls
    debounced('batch1-1')
    debounced('batch1-2')
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('batch1-2')

    // Second batch of calls
    debounced('batch2-1')
    debounced('batch2-2')
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenCalledWith('batch2-2')
  })

  it('should work with functions that return values', () => {
    const fn = vi.fn((x: number) => x * 2)
    // @ts-expect-error - Vitest mock types don't perfectly match generic constraints
    const debounced = useDebounce(fn as (...args: unknown[]) => unknown, 100)

    debounced(5)
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledWith(5)
  })

  it('should handle rapid successive calls', () => {
    const fn = vi.fn()
    const debounced = useDebounce(fn, 200)

    for (let i = 0; i < 10; i++) {
      debounced(i)
      vi.advanceTimersByTime(50)
    }

    // Function should not have been called yet
    expect(fn).not.toHaveBeenCalled()

    // Wait for the debounce delay after the last call
    vi.advanceTimersByTime(200)

    // Should be called once with the last value
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(9)
  })
})
