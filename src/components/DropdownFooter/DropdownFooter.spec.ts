import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './DropdownFooter.vue'

describe('DropdownFooter', () => {
  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<button>Action</button>'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should match snapshot with divider', () => {
      const wrapper = mount(Component, {
        props: {
          divider: true
        },
        slots: {
          default: '<button>Action</button>'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Props', () => {
    it('does not show divider by default', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<button>Action</button>'
        }
      })

      expect(wrapper.classes()).not.toContain('border-t')
    })

    it('shows divider when divider prop is true', () => {
      const wrapper = mount(Component, {
        props: {
          divider: true
        },
        slots: {
          default: '<button>Action</button>'
        }
      })

      expect(wrapper.classes()).toContain('border-t')
    })

    it('applies correct base classes', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<button>Action</button>'
        }
      })

      expect(wrapper.classes()).toContain('px-4')
      expect(wrapper.classes()).toContain('pt-2.5')
      expect(wrapper.classes()).toContain('pb-2')
      expect(wrapper.classes()).toContain('space-y-2')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<button class="test-button">Test Button</button>'
        }
      })

      expect(wrapper.find('.test-button').exists()).toBe(true)
      expect(wrapper.html()).toContain('Test Button')
    })

    it('renders multiple buttons in default slot', () => {
      const wrapper = mount(Component, {
        slots: {
          default: `
            <button>Apply</button>
            <button>Cancel</button>
          `
        }
      })

      expect(wrapper.html()).toContain('Apply')
      expect(wrapper.html()).toContain('Cancel')
    })

    it('renders complex content', () => {
      const wrapper = mount(Component, {
        slots: {
          default: `
            <div class="custom-content">
              <button>Primary</button>
              <button>Secondary</button>
              <a href="#">Link</a>
            </div>
          `
        }
      })

      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.html()).toContain('Primary')
      expect(wrapper.html()).toContain('Secondary')
      expect(wrapper.html()).toContain('Link')
    })
  })
})
