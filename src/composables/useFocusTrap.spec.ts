import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useFocusTrap, FOCUSABLE_SELECTOR } from './useFocusTrap'

describe('useFocusTrap', () => {
  let container: HTMLDivElement
  let button1: HTMLButtonElement
  let button2: HTMLButtonElement
  let button3: HTMLButtonElement

  beforeEach(() => {
    // Create a test container with focusable elements
    container = document.createElement('div')
    button1 = document.createElement('button')
    button1.textContent = 'Button 1'
    button2 = document.createElement('button')
    button2.textContent = 'Button 2'
    button3 = document.createElement('button')
    button3.textContent = 'Button 3'

    container.appendChild(button1)
    container.appendChild(button2)
    container.appendChild(button3)
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('initialization', () => {
    it('should create focus trap with default options', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus, focusableElements } = useFocusTrap(containerRef)

      expect(trapFocus).toBeInstanceOf(Function)
      expect(focusableElements.value).toHaveLength(3)
      expect(focusableElements.value).toEqual([button1, button2, button3])
    })

    it('should return empty array when container is null', () => {
      const containerRef = ref<HTMLElement | null>(null)
      const { focusableElements } = useFocusTrap(containerRef)

      expect(focusableElements.value).toEqual([])
    })

    it('should update focusable elements when container ref changes', async () => {
      const containerRef = ref<HTMLElement | null>(null)
      const { focusableElements } = useFocusTrap(containerRef)

      expect(focusableElements.value).toEqual([])

      containerRef.value = container
      await nextTick()

      expect(focusableElements.value).toHaveLength(3)
    })
  })

  describe('FOCUSABLE_SELECTOR', () => {
    it('should export the standard focusable selector', () => {
      expect(FOCUSABLE_SELECTOR).toBe('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    })

    it('should find all interactive elements', () => {
      const testContainer = document.createElement('div')
      testContainer.innerHTML = `
        <button>Button</button>
        <a href="#link">Link</a>
        <input type="text" />
        <select><option>Option</option></select>
        <textarea></textarea>
        <div tabindex="0">Focusable div</div>
        <div tabindex="-1">Not focusable</div>
        <span>Not focusable</span>
      `
      document.body.appendChild(testContainer)

      const elements = testContainer.querySelectorAll(FOCUSABLE_SELECTOR)
      expect(elements).toHaveLength(6) // button, link, input, select, textarea, div[tabindex="0"]

      document.body.removeChild(testContainer)
    })
  })

  describe('Tab key handling', () => {
    it('should trap Tab on last element to first element', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      button3.focus()
      expect(document.activeElement).toBe(button3)

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(document.activeElement).toBe(button1)
    })

    it('should trap Shift+Tab on first element to last element', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      button1.focus()
      expect(document.activeElement).toBe(button1)

      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(document.activeElement).toBe(button3)
    })

    it('should allow normal Tab navigation on middle elements', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      button2.focus()
      expect(document.activeElement).toBe(button2)

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      // Should not prevent default on middle elements
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should handle single focusable element', () => {
      const singleContainer = document.createElement('div')
      const singleButton = document.createElement('button')
      singleContainer.appendChild(singleButton)
      document.body.appendChild(singleContainer)

      const containerRef = ref<HTMLElement | null>(singleContainer)
      const { trapFocus } = useFocusTrap(containerRef)

      singleButton.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(document.activeElement).toBe(singleButton)

      document.body.removeChild(singleContainer)
    })

    it('should prevent tabbing out when no focusable elements', () => {
      const emptyContainer = document.createElement('div')
      emptyContainer.innerHTML = '<span>No focusable elements</span>'
      document.body.appendChild(emptyContainer)

      const containerRef = ref<HTMLElement | null>(emptyContainer)
      const { trapFocus } = useFocusTrap(containerRef)

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()

      document.body.removeChild(emptyContainer)
    })
  })

  describe('enabled option', () => {
    it('should respect enabled boolean option', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef, { enabled: false })

      button3.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      // Should not trap focus when disabled
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should respect enabled ref option', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const isEnabled = ref(false)
      const { trapFocus } = useFocusTrap(containerRef, { enabled: isEnabled })

      button3.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()

      // Enable and try again
      isEnabled.value = true
      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should respect enabled getter function option', () => {
      const containerRef = ref<HTMLElement | null>(container)
      let isEnabled = false
      const { trapFocus } = useFocusTrap(containerRef, { enabled: () => isEnabled })

      button3.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()

      // Enable and try again
      isEnabled = true
      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('custom focusable selector', () => {
    it('should use custom selector to filter elements', () => {
      const customContainer = document.createElement('div')
      customContainer.innerHTML = `
        <button data-focusable>Button 1</button>
        <button>Button 2</button>
        <button data-focusable>Button 3</button>
      `
      document.body.appendChild(customContainer)

      const containerRef = ref<HTMLElement | null>(customContainer)
      const { focusableElements } = useFocusTrap(containerRef, {
        focusableSelector: 'button[data-focusable]'
      })

      expect(focusableElements.value).toHaveLength(2)

      document.body.removeChild(customContainer)
    })
  })

  describe('Escape key handling', () => {
    it('should not handle Escape by default', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      // Should not handle Escape without handleEscape option
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should handle Escape when handleEscape is true', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const onEscape = vi.fn()
      const { trapFocus } = useFocusTrap(containerRef, {
        handleEscape: true,
        onEscape
      })

      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      trapFocus(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(onEscape).toHaveBeenCalled()
    })

    it('should not call onEscape if handleEscape is false', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const onEscape = vi.fn()
      const { trapFocus } = useFocusTrap(containerRef, {
        handleEscape: false,
        onEscape
      })

      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })

      trapFocus(event)

      expect(onEscape).not.toHaveBeenCalled()
    })
  })

  describe('non-Tab key handling', () => {
    it('should ignore other keys', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      const keys = ['Enter', 'Space', 'ArrowUp', 'ArrowDown', 'a', 'A', '1']

      keys.forEach(key => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true })
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        trapFocus(event)

        expect(preventDefaultSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('WCAG 2.1 compliance', () => {
    it('should maintain focus within container (2.1.2 No Keyboard Trap)', () => {
      const containerRef = ref<HTMLElement | null>(container)
      const { trapFocus } = useFocusTrap(containerRef)

      // Simulate complete Tab cycle
      button1.focus()
      const tab1 = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      trapFocus(tab1) // Should allow normal tab to button2

      button2.focus()
      const tab2 = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      trapFocus(tab2) // Should allow normal tab to button3

      button3.focus()
      const tab3 = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      trapFocus(tab3) // Should cycle back to button1
      expect(document.activeElement).toBe(button1)

      // Now reverse with Shift+Tab
      const shiftTab1 = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
      trapFocus(shiftTab1) // Should cycle to button3
      expect(document.activeElement).toBe(button3)
    })
  })
})
