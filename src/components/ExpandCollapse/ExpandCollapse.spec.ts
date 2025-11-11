import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './ExpandCollapse.vue'

describe('ExpandCollapse', () => {
  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          expandLabel: 'ExpandCollapse'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.text()).toEqual('ExpandCollapse')
    })

    it('should match its modelValue (true) snapshot', () => {
      const wrapper = mount(Component, {
        props: { modelValue: true }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show less')
    })

    it('should match its modelValue (false) snapshot', () => {
      const wrapper = mount(Component, {
        props: { modelValue: false }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more')
    })

    it('should match its kind (primary) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'primary',
          expandLabel: 'Show more: primary'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: primary')
      expect(wrapper.element.classList).toContain('link-primary')
    })

    it('should match its kind (secondary) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'secondary',
          expandLabel: 'Show more: secondary'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: secondary')
      expect(wrapper.element.classList).toContain('link-secondary')
    })

    it('should match its kind (tertiary) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'tertiary',
          expandLabel: 'Show more: tertiary'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: tertiary')
      expect(wrapper.element.classList).toContain('link-tertiary')
    })

    it('should match its variant (blue) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'blue',
          expandLabel: 'Show more: blue'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: blue')
      expect(wrapper.element.classList).toContain('link-blue')
    })

    it('should match its variant (red) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'red',
          expandLabel: 'Show more: red'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: red')
      expect(wrapper.element.classList).toContain('link-red')
    })

    it('should match its disabled (true) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          disabled: true,
          expandLabel: 'Show more: true'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: true')
      expect(wrapper.element.disabled).toEqual(true)
    })

    it('should match its disabled (false) snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          disabled: false,
          expandLabel: 'Show more: false'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.text()).toEqual('Show more: false')
      expect(wrapper.element.disabled).toEqual(false)
    })
  })

  describe('Props', () => {
    describe('kind', () => {
      it('applies primary class when kind is primary', () => {
        const wrapper = mount(Component, {
          props: { kind: 'primary' }
        })
        expect(wrapper.classes()).toContain('link-primary')
      })

      it('applies secondary class when kind is secondary', () => {
        const wrapper = mount(Component, {
          props: { kind: 'secondary' }
        })
        expect(wrapper.classes()).toContain('link-secondary')
      })

      it('applies tertiary class when kind is tertiary', () => {
        const wrapper = mount(Component, {
          props: { kind: 'tertiary' }
        })
        expect(wrapper.classes()).toContain('link-tertiary')
      })

      it('uses primary kind by default', () => {
        const wrapper = mount(Component)
        expect(wrapper.classes()).toContain('link-primary')
      })
    })

    describe('variant', () => {
      it('applies blue class when variant is blue', () => {
        const wrapper = mount(Component, {
          props: { variant: 'blue' }
        })
        expect(wrapper.classes()).toContain('link-blue')
      })

      it('applies red class when variant is red', () => {
        const wrapper = mount(Component, {
          props: { variant: 'red' }
        })
        expect(wrapper.classes()).toContain('link-red')
      })

      it('uses blue variant by default', () => {
        const wrapper = mount(Component)
        expect(wrapper.classes()).toContain('link-blue')
      })
    })

    describe('expandLabel', () => {
      it('displays expandLabel when collapsed', () => {
        const wrapper = mount(Component, {
          props: {
            modelValue: false,
            expandLabel: 'Custom Expand'
          }
        })
        expect(wrapper.text()).toBe('Custom Expand')
      })

      it('uses default expandLabel when not provided', () => {
        const wrapper = mount(Component, {
          props: { modelValue: false }
        })
        expect(wrapper.text()).toBe('Show more')
      })
    })

    describe('collapseLabel', () => {
      it('displays collapseLabel when expanded', () => {
        const wrapper = mount(Component, {
          props: {
            modelValue: true,
            collapseLabel: 'Custom Collapse'
          }
        })
        expect(wrapper.text()).toBe('Custom Collapse')
      })

      it('uses default collapseLabel when not provided', () => {
        const wrapper = mount(Component, {
          props: { modelValue: true }
        })
        expect(wrapper.text()).toBe('Show less')
      })
    })

    describe('disabled', () => {
      it('applies disabled attribute when disabled is true', () => {
        const wrapper = mount(Component, {
          props: { disabled: true }
        })
        expect(wrapper.attributes('disabled')).toBeDefined()
        expect(wrapper.attributes('aria-disabled')).toBe('true')
      })

      it('applies disabled class when disabled is true', () => {
        const wrapper = mount(Component, {
          props: { disabled: true }
        })
        expect(wrapper.classes()).toContain('disabled')
      })

      it('does not apply disabled attribute when disabled is false', () => {
        const wrapper = mount(Component, {
          props: { disabled: false }
        })
        expect(wrapper.attributes('disabled')).toBeUndefined()
        expect(wrapper.attributes('aria-disabled')).toBe('false')
      })

      it('does not apply disabled class when disabled is false', () => {
        const wrapper = mount(Component, {
          props: { disabled: false }
        })
        expect(wrapper.classes()).not.toContain('disabled')
      })

      it('is not disabled by default', () => {
        const wrapper = mount(Component)
        expect(wrapper.attributes('disabled')).toBeUndefined()
        expect(wrapper.classes()).not.toContain('disabled')
      })
    })

    describe('modelValue', () => {
      it('displays collapseLabel when modelValue is true', () => {
        const wrapper = mount(Component, {
          props: { modelValue: true }
        })
        expect(wrapper.text()).toBe('Show less')
      })

      it('displays expandLabel when modelValue is false', () => {
        const wrapper = mount(Component, {
          props: { modelValue: false }
        })
        expect(wrapper.text()).toBe('Show more')
      })

      it('applies link-cta-up class when modelValue is true', () => {
        const wrapper = mount(Component, {
          props: { modelValue: true }
        })
        expect(wrapper.classes()).toContain('link-cta-up')
        expect(wrapper.classes()).not.toContain('link-cta-down')
      })

      it('applies link-cta-down class when modelValue is false', () => {
        const wrapper = mount(Component, {
          props: { modelValue: false }
        })
        expect(wrapper.classes()).toContain('link-cta-down')
        expect(wrapper.classes()).not.toContain('link-cta-up')
      })

      it('uses false as default modelValue', () => {
        const wrapper = mount(Component)
        expect(wrapper.text()).toBe('Show more')
        expect(wrapper.classes()).toContain('link-cta-down')
      })
    })
  })

  describe('Attributes', () => {
    it('renders as a button element', () => {
      const wrapper = mount(Component)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('has type button', () => {
      const wrapper = mount(Component)
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('has data-id attribute', () => {
      const wrapper = mount(Component)
      expect(wrapper.attributes('data-id')).toBe('sds-expand-collapse')
    })

    it('has base link classes', () => {
      const wrapper = mount(Component)
      expect(wrapper.classes()).toContain('link')
      expect(wrapper.classes()).toContain('link-cta')
    })
  })

  describe('Events', () => {
    describe('onClick', () => {
      it('updates model value to true when clicked while collapsed', async () => {
        let modelValue = false
        const wrapper = mount(Component, {
          props: {
            modelValue,
            'onUpdate:modelValue': (value: boolean) => {
              modelValue = value
              wrapper.setProps({ modelValue: value })
            }
          }
        })
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(true)
      })

      it('updates model value to false when clicked while expanded', async () => {
        let modelValue = true
        const wrapper = mount(Component, {
          props: {
            modelValue,
            'onUpdate:modelValue': (value: boolean) => {
              modelValue = value
              wrapper.setProps({ modelValue: value })
            }
          }
        })
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(false)
      })

      it('updates model value when clicked from default state', async () => {
        let modelValue = false
        const wrapper = mount(Component, {
          props: {
            'onUpdate:modelValue': (value: boolean) => {
              modelValue = value
            }
          }
        })
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(true)
      })

      it('toggles between true and false on consecutive clicks', async () => {
        let modelValue = false
        const wrapper = mount(Component, {
          props: {
            modelValue,
            'onUpdate:modelValue': (value: boolean) => {
              modelValue = value
              wrapper.setProps({ modelValue: value })
            }
          }
        })
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(true)
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(false)
      })

      it('does not update model value when disabled', async () => {
        let modelValue = false
        const wrapper = mount(Component, {
          props: {
            modelValue,
            disabled: true,
            'onUpdate:modelValue': (value: boolean) => {
              modelValue = value
            }
          }
        })
        
        await wrapper.trigger('click')
        expect(modelValue).toBe(false)
      })
    })
  })

  describe('Label Switching', () => {
    it('updates label when modelValue prop changes from false to true', async () => {
      const wrapper = mount(Component, {
        props: { modelValue: false }
      })
      
      expect(wrapper.text()).toBe('Show more')
      
      await wrapper.setProps({ modelValue: true })
      
      expect(wrapper.text()).toBe('Show less')
    })

    it('updates label when modelValue prop changes from true to false', async () => {
      const wrapper = mount(Component, {
        props: { modelValue: true }
      })
      
      expect(wrapper.text()).toBe('Show less')
      
      await wrapper.setProps({ modelValue: false })
      
      expect(wrapper.text()).toBe('Show more')
    })

    it('updates classes when modelValue changes', async () => {
      const wrapper = mount(Component, {
        props: { modelValue: false }
      })
      
      expect(wrapper.classes()).toContain('link-cta-down')
      
      await wrapper.setProps({ modelValue: true })
      
      expect(wrapper.classes()).toContain('link-cta-up')
      expect(wrapper.classes()).not.toContain('link-cta-down')
    })
  })

  describe('Combined Props', () => {
    it('handles multiple props together', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'tertiary',
          variant: 'red',
          modelValue: true,
          disabled: true,
          expandLabel: 'More info',
          collapseLabel: 'Less info'
        }
      })
      
      expect(wrapper.classes()).toContain('link-tertiary')
      expect(wrapper.classes()).toContain('link-red')
      expect(wrapper.classes()).toContain('link-cta-up')
      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.text()).toBe('Less info')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('applies correct classes for secondary blue variant', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'secondary',
          variant: 'blue'
        }
      })
      
      expect(wrapper.classes()).toContain('link-secondary')
      expect(wrapper.classes()).toContain('link-blue')
    })

    it('applies correct classes for primary red variant when expanded', () => {
      const wrapper = mount(Component, {
        props: {
          kind: 'primary',
          variant: 'red',
          modelValue: true
        }
      })
      
      expect(wrapper.classes()).toContain('link-primary')
      expect(wrapper.classes()).toContain('link-red')
      expect(wrapper.classes()).toContain('link-cta-up')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty expandLabel', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: false,
          expandLabel: ''
        }
      })
      expect(wrapper.text()).toBe('')
    })

    it('handles empty collapseLabel', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: true,
          collapseLabel: ''
        }
      })
      expect(wrapper.text()).toBe('')
    })

    it('handles very long label text', () => {
      const longLabel = 'A'.repeat(200)
      const wrapper = mount(Component, {
        props: {
          modelValue: false,
          expandLabel: longLabel
        }
      })
      expect(wrapper.text()).toBe(longLabel)
    })

    it('handles special characters in labels', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: false,
          expandLabel: '<script>alert("XSS")</script>'
        }
      })
      expect(wrapper.text()).toContain('<script>')
      expect(wrapper.html()).not.toContain('<script>alert')
    })
  })
})
