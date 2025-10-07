import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { throttleAndDebounce } from './throttleAndDebounce'

describe('throttleAndDebounce', () => {
  let fn: ReturnType<typeof vi.fn>
  let throttled: () => void
  const delay = 100

  beforeEach(() => {
    fn = vi.fn()
    throttled = throttleAndDebounce(fn, delay)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the function immediately on first call', () => {
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call the function again if called within delay', () => {
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the function again after delay', () => {
    throttled()
    throttled()
    vi.advanceTimersByTime(delay)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should reset called flag after delay', () => {
    throttled()
    vi.advanceTimersByTime(delay)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
