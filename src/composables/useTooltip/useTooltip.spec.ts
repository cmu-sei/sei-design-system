import { effectScope } from 'vue'
import { useTooltip } from './index'
import { describe, it, expect, vi } from 'vitest'

function createTooltip() {
  const scope = effectScope()
  const tooltip = scope.run(() => useTooltip<unknown>())
  if (!tooltip) throw new Error('Failed to create tooltip composable.')
  return { scope, tooltip }
}

describe('useTooltip', () => {
  it('shows tooltip with position and payload', () => {
    const scope = effectScope()
    const tooltip = scope.run(() => useTooltip<{ label: string }>())
    if (!tooltip) throw new Error('Failed to create tooltip composable.')

    tooltip.show(120, 240, { label: 'Alpha' })

    expect(tooltip.visible.value).toBe(true)
    expect(tooltip.x.value).toBe(120)
    expect(tooltip.y.value).toBe(240)
    expect(tooltip.data.value).toEqual({ label: 'Alpha' })
    scope.stop()
  })

  it('hides tooltip after delay', () => {
    vi.useFakeTimers()
    const { scope, tooltip } = createTooltip()

    tooltip.show(0, 0, 'payload')
    tooltip.hide()

    expect(tooltip.visible.value).toBe(true)
    vi.advanceTimersByTime(120)
    expect(tooltip.visible.value).toBe(false)

    scope.stop()
    vi.useRealTimers()
  })

  it('cancels pending hide when show is called again', () => {
    vi.useFakeTimers()
    const scope = effectScope()
    const tooltip = scope.run(() => useTooltip<string>())
    if (!tooltip) throw new Error('Failed to create tooltip composable.')

    tooltip.show(10, 20, 'first')
    tooltip.hide()
    tooltip.show(30, 40, 'second')
    vi.advanceTimersByTime(120)

    expect(tooltip.visible.value).toBe(true)
    expect(tooltip.x.value).toBe(30)
    expect(tooltip.y.value).toBe(40)
    expect(tooltip.data.value).toBe('second')

    scope.stop()
    vi.useRealTimers()
  })

  it('clears pending timeout on scope dispose', () => {
    vi.useFakeTimers()

    const scope = effectScope()
    const tooltip = scope.run(() => useTooltip<string>())
    if (!tooltip) throw new Error('Failed to create tooltip composable.')

    tooltip.show(0, 0, 'value')
    tooltip.hide()
    scope.stop()
    vi.runAllTimers()

    expect(tooltip.visible.value).toBe(true)
    vi.useRealTimers()
  })
})