/* eslint-disable vue/one-component-per-file */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useClickOutside } from './useClickOutside'

const createTestComponent = (onClickOutsideFn: () => void) =>
  defineComponent({
    setup() {
      const targetRef = ref<HTMLElement>()
      useClickOutside(targetRef, onClickOutsideFn)
      return { targetRef }
    },
    template: '<div ref="targetRef"><button data-testid="inside">inside</button></div>'
  })

/**
 * VueUse onClickOutside uses two sequential window events:
 * 1. pointerdown - sets an internal shouldListen flag (true when the pointer
 *    started outside the target element)
 * 2. click       - calls the handler when shouldListen is true
 */
const simulateOutsideClick = () => {
  window.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }))
  window.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

describe('useClickOutside', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('when clicking outside the target element', () => {
    it('calls the handler when a click occurs outside the target', () => {
      const handler = vi.fn()
      const wrapper = mount(createTestComponent(handler), { attachTo: document.body })

      simulateOutsideClick()

      expect(handler).toHaveBeenCalledOnce()
      wrapper.unmount()
    })
  })

  describe('when clicking inside the target element', () => {
    it('does not call the handler when a click occurs inside the target', () => {
      const handler = vi.fn()
      const wrapper = mount(createTestComponent(handler), { attachTo: document.body })

      const button = wrapper.find('[data-testid="inside"]')
      button.element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }))
      button.element.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(handler).not.toHaveBeenCalled()
      wrapper.unmount()
    })
  })

  describe('options parameter', () => {
    it('passes options to onClickOutside when provided', () => {
      const handler = vi.fn()
      const TestComponent = defineComponent({
        setup() {
          const targetRef = ref<HTMLElement>()
          useClickOutside(targetRef, handler, { ignore: [] })
          return { targetRef }
        },
        template: '<div ref="targetRef"></div>'
      })
      const wrapper = mount(TestComponent, { attachTo: document.body })

      simulateOutsideClick()

      expect(handler).toHaveBeenCalledOnce()
      wrapper.unmount()
    })
  })

  describe('cleanup', () => {
    it('removes the event listener on component unmount', () => {
      const handler = vi.fn()
      const wrapper = mount(createTestComponent(handler), { attachTo: document.body })
      wrapper.unmount()

      simulateOutsideClick()

      expect(handler).not.toHaveBeenCalled()
    })
  })
})
