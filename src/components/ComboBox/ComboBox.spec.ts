import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './ComboBox.vue'
import { computed } from 'vue'

describe('ComboBox', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  const suggestions = [
    'Apple',
    'Banana',
    'Kiwi',
    'Orange',
    'Mango',
    'Pineapple',
    'Pomegranate',
    'Raspberry',
    'Strawberry',
    'Watermelon'
  ]

  const suggestionsATag = [
    { label: 'Apple', href: '/apple' },
    { label: 'Banana', href: '/banana', },
    { label: 'Kiwi', href: '/kiwi' },
    { label: 'Orange', href: '/orange' },
    { label: 'Mango', href: '/mango' },
    { label: 'Pineapple', href: '/pineapple' },
    { label: 'Pomegranate', href: '/pomegranate' },
    { label: 'Raspberry', href: '/raspberry' },
    { label: 'Strawberry', href: '/strawberry' },
    { label: 'Watermelon', href: '/watermelon' }
  ]

  afterEach(() => {
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = mount(Component, {
      attachTo: document.body
    })
  })

  it('should match its default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `placeholder` prop', async () => {
    await wrapper.setProps({ placeholder: 'Search' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `disabled` prop', async () => {
    await wrapper.setProps({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `modelValue` prop', async () => {
    await wrapper.setProps({ modelValue: 'Apple' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should set focus to input on component mount', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        autofocus: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type="text"]').element).toStrictEqual(document.activeElement)
  })

  it('should set focus to input on "keydown" event', async () => {
    await wrapper.setProps({ focusOnKeyPress: true })
    await wrapper.find('input[type="text"]').trigger('keydown', { key: '/' })
    expect(wrapper.find('input[type="text"]').element).toStrictEqual(document.activeElement)
  })

  it('should set focus to input on "click" event', async () => {
    await wrapper.find('.input-group-addon').trigger('click')
    expect(wrapper.find('input[type="text"]').element).toStrictEqual(document.activeElement)
  })

  it('should match its snapshot with assigned `filterSuggestions` and `suggestions` props', async () => {
    await wrapper.setProps({
      filterSuggestions: true,
      suggestions
    })
    await wrapper.find('input[type="text"]').setValue('Apple')
    await wrapper.find('input[type="text"]').trigger('input')
    expect(wrapper.find('[data-id="sds-scroll-area"]').exists()).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should handle "down" and "up" arrow keys on "keydown" event', async () => {
    await wrapper.setProps({
      filterSuggestions: true,
      suggestions
    })

    await wrapper.find('input[type="text"]').setValue('a')
    await wrapper.find('input[type="text"]').trigger('input')

    await wrapper.find('input[type="text"]').trigger('keydown', { key: 'down' })
    expect(wrapper.find('[data-active="true"]').text()).toBe('Apple')
    await wrapper.find('input[type="text"]').trigger('keydown', { key: 'down' })
    expect(wrapper.find('[data-active="true"]').text()).toBe('Banana')
    await wrapper.find('input[type="text"]').trigger('keydown', { key: 'up' })
    expect(wrapper.find('[data-active="true"]').text()).toBe('Apple')
  })

  it('should handle "Enter" key on "keyup" event', async () => {
    await wrapper.setProps({
      filterSuggestions: true,
      suggestions
    })

    await wrapper.find('input[type="text"]').setValue('a')
    await wrapper.find('input[type="text"]').trigger('input')

    await wrapper.find('input[type="text"]').trigger('keyup', { key: 'Enter' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `optionType` prop as `a`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      global: {
        stubs: {
          transition: false
        },
        mocks: {
          dropdownIsOpen: computed(() => true),
          allSuggestions: suggestions
        }
      },
      props: {
        optionType: 'a',
        suggestions: suggestionsATag
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `optionType` prop as `button`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      global: {
        stubs: {
          transition: false
        },
        mocks: {
          dropdownIsOpen: computed(() => true),
          allSuggestions: suggestions
        }
      },
      props: {
        optionType: 'button',
        suggestions
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `optionType` prop as `custom`', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      global: {
        mocks: {
          dropdownIsOpen: computed(() => true),
          allSuggestions: suggestions
        }
      },
      props: {
        optionType: 'custom',
        suggestions: suggestionsATag
      },
      slots: {
        customOption: '<a :class="classList" :href="href" @click="onClick" v-html="label" />'
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })
})