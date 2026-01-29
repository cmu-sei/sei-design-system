import type { FilterByDropdownOption } from './FilterByDropdown.vue'
import { describe, expect, it, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import FilterByDropdown from './FilterByDropdown.vue'

describe('FilterByDropdown.vue', () => {
  // Test data fixtures
  const mockOptions: FilterByDropdownOption[] = [
    { id: 1, text: 'Option 1', selected: false },
    { id: 2, text: 'Option 2', selected: true },
    { id: 3, text: 'Option 3', selected: false },
    { id: 4, text: 'Option 4', selected: true }
  ]

  // Reusable component stubs
  const globalStubs = {
    SdsFloatingUi: {
      name: 'SdsFloatingUi',
      props: ['placement', 'popperClass'],
      template: `
        <div data-floating-ui>
          <div @click="handleClick">
            <slot name="trigger" :isOpen="isOpen" :toggle="toggle" />
          </div>
          <div data-id="dropdown-content">
            <slot :close="close" />
          </div>
        </div>
      `,
      setup() {
        const isOpen = ref(false)
        const toggle = () => {
          isOpen.value = !isOpen.value
        }
        const close = () => {
          isOpen.value = false
        }
        const handleClick = () => {
          toggle()
        }
        return { isOpen, toggle, close, handleClick }
      }
    },
    SdsActionButton: {
      name: 'SdsActionButton',
      props: ['id', 'kind', 'variant', 'size', 'active', 'disabled'],
      template: '<button data-id="sds-action-button" v-bind="$attrs"><slot /></button>'
    },
    SdsButton: {
      name: 'SdsButton',
      props: ['kind', 'size', 'block'],
      template: '<button data-id="sds-button" v-bind="$attrs"><slot /></button>'
    }
  }

  afterEach(() => {
    // Clean up any mounted components
    document.body.innerHTML = ''
  })

  const createWrapper = (props = {}, modelValue: FilterByDropdownOption[] | null = null) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    
    return mount(FilterByDropdown, {
      props: {
        ...(modelValue !== null && { modelValue }),
        ...props
      },
      attachTo: div,
      global: {
        stubs: globalStubs
      }
    })
  }

  describe('Props: Basic Rendering', () => {
    it('should render component with default props', () => {
      const wrapper = createWrapper()

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'SdsFilterByDropdown' }).exists()).toBe(true)
    })

    it('should render with custom title prop', () => {
      const customTitle = 'Custom Filter'
      const wrapper = createWrapper({ title: customTitle })

      expect(wrapper.text()).toContain(customTitle)
    })

    it('should render with custom title slot', () => {
      const customSlotContent = 'Custom Title Slot'
      const wrapper = mount(FilterByDropdown, {
        slots: {
          title: customSlotContent
        },
        global: {
          stubs: globalStubs
        }
      })

      expect(wrapper.text()).toContain(customSlotContent)
    })

    it('should render button with disabled state when disabled prop is true', () => {
      const wrapper = createWrapper({ disabled: true })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })

      expect(button.props('disabled')).toBe(true)
    })

    it('should not disable button when disabled prop is false', () => {
      const wrapper = createWrapper({ disabled: false })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })

      expect(button.props('disabled')).toBe(false)
    })
  })

  describe('Props: Kind Variants', () => {
    it('should apply kind="primary" variant correctly', () => {
      const wrapper = createWrapper({ kind: 'primary' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('kind')).toBe('primary')
    })

    it('should apply kind="secondary" variant correctly', () => {
      const wrapper = createWrapper({ kind: 'secondary' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('kind')).toBe('secondary')
    })

    it('should apply kind="ghost" variant correctly (default)', () => {
      const wrapper = createWrapper({ kind: 'ghost' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('kind')).toBe('ghost')
    })

    it('should use ghost as default kind when not specified', () => {
      const wrapper = createWrapper()
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('kind')).toBe('ghost')
    })
  })

  describe('Props: Color Variants', () => {
    it('should apply variant="gray" correctly (default)', () => {
      const wrapper = createWrapper({ variant: 'gray' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('variant')).toBe('gray')
    })

    it('should apply variant="blue" correctly', () => {
      const wrapper = createWrapper({ variant: 'blue' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('variant')).toBe('blue')
    })

    it('should use gray as default variant when not specified', () => {
      const wrapper = createWrapper()
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('variant')).toBe('gray')
    })
  })

  describe('Props: Size', () => {
    it('should apply size="xs" correctly', () => {
      const wrapper = createWrapper({ size: 'xs' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('size')).toBe('xs')
    })

    it('should apply size="sm" correctly (default)', () => {
      const wrapper = createWrapper({ size: 'sm' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('size')).toBe('sm')
    })

    it('should apply size="md" correctly', () => {
      const wrapper = createWrapper({ size: 'md' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('size')).toBe('md')
    })

    it('should apply size="lg" correctly', () => {
      const wrapper = createWrapper({ size: 'lg' })
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('size')).toBe('lg')
    })

    it('should use sm as default size when not specified', () => {
      const wrapper = createWrapper()
      const button = wrapper.findComponent({ name: 'SdsActionButton' })
      
      expect(button.props('size')).toBe('sm')
    })
  })

  describe('Props: Z-Index', () => {
    it('should apply z-0 class when zIndex="0"', () => {
      const wrapper = createWrapper({ zIndex: '0' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-0')
    })

    it('should apply z-10 class when zIndex="10"', () => {
      const wrapper = createWrapper({ zIndex: '10' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-10')
    })

    it('should apply z-20 class when zIndex="20"', () => {
      const wrapper = createWrapper({ zIndex: '20' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-20')
    })

    it('should apply z-30 class when zIndex="30"', () => {
      const wrapper = createWrapper({ zIndex: '30' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-30')
    })

    it('should apply z-40 class when zIndex="40"', () => {
      const wrapper = createWrapper({ zIndex: '40' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-40')
    })

    it('should apply z-50 class when zIndex="50" (default)', () => {
      const wrapper = createWrapper({ zIndex: '50' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-50')
    })

    it('should apply z-auto class when zIndex="auto"', () => {
      const wrapper = createWrapper({ zIndex: 'auto' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-auto')
    })

    it('should not apply z-index class when zIndex=""', () => {
      const wrapper = createWrapper({ zIndex: '' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).not.toMatch(/\bz-\d+\b/)
      expect(popperClass).not.toContain('z-auto')
    })

    it('should use z-50 as default zIndex when not specified', () => {
      const wrapper = createWrapper()
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      const popperClass = floatingUi.props('popperClass')
      
      expect(popperClass).toContain('z-50')
    })
  })

  describe('Props: Placement', () => {
    it('should apply placement="auto" correctly', () => {
      const wrapper = createWrapper({ placement: 'auto' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      
      expect(floatingUi.props('placement')).toBe('auto')
    })

    it('should apply placement="top" correctly', () => {
      const wrapper = createWrapper({ placement: 'top' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      
      expect(floatingUi.props('placement')).toBe('top')
    })

    it('should apply placement="right" correctly', () => {
      const wrapper = createWrapper({ placement: 'right' })
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      
      expect(floatingUi.props('placement')).toBe('right')
    })

    it('should use bottom-start as default placement when not specified', () => {
      const wrapper = createWrapper()
      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      
      expect(floatingUi.props('placement')).toBe('bottom-start')
    })
  })

  describe('Props: Enable Filter', () => {
    it('should accept enableFilter prop as true', () => {
      const wrapper = createWrapper({ enableFilter: true }, mockOptions)
      
      expect(wrapper.props('enableFilter')).toBe(true)
    })

    it('should accept enableFilter prop as false (default)', () => {
      const wrapper = createWrapper({ enableFilter: false }, mockOptions)
      
      expect(wrapper.props('enableFilter')).toBe(false)
    })

    it('should default enableFilter to false when not specified', () => {
      const wrapper = createWrapper({}, mockOptions)
      
      expect(wrapper.props('enableFilter')).toBe(false)
    })
  })

  describe('Props: Enable Sort Options', () => {
    it('should accept enableSortOptions prop as true', () => {
      const wrapper = createWrapper({ enableSortOptions: true }, mockOptions)
      
      expect(wrapper.props('enableSortOptions')).toBe(true)
    })

    it('should accept enableSortOptions prop as false (default)', () => {
      const wrapper = createWrapper({ enableSortOptions: false }, mockOptions)
      
      expect(wrapper.props('enableSortOptions')).toBe(false)
    })

    it('should default enableSortOptions to false when not specified', () => {
      const wrapper = createWrapper({}, mockOptions)
      
      expect(wrapper.props('enableSortOptions')).toBe(false)
    })
  })

  describe('Props: Count', () => {
    it('should show selected count when count prop is true', () => {
      const wrapper = createWrapper({ showCount: true }, mockOptions)
      
      // mockOptions has 2 selected items
      expect(wrapper.text()).toContain('(2)')
    })

    it('should not show selected count when count prop is false (default)', () => {
      const wrapper = createWrapper({ showCount: false }, mockOptions)
      
      // Should not show the count in parentheses
      expect(wrapper.text()).not.toMatch(/\(\d+\)/)
    })

    it('should update count display when selection changes', async () => {
      const options = [
        { id: 1, text: 'Option 1', selected: false },
        { id: 2, text: 'Option 2', selected: false }
      ]
      const wrapper = createWrapper({ showCount: true }, options)
      
      // Initially no selections
      expect(wrapper.text()).toContain('(0)')
      
      // Select one option
      await wrapper.setProps({ modelValue: [
        { id: 1, text: 'Option 1', selected: true },
        { id: 2, text: 'Option 2', selected: false }
      ]})
      
      expect(wrapper.text()).toContain('(1)')
    })
  })

  describe('Props: Title', () => {
    it('should display default title "Filter"', () => {
      const wrapper = createWrapper()
      
      expect(wrapper.text()).toContain('Filter')
    })

    it('should display custom title when provided', () => {
      const customTitle = 'My Custom Filter'
      const wrapper = createWrapper({ title: customTitle })
      
      expect(wrapper.text()).toContain(customTitle)
    })

    it('should concatenate title with count when count is enabled', () => {
      const customTitle = 'Status'
      const wrapper = createWrapper({ title: customTitle, showCount: true }, mockOptions)
      
      // Should show "Status (2)" since mockOptions has 2 selected
      expect(wrapper.text()).toContain(`${customTitle} (2)`)
    })
  })
})
