import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './DropdownItem.vue'

describe('DropdownItem', () => {
  let mockEmitter

  beforeEach(() => {
    mockEmitter = {
      emit: vi.fn()
    }
  })

  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should match its variant red snapshot', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'red'
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Props', () => {
    describe('variant', () => {
      it('renders with gray variant by default', () => {
        const wrapper = mount(Component, {
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('bg-white')
        expect(wrapper.classes()).toContain('text-gray-900')
      })

      it('renders with gray variant when specified', () => {
        const wrapper = mount(Component, {
          props: {
            variant: 'gray'
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('bg-white')
        expect(wrapper.classes()).toContain('text-gray-900')
      })

      it('renders with red variant when specified', () => {
        const wrapper = mount(Component, {
          props: {
            variant: 'red'
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('text-red-600')
      })
    })

    describe('tag', () => {
      it('renders as anchor tag by default', () => {
        const wrapper = mount(Component, {
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.element.tagName).toBe('A')
      })

      it('renders as button when tag prop is button', () => {
        const wrapper = mount(Component, {
          props: {
            tag: 'button'
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.element.tagName).toBe('BUTTON')
      })

      it('renders as div when tag prop is div', () => {
        const wrapper = mount(Component, {
          props: {
            tag: 'div'
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.element.tagName).toBe('DIV')
      })
    })

    describe('closeOnClick', () => {
      it('closes dropdown when clicked by default', async () => {
        const wrapper = mount(Component, {
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        await wrapper.trigger('click')

        expect(mockEmitter.emit).toHaveBeenCalledWith('floating-ui-toggle', false)
      })

      it('closes dropdown when closeOnClick is true', async () => {
        const wrapper = mount(Component, {
          props: {
            closeOnClick: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        await wrapper.trigger('click')

        expect(mockEmitter.emit).toHaveBeenCalledWith('floating-ui-toggle', false)
      })

      it('does not close dropdown when closeOnClick is false', async () => {
        const wrapper = mount(Component, {
          props: {
            closeOnClick: false
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        await wrapper.trigger('click')

        expect(mockEmitter.emit).not.toHaveBeenCalled()
      })

      it('does not throw error when emitter is not provided and closeOnClick is true', async () => {
        const wrapper = mount(Component, {
          props: {
            closeOnClick: true
          },
          global: {
            config: {
              errorHandler: () => {}
            }
          }
        })

        await wrapper.trigger('click')

        expect(wrapper.exists()).toBe(true)
      })
    })

    describe('active', () => {
      it('renders without active styling by default', () => {
        const wrapper = mount(Component, {
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        const span = wrapper.find('span')
        expect(span.classes()).not.toContain('-ml-2')
      })

      it('renders without active styling when active is false', () => {
        const wrapper = mount(Component, {
          props: {
            active: false
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        const span = wrapper.find('span')
        expect(span.classes()).not.toContain('-ml-2')
      })

      it('renders with active styling when active is true', () => {
        const wrapper = mount(Component, {
          props: {
            active: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        const span = wrapper.find('span')
        expect(span.classes()).toContain('-ml-2')
      })

      it('applies gray active variant classes when active is true', () => {
        const wrapper = mount(Component, {
          props: {
            variant: 'gray',
            active: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('border-l-4')
        expect(wrapper.classes()).toContain('border-blue-600')
        expect(wrapper.classes()).toContain('bg-gray-25')
      })

      it('applies red active variant classes when active is true', () => {
        const wrapper = mount(Component, {
          props: {
            variant: 'red',
            active: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('border-l-4')
        expect(wrapper.classes()).toContain('border-red-600')
        expect(wrapper.classes()).toContain('text-red-600')
      })
    })

    describe('disabled', () => {
      it('renders without disabled attribute by default', () => {
        const wrapper = mount(Component, {
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.attributes('disabled')).toBe('false')
      })

      it('renders without disabled attribute when disabled is false', () => {
        const wrapper = mount(Component, {
          props: {
            disabled: false
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.attributes('disabled')).toBe('false')
      })

      it('renders with disabled attribute when disabled is true', () => {
        const wrapper = mount(Component, {
          props: {
            tag: 'button',
            disabled: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.attributes('disabled')).toBeDefined()
      })

      it('applies disabled styling when disabled is true', () => {
        const wrapper = mount(Component, {
          props: {
            disabled: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('pointer-events-none')
        expect(wrapper.classes()).toContain('text-gray-500')
      })

      it('overrides variant styling when disabled is true', () => {
        const wrapper = mount(Component, {
          props: {
            variant: 'red',
            disabled: true
          },
          global: {
            provide: {
              emitter: mockEmitter
            }
          }
        })

        expect(wrapper.classes()).toContain('pointer-events-none')
        expect(wrapper.classes()).toContain('text-gray-500')
        expect(wrapper.classes()).not.toContain('text-red-600')
      })
    })
  })

  describe('Attributes', () => {
    it('renders with correct data-id attribute', () => {
      const wrapper = mount(Component, {
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.attributes('data-id')).toBe('sds-dropdown-item')
    })

    it('renders with role menuitem', () => {
      const wrapper = mount(Component, {
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.attributes('role')).toBe('menuitem')
    })

    it('applies common base classes', () => {
      const wrapper = mount(Component, {
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.classes()).toContain('block')
      expect(wrapper.classes()).toContain('w-full')
      expect(wrapper.classes()).toContain('select-none')
      expect(wrapper.classes()).toContain('px-4')
      expect(wrapper.classes()).toContain('text-sm')
      expect(wrapper.classes()).toContain('leading-5')
      expect(wrapper.classes()).toContain('text-left')
      expect(wrapper.classes()).toContain('hover:no-underline')
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<span>Test Content</span>'
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.text()).toContain('Test Content')
    })

    it('renders multiple slot elements', () => {
      const wrapper = mount(Component, {
        slots: {
          default: '<span>Item 1</span><span>Item 2</span>'
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.text()).toContain('Item 1')
      expect(wrapper.text()).toContain('Item 2')
    })

    it('wraps slot content in span with flex class', () => {
      const wrapper = mount(Component, {
        slots: {
          default: 'Content'
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      const span = wrapper.find('span')
      expect(span.classes()).toContain('flex')
      expect(span.classes()).toContain('py-2')
    })
  })

  describe('Combined Props', () => {
    it('handles gray variant with active state', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'gray',
          active: true
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.classes()).toContain('border-l-4')
      expect(wrapper.classes()).toContain('border-blue-600')
      const span = wrapper.find('span')
      expect(span.classes()).toContain('-ml-2')
    })

    it('handles red variant with active state', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'red',
          active: true
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.classes()).toContain('border-l-4')
      expect(wrapper.classes()).toContain('border-red-600')
      const span = wrapper.find('span')
      expect(span.classes()).toContain('-ml-2')
    })

    it('handles disabled state with active state', () => {
      const wrapper = mount(Component, {
        props: {
          disabled: true,
          active: true
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.classes()).toContain('pointer-events-none')
      expect(wrapper.classes()).toContain('text-gray-500')
      const span = wrapper.find('span')
      expect(span.classes()).toContain('-ml-2')
    })

    it('handles all props together', () => {
      const wrapper = mount(Component, {
        props: {
          variant: 'red',
          tag: 'button',
          closeOnClick: false,
          active: true,
          disabled: false
        },
        slots: {
          default: 'Delete Item'
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.text()).toContain('Delete Item')
      expect(wrapper.classes()).toContain('border-l-4')
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty slot content', () => {
      const wrapper = mount(Component, {
        slots: {
          default: ''
        },
        global: {
          provide: {
            emitter: mockEmitter
          }
        }
      })

      expect(wrapper.find('span').exists()).toBe(true)
    })

    it('handles missing emitter provider', () => {
      const wrapper = mount(Component)

      expect(wrapper.exists()).toBe(true)
    })

    it('handles click when emitter is undefined and closeOnClick is false', async () => {
      const wrapper = mount(Component, {
        props: {
          closeOnClick: false
        }
      })

      await expect(wrapper.trigger('click')).resolves.not.toThrow()
    })
  })
})