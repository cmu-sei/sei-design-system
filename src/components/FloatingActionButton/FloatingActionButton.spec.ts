import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Component from './FloatingActionButton.vue'

describe('SdsFloatingActionButton', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>
  let containerEl: HTMLElement

  const defaultTabs = [
    { key: 'tab1', tabName: 'Tab 1', title: 'Active Tab 1', active: true },
    { key: 'tab2', tabName: 'Tab 2', title: 'Active Tab 2', active: false },
    { key: 'tab3', tabName: 'Tab 3', title: 'Active Tab 3', active: false }
  ]

  const mountComponent = async (props = {}) => {
    const component = mount(Component, {
      props: { modelValue: defaultTabs, ...props },
      attachTo: containerEl
    })
    await flushPromises()
    await nextTick()
    return component
  }

  beforeEach(async () => {
    containerEl = document.createElement('div')
    document.body.appendChild(containerEl)
    wrapper = await mountComponent()
  })

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  it('should match its default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render with default props', () => {
    const button = document.querySelector('button[aria-haspopup]')
    expect(button).toBeTruthy()
    expect(button?.classList.contains('btn-blue')).toBe(true)
    expect(button?.getAttribute('aria-expanded')).toBe('false')
  })

  describe('variant prop', () => {
    it('should apply blue button classes when variant is blue', async () => {
      await wrapper.setProps({ variant: 'blue' })
      await nextTick()
      const button = document.querySelector('button[aria-haspopup]')
      expect(button?.classList.contains('btn-blue')).toBe(true)
    })

    it('should apply red button classes when variant is red', async () => {
      await wrapper.setProps({ variant: 'red' })
      await nextTick()
      const button = document.querySelector('button[aria-haspopup]')
      expect(button?.classList.contains('btn-red')).toBe(true)
    })
  })

  describe('showIndicator prop', () => {
    it('should show indicator when showIndicator is true', async () => {
      await wrapper.setProps({ showIndicator: true })
      await nextTick()
      const indicator = document.querySelector('[role="status"]')
      expect(indicator).toBeTruthy()
      expect(indicator?.classList.contains('bg-blue-600')).toBe(true)
    })

    it('should hide indicator when showIndicator is false', async () => {
      await wrapper.setProps({ showIndicator: false })
      await nextTick()
      const indicator = document.querySelector('[role="status"]')
      expect(indicator).toBeFalsy()
    })
  })

  describe('button interaction', () => {
    it('should toggle open state when trigger button is clicked', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      expect(button.getAttribute('aria-expanded')).toBe('false')

      button.click()
      await nextTick()
      expect(button.getAttribute('aria-expanded')).toBe('true')

      button.click()
      await nextTick()
      expect(button.getAttribute('aria-expanded')).toBe('false')
    })

    it('should update screen reader text based on open state', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      expect(button.querySelector('.sr-only')?.textContent).toBe('open')

      button.click()
      await nextTick()
      expect(button.querySelector('.sr-only')?.textContent).toBe('close')
    })
  })

  describe('modal dialog', () => {
    it('should display active tab title in modal header', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const header = document.querySelector('h2')
      expect(header?.textContent).toBe('Active Tab 1')
      expect(header?.classList.contains('uppercase')).toBe(true)
    })

    it('should apply correct header classes for blue variant', async () => {
      await wrapper.setProps({ variant: 'blue' })
      await nextTick()

      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const header = document.querySelector('.rounded-t-theme-lg')
      expect(header?.classList.contains('bg-blue-600')).toBe(true)
      expect(header?.classList.contains('text-white')).toBe(true)
    })

    it('should apply correct header classes for red variant', async () => {
      await wrapper.setProps({ variant: 'red' })
      await nextTick()

      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const header = document.querySelector('.rounded-t-theme-lg')
      expect(header?.classList.contains('bg-red-600')).toBe(true)
      expect(header?.classList.contains('text-white')).toBe(true)
    })

    it('should close modal when close button is clicked', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const closeButton = document.querySelector('[data-id="sds-action-button"]') as HTMLElement
      closeButton.click()
      await nextTick()

      expect(button.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('tab navigation', () => {
    it('should display tab navigation when multiple tabs exist', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const nav = document.querySelector('nav')
      expect(nav).toBeTruthy()
      expect(document.querySelectorAll('nav button').length).toBe(3)
    })

    it('should not display tab navigation with single tab', async () => {
      wrapper.unmount()
      containerEl.remove()
      document.body.innerHTML = ''

      containerEl = document.createElement('div')
      document.body.appendChild(containerEl)

      const singleTabWrapper = await mountComponent({
        modelValue: [{ key: 'tab1', tabName: 'Tab 1', title: 'Tab 1', active: true }]
      })

      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const nav = document.querySelector('nav')
      expect(nav).toBeFalsy()

      singleTabWrapper.unmount()
    })

    it('should switch active tab when tab button is clicked', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const header = document.querySelector('h2')
      expect(header?.textContent).toBe('Active Tab 1')

      const tabButtons = document.querySelectorAll('nav button')
      ;(tabButtons[1] as HTMLElement).click()
      await nextTick()

      expect(defaultTabs[0].active).toBe(false)
      expect(defaultTabs[1].active).toBe(true)
    })

    it('should display tab names', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const tabButtons = document.querySelectorAll('nav button')
      expect(tabButtons[0].textContent).toContain('Tab 1')
      expect(tabButtons[1].textContent).toContain('Tab 2')
      expect(tabButtons[2].textContent).toContain('Tab 3')
    })
  })

  describe('tab icons', () => {
    it('should display icon from iconSrc when provided', async () => {
      wrapper.unmount()
      containerEl.remove()
      document.body.innerHTML = ''

      containerEl = document.createElement('div')
      document.body.appendChild(containerEl)

      const tabsWithIcon = [
        { key: 'tab1', tabName: 'Tab 1', title: 'Tab 1', active: true, iconSrc: '/icon.png' },
        { key: 'tab2', tabName: 'Tab 2', title: 'Tab 2', active: false, iconSrc: '/icon2.png' }
      ]
      const iconWrapper = await mountComponent({ modelValue: tabsWithIcon })

      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()
      await flushPromises()

      const icon = document.querySelector('img[src="/icon.png"]')
      expect(icon).toBeTruthy()

      iconWrapper.unmount()
    })

    it('should not display icon container when no icon is provided', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const iconContainers = document.querySelectorAll('nav button .h-4.w-4')
      expect(iconContainers.length).toBe(0)
    })
  })

  describe('slots', () => {
    it('should render custom trigger icon slot', async () => {
      const wrapperWithSlot = mount(Component, {
        props: { modelValue: defaultTabs },
        slots: {
          'trigger-icon': '<span class="custom-trigger-icon">Custom Icon</span>'
        },
        attachTo: containerEl
      })
      await flushPromises()
      await nextTick()

      const customIcon = document.querySelector('.custom-trigger-icon')
      expect(customIcon).toBeTruthy()
      expect(customIcon?.textContent).toBe('Custom Icon')

      wrapperWithSlot.unmount()
    })
  })

  describe('accessibility', () => {
    it('should have role="dialog" on modal', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const modal = document.querySelector('[role="dialog"]')
      expect(modal).toBeTruthy()
    })

    it('should have aria-orientation="vertical" on modal', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const modal = document.querySelector('[role="dialog"]')
      expect(modal?.getAttribute('aria-orientation')).toBe('vertical')
    })

    it('should have unique id on trigger button', () => {
      const button = document.querySelector('button[aria-haspopup]')
      expect(button?.getAttribute('id')).toBeTruthy()
    })

    it('should link modal to trigger button via aria-labelledby', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      const buttonId = button.getAttribute('id')

      button.click()
      await nextTick()

      const modal = document.querySelector('[role="dialog"]')
      expect(modal?.getAttribute('aria-labelledby')).toBe(buttonId)
    })
  })

  describe('activeTab behavior', () => {
    it('should update displayed title when active tab changes', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      const tabButtons = document.querySelectorAll('nav button')
      ;(tabButtons[2] as HTMLElement).click()
      await nextTick()

      const header = document.querySelector('h2')
      expect(header?.textContent).toBe('Active Tab 3')
      expect(header?.classList.contains('uppercase')).toBe(true)
    })

    it('should handle no active tab gracefully', async () => {
      const tabsWithoutActive = [
        { key: 'tab1', tabName: 'Tab 1', title: 'Tab 1', active: false },
        { key: 'tab2', tabName: 'Tab 2', title: 'Tab 2', active: false }
      ]

      await wrapper.setProps({ modelValue: tabsWithoutActive })
      await nextTick()

      expect(document.body.innerHTML).toBeTruthy()
    })
  })

  describe('edge cases', () => {
    it('should handle empty tabs array', async () => {
      const emptyWrapper = mount(Component, {
        props: { modelValue: [] },
        attachTo: containerEl
      })
      await flushPromises()
      await nextTick()

      expect(document.body.innerHTML).toBeTruthy()

      emptyWrapper.unmount()
    })

    it('should handle numeric tab keys', async () => {
      wrapper.unmount()
      containerEl.remove()
      document.body.innerHTML = ''

      containerEl = document.createElement('div')
      document.body.appendChild(containerEl)

      const numericTabs = [
        { key: 1, tabName: 'Tab 1', title: 'Tab 1', active: true },
        { key: 2, tabName: 'Tab 2', title: 'Tab 2', active: false }
      ]
      const numericWrapper = await mountComponent({ modelValue: numericTabs })

      const button = document.querySelector('button[aria-haspopup]') as HTMLElement
      button.click()
      await nextTick()

      expect(document.querySelectorAll('nav button').length).toBe(2)

      numericWrapper.unmount()
    })

    it('should maintain tab state across open/close cycles', async () => {
      const button = document.querySelector('button[aria-haspopup]') as HTMLElement

      button.click()
      await nextTick()
      const tabButtons = document.querySelectorAll('nav button')
      ;(tabButtons[1] as HTMLElement).click()
      await nextTick()

      button.click()
      await nextTick()

      button.click()
      await nextTick()

      const header = document.querySelector('h2')
      expect(header?.textContent).toBe('Active Tab 2')
    })
  })
})
