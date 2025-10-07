import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Link from './Link.vue'

describe('Link', () => {
  it('renders with default props', () => {
    const wrapper = mount(Link, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.find('[data-id="sds-link"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
  })

  it('matches snapshot with default props', () => {
    const wrapper = mount(Link, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('kind prop', () => {
    it('applies primary kind class by default', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).toContain('link-primary')
    })

    it('applies secondary kind class when kind is secondary', () => {
      const wrapper = mount(Link, {
        props: { kind: 'secondary' }
      })
      expect(wrapper.find('a').classes()).toContain('link-secondary')
    })

    it('applies tertiary kind class when kind is tertiary', () => {
      const wrapper = mount(Link, {
        props: { kind: 'tertiary' }
      })
      expect(wrapper.find('a').classes()).toContain('link-tertiary')
    })
  })

  describe('type prop', () => {
    it('applies no additional type class for standalone type by default', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).not.toContain('link-inline')
      expect(wrapper.find('a').classes()).not.toContain('link-cta')
    })

    it('applies inline type class when type is inline', () => {
      const wrapper = mount(Link, {
        props: { type: 'inline' }
      })
      expect(wrapper.find('a').classes()).toContain('link-inline')
    })

    it('applies cta type class when type is cta', () => {
      const wrapper = mount(Link, {
        props: { type: 'cta' }
      })
      expect(wrapper.find('a').classes()).toContain('link-cta')
    })
  })

  describe('variant prop', () => {
    it('applies blue variant class by default', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).toContain('link-blue')
    })

    it('applies red variant class when variant is red', () => {
      const wrapper = mount(Link, {
        props: { variant: 'red' }
      })
      expect(wrapper.find('a').classes()).toContain('link-red')
    })

    it('applies white variant class when variant is white', () => {
      const wrapper = mount(Link, {
        props: { variant: 'white' }
      })
      expect(wrapper.find('a').classes()).toContain('link-white')
    })
  })

  describe('decoration prop', () => {
    it('applies no decoration class when decoration is undefined', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).not.toContain('underline')
    })

    it('applies underline decoration with blue variant when decoration is underline', () => {
      const wrapper = mount(Link, {
        props: { decoration: 'underline', variant: 'blue' }
      })
      const classes = wrapper.find('a').classes()
      expect(classes).toContain('underline')
      expect(classes).toContain('underline-offset-2')
      expect(classes).toContain('decoration-blue-500')
    })

    it('applies underline decoration with red variant when decoration is underline and variant is red', () => {
      const wrapper = mount(Link, {
        props: { decoration: 'underline', variant: 'red' }
      })
      const classes = wrapper.find('a').classes()
      expect(classes).toContain('underline')
      expect(classes).toContain('underline-offset-2')
      expect(classes).toContain('decoration-red-500')
    })

    it('applies underline decoration with white variant when decoration is underline and variant is white', () => {
      const wrapper = mount(Link, {
        props: { decoration: 'underline', variant: 'white' }
      })
      const classes = wrapper.find('a').classes()
      expect(classes).toContain('underline')
      expect(classes).toContain('underline-offset-2')
      expect(classes).toContain('decoration-white')
    })
  })

  describe('size prop', () => {
    it('applies no size class when size is undefined', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).not.toContain('text-xs')
      expect(wrapper.find('a').classes()).not.toContain('text-sm')
      expect(wrapper.find('a').classes()).not.toContain('text-base')
      expect(wrapper.find('a').classes()).not.toContain('text-lg')
      expect(wrapper.find('a').classes()).not.toContain('text-xl')
    })

    it('applies xs size class when size is xs', () => {
      const wrapper = mount(Link, {
        props: { size: 'xs' }
      })
      expect(wrapper.find('a').classes()).toContain('text-xs')
    })

    it('applies sm size class when size is sm', () => {
      const wrapper = mount(Link, {
        props: { size: 'sm' }
      })
      expect(wrapper.find('a').classes()).toContain('text-sm')
    })

    it('applies base size class when size is md', () => {
      const wrapper = mount(Link, {
        props: { size: 'md' }
      })
      expect(wrapper.find('a').classes()).toContain('text-base')
    })

    it('applies lg size class when size is lg', () => {
      const wrapper = mount(Link, {
        props: { size: 'lg' }
      })
      expect(wrapper.find('a').classes()).toContain('text-lg')
    })

    it('applies xl size class when size is xl', () => {
      const wrapper = mount(Link, {
        props: { size: 'xl' }
      })
      expect(wrapper.find('a').classes()).toContain('text-xl')
    })
  })

  describe('external prop', () => {
    it('does not set target or rel attributes when external is false', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').attributes('target')).toBeUndefined()
      expect(wrapper.find('a').attributes('rel')).toBeUndefined()
    })

    it('sets target to _blank and rel to noopener noreferrer when external is true', () => {
      const wrapper = mount(Link, {
        props: { external: true }
      })
      expect(wrapper.find('a').attributes('target')).toBe('_blank')
      expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('disabled prop', () => {
    it('does not apply disabled class or tabindex when disabled is false', () => {
      const wrapper = mount(Link)
      expect(wrapper.find('a').classes()).not.toContain('disabled')
      expect(wrapper.find('a').attributes('tabindex')).toBeUndefined()
    })

    it('applies disabled class and tabindex -1 when disabled is true', () => {
      const wrapper = mount(Link, {
        props: { disabled: true }
      })
      expect(wrapper.find('a').classes()).toContain('disabled')
      expect(wrapper.find('a').attributes('tabindex')).toBe('-1')
    })
  })

  describe('slot content', () => {
    it('renders slot content correctly', () => {
      const wrapper = mount(Link, {
        slots: {
          default: '<span>Custom content</span>'
        }
      })
      expect(wrapper.html()).toContain('<span>Custom content</span>')
    })

    it('renders multiple elements in slot', () => {
      const wrapper = mount(Link, {
        slots: {
          default: '<span>First</span><span>Second</span>'
        }
      })
      expect(wrapper.html()).toContain('<span>First</span>')
      expect(wrapper.html()).toContain('<span>Second</span>')
    })
  })

  describe('combined props', () => {
    it('applies multiple props correctly when combined', () => {
      const wrapper = mount(Link, {
        props: {
          kind: 'secondary',
          type: 'inline',
          variant: 'red',
          decoration: 'underline',
          size: 'lg',
          external: true,
          disabled: true
        }
      })
      const classes = wrapper.find('a').classes()
      expect(classes).toContain('link-secondary')
      expect(classes).toContain('link-inline')
      expect(classes).toContain('link-red')
      expect(classes).toContain('underline')
      expect(classes).toContain('text-lg')
      expect(classes).toContain('disabled')
      expect(wrapper.find('a').attributes('target')).toBe('_blank')
      expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
      expect(wrapper.find('a').attributes('tabindex')).toBe('-1')
    })
  })
})
