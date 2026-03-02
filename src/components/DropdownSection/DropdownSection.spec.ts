import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './DropdownSection.vue'

describe('DropdownSection', () => {
  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div>Content</div>'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should match snapshot with title', () => {
      const wrapper = mount(Component, {
        props: {
          title: 'Section Title'
        },
        slots: {
          default: '<div>Content</div>'
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
          default: '<div>Content</div>'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should match snapshot as scrollable', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: true
        },
        slots: {
          default: '<div>Content</div>'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Props', () => {
    it('renders without title by default', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('span[role="heading"]').exists()).toBe(false)
    })

    it('renders title when provided', () => {
      const wrapper = mount(Component, {
        props: {
          title: 'My Section'
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      const heading = wrapper.find('span[role="heading"]')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('My Section')
    })

    it('does not show divider by default', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.classes()).not.toContain('border-b')
      expect(wrapper.classes()).not.toContain('border-t')
    })

    it('shows bottom divider when divider is true and no title', () => {
      const wrapper = mount(Component, {
        props: {
          divider: true
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.classes()).toContain('border-b')
    })

    it('shows top divider when divider is true and has title', () => {
      const wrapper = mount(Component, {
        props: {
          title: 'Section',
          divider: true
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.classes()).toContain('border-t')
    })

    it('is not scrollable by default', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('.scroll-area').exists()).toBe(false)
    })

    it('applies scroll-area class when scrollable', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: true
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('.scroll-area').exists()).toBe(true)
    })

    it('applies default max-height when scrollable without custom maxHeight', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: true
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('.max-h-56').exists()).toBe(true)
    })

    it('applies custom maxHeight when provided', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: true,
          maxHeight: '14rem'
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      const scrollArea = wrapper.find('.scroll-area')
      expect(scrollArea.attributes('style')).toContain('max-height: 14rem')
    })

    it('renders ul wrapper when scrollable and has title', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: true,
          title: 'Section'
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('ul').exists()).toBe(true)
    })

    it('renders ul wrapper when not scrollable', () => {
      const wrapper = mount(Component, {
        props: {
          scrollable: false
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      expect(wrapper.find('ul').exists()).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<div class="test-content">Test Content</div>'
        }
      })

      expect(wrapper.find('.test-content').exists()).toBe(true)
      expect(wrapper.html()).toContain('Test Content')
    })

    it('renders multiple items in default slot', () => {
      const wrapper = mount(Component, {
        slots: {
          default: `
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          `
        }
      })

      expect(wrapper.html()).toContain('Item 1')
      expect(wrapper.html()).toContain('Item 2')
      expect(wrapper.html()).toContain('Item 3')
    })
  })

  describe('Accessibility', () => {
    it('sets proper heading role on title', () => {
      const wrapper = mount(Component, {
        props: {
          title: 'Section Title'
        },
        slots: {
          default: '<div>Content</div>'
        }
      })

      const heading = wrapper.find('span[role="heading"]')
      expect(heading.attributes('role')).toBe('heading')
      expect(heading.attributes('aria-level')).toBe('2')
    })
  })
})
