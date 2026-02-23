import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useThrottleAndDebounce } from './useThrottleAndDebounce'

describe('useThrottleAndDebounce', () => {
  let fn: ReturnType<typeof vi.fn>
  let throttledDebounced: () => void
  const delay = 100

  beforeEach(() => {
    fn = vi.fn()
    // @ts-expect-error - Vitest mock types don't perfectly match generic constraints
    throttledDebounced = useThrottleAndDebounce(fn as (...args: unknown[]) => unknown, delay)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the function immediately on first call', () => {
    throttledDebounced()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call the function again if called within delay', () => {
    throttledDebounced()
    throttledDebounced()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should debounce rapid calls during throttle period', () => {
    throttledDebounced() // First call - executes immediately
    expect(fn).toHaveBeenCalledTimes(1)
    
    // Rapid calls during throttle period
    throttledDebounced()
    throttledDebounced()
    throttledDebounced()
    
    // Should still be 1 call
    expect(fn).toHaveBeenCalledTimes(1)
    
    // Advance time to trigger debounced call
    vi.advanceTimersByTime(delay)
    
    // Should have executed the debounced call
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should call the function again after delay', () => {
    throttledDebounced()
    throttledDebounced()
    vi.advanceTimersByTime(delay)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should reset called flag after delay', () => {
    throttledDebounced()
    vi.advanceTimersByTime(delay)
    throttledDebounced()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should handle rapid scrolling scenario correctly', () => {
    // Simulate rapid scroll events
    throttledDebounced() // t=0, executes immediately (call 1)
    expect(fn).toHaveBeenCalledTimes(1)
    
    vi.advanceTimersByTime(50) // t=50
    throttledDebounced() // Debounced, sets timeout for t=150
    
    vi.advanceTimersByTime(30) // t=80
    throttledDebounced() // Resets timeout to t=180
    
    expect(fn).toHaveBeenCalledTimes(1) // Still just the initial call
    
    // Continue rapid calls within the throttle window
    vi.advanceTimersByTime(10) // t=90
    throttledDebounced() // Resets timeout to t=190
    
    expect(fn).toHaveBeenCalledTimes(1) // Still throttled
    
    // Advance to when debounce should fire
    vi.advanceTimersByTime(100) // t=190
    expect(fn).toHaveBeenCalledTimes(2) // Debounced call fires
  })

  it('should work with default delay', () => {
    const fnWithDefault = vi.fn()
    // @ts-expect-error - Vitest mock types don't perfectly match generic constraints
    const throttledDefault = useThrottleAndDebounce(fnWithDefault as (...args: unknown[]) => unknown)
    
    throttledDefault()
    expect(fnWithDefault).toHaveBeenCalledTimes(1)
    
    throttledDefault()
    vi.advanceTimersByTime(300) // Default delay is 300ms
    expect(fnWithDefault).toHaveBeenCalledTimes(2)
  })
})
