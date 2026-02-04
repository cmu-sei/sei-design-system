import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Badge.vue'

describe('Badge', () => {
  const variants = ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green'] as const
  const types = ['light-border', 'light', 'medium', 'dark'] as const

  describe('rendering', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Badge' },
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Badge')
    })

    it('should render with data-id and role attributes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Test Badge' },
      })
      expect(wrapper.find('[data-id="sds-badge"]').exists()).toBe(true)
      expect(wrapper.find('[role="status"]').exists()).toBe(true)
    })

    it('should render slot content correctly', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Custom Badge Text' },
      })
      expect(wrapper.text()).toEqual('Custom Badge Text')
    })

    it('should render HTML content in slot', () => {
      const wrapper = mount(Component, {
        slots: { default: '<span class="test-icon">Icon</span> Badge' },
      })
      expect(wrapper.find('.test-icon').exists()).toBe(true)
      expect(wrapper.text()).toContain('Icon Badge')
    })

    it('should handle empty slot content', () => {
      const wrapper = mount(Component)
      expect(wrapper.find('[data-id="sds-badge"]').exists()).toBe(true)
    })
  })

  describe('variants with default type', () => {
    variants.forEach(variant => {
      it(`should match ${variant} variant snapshot`, () => {
        const wrapper = mount(Component, {
          slots: { default: `Badge ${variant}` },
          props: { variant }
        })
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.text()).toEqual(`Badge ${variant}`)
      })
    })
  })

  describe('types with default variant', () => {
    types.forEach(type => {
      it(`should match ${type} type snapshot`, () => {
        const wrapper = mount(Component, {
          slots: { default: `Badge ${type}` },
          props: { type }
        })
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.text()).toEqual(`Badge ${type}`)
      })
    })
  })

  describe('variant and type combinations', () => {
    const combinations = [
      // Blue combinations
      { variant: 'blue', type: 'light-border', expectedClasses: ['bg-blue-25', 'text-blue-700', 'border-current'] },
      { variant: 'blue', type: 'light', expectedClasses: ['bg-blue-25', 'text-blue-700', 'border-blue-25'] },
      { variant: 'blue', type: 'medium', expectedClasses: ['bg-blue-500', 'text-white', 'border-blue-500'] },
      { variant: 'blue', type: 'dark', expectedClasses: ['bg-blue-700', 'text-white', 'border-blue-700'] },

      // Green combinations
      { variant: 'green', type: 'light-border', expectedClasses: ['bg-green-25', 'text-green-700'] },
      { variant: 'green', type: 'dark', expectedClasses: ['bg-green-700', 'text-white'] },

      // Teal combinations
      { variant: 'teal', type: 'light-border', expectedClasses: ['bg-teal-25', 'text-teal-700'] },
      { variant: 'teal', type: 'dark', expectedClasses: ['bg-teal-700', 'text-white'] },

      // Orange combinations
      { variant: 'orange', type: 'light-border', expectedClasses: ['bg-orange-25', 'text-orange-900'] },
      { variant: 'orange', type: 'dark', expectedClasses: ['bg-orange-500', 'text-white'] },

      // Red combinations
      { variant: 'red', type: 'light-border', expectedClasses: ['bg-red-25', 'text-red-600'] },
      { variant: 'red', type: 'dark', expectedClasses: ['bg-red-700', 'text-white'] },

      // Tan combinations
      { variant: 'tan', type: 'light-border', expectedClasses: ['bg-tan-50', 'text-tan-900'] },
      { variant: 'tan', type: 'dark', expectedClasses: ['bg-tan-600', 'text-white'] },

      // Yellow combinations
      { variant: 'yellow', type: 'light-border', expectedClasses: ['bg-yellow-25', 'text-yellow-900'] },
      { variant: 'yellow', type: 'dark', expectedClasses: ['bg-yellow-500', 'text-white'] },

      // Purple combinations
      { variant: 'purple', type: 'light-border', expectedClasses: ['bg-purple-25', 'text-purple-600'] },
      { variant: 'purple', type: 'dark', expectedClasses: ['bg-purple-700', 'text-white'] },

      // Indigo combinations - previously uncovered
      { variant: 'indigo', type: 'light-border', expectedClasses: ['bg-indigo-25', 'text-indigo-600', 'border-current'] },
      { variant: 'indigo', type: 'light', expectedClasses: ['bg-indigo-25', 'text-indigo-600', 'border-indigo-25'] },
      { variant: 'indigo', type: 'medium', expectedClasses: ['bg-indigo-500', 'text-white', 'border-indigo-500'] },
      { variant: 'indigo', type: 'dark', expectedClasses: ['bg-indigo-700', 'text-white', 'border-indigo-700'] },

      // Gray combinations (default)
      { variant: 'gray', type: 'light-border', expectedClasses: ['bg-gray-100', 'text-gray-700'] },
      { variant: 'gray', type: 'dark', expectedClasses: ['bg-gray-700', 'text-white'] },
    ]

    combinations.forEach(({ variant, type, expectedClasses }) => {
      it(`applies correct classes for ${variant} with ${type} type`, () => {
        const wrapper = mount(Component, {
          slots: { default: 'Test' },
          props: { variant, type }
        })

        const badge = wrapper.find('[data-id="sds-badge"]')
        expectedClasses.forEach(className => {
          expect(badge.classes()).toContain(className)
        })
      })
    })
  })

  describe('component options', () => {
    it('should have correct component name', () => {
      expect(Component.name).toBe('SdsBadge')
    })
  })
})
