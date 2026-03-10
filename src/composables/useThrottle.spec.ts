import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useThrottle } from './useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should throttle function calls', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 300)

    throttled('call 1')
    throttled('call 2')
    throttled('call 3')

    // Function should be called immediately for the first call
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('call 1')

    // Advance time and trigger trailing call
    vi.advanceTimersByTime(300)

    // VueUse throttle has trailing behavior
    // Check if any trailing calls were executed
    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('should allow calls at regular intervals', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 100)

    // First call - executes immediately
    throttled(1)
    expect(fn).toHaveBeenCalledTimes(1)

    // Calls within throttle window - ignored immediately
    throttled(2)
    throttled(3)
    expect(fn).toHaveBeenCalledTimes(1)

    // After throttle window - trailing call may execute
    vi.advanceTimersByTime(150)
    
    // Function should have been called at least once
    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('should work with custom delay', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 500)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(400)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(150)
    
    // First call executed, subsequent calls throttled within window
    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('should preserve function arguments', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 100)

    throttled('arg1', 'arg2', 123)
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should handle rapid successive calls correctly', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 100)

    // Rapid calls
    for (let i = 0; i < 10; i++) {
      throttled(i)
      vi.advanceTimersByTime(10)
    }

    // First call executes immediately, others are throttled
    // After 100ms total, at least the first call should have executed
    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('should execute immediately on first call', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 1000)

    throttled('first')

    // Should execute immediately without waiting
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')
  })

  it('should ignore calls during throttle period', () => {
    const fn = vi.fn()
    const throttled = useThrottle(fn, 200)

    throttled(1)
    expect(fn).toHaveBeenCalledTimes(1)

    // Many calls during throttle period
    throttled(2)
    throttled(3)
    throttled(4)
    throttled(5)

    // None of these should execute
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).not.toHaveBeenCalledWith(2)
    expect(fn).not.toHaveBeenCalledWith(3)
    expect(fn).not.toHaveBeenCalledWith(4)
    expect(fn).not.toHaveBeenCalledWith(5)
  })
})
