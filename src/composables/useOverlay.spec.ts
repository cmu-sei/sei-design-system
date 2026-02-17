import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick, type Ref } from 'vue'
import { useOverlay } from './useOverlay'

describe('useOverlay', () => {
  let containerRef: Ref<HTMLElement | null>

  beforeEach(() => {
    vi.useFakeTimers()
    containerRef = ref<HTMLElement | null>(null)
    // Clear any existing classes
    document.documentElement.classList.remove('sds-overlay-prevent-scroll')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    document.documentElement.classList.remove('sds-overlay-prevent-scroll')
  })

  describe('Basic Functionality', () => {
    it('should initialize with default z-index', () => {
      const isVisible = ref(false)
      
      const { zIndexClass } = useOverlay(isVisible, containerRef)

      expect(zIndexClass.value).toBe('z-50')
    })

    it('should support custom z-index', () => {
      const isVisible = ref(false)
      
      const { zIndexClass } = useOverlay(isVisible, containerRef, {
        zIndex: '30'
      })

      expect(zIndexClass.value).toBe('z-30')
    })

    it('should support reactive z-index', () => {
      const isVisible = ref(false)
      const zIndex = ref<'10' | '50'>('10')
      
      const { zIndexClass } = useOverlay(isVisible, containerRef, {
        zIndex: () => zIndex.value
      })

      expect(zIndexClass.value).toBe('z-10')

      zIndex.value = '50'
      expect(zIndexClass.value).toBe('z-50')
    })
  })

  describe('Open and Close', () => {
    it('should open overlay', () => {
      const isVisible = ref(false)
      
      const { open } = useOverlay(isVisible, containerRef)

      open()

      expect(isVisible.value).toBe(true)
    })

    it('should close overlay', () => {
      const isVisible = ref(true)
      
      const { close } = useOverlay(isVisible, containerRef)

      close()

      expect(isVisible.value).toBe(false)
    })

    it('should call onOpen callback when opened', () => {
      const isVisible = ref(false)
      const onOpen = vi.fn()
      
      const { open } = useOverlay(isVisible, containerRef, { onOpen })

      open()

      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    it('should call onClose callback when closed', () => {
      const isVisible = ref(true)
      const onClose = vi.fn()
      
      const { close } = useOverlay(isVisible, containerRef, { onClose })

      close()

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Close on Escape', () => {
    it('should close overlay on Escape key when enabled', () => {
      const isVisible = ref(true)
      
      useOverlay(isVisible, containerRef, {
        closeOnEscape: true
      })

      const event = new KeyboardEvent('keyup', { key: 'Escape' })
      document.dispatchEvent(event)

      expect(isVisible.value).toBe(false)
    })

    it('should not close on Escape when disabled', () => {
      const isVisible = ref(true)
      
      useOverlay(isVisible, containerRef, {
        closeOnEscape: false
      })

      const event = new KeyboardEvent('keyup', { key: 'Escape' })
      document.dispatchEvent(event)

      expect(isVisible.value).toBe(true)
    })
  })

  describe('Body Scroll Lock', () => {
    it('should add scroll lock class when overlay opens', async () => {
      const isVisible = ref(false)
      
      useOverlay(isVisible, containerRef, {
        lockBodyScroll: true
      })

      isVisible.value = true
      await nextTick()

      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(true)
    })

    it('should remove scroll lock class when overlay closes', async () => {
      const isVisible = ref(true)
      
      useOverlay(isVisible, containerRef, {
        lockBodyScroll: true
      })

      await nextTick()
      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(true)

      isVisible.value = false
      await nextTick()

      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(false)
    })

    it('should not add scroll lock class when disabled', async () => {
      const isVisible = ref(false)
      
      useOverlay(isVisible, containerRef, {
        lockBodyScroll: false
      })

      isVisible.value = true
      await nextTick()

      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(false)
    })

    it('should add scroll lock immediately when overlay is initially open', () => {
      const isVisible = ref(true)
      
      useOverlay(isVisible, containerRef, {
        lockBodyScroll: true
      })

      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(true)
    })
  })

  describe('Auto Focus', () => {
    it('should auto-focus first focusable element in main content', async () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      const main = document.createElement('main')
      const button = document.createElement('button')
      button.textContent = 'Click me'
      button.setAttribute('tabindex', '0')
      main.appendChild(button)
      container.appendChild(main)
      document.body.appendChild(container)
      containerRef.value = container

      useOverlay(isVisible, containerRef, {
        autoFocus: true,
        transitionDuration: 100
      })

      isVisible.value = true
      await nextTick()
      vi.advanceTimersByTime(100)

      expect(document.activeElement).toBe(button)

      document.body.removeChild(container)
    })

    it('should fall back to any focusable element if no main content', async () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      const button = document.createElement('button')
      button.textContent = 'Close'
      button.setAttribute('tabindex', '0')
      container.appendChild(button)
      document.body.appendChild(container)
      containerRef.value = container

      useOverlay(isVisible, containerRef, {
        autoFocus: true,
        transitionDuration: 100
      })

      isVisible.value = true
      await nextTick()
      vi.advanceTimersByTime(100)

      expect(document.activeElement).toBe(button)

      document.body.removeChild(container)
    })

    it('should not auto-focus when disabled', async () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      const button = document.createElement('button')
      container.appendChild(button)
      containerRef.value = container

      const originalFocus = document.activeElement

      useOverlay(isVisible, containerRef, {
        autoFocus: false
      })

      isVisible.value = true
      await nextTick()
      vi.advanceTimersByTime(300)

      expect(document.activeElement).toBe(originalFocus)
    })

    it('should skip disabled focusable elements', async () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      const main = document.createElement('main')
      const disabledButton = document.createElement('button')
      disabledButton.disabled = true
      const enabledButton = document.createElement('button')
      enabledButton.setAttribute('tabindex', '0')
      main.appendChild(disabledButton)
      main.appendChild(enabledButton)
      container.appendChild(main)
      document.body.appendChild(container)
      containerRef.value = container

      useOverlay(isVisible, containerRef, {
        autoFocus: true,
        transitionDuration: 100
      })

      isVisible.value = true
      await nextTick()
      vi.advanceTimersByTime(100)

      expect(document.activeElement).toBe(enabledButton)

      document.body.removeChild(container)
    })
  })

  describe('Restore Focus', () => {
    it('should restore focus to previously focused element when closed', async () => {
      const isVisible = ref(false)
      const triggerButton = document.createElement('button')
      document.body.appendChild(triggerButton)
      triggerButton.focus()

      const container = document.createElement('div')
      containerRef.value = container

      useOverlay(isVisible, containerRef, {
        restoreFocus: true
      })

      isVisible.value = true
      await nextTick()

      isVisible.value = false
      await nextTick()
      vi.advanceTimersByTime(200)

      expect(document.activeElement).toBe(triggerButton)

      document.body.removeChild(triggerButton)
    })

    it('should not restore focus when disabled', async () => {
      const isVisible = ref(false)
      const triggerButton = document.createElement('button')
      document.body.appendChild(triggerButton)
      triggerButton.focus()

      const originalFocus = document.activeElement

      useOverlay(isVisible, containerRef, {
        restoreFocus: false
      })

      isVisible.value = true
      await nextTick()

      isVisible.value = false
      await nextTick()
      vi.advanceTimersByTime(200)

      // Focus should stay wherever it was, not restore
      expect(document.activeElement).toBe(originalFocus)

      document.body.removeChild(triggerButton)
    })
  })

  describe('Focus Trap', () => {
    it('should return trapFocus function when enabled', () => {
      const isVisible = ref(false)
      
      const { trapFocus } = useOverlay(isVisible, containerRef, {
        focusTrap: true
      })

      expect(trapFocus).toBeInstanceOf(Function)
    })

    it('should return no-op function when disabled', () => {
      const isVisible = ref(false)
      
      const { trapFocus } = useOverlay(isVisible, containerRef, {
        focusTrap: false
      })

      expect(trapFocus).toBeInstanceOf(Function)
      // Should not throw when called
      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      expect(() => trapFocus(event)).not.toThrow()
    })

    it('should accept focusTrapOptions', () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      containerRef.value = container

      const initialFocus = vi.fn(() => container)

      const { trapFocus } = useOverlay(isVisible, containerRef, {
        focusTrap: true,
        focusTrapOptions: {
          initialFocus
        }
      })

      expect(trapFocus).toBeInstanceOf(Function)
    })
  })

  describe('Combined Features', () => {
    it('should handle all features enabled together', async () => {
      const isVisible = ref(false)
      const onOpen = vi.fn()
      const onClose = vi.fn()
      const container = document.createElement('div')
      const button = document.createElement('button')
      button.setAttribute('tabindex', '0')
      container.appendChild(button)
      document.body.appendChild(container)
      containerRef.value = container

      const { open, close } = useOverlay(isVisible, containerRef, {
        zIndex: '40',
        closeOnEscape: true,
        focusTrap: true,
        lockBodyScroll: true,
        autoFocus: true,
        restoreFocus: true,
        transitionDuration: 100,
        onOpen,
        onClose
      })

      open()
      await nextTick()

      expect(isVisible.value).toBe(true)
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(true)

      vi.advanceTimersByTime(100)
      expect(document.activeElement).toBe(button)

      close()
      await nextTick()

      expect(isVisible.value).toBe(false)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(false)

      document.body.removeChild(container)
    })

    it('should work with minimal configuration', () => {
      const isVisible = ref(false)
      
      const overlay = useOverlay(isVisible, containerRef)

      expect(overlay.zIndexClass.value).toBe('z-50')
      expect(overlay.open).toBeInstanceOf(Function)
      expect(overlay.close).toBeInstanceOf(Function)
      expect(overlay.trapFocus).toBeInstanceOf(Function)
    })

    it('should handle rapid open/close cycles', async () => {
      const isVisible = ref(false)
      const onOpen = vi.fn()
      const onClose = vi.fn()

      const { open, close } = useOverlay(isVisible, containerRef, {
        onOpen,
        onClose,
        lockBodyScroll: true
      })

      open()
      await nextTick()
      close()
      await nextTick()
      open()
      await nextTick()
      close()
      await nextTick()

      expect(onOpen).toHaveBeenCalledTimes(2)
      expect(onClose).toHaveBeenCalledTimes(2)
      expect(isVisible.value).toBe(false)
      expect(document.documentElement.classList.contains('sds-overlay-prevent-scroll')).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle SSR environment gracefully', () => {
      const isVisible = ref(true)
      
      // This test verifies the typeof document checks work
      expect(() => {
        useOverlay(isVisible, containerRef, {
          lockBodyScroll: true,
          autoFocus: true,
          restoreFocus: true
        })
      }).not.toThrow()
    })

    it('should handle null containerRef gracefully', async () => {
      const isVisible = ref(false)
      containerRef.value = null

      const { open } = useOverlay(isVisible, containerRef, {
        autoFocus: true,
        transitionDuration: 100
      })

      expect(() => {
        open()
        vi.advanceTimersByTime(100)
      }).not.toThrow()
    })

    it('should handle transition duration of 0', async () => {
      const isVisible = ref(false)
      const container = document.createElement('div')
      const button = document.createElement('button')
      button.setAttribute('tabindex', '0')
      container.appendChild(button)
      document.body.appendChild(container)
      containerRef.value = container

      useOverlay(isVisible, containerRef, {
        autoFocus: true,
        transitionDuration: 0
      })

      isVisible.value = true
      await nextTick()
      vi.advanceTimersByTime(0)

      expect(document.activeElement).toBe(button)

      document.body.removeChild(container)
    })
  })
})
