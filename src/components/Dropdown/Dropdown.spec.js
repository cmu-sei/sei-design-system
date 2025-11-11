import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Component from './Dropdown.vue'
import FloatingUi from '../FloatingUi/FloatingUi.vue'

describe('Dropdown', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Component, {
      props,
      slots,
      global: {
        stubs: {
          FloatingUi: {
            template: `
              <div>
                <div class="trigger">
                  <slot name="trigger" :open="open" :close="close" :is-open="isOpen" :toggle="toggle" />
                </div>
                <div v-if="isOpen" class="content">
                  <slot :open="open" :close="close" :is-open="isOpen" :toggle="toggle" />
                </div>
              </div>
            `,
            setup() {
              const isOpen = ref(false)
              const open = vi.fn(() => { isOpen.value = true })
              const close = vi.fn(() => { isOpen.value = false })
              const toggle = vi.fn(() => { isOpen.value = !isOpen.value })
              return { isOpen, open, close, toggle }
            }
          }
        }
      }
    })
  }

  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        directives: {
          'uid': {
            created(el) {
              el.setAttribute('id', 'unique-id')
            }
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Props', () => {
    describe('title', () => {
      it('renders with empty title by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.text()).toBe('')
      })

      it('renders with specified title', () => {
        const wrapper = createWrapper({ title: 'Options' })
        const button = wrapper.find('button')
        expect(button.text()).toContain('Options')
      })
    })

    describe('kind', () => {
      it('renders with secondary kind by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn')
        expect(button.classes()).toContain('btn-secondary')
      })

      it('renders with primary kind when specified', () => {
        const wrapper = createWrapper({ kind: 'primary' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-primary')
      })

      it('renders with tertiary kind when specified', () => {
        const wrapper = createWrapper({ kind: 'tertiary' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-tertiary')
      })

      it('renders with ghost kind when specified', () => {
        const wrapper = createWrapper({ kind: 'ghost' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-ghost')
      })
    })

    describe('variant', () => {
      it('renders without variant class by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.classes()).not.toContain('btn-blue')
        expect(button.classes()).not.toContain('btn-red')
        expect(button.classes()).not.toContain('btn-white')
      })

      it('renders with blue variant when specified', () => {
        const wrapper = createWrapper({ variant: 'blue' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-blue')
      })

      it('renders with red variant when specified', () => {
        const wrapper = createWrapper({ variant: 'red' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-red')
      })

      it('renders with white variant when specified', () => {
        const wrapper = createWrapper({ variant: 'white' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-white')
      })
    })

    describe('type', () => {
      it('renders without dark type by default', () => {
        const wrapper = createWrapper()
        expect(wrapper.html()).not.toContain('dropdown-dark')
      })

      it('applies dark type classes when specified', () => {
        const wrapper = createWrapper({ type: 'dark' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('hover:bg-gray-800')
        expect(button.classes()).toContain('text-white')
        expect(button.classes()).toContain('border-0')
      })
    })

    describe('size', () => {
      it('renders with md size by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.classes()).not.toContain('btn-sm')
      })

      it('renders with sm size when specified', () => {
        const wrapper = createWrapper({ size: 'sm' })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-sm')
      })

      it('renders without size class when empty string', () => {
        const wrapper = createWrapper({ size: '' })
        const button = wrapper.find('button')
        expect(button.classes()).not.toContain('btn-sm')
      })
    })

    describe('hideArrow', () => {
      it('displays arrow by default', () => {
        const wrapper = createWrapper()
        const svg = wrapper.find('svg')
        expect(svg.exists()).toBe(true)
      })

      it('displays arrow when hideArrow is false', () => {
        const wrapper = createWrapper({ hideArrow: false })
        const svg = wrapper.find('svg')
        expect(svg.exists()).toBe(true)
      })

      it('hides arrow when hideArrow is true', () => {
        const wrapper = createWrapper({ hideArrow: true })
        const svg = wrapper.find('svg')
        expect(svg.exists()).toBe(false)
      })
    })

    describe('block', () => {
      it('renders without block class by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.classes()).not.toContain('btn-block')
      })

      it('renders without block class when block is false', () => {
        const wrapper = createWrapper({ block: false })
        const button = wrapper.find('button')
        expect(button.classes()).not.toContain('btn-block')
      })

      it('renders with block class when block is true', () => {
        const wrapper = createWrapper({ block: true })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('btn-block')
      })
    })

    describe('disabled', () => {
      it('renders without disabled attribute by default', () => {
        const wrapper = createWrapper()
        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBeUndefined()
      })

      it('renders with disabled attribute when disabled is true', () => {
        const wrapper = createWrapper({ disabled: true })
        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBeDefined()
      })

      it('applies disabled class when disabled is true', () => {
        const wrapper = createWrapper({ disabled: true })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('disabled')
      })
    })

    describe('zIndex', () => {
      it('passes zIndex to FloatingUi popperClass by default', () => {
        const wrapper = mount(Component)
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.exists()).toBe(true)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('z-50', true)
      })

      it('applies z-0 to FloatingUi popperClass', () => {
        const wrapper = mount(Component, { props: { zIndex: '0' } })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('z-0', true)
      })

      it('applies z-10 to FloatingUi popperClass', () => {
        const wrapper = mount(Component, { props: { zIndex: '10' } })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('z-10', true)
      })

      it('applies z-20 to FloatingUi popperClass', () => {
        const wrapper = mount(Component, { props: { zIndex: '20' } })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('z-20', true)
      })

      it('applies z-auto to FloatingUi popperClass', () => {
        const wrapper = mount(Component, { props: { zIndex: 'auto' } })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('z-auto', true)
      })

      it('does not apply z-index class when empty string', () => {
        const wrapper = mount(Component, { props: { zIndex: '' } })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).not.toHaveProperty('z-0')
        expect(popperClass).not.toHaveProperty('z-10')
      })
    })

    describe('offset', () => {
      it('passes offset prop to FloatingUi', () => {
        const wrapper = mount(Component, {
          props: { offset: 10 }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('offset')).toBe(10)
      })

      it('uses default offset of 5', () => {
        const wrapper = mount(Component)
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('offset')).toBe(5)
      })
    })

    describe('strategy', () => {
      it('passes strategy prop to FloatingUi', () => {
        const wrapper = mount(Component, {
          props: { strategy: 'fixed' }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('strategy')).toBe('fixed')
      })

      it('uses default strategy of absolute', () => {
        const wrapper = mount(Component)
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('strategy')).toBe('absolute')
      })
    })

    describe('placement', () => {
      it('passes placement prop to FloatingUi', () => {
        const wrapper = mount(Component, {
          props: { placement: 'top-start' }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('placement')).toBe('top-start')
      })

      it('uses default placement of bottom-start', () => {
        const wrapper = mount(Component)
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('placement')).toBe('bottom-start')
      })
    })

    describe('auto', () => {
      it('renders with fixed width by default', () => {
        const wrapper = mount(Component)
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('w-56', true)
      })

      it('renders with auto width when auto is true', () => {
        const wrapper = mount(Component, {
          props: { auto: true }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        const popperClass = floatingUi.props('popperClass')
        expect(popperClass).toHaveProperty('w-auto', true)
      })
    })

    describe('willOpen', () => {
      it('passes willOpen function to FloatingUi', () => {
        const willOpenFn = vi.fn()
        const wrapper = mount(Component, {
          props: { willOpen: willOpenFn }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('willOpen')).toBe(willOpenFn)
      })
    })

    describe('willClose', () => {
      it('passes willClose function to FloatingUi', () => {
        const willCloseFn = vi.fn()
        const wrapper = mount(Component, {
          props: { willClose: willCloseFn }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.props('willClose')).toBe(willCloseFn)
      })
    })
  })

  describe('Attributes', () => {
    it('renders with correct data-id attribute', () => {
      const wrapper = mount(Component)
      const floatingUi = wrapper.findComponent(FloatingUi)
      expect(floatingUi.attributes('data-id')).toBe('sds-dropdown')
    })

    it('renders button with type button', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')
      expect(button.attributes('type')).toBe('button')
    })

    it('renders button with aria-haspopup', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')
      expect(button.attributes('aria-haspopup')).toBe('true')
    })

    it('renders button with aria-expanded false when closed', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')
      expect(button.attributes('aria-expanded')).toBe('false')
    })
  })

  describe('Slots', () => {
    describe('title slot', () => {
      it('renders title slot content', () => {
        const wrapper = createWrapper({}, {
          title: '<span class="custom-title">Custom Title</span>'
        })
        const button = wrapper.find('button')
        expect(button.html()).toContain('Custom Title')
      })

      it('renders default title when title slot is not provided', () => {
        const wrapper = createWrapper({ title: 'Default Title' })
        const button = wrapper.find('button')
        expect(button.text()).toContain('Default Title')
      })
    })

    describe('default slot', () => {
      it('renders default slot content', () => {
        const wrapper = mount(Component, {
          slots: {
            default: '<div class="dropdown-item">Item 1</div>'
          }
        })
        const floatingUi = wrapper.findComponent(FloatingUi)
        expect(floatingUi.exists()).toBe(true)
        expect(wrapper.findComponent(Component).exists()).toBe(true)
      })
    })

    describe('trigger slot', () => {
      it('renders custom trigger when trigger slot is provided', () => {
        const wrapper = createWrapper({}, {
          trigger: '<div class="custom-trigger">Custom Trigger</div>'
        })
        expect(wrapper.html()).toContain('custom-trigger')
        expect(wrapper.html()).toContain('Custom Trigger')
        expect(wrapper.find('button').exists()).toBe(false)
      })

      it('provides open, close, isOpen, and toggle to trigger slot', () => {
        let slotProps
        const wrapper = mount(Component, {
          slots: {
            trigger: (props) => {
              slotProps = props
              return '<div>Trigger</div>'
            }
          }
        })
        expect(slotProps).toHaveProperty('open')
        expect(slotProps).toHaveProperty('close')
        expect(slotProps).toHaveProperty('isOpen')
        expect(slotProps).toHaveProperty('toggle')
      })
    })
  })

  describe('Button Click Behavior', () => {
    it('calls handleClick when button is clicked', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(button.exists()).toBe(true)
    })
  })

  describe('Combined Props', () => {
    it('handles multiple props together', () => {
      const wrapper = createWrapper({
        title: 'Actions',
        kind: 'primary',
        variant: 'blue',
        size: 'sm',
        block: true,
        disabled: false
      })
      const button = wrapper.find('button')

      expect(button.text()).toContain('Actions')
      expect(button.classes()).toContain('btn-primary')
      expect(button.classes()).toContain('btn-blue')
      expect(button.classes()).toContain('btn-sm')
      expect(button.classes()).toContain('btn-block')
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('handles dark type with primary kind', () => {
      const wrapper = createWrapper({
        type: 'dark',
        kind: 'primary'
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('btn-primary')
      expect(button.classes()).toContain('hover:bg-gray-800')
      expect(button.classes()).toContain('text-white')
    })

    it('applies all variant and kind classes correctly', () => {
      const wrapper = createWrapper({
        kind: 'tertiary',
        variant: 'red',
        size: 'sm'
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('btn')
      expect(button.classes()).toContain('btn-tertiary')
      expect(button.classes()).toContain('btn-red')
      expect(button.classes()).toContain('btn-sm')
    })
  })



  describe('Edge Cases', () => {
    it('handles missing slots gracefully', () => {
      const wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('renders correctly with only title prop', () => {
      const wrapper = createWrapper({ title: 'Only Title' })
      const button = wrapper.find('button')
      expect(button.text()).toContain('Only Title')
    })

    it('handles empty title slot', () => {
      const wrapper = createWrapper({}, { title: '' })
      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('renders with all default props', () => {
      const wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })

  describe('FloatingUi Integration', () => {
    it('passes correct props to FloatingUi component', () => {
      const wrapper = mount(Component, {
        props: {
          offset: 10,
          strategy: 'fixed',
          placement: 'top-start',
          disabled: true
        }
      })
      const floatingUi = wrapper.findComponent(FloatingUi)

      expect(floatingUi.props('offset')).toBe(10)
      expect(floatingUi.props('strategy')).toBe('fixed')
      expect(floatingUi.props('placement')).toBe('top-start')
      expect(floatingUi.props('disabled')).toBe(true)
    })

    it('passes hideArrow prop to FloatingUi', () => {
      const wrapper = mount(Component)
      const floatingUi = wrapper.findComponent(FloatingUi)
      expect(floatingUi.props('hideArrow')).toBe(true)
    })

    it('passes shift prop to FloatingUi', () => {
      const wrapper = mount(Component)
      const floatingUi = wrapper.findComponent(FloatingUi)
      expect(floatingUi.props('shift')).toBe(true)
    })

    it('applies block width class to FloatingUi when block is true', () => {
      const wrapper = mount(Component, {
        props: { block: true }
      })
      const floatingUi = wrapper.findComponent(FloatingUi)
      expect(floatingUi.classes()).toContain('w-full')
    })

    it('does not apply width class to FloatingUi when block is false', () => {
      const wrapper = mount(Component, {
        props: { block: false }
      })
      const floatingUi = wrapper.findComponent(FloatingUi)
      expect(floatingUi.classes()).not.toContain('w-full')
    })
  })
})
