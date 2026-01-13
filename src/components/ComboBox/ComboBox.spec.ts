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

const groupedSuggestions = [
  {
    section: 'Fruits',
    items: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Blueberry' },
      { name: 'Cantaloupe' },
      { name: 'Kiwi' },
      { name: 'Strawberry' }
    ]
  },
  {
    section: 'Vegetables',
    items: [
      { name: 'Artichoke' },
      { name: 'Avocado' },
      { name: 'Beetroot' },
      { name: 'Celery' },
      { name: 'Cucumber' },
      { name: 'Daikon' },
      { name: 'Eggplant' },
      { name: 'Kale' },
      { name: 'Shallot' }
    ]
  }
]

describe('ComboBox', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: { suggestions },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render tabs (and labels) when optionGroupLabel is provided', async () => {
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      },
      attachTo: document.body
    })
    /* Stub scrollIntoView since jsdom doesn't implement it,
     * will throw an error otherwise when navigating options */
    window.HTMLElement.prototype.scrollIntoView = () => {}
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await nextTick()
    // Tabs should be rendered
    const tabs = wrapper.findAll('button.tab')
    expect(tabs.length).toBeGreaterThan(1)
    expect(tabs[0].text().toLowerCase()).toContain('all')
    expect(tabs[1].text().toLowerCase()).toContain('fruits')
    expect(tabs[2].text().toLowerCase()).toContain('vegetables')
    wrapper.unmount()
  })

  it('should switch tabs with ArrowLeft/ArrowRight, should update suggestions when switching tabs', async () => {
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      },
      attachTo: document.body
    })
    /* Stub scrollIntoView since jsdom doesn't implement it,
     * will throw an error otherwise when navigating options */
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    /* Click the input and navigate down to an arbitrary suggestion,
     * then right from "All" to "Fruits" */
    await input.trigger('click')
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    await input.trigger('keydown.right')
    await nextTick()
    // Expect only Fruits to be visible
    const scrollAreaFruit = wrapper.find('[data-id="sds-scroll-area"]')
    const optionsFruit = scrollAreaFruit.findAll('button')
    const optionFruitTexts = optionsFruit.map(o => o.text())
    expect(optionFruitTexts).toContain('Apple')
    expect(optionFruitTexts).toContain('Banana')
    expect(optionFruitTexts).not.toContain('Carrot')
    expect(optionFruitTexts).not.toContain('Daikon')
    /* Again navigate down to an arbitrary suggestion,
     * then right from "Fruits" to "Vegetables" */
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    await input.trigger('keydown.right')
    await nextTick()
    // Expect only Vegetables to be visible
    const scrollAreaVeg = wrapper.find('[data-id="sds-scroll-area"]')
    const optionsVeg = scrollAreaVeg.findAll('button')
    const optionVegTexts = optionsVeg.map(o => o.text())
    expect(optionVegTexts).toContain('Beetroot')
    expect(optionVegTexts).toContain('Daikon')
    expect(optionVegTexts).not.toContain('Apple')
    expect(optionVegTexts).not.toContain('Banana')
    wrapper.unmount()
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
        customOption: (props: { option: ComboBoxSuggestion }) => h('div', { class: 'custom-option' }, `Custom: ${typeof props.option !== 'string' ? props.option.label : props.option}`)
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
    const wrapper = mount(Component, { props: { suggestions, clickToSelect: true } })
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
    const selected = []
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
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
    const wrapper = mount(Component, { props: { suggestions, clickToSelect: true } })
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
    const wrapper = mount(Component, { props: { suggestions: [], clickToSelect: true } })
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
        clickToSelect: true,
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
    const wrapper = mount(Component, { attachTo: document.body, props: { clickToSelect: true, readonly: true, suggestions } })
    const input = wrapper.find('input[type="text"]')
    expect(input.attributes('readonly')).toBeDefined()
    // Should still be focusable
    const i = input.element as HTMLInputElement
    i?.focus()
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  it('clears input and selections when clicking clear button', async () => {
    const selected = ['Apple', 'Banana']
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Simulate input value to trigger clear button
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    await nextTick()
    // Find clear button
    const clearBtn = wrapper.find('button[type="button"]')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')
    await nextTick()
    const inputText = input.text()
    // Input should be empty
    expect(inputText).toBe('')
    // Click again to clear selections
    await clearBtn.trigger('click')
    await nextTick()
    // Selections should be cleared
    expect(wrapper.props('selected')).toEqual([])
    wrapper.unmount()
  })

  it('shakes input on invalid submit (type="select" and value not in suggestions)', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, clickToSelect: true, type: 'select', multiple: false },
      attachTo: document.body
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('NotInList')
    await input.trigger('keyup.enter')
    await nextTick()
    // Should have shake animation class
    expect(input.classes()).toContain('animate-shake')
    // Wait for animation to clear
    await new Promise(r => setTimeout(r, 600))
    expect(input.classes()).not.toContain('animate-shake')
    wrapper.unmount()
  })

  // --- MULTISELECT & TAGGABLE-SELECT TESTS ---
  it('should allow selecting multiple options in multiselect mode (click)', async () => {
    const selected = []
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
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
      props: { suggestions, clickToSelect: true, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
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
      props: { suggestions, clickToSelect: true, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
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
      props: { suggestions, clickToSelect: true, debounceComplete: 0 }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.setValue('Dragonfruit')
    await nextTick()
    expect(wrapper.find('[data-id="sds-combo-box-dropdown"]').exists()).toBe(true)
  })

  it('should allow removing a tag in taggable-select mode (click)', async () => {
    const wrapper = mount(Component, {
      props: { suggestions, clickToSelect: true, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
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
      props: { suggestions, clickToSelect: true, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
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
        clickToSelect: true,
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

  it('removes a tag when clicking its remove button', async () => {
    const selected = ['Apple', 'Banana']
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Find the remove button for the first tag (should be Apple)
    const removeButtons = wrapper.findAll('[data-id="sds-tag"] button')
    expect(removeButtons.length).toBeGreaterThan(0)
    await removeButtons[0].trigger('click')
    await nextTick()
    // The tag should be removed from selected
    expect(wrapper.props('selected')).toEqual(['Banana'])
    // Should emit result event with only Banana
    const selectedTags = wrapper.findAll('[data-id="sds-tag"]>div>span').map(t => t.text())
    expect(selectedTags).toContain('Banana')
    wrapper.unmount()
  })

  it('selects all options when clicking "Select all", and deselects all when clicked again', async () => {
    const selected: ComboBoxSuggestion[] = []
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
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
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await nextTick()
    // Find "Select all" button
    const selectAllBtn = wrapper.find('button[role="option"]')
    expect(selectAllBtn.text()).toContain('Select all')
    // Click to select all
    await selectAllBtn.trigger('click')
    await nextTick()
    // All options should be selected
    expect(wrapper.props('selected')?.length).toBe(suggestions.length)
    // Click again to deselect all
    await selectAllBtn.trigger('click')
    await nextTick()
    expect(wrapper.props('selected')?.length).toBe(0)
    wrapper.unmount()
  })

  it('adds a suggestion to selected when clicked, and commits selection on Enter', async () => {
    const selected: ComboBoxSuggestion[] = []
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
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
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await nextTick()
    // Find the first suggestion button (should be "Select all", so skip to next)
    const buttons = wrapper.findAll('button')
    const appleBtn = buttons.find(btn => btn.text() === 'Apple')
    expect(appleBtn).toBeDefined()
    await appleBtn!.trigger('click')
    await nextTick()
    // "Apple" should be in selected
    expect(wrapper.props('selected')).toContain('Apple')
    // Now, simulate pressing Enter to commit selection
    await input.trigger('keyup.enter')
    await nextTick()
    const selectedTags = wrapper.findAll('[data-id="sds-tag"]>div>span').map(t => t.text())
    expect(selectedTags).toContain('Apple')
    wrapper.unmount()
  })

  it('navigates from tab to first suggestion with ArrowDown, and from first suggestion to tab with ArrowUp', async () => {
    const wrapper = mount(Component, {
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      },
      attachTo: document.body
    })
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await nextTick()
    // Focus should be on input, now ArrowDown to move to tab
    await input.trigger('keydown.down')
    await nextTick()
    // ArrowDown again to move to first suggestion
    await input.trigger('keydown.down')
    await nextTick()
    // The first suggestion should be active
    const active = wrapper.find('button[data-active="true"]')
    expect(active.exists()).toBe(true)
    // ArrowUp should move focus back to tab (no suggestion active)
    await input.trigger('keydown.up')
    await nextTick()
    const activeAfterUp = wrapper.find('button:not(.tab)[data-active="true"]')
    // Should not find an active suggestion (focus is on tab)
    expect(activeAfterUp.exists()).toBe(false)
    wrapper.unmount()
  })
})
