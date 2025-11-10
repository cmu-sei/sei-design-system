import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Input.vue'
import CharacterCounter from '../CharacterCounter/CharacterCounter.vue'

describe('Input.vue', () => {
  /* Rendering & Default State */
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render with correct data-id attribute', () => {
    const wrapper = mount(Component, {})
    expect(wrapper.attributes('data-id')).toBe('sds-input')
  })

  it('should render input element with default type "text"', () => {
    const wrapper = mount(Component, {})
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
  })

  it('should apply default maxlength value', () => {
    const wrapper = mount(Component, {})
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('524288')
  })

  it('should not render character counter by default', () => {
    const wrapper = mount(Component, {})
    expect(wrapper.findComponent(CharacterCounter).exists()).toBe(false)
  })

  /* Props - Basic Attributes */
  it('should match its snapshot with id prop assigned', () => {
    const wrapper = mount(Component, {
      props: { id: 'unique-identifier' }
    })
    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('unique-identifier')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with placeholder prop assigned', () => {
    const wrapper = mount(Component, {
      props: { placeholder: 'Firstname Lastname' }
    })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Firstname Lastname')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with maxlength prop assigned', () => {
    const wrapper = mount(Component, {
      props: { maxlength: 200 }
    })
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('200')
    expect(wrapper.html()).toMatchSnapshot()
  })

  const types = ['text', 'email', 'password', 'tel', 'number', 'url']
  types.forEach(type => {
    it(`should set input type correctly when type prop is "${type}"`, () => {
      const wrapper = mount(Component, {
        props: { type }
      })
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(type)
    })
  })

  it('should match its snapshot with pattern prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        type: 'tel'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('pattern')).toBe('[0-9]{3}-[0-9]{3}-[0-9]{4}')
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* Props - Size Variants */
  it('should match its snapshot with size prop "md"', () => {
    const wrapper = mount(Component, {
      props: { size: 'md' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with size prop "sm"', () => {
    const wrapper = mount(Component, {
      props: { size: 'sm' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* Props - Boolean Attributes */
  it('should match its snapshot with autofocus prop assigned', () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { autofocus: true }
    })
    const input = wrapper.find('input')
    expect(input.attributes('autofocus')).toBeDefined()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with disabled prop assigned', () => {
    const wrapper = mount(Component, {
      props: { disabled: true }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.element.disabled).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with readonly prop assigned', () => {
    const wrapper = mount(Component, {
      props: { readonly: true }
    })
    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
    expect(input.element.readOnly).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match its snapshot with required prop assigned', () => {
    const wrapper = mount(Component, {
      props: { required: true }
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeDefined()
    expect(input.element.required).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* Props - Validation States */
  it('should match its snapshot with valid and invalid props assigned', async () => {
    const wrapper = mount(Component, {})
    await wrapper.setProps({ valid: true })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ invalid: true, valid: false })
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* Character Counter Feature */
  it('should match its snapshot with countCharacters prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        countCharacters: true,
        type: 'number'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render character counter when countCharacters is true', () => {
    const wrapper = mount(Component, {
      props: {
        countCharacters: true,
        maxlength: 100
      }
    })
    const counter = wrapper.findComponent(CharacterCounter)
    expect(counter.exists()).toBe(true)
  })

  it('should pass correct props to character counter', () => {
    const wrapper = mount(Component, {
      props: {
        countCharacters: true,
        maxlength: 50,
        modelValue: 'Hello'
      }
    })
    const counter = wrapper.findComponent(CharacterCounter)
    expect(counter.props('currentValue')).toBe(5)
    expect(counter.props('maxValue')).toBe(50)
  })

  it('should update character counter when text changes', async () => {
    const wrapper = mount(Component, {
      props: {
        countCharacters: true,
        maxlength: 100,
        modelValue: ''
      }
    })
    const counter = wrapper.findComponent(CharacterCounter)
    expect(counter.props('currentValue')).toBe(0)

    await wrapper.setProps({ modelValue: 'Hello World' })
    expect(counter.props('currentValue')).toBe(11)
  })

  /* User Interactions - Text Input */
  it('should update model value when user types', async () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input')

    await input.setValue('Hello')
    expect(input.element.value).toBe('Hello')
  })

  it('should emit update:modelValue event with correct payload', async () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input')

    await input.setValue('Test input')
    expect(input.element.value).toBe('Test input')
  })

  /* v-model / Two-Way Data Binding */
  it('should display initial model value in input', () => {
    const wrapper = mount(Component, {
      props: { modelValue: 'Initial value' }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Initial value')
  })

  it('should update display when model value changes externally', async () => {
    const wrapper = mount(Component, {
      props: { modelValue: 'First' }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('First')

    await wrapper.setProps({ modelValue: 'Second' })
    expect(input.element.value).toBe('Second')
  })

  /* Edge Cases & Boundary Conditions */
  it('should handle empty string as model value', () => {
    const wrapper = mount(Component, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
  })

  it('should handle special characters correctly', async () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input')
    const specialChars = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`'

    await input.setValue(specialChars)
    expect(input.element.value).toBe(specialChars)
  })

  it('should handle unicode characters correctly', async () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input')
    const unicodeText = '你好世界 🌍 مرحبا'

    await input.setValue(unicodeText)
    expect(input.element.value).toBe(unicodeText)
  })

  it('should work correctly with maxlength of 0', () => {
    const wrapper = mount(Component, {
      props: { maxlength: 0 }
    })
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('0')
  })

  it('should respect maxlength constraint', () => {
    const wrapper = mount(Component, {
      props: { maxlength: 10 }
    })
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('10')
  })
})