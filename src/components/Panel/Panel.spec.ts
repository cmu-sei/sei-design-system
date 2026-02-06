import { describe, expect, it, afterEach, beforeEach, afterAll, vi } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import Panel from './Panel.vue'
import { ref } from 'vue'

describe('Panel', () => {
  enableAutoUnmount(afterEach)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Clean up teleported elements between tests
    document.body.innerHTML = ''
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders panel when `modelValue` is true', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel-backdrop"]')).not.toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
  })

  it('does not render panel when `modelValue` is false', async () => {
    const model = ref(false)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel-backdrop"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')).toBeNull()
  })

  it('renders default slot content', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value
      },
      slots: {
        default: 'Default content',
        title: '',
        footer: ''
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
    expect(document.body.innerHTML).toContain('Default content')
  })

  it('renders title slot in header', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      props: {
        modelValue: model.value
      },
      slots: {
        default: '',
        title: 'My Title',
        footer: ''
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelectorAll('header')[0]).not.toBeNull()
    expect(document.body.innerHTML).toContain('My Title')
  })

  it('renders footer slot when provided', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
      },
      slots: {
        default: '',
        title: '',
        footer: 'Footer content'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelectorAll('footer')[0]).not.toBeNull()
    expect(document.body.innerHTML).toContain('Footer content')
  })

  it('applies correct size and side classes', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
        size: 'lg',
        side: 'left'
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')?.classList).toContain('max-w-lg')
    expect(document.querySelector('[data-id="sds-panel"]')?.classList).toContain('left-0')
  })

  it('applies correct size and bottom position classes', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
        size: 'md',
        side: 'bottom'
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    const panel = document.querySelector('[data-id="sds-panel"]')
    expect(panel).not.toBeNull()
    expect(panel?.classList).toContain('max-h-[60vh]')
    expect(panel?.classList).toContain('bottom-0')
    expect(panel?.classList).toContain('w-full')
    expect(panel?.classList).toContain('rounded-b-none')
  })

  it('applies correct max-height for all bottom panel sizes', async () => {
    const sizes = [
      { size: 'sm', expectedClass: 'max-h-[40vh]' },
      { size: 'md', expectedClass: 'max-h-[60vh]' },
      { size: 'lg', expectedClass: 'max-h-[75vh]' },
      { size: 'xl', expectedClass: 'max-h-[90vh]' }
    ] as const

    for (const { size, expectedClass } of sizes) {
      document.body.innerHTML = ''
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value,
          size,
          side: 'bottom'
        },
        slots: { default: '', title: '', footer: '' }
      })
      await wrapper.vm.$nextTick()
      const panel = document.querySelector('[data-id="sds-panel"]')
      expect(panel?.classList).toContain(expectedClass)
      wrapper.unmount()
    }
  })

  it('applies correct zIndex class for all valid `zIndex` prop values', () => {
    const zIndexes = ['0', '10', '20', '30', '40', '50', 'auto', ''] as const
    const expectedClasses = {
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      'auto': 'z-auto',
      '': ''
    }
    zIndexes.forEach(async (zIndex) => {
      document.body.innerHTML = ''
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value,
          zIndex
        },
        slots: { default: '', title: '', footer: '' }
      })
      await wrapper.vm.$nextTick()
      const panelBackdropEl = document.querySelector('[data-id="sds-panel-backdrop"]')
      expect(panelBackdropEl).not.toBeNull()
      if (expectedClasses[zIndex]) {
        expect(panelBackdropEl?.classList).toContain(expectedClasses[zIndex])
      } else {
        // If zIndex is empty string, no z-* class should be present
        expect(panelBackdropEl?.classList).not.toContain('z-')
      }
      wrapper.unmount()
    })
  })

  it('closes panel when Escape key is pressed', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: true
      },
      attrs: {
        'onUpdate:modelValue': (val: boolean) => {
          model.value = val
        }
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(model.value).toBe(false)
  })
  
  it('traps focus within panel when Tab/Shift+Tab is pressed', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value
      },
      slots: {
        default: `
          <button id="first">First</button>
          <button id="second">Second</button>
        `,
        title: '',
        footer: ''
      }
    })
    await wrapper.vm.$nextTick()
    const panel = document.querySelector('[data-id="sds-panel"]') as HTMLElement
    const focusableList = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = (focusableList[0] as HTMLElement)
    const lastFocusable = (focusableList[focusableList.length - 1] as HTMLElement)
    firstFocusable.focus()
    // Simulate Tab from last element
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    Object.defineProperty(tabEvent, 'target', { value: lastFocusable })
    panel.dispatchEvent(tabEvent)
    expect(document.activeElement).toBe(firstFocusable)
    // Simulate Shift+Tab from first element
    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
    Object.defineProperty(shiftTabEvent, 'target', { value: firstFocusable })
    panel.dispatchEvent(shiftTabEvent)
    expect(document.activeElement).toBe(lastFocusable)
  })

  describe('Accessibility (WCAG 2.1)', () => {
    it('has aria-modal="true" for screen readers', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: { default: '', title: 'My Panel', footer: '' }
      })
      await wrapper.vm.$nextTick()
      const panel = document.querySelector('[data-id="sds-panel"]')
      expect(panel?.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby when title slot is provided', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: {
          default: '',
          title: 'My Panel Title',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      const panel = document.querySelector('[data-id="sds-panel"]')
      const ariaLabelledBy = panel?.getAttribute('aria-labelledby')
      expect(ariaLabelledBy).toBeTruthy()
      const titleElement = document.getElementById(ariaLabelledBy!)
      expect(titleElement?.textContent).toContain('My Panel Title')
    })

    it('has aria-label fallback when no title slot is provided', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: {
          default: 'Content without title',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      const panel = document.querySelector('[data-id="sds-panel"]')
      expect(panel?.getAttribute('aria-label')).toBe('Panel')
      expect(panel?.getAttribute('aria-labelledby')).toBeNull()
    })

    it('has aria-describedby pointing to content when default slot is present', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: {
          default: 'Panel content description',
          title: 'Title',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      const panel = document.querySelector('[data-id="sds-panel"]')
      const ariaDescribedBy = panel?.getAttribute('aria-describedby')
      expect(ariaDescribedBy).toBeTruthy()
      expect(ariaDescribedBy).toMatch(/-content$/)
      const contentElement = document.getElementById(ariaDescribedBy!)
      expect(contentElement?.textContent).toContain('Panel content description')
    })

    it('close button has descriptive aria-label', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: { default: '', title: 'Test Panel', footer: '' }
      })
      await wrapper.vm.$nextTick()
      const closeButton = document.querySelector('[data-id="sds-panel"] header button[aria-label]')
      expect(closeButton?.getAttribute('aria-label')).toBe('Close panel')
    })

    it('restores focus to previously focused element when panel closes', async () => {
      // Create a button in the document to focus initially
      const triggerButton = document.createElement('button')
      triggerButton.id = 'trigger'
      triggerButton.textContent = 'Open Panel'
      triggerButton.tabIndex = 0  // Ensure it's focusable
      document.body.appendChild(triggerButton)
      
      // Mock focus to track calls BEFORE focusing
      const focusSpy = vi.spyOn(triggerButton, 'focus')
      
      triggerButton.focus()
      expect(document.activeElement).toBe(triggerButton)
      expect(focusSpy).toHaveBeenCalledTimes(1)

      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value,
          'onUpdate:modelValue': (val: boolean) => {
            model.value = val
          }
        },
        slots: {
          default: '<button id="inside">Inside Panel</button>',
          title: 'Test Panel',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      // Advance timers to complete transition
      vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()
      
      // Panel should be open and focus should move away from trigger
      const panel = document.querySelector('[data-id="sds-panel"]')
      expect(panel).not.toBeNull()
      expect(document.activeElement).not.toBe(triggerButton)

      // Count should still be 1 (only the initial focus)
      expect(focusSpy).toHaveBeenCalledTimes(1)

      // Close the panel
      await wrapper.setProps({ modelValue: false })
      await wrapper.vm.$nextTick()
      // Advance timers enough for close transition (150ms) + focus restoration (200ms)
      vi.advanceTimersByTime(400)
      await wrapper.vm.$nextTick()

      // Verify focus() was called again (focus restoration occurred)
      expect(focusSpy).toHaveBeenCalledTimes(2)
      
      // Cleanup
      triggerButton.remove()
    })

    it('focuses first interactive element (not close button) when panel opens', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: {
          default: `
            <input id="first-input" type="text" />
            <button id="submit">Submit</button>
          `,
          title: 'Test Panel',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      // Advance timers to complete transition and trigger @after-enter
      vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()

      // Should focus the first input, not the close button
      const firstInput = document.getElementById('first-input')
      expect(document.activeElement).toBe(firstInput)
    })

    it('main content area has tabindex="-1" for programmatic focus', async () => {
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value
        },
        slots: {
          default: 'Content',
          title: 'Test Panel',
          footer: ''
        }
      })
      await wrapper.vm.$nextTick()
      const mainContent = document.querySelector('[data-id="sds-panel"] main')
      expect(mainContent?.getAttribute('tabindex')).toBe('-1')
    })
  })
})
