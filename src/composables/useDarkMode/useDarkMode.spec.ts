import { effectScope } from 'vue'
import { useDarkMode } from './index'
import { describe, it, expect, vi } from 'vitest'

describe('useDarkMode', () => {
  it('tracks document.body by default', async () => {
    document.body.classList.remove('dark')
    const scope = effectScope()
    const isDark = scope.run(() => useDarkMode())
    if (!isDark) throw new Error('Failed to create dark-mode composable.')
    expect(isDark.value).toBe(false)

    document.body.classList.add('dark')
    await Promise.resolve()
    expect(isDark.value).toBe(true)

    document.body.classList.remove('dark')
    await Promise.resolve()
    expect(isDark.value).toBe(false)
    scope.stop()
  })

  it('tracks a provided target element', async () => {
    const target = document.createElement('div')
    target.classList.add('dark')

    const scope = effectScope()
    const isDark = scope.run(() => useDarkMode(target))
    if (!isDark) throw new Error('Failed to create dark-mode composable.')
    expect(isDark.value).toBe(true)

    target.classList.remove('dark')
    await Promise.resolve()
    expect(isDark.value).toBe(false)
    scope.stop()
  })

  it('supports target getter functions', async () => {
    const first = document.createElement('div')
    first.classList.add('dark')

    const scope = effectScope()
    const isDark = scope.run(() => useDarkMode(() => first))
    if (!isDark) throw new Error('Failed to create dark-mode composable.')
    expect(isDark.value).toBe(true)

    first.classList.remove('dark')
    await Promise.resolve()
    expect(isDark.value).toBe(false)
    scope.stop()
  })

  it('returns false when target element has no dark class', () => {
    const target = document.createElement('div')
    const scope = effectScope()
    const isDark = scope.run(() => useDarkMode(target))
    if (!isDark) throw new Error('Failed to create dark-mode composable.')
    expect(isDark.value).toBe(false)
    scope.stop()
  })

  it('disconnects observer on scope dispose', () => {
    const disconnect = vi.fn()
    const observe = vi.fn()

    const originalMutationObserver = globalThis.MutationObserver
    const fakeObserver = class {
      observe = observe
      disconnect = disconnect
    }
    globalThis.MutationObserver = fakeObserver as unknown as typeof MutationObserver

    const target = document.createElement('div')
    const scope = effectScope()
    scope.run(() => useDarkMode(target))

    expect(observe).toHaveBeenCalledOnce()
    scope.stop()
    expect(disconnect).toHaveBeenCalledOnce()

    globalThis.MutationObserver = originalMutationObserver
  })
})