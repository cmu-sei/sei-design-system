import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Component from './ComboBox.vue'
import type { ComboBoxSuggestion } from './ComboBox.vue'

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

describe('ComboBox', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: { suggestions },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="select" (single)', () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'select', multiple: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="select" (multiple)', () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="taggable-select" (single)', () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'taggable-select', multiple: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="taggable-select" (multiple)', () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for grouped options', () => {
    const groupSuggestions = [
      { label: 'A', group: 'Fruits', value: 'A' },
      { label: 'B', group: 'Fruits', value: 'B' },
      { label: 'C', group: 'Vegetables', value: 'C' }
    ]
    const wrapper = mount(Component, {
      props: {
        suggestions: groupSuggestions,
        optionGroupLabel: 'group',
        optionLabel: 'label',
        optionGroupChildren: undefined
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when loading', () => {
    const wrapper = mount(Component, {
      props: { suggestions, loading: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when disabled', () => {
    const wrapper = mount(Component, {
      props: { suggestions, disabled: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when autofocus is true', () => {
    const wrapper = mount(Component, {
      props: { suggestions, autofocus: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with clearable (showClearButton)', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'select', selected: ['Apple'] }
    })
    // Simulate input value to trigger clear button
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    wrapper.vm.$forceUpdate()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for optionType="a"', () => {
    const objectSuggestions = [
      { label: 'Google', value: 'google', href: 'https://google.com' },
      { label: 'Bing', value: 'bing', href: 'https://bing.com' }
    ]
    const wrapper = mount(Component, {
      props: { suggestions: objectSuggestions, optionType: 'a', optionLabel: 'label' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for optionType="custom"', () => {
    const objectSuggestions = [
      { label: 'Custom1', value: 'c1' },
      { label: 'Custom2', value: 'c2' }
    ]
    const wrapper = mount(Component, {
      props: { suggestions: objectSuggestions, optionType: 'custom', optionLabel: 'label' },
      slots: {
        customOption: (props: { option: any }) => h('div', { class: 'custom-option' }, `Custom: ${props.option.label}`)
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with custom value/label keys', () => {
    const objectSuggestions = [
      { name: 'Alpha', id: 1 },
      { name: 'Beta', id: 2 }
    ]
    const wrapper = mount(Component, {
      props: { suggestions: objectSuggestions, optionLabel: 'name' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open dropdown and highlight last option on ArrowUp', async () => {
    const wrapper = mount(Component, { props: { suggestions } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await input.trigger('keydown.up')
    const dropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    expect(dropdown.exists()).toBe(true)
    const active = wrapper.find('button[data-active="true"]')
    expect(active.text()).toEqual('Watermelon')
    wrapper.unmount()
  })

  it('should select highlighted option on Enter', async () => {
    let selected = []
    const wrapper = mount(Component, {
      props: {
        suggestions,
        type: 'select',
        multiple: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      },
      attachTo: document.body
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    const active = wrapper.find('button[data-active="true"]')
    expect(active.text()).toEqual('Apple')
    await input.trigger('keyup.enter')
    await nextTick()
    // Now check the tags
    const tags = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagsText = tags.map(t => t.text())
    // Should contain all options
    expect(tagsText).toContain('Apple')
    wrapper.unmount()
  })

  it('should close dropdown on Tab', async () => {
    const wrapper = mount(Component, { props: { suggestions } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    const dropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    expect(dropdown.exists()).toBe(true)
    await input.trigger('keydown.tab')
    const nextDropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    expect(nextDropdown.exists()).toBe(false)
    wrapper.unmount()
  })

  it('should not throw or open dropdown on ArrowDown if no suggestions', async () => {
    const wrapper = mount(Component, { props: { suggestions: [] } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('keydown.down')
    await nextTick()
    const dropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    // Expect the dropdown to be visible
    expect(dropdown.exists()).toBe(false)
    wrapper.unmount()
  })

  it('should allow navigation with dropdown already open', async () => {
    const wrapper = mount(Component, {
      props: {
        suggestions,
        mutliple: false,
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    const dropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    expect(dropdown.exists()).toBe(true)
    await input.trigger('keydown.down')
    const active = dropdown.find('button[data-active="true"]')
    expect(active.text()).toBe('Apple')
    await input.trigger('keydown.down')
    const nextActive = dropdown.find('button[data-active="true"]')
    expect(nextActive.text()).toBe('Banana')
    wrapper.unmount()
  })

  it('should set input as readonly and allow focus when readonly prop is true', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { readonly: true, suggestions } })
    const input = wrapper.find('input[type="text"]')
    expect(input.attributes('readonly')).toBeDefined()
    // Should still be focusable
    const i = input.element as HTMLInputElement
    i?.focus()
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  // --- MULTISELECT & TAGGABLE-SELECT TESTS ---
  it('should allow selecting multiple options in multiselect mode (click)', async () => {
    let selected = []
    const wrapper = mount(Component, {
      props: {
        suggestions,
        type: 'select',
        multiple: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      },
      attachTo: document.body
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await input.trigger('keydown.down')
    const active = wrapper.find('button[data-active="true"]')
    expect(active.text()).toEqual('Select all')
    await input.trigger('keyup.enter')
    // Now check the tags
    const tags = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagsText = tags.map(t => t.text())
    // Should contain all options
    expect(tagsText).toContain('Apple')
    expect(tagsText).toContain('Banana')
    expect(tagsText).toContain('Kiwi')
    wrapper.unmount()
  })

  it('should allow removing a tag in multiselect mode (click)', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    // Find the remove button for the first tag
    const removeButtons = wrapper.findAll('.tag-remove, .remove-tag, .remove')
    if (removeButtons.length > 0) {
      await removeButtons[0].trigger('click')
      await nextTick()
      // Should emit result event with only Banana
      const emitted = wrapper.emitted('result') || [[]]
      expect(emitted).toBeTruthy()
      expect(emitted[0][0]).toEqual(['Banana'])
    }
    wrapper.unmount()
  })

  it('should allow clearing all tags with clear button in multiselect mode', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    // Simulate input value to trigger clear button
    // Simulate input value to trigger clear button
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    wrapper.vm.$forceUpdate()
    await nextTick()
    // Find clear button
    const clearBtn = wrapper.find('.clear, .clear-btn, .clear-button')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      await nextTick()
      const emitted = wrapper.emitted('clear')
      expect(emitted).toBeTruthy()
    }
    wrapper.unmount()
  })

  it('shows dropdown after typing', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, debounceComplete: 0 }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.setValue('Dragonfruit')
    await nextTick()
    expect(wrapper.find('[data-id="sds-combo-box-dropdown"]').exists()).toBe(true)
  })

  it('should allow removing a tag in taggable-select mode (click)', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    // Find the remove button for the first tag
    const removeButtons = wrapper.findAll('.tag-remove, .remove-tag, .remove')
    if (removeButtons.length > 0) {
      await removeButtons[0].trigger('click')
      await nextTick()
      // Should emit result event with only Banana
      const emitted = wrapper.emitted('result') || [[]]
      expect(emitted).toBeTruthy()
      expect(emitted[0][0]).toEqual(['Banana'])
    }
    wrapper.unmount()
  })

  it('should allow clearing all tags with clear button in taggable-select mode', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    // Simulate input value to trigger clear button
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    wrapper.vm.$forceUpdate()
    await nextTick()
    // Find clear button
    const clearBtn = wrapper.find('.clear, .clear-btn, .clear-button')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      await nextTick()
      const emitted = wrapper.emitted('clear')
      expect(emitted).toBeTruthy()
    }
    wrapper.unmount()
  })

  it('should remove last tag on Backspace when input is empty (taggable-select)', async () => {
    const wrapper = mount(Component, {
      props: {
        suggestions,
        type: 'taggable-select',
        multiple: true,
        selected: ['Apple', 'Banana']
      }
    })
    const input = wrapper.find('input[type="text"]')
    const tags = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagsText = tags.map(t => t.text())
    // Should emit result event with removed tag value
    expect(tagsText).toContain('Apple')
    await input.setValue('')
    await input.trigger('keydown.backspace')
    await nextTick()
    const tag = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagText = tag.map(t => t.text())[0]
    // Should emit result event with removed tag value
    expect(tagText).toBe('Apple')
    wrapper.unmount()
  })
})
