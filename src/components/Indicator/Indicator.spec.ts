import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Indicator.vue'

describe('Indicator', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Indicator'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its variant green, placement bottom-right snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Indicator'
      },
      props: {
        variant: 'green',
        placement: 'bottom-right'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('hideIndicator prop', () => {
    it('should hide the indicator when hideIndicator is true', () => {
      const wrapper = mount(Component, {
        slots: {
          default: 'Content'
        },
        props: {
          hideIndicator: true
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.exists()).toBe(false)
    })

    it('should show the indicator when hideIndicator is false', () => {
      const wrapper = mount(Component, {
        slots: {
          default: 'Content'
        },
        props: {
          hideIndicator: false
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.exists()).toBe(true)
    })
  })

  describe('placement prop', () => {
    it('should apply top-right placement classes for portrait with xs size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-right',
          placementOver: 'portrait',
          size: 'xs'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-1')
      expect(indicator.classes()).toContain('-right-1')
    })

    it('should apply top-left placement classes for circle with xs size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-left',
          placementOver: 'circle',
          size: 'xs'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-0.5')
      expect(indicator.classes()).toContain('-left-0.5')
    })

    it('should apply bottom-right placement classes for portrait with sm size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-right',
          placementOver: 'portrait',
          size: 'sm'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-0.75')
      expect(indicator.classes()).toContain('-right-0.75')
    })

    it('should apply bottom-left placement classes for circle with sm size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-left',
          placementOver: 'circle',
          size: 'sm'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-0.5')
      expect(indicator.classes()).toContain('-left-0.5')
    })

    it('should apply top-right placement classes for portrait with md size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-right',
          placementOver: 'portrait',
          size: 'md'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-1.75')
      expect(indicator.classes()).toContain('-right-1.75')
    })

    it('should apply top-left placement classes for circle with md size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-left',
          placementOver: 'circle',
          size: 'md'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-0.5')
      expect(indicator.classes()).toContain('-left-0.5')
    })

    it('should apply bottom-right placement classes for portrait with lg size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-right',
          placementOver: 'portrait',
          size: 'lg'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-2')
      expect(indicator.classes()).toContain('-right-2')
    })

    it('should apply bottom-left placement classes for circle with lg size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-left',
          placementOver: 'circle',
          size: 'lg'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-1')
      expect(indicator.classes()).toContain('-left-1')
    })

    it('should apply top-right placement classes for portrait with xl size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-right',
          placementOver: 'portrait',
          size: 'xl'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-2.5')
      expect(indicator.classes()).toContain('-right-2.5')
    })

    it('should apply top-left placement classes for circle with xl size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-left',
          placementOver: 'circle',
          size: 'xl'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-1')
      expect(indicator.classes()).toContain('-left-1')
    })

    it('should apply bottom-right placement classes for portrait with 2xl size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-right',
          placementOver: 'portrait',
          size: '2xl'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-2.5')
      expect(indicator.classes()).toContain('-right-2.5')
    })

    it('should apply bottom-left placement classes for circle with 2xl size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-left',
          placementOver: 'circle',
          size: '2xl'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bottom-1.5')
      expect(indicator.classes()).toContain('left-1.5')
    })
  })

  describe('size prop', () => {
    it('should apply xs size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: 'xs' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-2')
      expect(indicator.classes()).toContain('w-2')
    })

    it('should apply sm size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: 'sm' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-2.5')
      expect(indicator.classes()).toContain('w-2.5')
    })

    it('should apply md size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: 'md' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-4')
      expect(indicator.classes()).toContain('w-4')
    })

    it('should apply lg size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: 'lg' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-6')
      expect(indicator.classes()).toContain('w-6')
    })

    it('should apply xl size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: 'xl' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-8')
      expect(indicator.classes()).toContain('w-8')
    })

    it('should apply 2xl size classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { size: '2xl' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-10')
      expect(indicator.classes()).toContain('w-10')
    })
  })

  describe('variant prop', () => {
    it('should apply gray variant classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { variant: 'gray' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-gray-300')
    })

    it('should apply blue variant classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { variant: 'blue' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-blue-600')
      expect(indicator.classes()).toContain('dark:bg-blue-400')
    })

    it('should apply green variant classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { variant: 'green' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-green-500')
      expect(indicator.classes()).toContain('dark:bg-green-300')
    })

    it('should apply orange variant classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { variant: 'orange' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-orange-500')
      expect(indicator.classes()).toContain('dark:bg-orange-300')
    })

    it('should apply red variant classes', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { variant: 'red' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-red-600')
      expect(indicator.classes()).toContain('dark:bg-red-400')
    })
  })

  describe('status prop', () => {
    it('should display status text for screen readers when status is provided', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { status: 'Online' }
      })
      const statusText = wrapper.find('.sr-only')
      expect(statusText.exists()).toBe(true)
      expect(statusText.text()).toBe('Online')
    })

    it('should not display status text when status is null', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: { status: undefined }
      })
      const statusText = wrapper.find('.sr-only')
      expect(statusText.exists()).toBe(false)
    })
  })

  describe('slot content', () => {
    it('should render slot content correctly', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div class="test-content">Test Content</div>'
        }
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Content')
    })
  })

  describe('combined props', () => {
    it('should handle all props together correctly', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          hideIndicator: false,
          placement: 'bottom-right',
          placementOver: 'square',
          size: 'lg',
          status: 'Active',
          variant: 'green'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.exists()).toBe(true)
      expect(indicator.classes()).toContain('h-6')
      expect(indicator.classes()).toContain('w-6')
      expect(indicator.classes()).toContain('bg-green-500')
      expect(wrapper.find('.sr-only').text()).toBe('Active')
    })
  })

  describe('edge cases', () => {
    it('should handle default variant when variant is not specified', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('bg-blue-600')
    })

    it('should handle default size when size is not specified', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('h-4')
      expect(indicator.classes()).toContain('w-4')
    })

    it('should apply rounded-full class to indicator', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('rounded-full')
    })

    it('should apply absolute positioning to indicator', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('absolute')
    })
  })

  describe('placementOver square', () => {
    it('should apply correct placement for top-right over square with md size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-right',
          placementOver: 'square',
          size: 'md'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-1.75')
      expect(indicator.classes()).toContain('-right-1.75')
    })

    it('should apply correct placement for top-left over square with sm size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'top-left',
          placementOver: 'square',
          size: 'sm'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-top-0.75')
      expect(indicator.classes()).toContain('-left-0.75')
    })

    it('should apply correct placement for bottom-right over square with xl size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-right',
          placementOver: 'square',
          size: 'xl'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-2.5')
      expect(indicator.classes()).toContain('-right-2.5')
    })

    it('should apply correct placement for bottom-left over square with xs size', () => {
      const wrapper = mount(Component, {
        slots: { default: 'Content' },
        props: {
          placement: 'bottom-left',
          placementOver: 'square',
          size: 'xs'
        }
      })
      const indicator = wrapper.find('[role="status"]')
      expect(indicator.classes()).toContain('-bottom-1')
      expect(indicator.classes()).toContain('-left-1')
    })
  })

  describe('maskSpec and maskAlign computed properties', () => {
    it('should compute maskSpec for xs size with circle placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'xs',
          placementOver: 'circle',
          placement: 'top-right'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('100% 0')
    })

    it('should compute maskSpec for sm size with square placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'sm',
          placementOver: 'square',
          placement: 'top-left'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('0 0')
    })

    it('should compute maskSpec for md size with portrait placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<button class="btn">Button</button>' },
        props: {
          size: 'md',
          placementOver: 'portrait',
          placement: 'bottom-right'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('100% 100%')
    })

    it('should compute maskSpec for lg size with circle placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'lg',
          placementOver: 'circle',
          placement: 'bottom-left'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('0 100%')
    })

    it('should compute maskSpec for xl size with square placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'xl',
          placementOver: 'square',
          placement: 'top-right'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('100% 0')
    })

    it('should compute maskSpec for 2xl size with portrait placement', () => {
      const wrapper = mount(Component, {
        slots: { default: '<button class="btn">Button</button>' },
        props: {
          size: '2xl',
          placementOver: 'portrait',
          placement: 'bottom-left'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('0 100%')
    })

    it('should compute maskSpec for circle placement with top-left', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'md',
          placementOver: 'circle',
          placement: 'top-left'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('0 0')
    })

    it('should compute maskSpec for circle placement with bottom-right', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'lg',
          placementOver: 'circle',
          placement: 'bottom-right'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('url(')
      expect(wrapper.vm.maskAlign).toBe('100% 100%')
    })

    it('should compute maskSpec for square placement with all sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
      sizes.forEach(size => {
        const wrapper = mount(Component, {
          slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
          props: {
            size,
            placementOver: 'square',
            placement: 'bottom-right'
          }
        })
        expect(wrapper.vm.maskSpec).toContain('url(')
      })
    })

    it('should compute maskSpec for portrait placement with all placements', () => {
      const placements = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const
      placements.forEach(placement => {
        const wrapper = mount(Component, {
          slots: { default: '<button class="btn">Button</button>' },
          props: {
            size: 'md',
            placementOver: 'portrait',
            placement
          }
        })
        expect(wrapper.vm.maskSpec).toContain('url(')
        expect(wrapper.vm.maskAlign).toBeTruthy()
      })
    })

    it('should return "none" for maskSpec when hideIndicator is true', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          hideIndicator: true
        }
      })
      expect(wrapper.vm.maskSpec).toBe('none')
    })

    it('should compute maskSpec with correct SVG data for circle over circle', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'xs',
          placementOver: 'circle',
          placement: 'top-left'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('data:image/svg+xml')
      expect(wrapper.vm.maskSpec).toContain('<svg viewBox="0 0 1000 1000"')
      expect(wrapper.vm.maskSpec).toContain('<circle cx=')
    })

    it('should compute maskSpec with correct SVG data for circle over square', () => {
      const wrapper = mount(Component, {
        slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
        props: {
          size: 'sm',
          placementOver: 'square',
          placement: 'bottom-right'
        }
      })
      expect(wrapper.vm.maskSpec).toContain('data:image/svg+xml')
      expect(wrapper.vm.maskSpec).toContain('linear-gradient(#fff, #fff)')
    })

    it('should compute maskAlign for all placement values', () => {
      const placements = [
        { placement: 'top-left' as const, expected: '0 0' },
        { placement: 'top-right' as const, expected: '100% 0' },
        { placement: 'bottom-right' as const, expected: '100% 100%' },
        { placement: 'bottom-left' as const, expected: '0 100%' }
      ]
      
      placements.forEach(({ placement, expected }) => {
        const wrapper = mount(Component, {
          slots: { default: '<div data-id="sds-avatar">Avatar</div>' },
          props: { placement }
        })
        expect(wrapper.vm.maskAlign).toBe(expected)
      })
    })
  })
})