import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import debounce from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the function after the specified delay', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(delay)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should only call the function once when called multiple times within delay', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    debouncedFn()
    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(delay)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer on each call within the delay period', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    vi.advanceTimersByTime(50)

    // Second call resets timer
    debouncedFn()
    vi.advanceTimersByTime(50)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass the latest arguments when called multiple times', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn('first')
    debouncedFn('second')
    debouncedFn('third')
    vi.advanceTimersByTime(delay)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('third')
  })

  it('should work with delay of 0', () => {
    const fn = vi.fn()
    const delay = 0
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    vi.advanceTimersByTime(0)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple debounced functions independently', () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const delay1 = 100
    const delay2 = 200
    const debouncedFn1 = debounce(fn1, delay1)
    const debouncedFn2 = debounce(fn2, delay2)

    debouncedFn1()
    debouncedFn2()

    vi.advanceTimersByTime(delay1)
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).not.toHaveBeenCalled()

    vi.advanceTimersByTime(delay2 - delay1)
    expect(fn2).toHaveBeenCalledTimes(1)
  })

  it('should not call the function if not enough time passes', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    vi.advanceTimersByTime(delay - 1)

    expect(fn).not.toHaveBeenCalled()
  })

  it('should handle functions with no arguments', () => {
    const fn = vi.fn()
    const delay = 100
    const debouncedFn = debounce(fn, delay)

    debouncedFn()
    vi.advanceTimersByTime(delay)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith()
  })
})
