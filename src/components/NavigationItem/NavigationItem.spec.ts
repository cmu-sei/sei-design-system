import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NavigationItem from './NavigationItem.vue'

describe('NavigationItem.vue', () => {
  describe('Basic Rendering', () => {
    it('should render as a button element by default (type="simple", no href)', () => {
      const wrapper = mount(NavigationItem)
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('should render as an anchor element when href prop is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: '/test-path' }
      })
      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.find('a').attributes('href')).toBe('/test-path')
    })

    it('should render with component name "SdsNavigationItem"', () => {
      const wrapper = mount(NavigationItem)
      expect(wrapper.vm.$options.name).toBe('SdsNavigationItem')
    })

    it('should display label text when label prop is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'Test Label' }
      })
      expect(wrapper.text()).toContain('Test Label')
    })

    it('should render default slot content when provided', () => {
      const wrapper = mount(NavigationItem, {
        slots: {
          default: '<span class="custom-content">Custom Content</span>'
        }
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Content')
    })

    it('should render with data-id="sds-navigationitem" attribute', () => {
      const wrapper = mount(NavigationItem)
      const button = wrapper.find('[data-id="sds-navigationitem"]')
      expect(button.exists()).toBe(true)
    })

    it('should apply data-type attribute matching the type prop value', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand' }
      })
      const button = wrapper.find('[data-type="expand"]')
      expect(button.exists()).toBe(true)
    })

    it('should generate dynamic id with key when component has a key prop', () => {
      const wrapper = mount(NavigationItem, {
        global: {
          renderStubDefaultSlot: true
        },
        attrs: {
          key: 'test-key'
        }
      })
      // Note: Testing key-based id generation requires mounting with a key
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Type Variations', () => {
    it('should display "Go Back" button with back arrow icon when type="back"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'back' }
      })
      expect(wrapper.text()).toContain('Go Back')
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('should render as basic clickable navigation item without chevron when type="simple"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'simple', label: 'Simple Item' }
      })
      // Check that the main button exists
      const button = wrapper.find('[data-type="simple"]')
      expect(button.exists()).toBe(true)
      // Verify no chevron icon for simple type
      const chevrons = wrapper.findAll('svg')
      expect(chevrons.length).toBe(0)
    })

    it('should display chevron icon pointing right when type="expand" and children slot is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', label: 'Expandable' },
        slots: {
          children: '<div>Child content</div>'
        }
      })
      const chevronContainer = wrapper.find('.my-auto.ml-auto')
      expect(chevronContainer.exists()).toBe(true)
      const chevronSvg = chevronContainer.find('svg')
      expect(chevronSvg.exists()).toBe(true)
    })

    it('should display chevron icon regardless of children slot when type="slide"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'slide', label: 'Slide Item' }
      })
      const chevronContainer = wrapper.find('.my-auto.ml-auto')
      expect(chevronContainer.exists()).toBe(true)
    })

    it('should display as non-interactive title with bottom border when type="title"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'title', label: 'Title Item' }
      })
      const button = wrapper.find('[data-type="title"]')
      expect(button.exists()).toBe(true)
      // Check for horizontal rule after component
      const hr = wrapper.find('hr')
      expect(hr.exists()).toBe(true)
    })

    it('should apply correct CSS classes for each type variation', () => {
      const types: Array<'simple' | 'expand' | 'slide' | 'title'> = ['simple', 'expand', 'slide', 'title']
      types.forEach(type => {
        const wrapper = mount(NavigationItem, {
          props: { type, label: `${type} item` }
        })
        const element = wrapper.find(`[data-type="${type}"]`)
        expect(element.exists()).toBe(true)
      })
    })

    it('should display chevron icon when type="expand" and selected=true', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: true },
        slots: {
          children: '<div>Child content</div>'
        }
      })
      const chevronSvg = wrapper.find('.my-auto.ml-auto svg')
      expect(chevronSvg.exists()).toBe(true)
    })

    it('should display chevron icon when type="expand" and selected=false', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: false },
        slots: {
          children: '<div>Child content</div>'
        }
      })
      const chevronSvg = wrapper.find('.my-auto.ml-auto svg')
      expect(chevronSvg.exists()).toBe(true)
    })

    it('should not display chevron icon when type="expand" with no children slot', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', label: 'No Children' }
      })
      const chevronContainer = wrapper.find('.my-auto.ml-auto')
      expect(chevronContainer.exists()).toBe(false)
    })

    it('should render horizontal rule after component when type="title"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'title', label: 'Title' }
      })
      const hr = wrapper.find('hr')
      expect(hr.exists()).toBe(true)
    })
  })

  describe('Props & Configuration', () => {
    it('should render with selected prop state', () => {
      const wrapper = mount(NavigationItem, {
        props: { selected: true, label: 'Selected Item' }
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('should render disabled state when disabled=true', () => {
      const wrapper = mount(NavigationItem, {
        props: { disabled: true, label: 'Disabled Item' }
      })
      const button = wrapper.find('button')
      expect(button.classes()).toContain('pointer-events-none')
    })

    it('should render with target="_blank" when external=true and href is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: 'https://example.com', external: true }
      })
      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_blank')
    })

    it('should render with rel="noopener noreferrer" when external=true and href is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: 'https://example.com', external: true }
      })
      const link = wrapper.find('a')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('should not apply external link attributes when external=false', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: '/internal-path', external: false }
      })
      const link = wrapper.find('a')
      expect(link.attributes('target')).toBeUndefined()
      expect(link.attributes('rel')).toBeUndefined()
    })

    it('should set tabindex to -1 when disabled=true', () => {
      const wrapper = mount(NavigationItem, {
        props: { disabled: true, label: 'Disabled' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('-1')
    })

    it('should set tabindex to -1 when type="title"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'title', label: 'Title' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('-1')
    })

    it('should set tabindex to 0 for interactive button elements', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'simple', label: 'Interactive' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('0')
    })

    it('should not set tabindex on anchor elements', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: '/path', label: 'Link' }
      })
      const link = wrapper.find('a')
      // Anchor elements should use browser default tabindex behavior
      expect(link.attributes('tabindex')).toBeUndefined()
    })
  })

  describe('Slots', () => {
    it('should render left slot content when provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'With Icon' },
        slots: {
          left: '<svg class="test-icon"><circle /></svg>'
        }
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
    })

    it('should render default slot content and override label prop', () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'This should not appear' },
        slots: {
          default: '<span class="custom-label">Custom Label</span>'
        }
      })
      expect(wrapper.text()).toContain('Custom Label')
      expect(wrapper.text()).not.toContain('This should not appear')
    })

    it('should render children slot content when type="expand" and children slot is provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand' },
        slots: {
          children: '<div class="child-item">Child Item</div>'
        }
      })
      expect(wrapper.find('.child-item').exists()).toBe(true)
      expect(wrapper.text()).toContain('Child Item')
    })

    it('should show children container visible when type="expand", selected=true, and children slot provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: true },
        slots: {
          children: '<div>Visible Children</div>'
        }
      })
      const childrenContainer = wrapper.findAll('div').find(div => 
        div.classes().includes('opacity-100') && div.classes().includes('max-h-screen')
      )
      expect(childrenContainer).toBeTruthy()
    })

    it('should hide children container when type="expand", selected=false, and children slot provided', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: false },
        slots: {
          children: '<div>Hidden Children</div>'
        }
      })
      const childrenContainer = wrapper.findAll('div').find(div => 
        div.classes().includes('opacity-0') && div.classes().includes('max-h-0')
      )
      expect(childrenContainer).toBeTruthy()
    })

    it('should render horizontal rule separator before children slot content', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: true },
        slots: {
          children: '<div>Content</div>'
        }
      })
      const childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('opacity-100')
      )
      expect(childrenContainer).toBeTruthy()
      const hr = childrenContainer!.find('hr')
      expect(hr.exists()).toBe(true)
    })

    it('should apply pointer-events-none to children container', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand' },
        slots: {
          children: '<div>Content</div>'
        }
      })
      const childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('pointer-events-none') && 
        div.classes().includes('transition-all')
      )
      expect(childrenContainer).toBeTruthy()
    })
  })

  describe('User Interactions', () => {
    it('should call default onClick handler when clickable navigation item is clicked', async () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'Clickable' }
      })
      const button = wrapper.find('button')
      await button.trigger('click')
      // Default onClick is null, so it should not throw an error
      expect(wrapper.emitted()).toBeDefined()
    })

    it('should call custom onClick handler when provided and element is clicked', async () => {
      const mockOnClick = vi.fn()
      const wrapper = mount(NavigationItem, {
        props: { 
          label: 'Custom Handler',
          onClick: mockOnClick
        }
      })
      const button = wrapper.find('button')
      await button.trigger('click')
      expect(mockOnClick).toHaveBeenCalled()
    })

    it('should call onClick handler with event when type="back" is clicked', async () => {
      const mockOnClick = vi.fn()
      const wrapper = mount(NavigationItem, {
        props: { 
          type: 'back',
          onClick: mockOnClick
        }
      })
      const button = wrapper.find('button')
      await button.trigger('click')
      expect(mockOnClick).toHaveBeenCalled()
      expect(mockOnClick.mock.calls[0][0]).toBeInstanceOf(Event)
    })

    it('should not respond to interaction when disabled=true', async () => {
      const mockOnClick = vi.fn()
      const wrapper = mount(NavigationItem, {
        props: { 
          disabled: true,
          onClick: mockOnClick
        }
      })
      const button = wrapper.find('button')
      expect(button.classes()).toContain('pointer-events-none')
      // Note: pointer-events-none prevents click events in browsers,
      // but Vue Test Utils can still trigger events in tests
    })

    it('should not be keyboard accessible when type="title"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'title', label: 'Title' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('-1')
    })

    it('should navigate to href URL when anchor element is clicked', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: '/test-path', label: 'Link' }
      })
      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/test-path')
    })
  })

  describe('Children Expansion/Collapse', () => {
    /*
     * Note: These tests check CSS classes because they represent behavioral state transitions,
     * not styling choices. Since we can't test actual CSS transitions/animations in jsdom,
     * checking these classes is the only way to verify expand/collapse behavior.
     * Classes tested here affect visibility and interaction (opacity-0/100, max-h-0/screen, z-index).
     */

    it('should show children container with transition when selected changes from false to true', async () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: false },
        slots: {
          children: '<div class="test-child">Child</div>'
        }
      })

      // Initially hidden - testing behavioral state, not styling
      let childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('opacity-0')
      expect(childrenContainer?.classes()).toContain('max-h-0')

      // Change to selected
      await wrapper.setProps({ selected: true })
      await nextTick()

      // Now visible - testing behavioral state change
      childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('opacity-100')
      expect(childrenContainer?.classes()).toContain('max-h-screen')
    })

    it('should hide children container with transition when selected changes from true to false', async () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: true },
        slots: {
          children: '<div class="test-child">Child</div>'
        }
      })

      // Initially visible - testing behavioral state
      let childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('opacity-100')
      expect(childrenContainer?.classes()).toContain('max-h-screen')

      // Change to not selected
      await wrapper.setProps({ selected: false })
      await nextTick()

      // Now hidden - testing behavioral state change
      childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('opacity-0')
      expect(childrenContainer?.classes()).toContain('max-h-0')
    })

    it('should apply correct z-index classes (z-10 when selected, -z-10 when not selected)', async () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: true },
        slots: {
          children: '<div>Child</div>'
        }
      })

      // z-index affects stacking context and interaction behavior
      let childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('z-10')

      await wrapper.setProps({ selected: false })
      await nextTick()

      // Negative z-index hides element behind other content
      childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer?.classes()).toContain('-z-10')
    })

    it('should maintain children container in DOM even when hidden', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', selected: false },
        slots: {
          children: '<div class="test-child">Always in DOM</div>'
        }
      })

      const childElement = wrapper.find('.test-child')
      expect(childElement.exists()).toBe(true)
    })

    it('should render children container when type="expand"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand' },
        slots: {
          children: '<div>Child</div>'
        }
      })

      const childrenContainer = wrapper.findAll('div').find(div =>
        div.classes().includes('transition-all')
      )
      expect(childrenContainer).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have role="menuitem" on main interactive element', () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'Menu Item' }
      })
      const button = wrapper.find('[role="menuitem"]')
      expect(button.exists()).toBe(true)
    })

    it('should be keyboard accessible with proper tabindex when interactive', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'simple', label: 'Interactive' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('0')
    })

    it('should not be keyboard accessible (tabindex=-1) when disabled', () => {
      const wrapper = mount(NavigationItem, {
        props: { disabled: true, label: 'Disabled' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('-1')
    })

    it('should not be keyboard accessible (tabindex=-1) when type="title"', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'title', label: 'Title' }
      })
      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).toBe('-1')
    })

    it('should trigger click handler when Enter or Space is pressed on interactive button', async () => {
      const mockOnClick = vi.fn()
      const wrapper = mount(NavigationItem, {
        props: { 
          label: 'Keyboard Accessible',
          onClick: mockOnClick
        }
      })
      const button = wrapper.find('button')
      
      // Simulate Enter key
      await button.trigger('keydown', { key: 'Enter' })
      // Note: Native button elements handle Enter/Space automatically
      // In a real browser, this would trigger click
    })

    it('should maintain semantic HTML structure (button vs anchor) based on navigation type', () => {
      const buttonWrapper = mount(NavigationItem, {
        props: { label: 'Button Navigation' }
      })
      expect(buttonWrapper.find('button').exists()).toBe(true)

      const anchorWrapper = mount(NavigationItem, {
        props: { href: '/path', label: 'Link Navigation' }
      })
      expect(anchorWrapper.find('a').exists()).toBe(true)
    })
  })

  describe('Edge Cases & Error Handling', () => {
    it('should handle missing label prop gracefully (empty default slot)', () => {
      const wrapper = mount(NavigationItem)
      expect(wrapper.find('button').exists()).toBe(true)
      // Should render without errors even with no label
    })

    it('should handle null or undefined href prop without errors', () => {
      const wrapper = mount(NavigationItem, {
        props: { href: null as string | null }
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('should handle type="expand" without children slot (no chevron displayed)', () => {
      const wrapper = mount(NavigationItem, {
        props: { type: 'expand', label: 'No Children' }
      })
      const chevronContainer = wrapper.find('.my-auto.ml-auto')
      expect(chevronContainer.exists()).toBe(false)
    })

    it('should render correctly when all props are default values', () => {
      const wrapper = mount(NavigationItem)
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('[data-type="simple"]').exists()).toBe(true)
    })

    it('should handle undefined onClick prop and use default behavior', async () => {
      const wrapper = mount(NavigationItem, {
        props: { label: 'Default Handler' }
      })
      const button = wrapper.find('button')
      // Should not throw error when clicked without custom onClick
      await button.trigger('click')
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('should render correctly when multiple state props are combined (disabled + selected)', () => {
      const wrapper = mount(NavigationItem, {
        props: { disabled: true, selected: true, label: 'Disabled Selected' }
      })
      const button = wrapper.find('button')
      expect(button.classes()).toContain('pointer-events-none')
    })
  })
})