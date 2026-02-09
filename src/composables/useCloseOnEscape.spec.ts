import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { useCloseOnEscape } from './useCloseOnEscape'

describe('useCloseOnEscape', () => {
  beforeEach(() => {
    // Clean up any event listeners
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call onClose when Escape is pressed and overlay is open', () => {
    const isOpen = ref(true)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose)

    // Simulate Escape key press
    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when overlay is closed', () => {
    const isOpen = ref(false)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose)

    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should support function as isOpen parameter', () => {
    let open = true
    const isOpen = () => open
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose)

    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).toHaveBeenCalledTimes(1)

    onClose.mockClear()
    open = false
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should not call onClose when disabled option is true', () => {
    const isOpen = ref(true)
    const disabled = ref(true)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose, { disabled })

    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should call onClose when disabled option becomes false', () => {
    const isOpen = ref(true)
    const disabled = ref(true)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose, { disabled })

    let event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)
    expect(onClose).not.toHaveBeenCalled()

    disabled.value = false
    event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should support function as disabled parameter', () => {
    const isOpen = ref(true)
    let isDisabled = true
    const disabled = () => isDisabled
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose, { disabled })

    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()

    isDisabled = false
    document.dispatchEvent(event)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should preventDefault on the event', () => {
    const isOpen = ref(true)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose)

    const event = new KeyboardEvent('keyup', { key: 'Escape', cancelable: true })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    
    document.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should work with multiple instances', () => {
    const isOpen1 = ref(true)
    const isOpen2 = ref(true)
    const onClose1 = vi.fn()
    const onClose2 = vi.fn()

    useCloseOnEscape(isOpen1, onClose1)
    useCloseOnEscape(isOpen2, onClose2)

    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose1).toHaveBeenCalledTimes(1)
    expect(onClose2).toHaveBeenCalledTimes(1)
  })

  it('should only trigger on Escape key, not other keys', () => {
    const isOpen = ref(true)
    const onClose = vi.fn()

    useCloseOnEscape(isOpen, onClose)

    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' })
    document.dispatchEvent(enterEvent)
    expect(onClose).not.toHaveBeenCalled()

    const spaceEvent = new KeyboardEvent('keyup', { key: ' ' })
    document.dispatchEvent(spaceEvent)
    expect(onClose).not.toHaveBeenCalled()

    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
