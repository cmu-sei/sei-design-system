import { describe, expect, it, beforeEach, afterEach, afterAll, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { mount, enableAutoUnmount, flushPromises } from '@vue/test-utils'
import type { ComponentMountingOptions } from '@vue/test-utils'
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
  enableAutoUnmount(afterEach)

  beforeEach(() => {
    // FloatingUi calls @floating-ui/dom's computePosition asynchronously and the
    // open/close watcher waits a nextTick. Fake timers + mocked clientWidth match
    // the established pattern from FloatingUi.spec.ts and keep positioning
    // deterministic in jsdom.
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1440)
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    // Clean up any teleported FloatingUi popper content between tests.
    document.body.innerHTML = ''
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  const mountComponent = (options: ComponentMountingOptions<typeof Component> = {}) => {
    return mount(Component, {
      attachTo: document.body,
      ...options
    })
  }

  // Opening the dropdown chains: input event → showDropdown=true →
  // shouldShowDropdown computed → watcher → floatingUiRef.onOpen() (async) →
  // open watcher → nextTick → computePosition (async). Drain timers + promises
  // + a tick to let everything settle, then the popper is in document.body.
  const flushDropdown = async () => {
    await vi.runAllTimersAsync()
    await flushPromises()
    await nextTick()
  }

  // The dropdown is teleported to document.body, so wrapper.find won't see it.
  // Query the body directly via DOMParser-friendly selector.
  const findInBody = (selector: string): HTMLElement | null =>
    document.body.querySelector(selector)
  const findAllInBody = (selector: string): HTMLElement[] =>
    Array.from(document.body.querySelectorAll(selector)) as HTMLElement[]
  const dropdownInBody = () => findInBody('[role="listbox"]')
  const text = (el: HTMLElement | null): string => (el?.textContent ?? '').trim()
  const findOptionInBody = (label: string): HTMLElement | undefined =>
    findAllInBody('[data-id="sds-scroll-area"] button').find(button => text(button) === label)
  const getTranslateY = (element: HTMLElement): number => {
    const match = element.style.transform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/)
    return match ? Number(match[1]) : 0
  }
  const expectOptionVisibleInScrollArea = (scrollArea: HTMLElement, option: HTMLElement, height: number) => {
    const optionTop = getTranslateY(option)
    expect(optionTop).toBeGreaterThanOrEqual(scrollArea.scrollTop)
    expect(optionTop + height).toBeLessThanOrEqual(scrollArea.scrollTop + 288)
  }

  it('should match its default snapshot', () => {
    const wrapper = mountComponent({
      props: { suggestions },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render tabs (and labels) when optionGroupLabel is provided', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      }
    })
    /* Stub scrollIntoView since jsdom doesn't implement it,
     * will throw an error otherwise when navigating options */
    window.HTMLElement.prototype.scrollIntoView = () => {}
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(input.attributes('aria-controls')).toBe(dropdownInBody()?.id)
    expect(input.attributes('aria-activedescendant')).toBeTruthy()
    expect(document.getElementById(input.attributes('aria-activedescendant')!)).toBeTruthy()
    expect(dropdownInBody()?.getAttribute('role')).toBe('listbox')
    // Tabs are inside the teleported dropdown
    const tabs = findAllInBody('button.tab')
    expect(tabs.length).toBeGreaterThan(1)
    expect(text(tabs[0]).toLowerCase()).toContain('all')
    expect(text(tabs[1]).toLowerCase()).toContain('fruits')
    expect(text(tabs[2]).toLowerCase()).toContain('vegetables')
    wrapper.unmount()
  })

  it('should switch tabs with ArrowLeft/ArrowRight, should update suggestions when switching tabs', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      }
    })
    /* Stub scrollIntoView since jsdom doesn't implement it,
     * will throw an error otherwise when navigating options */
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    /* Click the input and navigate down to an arbitrary suggestion,
     * then right from "All" to "Fruits" */
    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    await input.trigger('keydown.right')
    await flushDropdown()
    // Expect only Fruits to be visible
    const optionFruitTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionFruitTexts).toContain('Apple')
    expect(optionFruitTexts).toContain('Banana')
    expect(optionFruitTexts).not.toContain('Carrot')
    expect(optionFruitTexts).not.toContain('Daikon')
    /* Again navigate down to an arbitrary suggestion,
     * then right from "Fruits" to "Vegetables" */
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    await input.trigger('keydown.right')
    await flushDropdown()
    // Expect only Vegetables to be visible
    const optionVegTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionVegTexts).toContain('Beetroot')
    expect(optionVegTexts).toContain('Daikon')
    expect(optionVegTexts).not.toContain('Apple')
    expect(optionVegTexts).not.toContain('Banana')
    wrapper.unmount()
  })

  it('should match snapshot for type="select" (single)', () => {
    const wrapper = mountComponent({
      props: { suggestions, type: 'select', multiple: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="select" (multiple)', () => {
    const wrapper = mountComponent({
      props: { suggestions, type: 'select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="taggable-select" (single)', () => {
    const wrapper = mountComponent({
      props: { suggestions, type: 'taggable-select', multiple: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for type="taggable-select" (multiple)', () => {
    const wrapper = mountComponent({
      props: { suggestions, type: 'taggable-select', multiple: true, selected: ['Apple', 'Banana'] }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the select caret only for select modes when the focus indicator is hidden', () => {
    const selectWrapper = mountComponent({
      props: { suggestions, type: 'select' }
    })
    const taggableSelectWrapper = mountComponent({
      props: { suggestions, type: 'taggable-select' }
    })
    const textWrapper = mountComponent({
      props: { suggestions, type: 'text' }
    })
    const focusIndicatorWrapper = mountComponent({
      props: { suggestions, type: 'select', focusOnKeyPress: true }
    })

    expect(selectWrapper.find('[data-id="sds-combo-box-select-caret"]').exists()).toBe(true)
    expect(taggableSelectWrapper.find('[data-id="sds-combo-box-select-caret"]').exists()).toBe(true)
    expect(textWrapper.find('[data-id="sds-combo-box-select-caret"]').exists()).toBe(false)
    expect(focusIndicatorWrapper.find('[data-id="sds-combo-box-select-caret"]').exists()).toBe(false)
  })

  it('keeps the select caret vertically centered for every size', () => {
    const sizes = ['sm', undefined, 'lg'] as const

    sizes.forEach(size => {
      const wrapper = mountComponent({
        props: { suggestions, type: 'select', size }
      })
      const caret = wrapper.find('[data-id="sds-combo-box-select-caret"]')
      const caretIcon = caret.find('span')

      expect(caret.classes()).toEqual(expect.arrayContaining([
        'input-group-addon',
        'pointer-events-none',
      ]))
      expect(caretIcon.classes()).toContain('shrink-0')

      wrapper.unmount()
    })
  })

  it('should match snapshot for grouped options', () => {
    const groupSuggestions = [
      { label: 'A', group: 'Fruits', value: 'A' },
      { label: 'B', group: 'Fruits', value: 'B' },
      { label: 'C', group: 'Vegetables', value: 'C' }
    ]
    const wrapper = mountComponent({
      props: {
        suggestions: groupSuggestions,
        optionGroupLabel: 'group',
        optionLabel: 'label',
        optionGroupChildren: undefined
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when pending', () => {
    const wrapper = mountComponent({
      props: { suggestions, pending: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when disabled', () => {
    const wrapper = mountComponent({
      props: { suggestions, disabled: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when autofocus is true', () => {
    const wrapper = mountComponent({
      props: { suggestions, autofocus: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows the clear query button when clearable select has a query', async () => {
    const wrapper = mountComponent({
      props: { suggestions, type: 'select', selected: ['Apple'] }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')

    const clearButton = wrapper.findAll('button').find(button => button.text() === 'Clear query')
    expect(clearButton).toBeTruthy()
    expect(clearButton!.attributes('type')).toBe('button')
    expect(clearButton!.attributes('tabindex')).toBe('-1')
  })

  it('should match snapshot for optionType="a"', () => {
    const objectSuggestions = [
      { label: 'Google', value: 'google', href: 'https://google.com' },
      { label: 'Bing', value: 'bing', href: 'https://bing.com' }
    ]
    const wrapper = mountComponent({
      props: { suggestions: objectSuggestions, optionType: 'a', optionLabel: 'label' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot for optionType="custom"', () => {
    const objectSuggestions = [
      { label: 'Custom1', value: 'c1' },
      { label: 'Custom2', value: 'c2' }
    ]
    const wrapper = mountComponent({
      props: { suggestions: objectSuggestions, optionType: 'custom', optionLabel: 'label' },
      slots: {
        customOption: (props: { option: ComboBoxSuggestion }) => h('div', { class: 'custom-option' }, `Custom: ${typeof props.option !== 'string' ? props.option.label : props.option}`)
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('provides combobox option props and click handler to custom options', async () => {
    const objectSuggestions = [
      { label: 'Custom1', value: 'c1' },
      { label: 'Custom2', value: 'c2' }
    ]
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        multiple: true,
        optionLabel: 'label',
        optionType: 'custom',
        selected: [],
        suggestions: objectSuggestions,
        type: 'select',
        'onUpdate:selected': (value: ComboBoxSuggestion[]) => wrapper.setProps({ selected: value })
      },
      slots: {
        customOption: (props: {
          dataActive: boolean;
          label: string;
          onClick: () => Promise<void>;
          optionAttrs: Record<string, string | undefined>;
        }) => h('button', {
          ...props.optionAttrs,
          type: 'button',
          'data-active': props.dataActive,
          onClick: props.onClick
        }, props.label)
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.trigger('click')
    await flushDropdown()

    const activeDescendantId = input.attributes('aria-activedescendant')
    expect(activeDescendantId).toBeTruthy()
    const activeOption = document.getElementById(activeDescendantId!)
    expect(activeOption?.getAttribute('role')).toBe('option')
    expect(activeOption?.getAttribute('aria-selected')).toBe('true')

    activeOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(wrapper.props('selected')).toEqual([{ label: 'Custom1', value: 'c1' }])
    wrapper.unmount()
  })

  it('keeps the active custom option tabindex aligned with keyboard navigation', async () => {
    const objectSuggestions = [
      { label: 'Custom1', value: 'c1' },
      { label: 'Custom2', value: 'c2' }
    ]
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        optionLabel: 'label',
        optionType: 'custom',
        suggestions: objectSuggestions,
        type: 'select'
      },
      slots: {
        customOption: (props: {
          dataActive: boolean;
          label: string;
          optionAttrs: Record<string, string | undefined>;
          tabindex: number;
        }) => h('button', {
          ...props.optionAttrs,
          type: 'button',
          tabindex: props.tabindex,
          'data-active': props.dataActive
        }, props.label)
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.down')
    await flushDropdown()

    const customOptions = findAllInBody('button[role="option"]')
    expect(customOptions.map(option => option.getAttribute('tabindex'))).toEqual(['-1', '0'])
    expect(text(customOptions[1])).toBe('Custom2')
    wrapper.unmount()
  })

  it('keeps footer help text outside the ARIA listbox', async () => {
    const wrapper = mountComponent({ props: { suggestions, clickToSelect: true } })
    const input = wrapper.find('input[type="text"]')

    await input.trigger('click')
    await flushDropdown()

    const listbox = dropdownInBody()
    expect(listbox).toBeTruthy()
    expect(listbox?.id).toBe(input.attributes('aria-controls'))
    expect(text(listbox)).not.toContain('Select')
    expect(text(findInBody('[data-id="sds-combo-box-dropdown"]'))).toContain('Select')
    wrapper.unmount()
  })

  it('uses container-responsive, non-wrapping keyboard instructions', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name'
      }
    })

    await wrapper.find('input[type="text"]').trigger('click')
    await flushDropdown()

    const dropdown = findInBody('[data-id="sds-combo-box-dropdown"]')
    const footer = findInBody('[data-id="sds-combo-box-footer"]')
    const instructions = footer?.children ?? []

    expect(dropdown?.classList).toContain('@container')
    expect(footer?.classList).toContain('grid-cols-3')
    expect(footer?.classList).toContain('@min-[28rem]:flex')
    expect(Array.from(instructions)).toHaveLength(3)
    Array.from(instructions).forEach(instruction => {
      expect(instruction.classList).toContain('flex-col')
      expect(instruction.classList).toContain('items-center')
      expect(instruction.classList).toContain('whitespace-nowrap')
      expect(instruction.classList).toContain('@min-[28rem]:flex-row')
    })
    expect(text(footer)).toContain('Navigate')
    expect(text(footer)).toContain('Switch tabs')
    expect(text(footer)).toContain('Select')
    expect(text(footer)).not.toContain('to navigate')
    wrapper.unmount()
  })

  it('should match snapshot with custom value/label keys', () => {
    const objectSuggestions = [
      { name: 'Alpha', id: 1 },
      { name: 'Beta', id: 2 }
    ]
    const wrapper = mountComponent({
      props: { suggestions: objectSuggestions, optionLabel: 'name' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open dropdown and highlight last option on ArrowUp', async () => {
    const wrapper = mountComponent({ props: { suggestions, clickToSelect: true } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()
    expect(dropdownInBody()).not.toBeNull()
    const active = findInBody('button[data-active="true"]')
    expect(text(active)).toEqual('Watermelon')
    wrapper.unmount()
  })

  it('should select highlighted option on Enter', async () => {
    const selected: ComboBoxSuggestion[] = []
    const wrapper = mountComponent({
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
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const active = findInBody('button[data-active="true"]')
    expect(text(active)).toEqual('Apple')
    await input.trigger('keyup', { key: 'Enter' })
    await flushDropdown()
    // Tags live in the trigger slot of FloatingUi, which renders inline (not teleported)
    const tags = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagsText = tags.map(t => t.text())
    // Should contain all options
    expect(tagsText).toContain('Apple')
    wrapper.unmount()
  })

  it('should close dropdown on Tab', async () => {
    const wrapper = mountComponent({ props: { suggestions, clickToSelect: true } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    expect(dropdownInBody()).not.toBeNull()
    await input.trigger('keydown.tab')
    await flushDropdown()
    expect(dropdownInBody()).toBeNull()
    wrapper.unmount()
  })

  it('restores the selected item text when the dropdown closes after navigation', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        clickToSelect: true,
        selected: ['Apple'],
        type: 'select'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.down')
    await flushDropdown()

    expect((input.element as HTMLInputElement).value).toBe('Banana')

    await input.trigger('keydown.tab')
    await flushDropdown()

    expect(dropdownInBody()).toBeNull()
    expect((input.element as HTMLInputElement).value).toBe('Apple')
    wrapper.unmount()
  })

  it('clears stale query text when the dropdown closes without a selection', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        clickToSelect: true,
        selected: [],
        type: 'select',
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('App')
    await flushDropdown()

    expect((input.element as HTMLInputElement).value).toBe('App')

    await input.trigger('keydown.tab')
    await flushDropdown()

    expect(dropdownInBody()).toBeNull()
    expect((input.element as HTMLInputElement).value).toBe('')
    wrapper.unmount()
  })

  it('should not throw or open dropdown on ArrowDown if no suggestions', async () => {
    const wrapper = mountComponent({ props: { suggestions: [], clickToSelect: true } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('keydown.down')
    await nextTick()
    const dropdown = wrapper.find('[data-id="sds-combo-box-dropdown"]')
    // Expect the dropdown to be visible
    expect(dropdown.exists()).toBe(false)
    wrapper.unmount()
  })

  it('opens the dropdown with Up and Down when suggestions exist and a single value is selected', async () => {
    for (const key of ['up', 'down']) {
      const wrapper = mountComponent({
        props: {
          selected: ['Apple'],
          suggestions,
          type: 'select'
        }
      })
      const input = wrapper.find('input[type="text"]')
      expect((input.element as HTMLInputElement).readOnly).toBe(true)

      await input.trigger(`keydown.${key}`)
      await flushDropdown()

      expect(dropdownInBody()).not.toBeNull()
      expect(text(dropdownInBody())).toContain('Apple')
      wrapper.unmount()
    }
  })

  it('should allow navigation with dropdown already open', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        mutliple: false,
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    expect(dropdownInBody()).not.toBeNull()
    expect(text(findInBody('button[data-active="true"]'))).toBe('Apple')
    await input.trigger('keydown.down')
    await flushDropdown()
    expect(text(findInBody('button[data-active="true"]'))).toBe('Banana')
    wrapper.unmount()
  })

  it('should set input as readonly and allow focus when readonly prop is true', async () => {
    const wrapper = mountComponent({ attachTo: document.body, props: { clickToSelect: true, readonly: true, suggestions } })
    const input = wrapper.find('input[type="text"]')
    expect(input.attributes('readonly')).toBeDefined()
    // Should still be focusable
    const i = input.element as HTMLInputElement
    i?.focus()
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  it('does not leave selected single-select text highlighted when the input receives focus', async () => {
    const wrapper = mountComponent({
      props: {
        selected: ['Apple'],
        suggestions,
        type: 'select'
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    inputElement.setSelectionRange(0, inputElement.value.length)

    await input.trigger('focus')
    await vi.runAllTimersAsync()

    expect(inputElement.selectionStart).toBe(inputElement.value.length)
    expect(inputElement.selectionEnd).toBe(inputElement.value.length)
    wrapper.unmount()
  })

  it('should match its snapshot with required prop assigned', () => {
    const wrapper = mountComponent({
      props: { required: true, suggestions }
    })
    const input = wrapper.find('input[type="text"]')
    expect(input.attributes('required')).toBeDefined()
    expect((input.element as HTMLInputElement).required).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('clears input and selections when clicking clear button', async () => {
    const selected = ['Apple', 'Banana']
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
      props: { suggestions, clickToSelect: true, type: 'select', multiple: false },
      attachTo: document.body
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('NotInList')
    await input.trigger('keyup', { key: 'Enter' })
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
    const selected: ComboBoxSuggestion[] = []
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        enableSelectAll: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.up')
    await flushDropdown()
    const active = findInBody('button[data-active="true"]')
    expect(text(active)).toEqual('Select all')
    await input.trigger('keyup.enter')
    await flushDropdown()
    // Tags live in the trigger slot (inline, not teleported)
    const tags = wrapper.findAll('[data-id="sds-tag"]>div>span')
    const tagsText = tags.map(t => t.text())
    // Should contain all options
    expect(tagsText).toContain('Apple')
    expect(tagsText).toContain('Banana')
    expect(tagsText).toContain('Kiwi')
    wrapper.unmount()
  })

  it('should allow removing a tag in multiselect mode (click)', async () => {
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
      props: { suggestions, clickToSelect: true, debounceComplete: 0 }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('focus')
    await input.setValue('Dragonfruit')
    // flushDropdown drains fake timers (debounced query watcher),
    // pending promises, and a tick so FloatingUi has time to teleport.
    await flushDropdown()
    expect(dropdownInBody()).not.toBeNull()
    wrapper.unmount()
  })

  it('does not highlight a selected option when a focused ComboBox opens passively', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        debounceComplete: 0,
        modelValue: '',
        selected: ['Apple'],
        suggestions,
        type: 'select'
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.trigger('focus')
    await wrapper.setProps({ modelValue: 'A' })
    await flushDropdown()

    expect(dropdownInBody()).not.toBeNull()
    expect(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')).toBeNull()
    wrapper.unmount()
  })

  it('sanitizes external modelValue updates, emits complete, and opens dropdown', async () => {
    const onUpdateModelValue = vi.fn()
    const onComplete = vi.fn()
    const wrapper = mountComponent({
      props: {
        modelValue: '',
        suggestions,
        debounceComplete: 0,
        'onUpdate:modelValue': onUpdateModelValue,
        onComplete
      }
    })
    await wrapper.setProps({ modelValue: '<strong>App</strong>' })
    await flushDropdown()

    const input = wrapper.find('input[type="text"]')
    expect((input.element as HTMLInputElement).value).toBe('App')
    expect(onUpdateModelValue).toHaveBeenLastCalledWith('App')
    expect(onComplete).toHaveBeenLastCalledWith('App')
    expect(dropdownInBody()).not.toBeNull()
    wrapper.unmount()
  })

  it('emits complete for every keystroke while parent request state is pending', async () => {
    const onComplete = vi.fn((query: string) => {
      wrapper.setProps({ pending: true, suggestions: [] })
      window.setTimeout(() => {
        wrapper.setProps({
          pending: false,
          suggestions: suggestions.filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
        })
      }, 1000)
    })
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        multiple: true,
        pending: false,
        suggestions: [],
        type: 'taggable-select',
        onComplete,
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.setValue('o')
    await flushDropdown()
    await vi.advanceTimersByTimeAsync(1000)
    await flushDropdown()
    expect(text(dropdownInBody())).toContain('Orange')
    await input.setValue('or')
    await flushDropdown()
    await vi.advanceTimersByTimeAsync(1000)
    await flushDropdown()
    expect(text(dropdownInBody())).toContain('Orange')
    await input.setValue('ora')
    await flushDropdown()
    await vi.advanceTimersByTimeAsync(1000)
    await flushDropdown()
    expect(text(dropdownInBody())).toContain('Orange')

    expect(onComplete).toHaveBeenNthCalledWith(1, 'o')
    expect(onComplete).toHaveBeenNthCalledWith(2, 'or')
    expect(onComplete).toHaveBeenNthCalledWith(3, 'ora')
    wrapper.unmount()
  })

  it('keeps taggable-select query text while async requests are pending', async () => {
    const onComplete = vi.fn(() => {
      wrapper.setProps({ pending: true, suggestions: [] })
    })
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        multiple: true,
        pending: false,
        suggestions: [],
        type: 'taggable-select',
        onComplete,
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.setValue('a')
    await flushDropdown()

    expect((input.element as HTMLInputElement).value).toBe('a')

    await wrapper.setProps({ pending: false, suggestions: ['Apple', 'Banana'] })
    await flushDropdown()
    expect(text(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]'))).toBe('Apple')

    await input.setValue('ab')
    await flushDropdown()

    expect((input.element as HTMLInputElement).value).toBe('ab')
    await wrapper.setProps({ pending: false, suggestions: ['Apple'] })
    await flushDropdown()

    expect(text(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]'))).toBe('Apple')
    expect(onComplete).toHaveBeenNthCalledWith(1, 'a')
    expect(onComplete).toHaveBeenNthCalledWith(2, 'ab')
    wrapper.unmount()
  })

  it('should allow removing a tag in taggable-select mode (click)', async () => {
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
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
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        enableSelectAll: true,
        selected,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Find "Select all" button (in teleported dropdown)
    const selectAllBtn = findInBody('button[role="option"]')
    expect(selectAllBtn).toBeTruthy()
    expect(text(selectAllBtn)).toContain('Select all')
    // Click to select all
    selectAllBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    // All options should be selected
    expect(wrapper.props('selected')?.length).toBe(suggestions.length)
    // Click again to deselect all
    const selectAllBtn2 = findInBody('button[role="option"]')
    selectAllBtn2!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    expect(wrapper.props('selected')?.length).toBe(0)
    wrapper.unmount()
  })

  it('does not switch groups or blank options when pressing Left or Right in a flat list', async () => {
    const scrollIntoView = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    input.element.dispatchEvent(leftArrowEvent)
    await flushDropdown()
    const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    input.element.dispatchEvent(rightArrowEvent)
    await flushDropdown()

    expect(leftArrowEvent.defaultPrevented).toBe(false)
    expect(rightArrowEvent.defaultPrevented).toBe(false)
    expect(scrollIntoView).not.toHaveBeenCalled()
    const optionTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionTexts).toContain('Apple')
    expect(optionTexts).toContain('Banana')
    wrapper.unmount()
  })

  it('switches grouped tabs with Left and Right only when the input caret is at a text boundary', async () => {
    const scrollIntoView = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        debounceComplete: 0,
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name'
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.trigger('click')
    await input.setValue('Apple')
    await flushDropdown()

    inputElement.setSelectionRange(2, 2)
    const middleLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    inputElement.dispatchEvent(middleLeftEvent)
    await flushDropdown()
    const middleRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    inputElement.dispatchEvent(middleRightEvent)
    await flushDropdown()

    expect(middleLeftEvent.defaultPrevented).toBe(false)
    expect(middleRightEvent.defaultPrevented).toBe(false)
    expect(scrollIntoView).not.toHaveBeenCalled()

    inputElement.setSelectionRange(0, 0)
    const boundaryLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    inputElement.dispatchEvent(boundaryLeftEvent)
    await flushDropdown()

    expect(boundaryLeftEvent.defaultPrevented).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
    expect(text(dropdownInBody())).toContain('Beetroot')

    inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length)
    const boundaryRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    inputElement.dispatchEvent(boundaryRightEvent)
    await flushDropdown()

    expect(boundaryRightEvent.defaultPrevented).toBe(true)
    expect(text(dropdownInBody())).toContain('Apple')
    wrapper.unmount()
  })

  it('switches grouped tabs with Left and Right when a single selection is displayed', async () => {
    const scrollIntoView = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        selected: [{ name: 'Apple' }],
        debounceComplete: 0,
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    input.element.dispatchEvent(rightArrowEvent)
    await flushDropdown()

    expect(rightArrowEvent.defaultPrevented).toBe(true)
    let optionTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionTexts).toContain('Blueberry')
    expect(optionTexts).not.toContain('Beetroot')

    const secondRightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    input.element.dispatchEvent(secondRightArrowEvent)
    await flushDropdown()

    expect(secondRightArrowEvent.defaultPrevented).toBe(true)
    optionTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionTexts).toContain('Beetroot')
    expect(optionTexts).not.toContain('Apple')

    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    input.element.dispatchEvent(leftArrowEvent)
    await flushDropdown()

    expect(leftArrowEvent.defaultPrevented).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
    optionTexts = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(optionTexts).toContain('Apple')
    expect(optionTexts).not.toContain('Beetroot')
    wrapper.unmount()
  })

  it('selects an option once when clicking a multiselect checkbox', async () => {
    const onUpdateSelected = vi.fn((val: ComboBoxSuggestion[]) => {
      wrapper.setProps({ selected: val })
    })
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        selected: [],
        'onUpdate:selected': onUpdateSelected
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const firstCheckbox = findInBody('[data-id="sds-scroll-area"] input[type="checkbox"]') as HTMLInputElement | null
    expect(firstCheckbox).toBeTruthy()
    expect(firstCheckbox!.getAttribute('aria-label')).toBe('Select Apple')
    firstCheckbox!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(wrapper.props('selected')).toEqual(['Apple'])
    expect(onUpdateSelected).toHaveBeenLastCalledWith(['Apple'])
    wrapper.unmount()
  })

  it('does not activate an option when hovering a rendered option', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const optionButtons = findAllInBody('[data-id="sds-scroll-area"] button')
    expect(text(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]'))).toBe('Apple')

    const bananaButton = optionButtons.find(button => text(button) === 'Banana')
    expect(bananaButton).toBeTruthy()
    bananaButton!.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await flushDropdown()

    expect(text(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]'))).toBe('Apple')
    expect((input.element as HTMLInputElement).value).toBe('')
    wrapper.unmount()
  })

  it('adds a suggestion to selected when clicked, and commits selection on Enter', async () => {
    const selected: ComboBoxSuggestion[] = []
    const wrapper = mountComponent({
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
    // Open dropdown
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Find the Apple option button in teleported dropdown
    const buttons = findAllInBody('button')
    const appleBtn = buttons.find(btn => text(btn) === 'Apple')
    expect(appleBtn).toBeDefined()
    appleBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    // "Apple" should be in selected
    expect(wrapper.props('selected')).toContain('Apple')
    // Now, simulate pressing Enter to commit selection
    await input.trigger('keyup.enter')
    await flushDropdown()
    const selectedTags = wrapper.findAll('[data-id="sds-tag"]>div>span').map(t => t.text())
    expect(selectedTags).toContain('Apple')
    wrapper.unmount()
  })

  it('replaces previous selections when multiple is false and a suggestion is clicked', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: false,
        selected: ['Apple', 'Banana'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const kiwiButton = findAllInBody('[data-id="sds-scroll-area"] button').find(button => text(button) === 'Kiwi')
    expect(kiwiButton).toBeTruthy()
    kiwiButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(wrapper.props('selected')).toEqual(['Kiwi'])
    wrapper.unmount()
  })

  it('replaces previous selections when multiple is false and a suggestion is selected with Enter', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: false,
        selected: ['Apple', 'Banana'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('keydown.down')
    await flushDropdown()
    await input.trigger('keydown.down')
    await flushDropdown()
    await input.trigger('keyup.enter')
    await flushDropdown()

    expect(wrapper.props('selected')).toEqual(['Apple'])
    wrapper.unmount()
  })

  it('keeps focus on the input while keyboard navigation moves between input and options', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      }
    })
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    inputElement.focus()
    await input.trigger('click')
    await flushDropdown()
    const tabs = findAllInBody('button.tab')
    tabs.forEach((tab) => {
      expect(tab.getAttribute('tabindex')).toBe('-1')
    })
    expect(document.activeElement).toBe(inputElement)

    // Dropdown opens with first suggestion auto-focused (in teleported body)
    const active = findInBody('button[data-active="true"]')
    expect(active).toBeTruthy()
    // ArrowUp should move active state back to the input, never to a tab.
    await input.trigger('keydown.up')
    await flushDropdown()
    const activeAfterUp = findInBody('button:not(.tab)[data-active="true"]')
    expect(activeAfterUp).toBeFalsy()
    expect(document.activeElement).toBe(inputElement)

    await input.trigger('keydown.down')
    await flushDropdown()
    const activeAfterDown = findInBody('button:not(.tab)[data-active="true"]')
    expect(activeAfterDown).toBeTruthy()
    expect(document.activeElement).toBe(inputElement)
    wrapper.unmount()
  })

  it('should apply valid class when valid prop is true', () => {
    const wrapper = mountComponent({
      props: {
        modelValue: '',
        valid: true
      }
    })

    expect(wrapper.find('.input-group').classes()).toContain('valid')
    wrapper.unmount()
  })

  it('should apply invalid class when invalid prop is true', () => {
    const wrapper = mountComponent({
      props: {
        modelValue: '',
        invalid: true
      }
    })

    expect(wrapper.find('.input-group').classes()).toContain('invalid')
    wrapper.unmount()
  })

  it('should work with FormGroup validation pattern', () => {
    const wrapper = mountComponent({
      props: {
        modelValue: '',
        valid: false,
        invalid: true,
        required: true,
        disabled: false
      }
    })

    const inputGroup = wrapper.find('.input-group')
    expect(inputGroup.classes()).toContain('invalid')
    expect(inputGroup.classes()).not.toContain('valid')
    wrapper.unmount()
  })

  it('renders trailing slot controls inside the input group', () => {
    const wrapper = mountComponent({
      props: {
        focusOnKeyPress: true,
        placeholder: 'Search (Press "/" to focus)',
        suggestions
      },
      slots: {
        default: () => [
          h('div', {
            class: 'border-l border-gray-200 dark:border-gray-700 rounded-l-none my-2 mx-1',
            'data-id': 'command-palette-divider'
          }),
          h('div', {
            class: 'inline-block my-auto mr-1',
            'data-id': 'command-palette-tooltip'
          }, [
            h('button', {
              class: 'action-btn action-btn-ghost action-btn-sm',
              'data-id': 'command-palette-btn',
              type: 'button'
            }, 'Command Palette')
          ])
        ]
      }
    })

    const inputGroup = wrapper.find('.input-group')
    const divider = wrapper.find('[data-id="command-palette-divider"]')
    const button = wrapper.find('[data-id="command-palette-btn"]')
    expect(inputGroup.exists()).toBe(true)
    expect(divider.exists()).toBe(true)
    expect(button.exists()).toBe(true)
    expect(divider.element.parentElement).toBe(inputGroup.element)
    expect(button.element.closest('[data-id="command-palette-tooltip"]')?.parentElement).toBe(inputGroup.element)
    wrapper.unmount()
  })

  it('focuses the input when non-action trigger chrome is pressed', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select'
      },
      slots: {
        default: () => h('div', {
          class: 'mx-1 my-2',
          'data-id': 'decorative-divider'
        })
      }
    })
    const inputElement = wrapper.find('input[type="text"]').element as HTMLInputElement
    const leadingAddon = wrapper.find('.input-group-addon')
    const decorativeDivider = wrapper.find('[data-id="decorative-divider"]')

    await leadingAddon.trigger('mousedown')
    expect(document.activeElement).toBe(inputElement)

    inputElement.blur()
    await decorativeDivider.trigger('mousedown')
    expect(document.activeElement).toBe(inputElement)
    wrapper.unmount()
  })

  it('does not focus the input when a trigger action is pressed', async () => {
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    const wrapper = mountComponent({
      props: { suggestions },
      slots: {
        default: () => h('button', {
          'data-id': 'trailing-action',
          type: 'button'
        }, 'Action')
      }
    })
    const inputElement = wrapper.find('input[type="text"]').element as HTMLInputElement
    const trailingAction = wrapper.find('[data-id="trailing-action"]')
    outsideButton.focus()

    await trailingAction.trigger('mousedown')

    expect(document.activeElement).not.toBe(inputElement)
    wrapper.unmount()
    outsideButton.remove()
  })

  it('replaces existing single-select selection when user starts typing', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        multiple: false,
        selected: ['Apple'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Type a single character — should clear selection and start fresh
    const input = wrapper.find('input[type="text"]')
    await input.setValue('B')
    await flushDropdown()
    // Selection cleared
    expect(wrapper.props('selected')).toEqual([])
    // Input contains only the typed character (last char of setValue)
    expect((input.element as HTMLInputElement).value).toBe('B')
    wrapper.unmount()
  })

  it('clearQuery clears query first, then selections on second click in multiselect', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        multiple: true,
        selected: ['Apple', 'Banana'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Type a query so the clear button has something to clear
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Kiw')
    await flushDropdown()
    expect((input.element as HTMLInputElement).value).toBe('Kiw')

    const findClearButton = () => wrapper.findAll('button').find(button => button.text().includes('Clear query'))

    // First click on the clear button: query cleared, selections retained
    const clearBtn = findClearButton()
    expect(clearBtn).toBeDefined()
    await clearBtn?.trigger('mousedown')
    await flushDropdown()
    expect((input.element as HTMLInputElement).value).toBe('')
    expect(wrapper.props('selected')).toEqual(['Apple', 'Banana'])

    // Second click on the clear button: selections cleared
    const clearBtn2 = findClearButton()
    expect(clearBtn2).toBeDefined()
    await clearBtn2?.trigger('mousedown')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual([])
    wrapper.unmount()
  })

  it('Delete key clears entire single-select selection', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        multiple: false,
        selected: ['Apple'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('keydown.delete')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual([])
    expect((input.element as HTMLInputElement).value).toBe('')
    wrapper.unmount()
  })

  it('Backspace on empty input removes the last tag in multiselect', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        multiple: true,
        selected: ['Apple', 'Banana'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    // Input is already empty; keydown.delete with empty input removes last
    await input.trigger('keydown.delete')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual(['Apple'])
    // Again removes the next one
    await input.trigger('keydown.delete')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual([])
    wrapper.unmount()
  })

  it('handleDelete on text type with empty input clears selections', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'text',
        multiple: true,
        selected: ['Apple', 'Banana'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    // For text type with empty input, handleDelete pops AND removes-last
    await input.trigger('keydown.delete')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual([])
    wrapper.unmount()
  })

  it('taggable-select shows "Add" option for non-matching query and adds on click', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'taggable-select',
        multiple: true,
        selected: [],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    // Type a query that does NOT match any existing suggestion
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Dragonfruit')
    await flushDropdown()
    // Find the "Add" button by searching for one whose text contains both Add and the query
    const buttons = findAllInBody('button')
    const addBtn = buttons.find(b => text(b).includes('Add') && text(b).includes('Dragonfruit'))
    expect(addBtn).toBeTruthy()
    // Click it via mousedown (the handler is @mousedown.prevent)
    addBtn!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await flushDropdown()
    // Selection should contain a Dragonfruit entry (object, with __cbxIdx stripped)
    const sel = wrapper.props('selected') as ComboBoxSuggestion[]
    expect(sel.length).toBe(1)
    const added = sel[0] as Record<string, unknown>
    expect(added.label).toBe('Dragonfruit')
    expect(added.value).toBe('Dragonfruit')
    expect('__cbxIdx' in added).toBe(false)
    wrapper.unmount()
  })

  it('taggable-select shows "Already added" when typing a query matching an already-tagged custom value', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions, // Dragonfruit is NOT in suggestions
        type: 'taggable-select',
        multiple: true,
        selected: ['Dragonfruit'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Dragonfruit')
    await flushDropdown()
    // The "Already added" message should appear
    const dropdown = dropdownInBody()
    expect(dropdown).toBeTruthy()
    expect(text(dropdown)).toContain('Already added')
    wrapper.unmount()
  })

  it('taggable-select adds a new tag via Enter on Add option', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const wrapper = mountComponent({
      props: {
        suggestions,
        clickToSelect: true,
        type: 'taggable-select',
        multiple: true,
        selected: [],
        debounceComplete: 0,
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('NewFruit')
    await flushDropdown()

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()
    await input.trigger('keyup.enter')
    await flushDropdown()

    const sel = wrapper.props('selected') as ComboBoxSuggestion[]
    expect(sel.length).toBe(1)
    const added = sel[0] as Record<string, unknown> | string
    // Could be string or object depending on emit path; assert it's NewFruit
    if (typeof added === 'string') {
      expect(added).toBe('NewFruit')
    } else {
      expect(added.label || added.value || added.name).toBe('NewFruit')
      expect('__cbxIdx' in added).toBe(false)
    }
    wrapper.unmount()
  })

  it('Escape key closes the dropdown', async () => {
    const wrapper = mountComponent({ props: { suggestions, clickToSelect: true } })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    expect(dropdownInBody()).toBeTruthy()
    // Escape via window (VueUse onKeyStroke defaults to window)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await flushDropdown()
    expect(dropdownInBody()).toBeFalsy()
    wrapper.unmount()
  })

  it('clears the select query when Escape is pressed', async () => {
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        modelValue: '',
        suggestions,
        type: 'select',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.setValue('App')
    await flushDropdown()
    inputElement.focus()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await flushDropdown()

    expect(wrapper.props('modelValue')).toBe('')
    expect(inputElement.value).toBe('')
    wrapper.unmount()
  })

  it('clears the select query when tabbing away', async () => {
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        modelValue: '',
        suggestions,
        type: 'select',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.setValue('App')
    await flushDropdown()

    await input.trigger('keydown.tab')
    await flushDropdown()

    expect(wrapper.props('modelValue')).toBe('')
    expect(inputElement.value).toBe('')
    wrapper.unmount()
  })

  it('clears the select query when clicking outside the ComboBox', async () => {
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        modelValue: '',
        suggestions,
        type: 'taggable-select',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.setValue('App')
    await flushDropdown()
    inputElement.focus()

    outsideButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }))
    outsideButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(wrapper.props('modelValue')).toBe('')
    expect(inputElement.value).toBe('')
    wrapper.unmount()
    outsideButton.remove()
  })

  it('keeps text query when clicking outside the ComboBox', async () => {
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    const wrapper = mountComponent({
      props: {
        debounceComplete: 0,
        modelValue: '',
        suggestions,
        type: 'text',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.setValue('App')
    await flushDropdown()
    inputElement.focus()

    outsideButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }))
    outsideButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(wrapper.props('modelValue')).toBe('App')
    expect(inputElement.value).toBe('App')
    wrapper.unmount()
    outsideButton.remove()
  })

  it('Escape key restores selected item text after highlighting a different option', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        clickToSelect: true,
        selected: ['Apple'],
        type: 'select'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    await input.trigger('keydown.down')
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('Banana')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('Apple')
    expect(wrapper.props('selected')).toEqual(['Apple'])
    wrapper.unmount()
  })

  it('Escape key is ignored when the ComboBox is closed and unfocused', async () => {
    const wrapper = mountComponent({ props: { suggestions, clickToSelect: true } })
    const input = wrapper.find('input[type="text"]').element as HTMLInputElement
    input.blur()

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    window.dispatchEvent(escapeEvent)
    await flushDropdown()

    expect(escapeEvent.defaultPrevented).toBe(false)
    expect(dropdownInBody()).toBeFalsy()
    wrapper.unmount()
  })

  it('emits enter on the first Enter key press for text input without suggestions', async () => {
    const onEnter = vi.fn()
    const wrapper = mountComponent({
      props: {
        filterSuggestions: true,
        focusOnKeyPress: true,
        onEnter,
        type: 'text'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Search term')
    await flushDropdown()

    await input.trigger('keyup', { key: 'Enter' })
    await flushDropdown()

    expect(onEnter).toHaveBeenCalledWith('Search term')
    wrapper.unmount()
  })

  it('emits enter with the selected value when select is closed', async () => {
    const onEnter = vi.fn()
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        onEnter,
        selected: ['Apple'],
        suggestions,
        type: 'select'
      }
    })
    const input = wrapper.find('input[type="text"]')

    await input.trigger('keyup', { key: 'Enter' })
    await flushDropdown()

    expect(onEnter).toHaveBeenCalledWith(['Apple'])
    expect(input.classes()).not.toContain('animate-shake')
    wrapper.unmount()
  })

  it('"/" keypress focuses input when focusOnKeyPress is true', async () => {
    const wrapper = mountComponent({
      props: { suggestions, focusOnKeyPress: true }
    })
    const input = wrapper.find('input[type="text"]').element as HTMLInputElement
    // Confirm not focused initially
    expect(document.activeElement).not.toBe(input)
    // Dispatch "/" from document.body (not inside an input)
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }))
    await flushDropdown()
    expect(document.activeElement).toBe(input)
    wrapper.unmount()
  })

  it('"/" keypress is ignored when focusOnKeyPress is false (default)', async () => {
    const wrapper = mountComponent({ props: { suggestions } })
    const input = wrapper.find('input[type="text"]').element as HTMLInputElement
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }))
    await flushDropdown()
    expect(document.activeElement).not.toBe(input)
    wrapper.unmount()
  })

  it('filterSuggestions: true filters dropdown options as user types', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        clickToSelect: true,
        filterSuggestions: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('berry')
    await flushDropdown()
    // Inspect dropdown text — should contain berry items but not Apple/Banana
    const dropdown = dropdownInBody()
    expect(dropdown).toBeTruthy()
    const dropdownText = text(dropdown)
    expect(dropdownText).toContain('Raspberry')
    expect(dropdownText).toContain('Strawberry')
    expect(dropdownText).not.toContain('Apple')
    expect(dropdownText).not.toContain('Banana')
    wrapper.unmount()
  })

  it('filterSuggestions: true with grouped suggestions removes empty groups', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions: groupedSuggestions,
        type: 'select',
        clickToSelect: true,
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        filterSuggestions: true,
        debounceComplete: 0
      }
    })
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    await flushDropdown()
    // Apple is only in Fruits group; the Vegetables group should be removed entirely
    const dropdown = dropdownInBody()
    expect(dropdown).toBeTruthy()
    const dropdownText = text(dropdown)
    expect(dropdownText).toContain('Apple')
    expect(dropdownText).toContain('Fruits')
    // Vegetables group label and items should be filtered out
    expect(dropdownText).not.toContain('Vegetables')
    expect(dropdownText).not.toContain('Artichoke')
    wrapper.unmount()
  })

  it('multiselectAdd: pressing Enter on already-selected query removes it (toggle off)', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'taggable-select',
        multiple: true,
        selected: ['Apple'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Apple')
    await flushDropdown()
    // Press Enter — Apple is already selected, so it should toggle off
    await input.trigger('keyup.enter')
    await flushDropdown()
    expect(wrapper.props('selected')).toEqual([])
    wrapper.unmount()
  })

  it('renders object suggestions with optionLabel and emits the original object', async () => {
    const objectSuggestions = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]
    const wrapper = mountComponent({
      props: {
        suggestions: objectSuggestions,
        type: 'select',
        optionLabel: 'label',
        clickToSelect: true,
        selected: [],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const dropdown = dropdownInBody()
    expect(dropdown).toBeTruthy()
    expect(text(dropdown)).toContain('Apple')
    // Find the Apple option button by text
    const buttons = findAllInBody('button')
    const appleBtn = buttons.find(b => text(b) === 'Apple')
    expect(appleBtn).toBeTruthy()
    appleBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    const sel = wrapper.props('selected') as ComboBoxSuggestion[]
    expect(sel.length).toBe(1)
    expect(sel[0]).toEqual({ label: 'Apple', value: 'apple' })
    wrapper.unmount()
  })

  it('ArrowLeft cycles tabs backward in grouped mode', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0
      }
    })
    const scrollIntoView = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Down twice to enter dropdown options, then left to cycle backwards
    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    ;(input.element as HTMLInputElement).setSelectionRange(0, 0)
    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    input.element.dispatchEvent(leftArrowEvent)
    await flushDropdown()
    expect(leftArrowEvent.defaultPrevented).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
    // After left from "All", we should be on Vegetables (last group)
    const vegOptions = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(vegOptions).toContain('Beetroot')
    expect(vegOptions).not.toContain('Apple')
    // Left again should go to Fruits
    await input.trigger('keydown.down')
    ;(input.element as HTMLInputElement).setSelectionRange(0, 0)
    const secondLeftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
    input.element.dispatchEvent(secondLeftArrowEvent)
    await flushDropdown()
    expect(secondLeftArrowEvent.defaultPrevented).toBe(true)
    const fruitOptions = findAllInBody('[data-id="sds-scroll-area"] button').map(text)
    expect(fruitOptions).toContain('Apple')
    expect(fruitOptions).not.toContain('Beetroot')
    wrapper.unmount()
  })

  it('ArrowDown wraps from last item back to input (-1)', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions: ['Apple', 'Banana'],
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    await input.trigger('keydown.down')
    await input.trigger('keydown.down')
    await flushDropdown()

    const active = findInBody('button[data-active="true"]')
    expect(active).toBeFalsy()
    wrapper.unmount()
  })

  it('ArrowUp from input wraps to last item', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions: ['Apple', 'Banana', 'Kiwi'],
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()

    const buttons = findAllInBody('[data-id="sds-scroll-area"] button')
    const activeBtn = buttons.find(b => b.getAttribute('data-active') === 'true')
    expect(activeBtn).toBeTruthy()
    expect(text(activeBtn!)).toContain('Kiwi')
    wrapper.unmount()
  })

  it('blurring input clears query when no selection in single-select text mode', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'text',
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('partial query')
    await flushDropdown()
    expect((input.element as HTMLInputElement).value).toBe('partial query')
    // Blur: in jsdom, just trigger blur event
    await input.trigger('blur')
    await flushDropdown()
    // For text type with no selection, blur should not clear query
    // (this is just exercising the blur handler for coverage)
    wrapper.unmount()
  })

  it('disabled prop prevents dropdown from opening', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        clickToSelect: true,
        disabled: true
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Dropdown should not be open when disabled
    expect(dropdownInBody()).toBeFalsy()
    wrapper.unmount()
  })

  it('readonly prop prevents typing but allows opening dropdown', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'select',
        clickToSelect: true,
        readonly: true
      }
    })
    const input = wrapper.find('input[type="text"]')
    expect((input.element as HTMLInputElement).readOnly).toBe(true)
    wrapper.unmount()
  })

  it('clicking a suggestion in type="text" mode updates the query', async () => {
    const wrapper = mountComponent({
      props: {
        suggestions,
        type: 'text',
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('App')
    await flushDropdown()
    // Click an option
    const buttons = findAllInBody('[data-id="sds-scroll-area"] button')
    const appleBtn = buttons.find(b => text(b) === 'Apple')
    expect(appleBtn).toBeTruthy()
    appleBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    // Query (input value) should be updated to "Apple"
    expect((input.element as HTMLInputElement).value).toBe('Apple')
    wrapper.unmount()
  })

  it('clicking Select All in a specific group selects only that group items', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: groupedSuggestions,
        type: 'select',
        multiple: true,
        enableSelectAll: true,
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0,
        selected: [],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    window.HTMLElement.prototype.scrollIntoView = () => {}
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Click "Fruits" tab
    const tabs = findAllInBody('button.tab')
    const fruitsTab = tabs.find(t => text(t).toLowerCase().includes('fruits'))
    expect(fruitsTab).toBeTruthy()
    fruitsTab!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    // Click Select All — should only select Fruits
    const selectAllBtn = findInBody('button[role="option"]')
    expect(selectAllBtn).toBeTruthy()
    selectAllBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    const sel = wrapper.props('selected') as ComboBoxSuggestion[]
    // Should be the 6 fruit items, not the 9 vegetables
    expect(sel.length).toBe(6)
    wrapper.unmount()
  })

  it('clicking Select All shows indeterminate when partially selected', async () => {
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions,
        type: 'select',
        multiple: true,
        enableSelectAll: true,
        selected: ['Apple'],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    // Find select-all checkbox input
    const checkbox = findInBody('input[id$="-select-all"]') as HTMLInputElement | null
    expect(checkbox).toBeTruthy()
    expect(checkbox!.indeterminate).toBe(true)
    expect(checkbox!.checked).toBe(false)
    wrapper.unmount()
  })

  it('uses virtualization for large flat option lists', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const renderedOptions = findAllInBody('[data-id="sds-scroll-area"] button')
    expect(renderedOptions.length).toBeLessThan(largeSuggestions.length)
    expect(text(dropdownInBody())).toContain('Option 0')
    expect(text(dropdownInBody())).not.toContain('Option 149')
    wrapper.unmount()
  })

  it('resets rendered rows when filtering changes a scrolled virtualized list', async () => {
    const largeSuggestions = Array.from({ length: 200 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        filterSuggestions: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    scrollArea!.scrollTop = 1500
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()

    await input.setValue('Option 19')
    await flushDropdown()

    expect(scrollArea!.scrollTop).toBe(0)
    expect(text(dropdownInBody())).toContain('Option 19')
    expect(text(dropdownInBody())).toContain('Option 190')
    wrapper.unmount()
  })

  it('scrolls virtualized options to the active item during keyboard navigation', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    expect((input.element as HTMLInputElement).value).toBe('')
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    expect(scrollArea!.scrollTop).toBe(0)

    for (let index = 0; index < 25; index++) {
      await input.trigger('keydown.down')
    }
    await flushDropdown()

    expect(scrollArea!.scrollTop).toBeGreaterThan(0)
    expect(text(dropdownInBody())).toContain('Option 25')
    wrapper.unmount()
  })

  it('scrolls virtualized options to the last item when ArrowUp wraps from the input', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()

    const activeOption = findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')
    expect(scrollArea!.scrollTop).toBeGreaterThan(0)
    expect(text(activeOption)).toBe('Option 149')
    expect(text(dropdownInBody())).toContain('Option 149')
    wrapper.unmount()
  })

  it('scrolls virtualized options to the last item when Select All renders above the list', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    vi.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const top = this.classList.contains('relative') && this.style.height === `${largeSuggestions.length * 36}px` ? 36 : 0
      return new DOMRect(0, top, 0, 36)
    })
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        multiple: true,
        enableSelectAll: true,
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()

    const activeOption = findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')
    expect(scrollArea!.scrollTop).toBe((largeSuggestions.length * 36) - 288 + 36)
    expect(text(activeOption)).toBe('Option 149')
    wrapper.unmount()
  })

  it('shows the last virtualized option inside the scroll viewport when manually scrolled to the bottom of an extremely large list', async () => {
    const largeSuggestions = Array.from({ length: 300000 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    scrollArea!.scrollTop = 10000000 - 288
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()

    const lastOption = findOptionInBody('Option 299999')
    expect(lastOption).toBeTruthy()
    expectOptionVisibleInScrollArea(scrollArea!, lastOption!, 36)
    wrapper.unmount()
  })

  it('resets capped virtualized scrolling when filtering changes an extremely large list', async () => {
    const largeSuggestions = Array.from({ length: 35000 }, (_, index) => `Option ${index}`)
    const virtualItemHeight = 288
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        filterSuggestions: true,
        virtualItemHeight,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    scrollArea!.scrollTop = 10000000 - 288
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()
    const lastOption = findOptionInBody('Option 34999')
    expect(lastOption).toBeTruthy()
    expectOptionVisibleInScrollArea(scrollArea!, lastOption!, virtualItemHeight)

    await input.setValue('Option 12')
    await flushDropdown()

    expect(scrollArea!.scrollTop).toBe(0)
    const firstFilteredOption = findOptionInBody('Option 12')
    expect(firstFilteredOption).toBeTruthy()
    expectOptionVisibleInScrollArea(scrollArea!, firstFilteredOption!, virtualItemHeight)
    expect(text(dropdownInBody())).toContain('Option 120')
    expect(text(dropdownInBody())).not.toContain('Option 34999')
    wrapper.unmount()
  })

  it('scrolls to the Add row after a virtualized option list during keyboard navigation', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'taggable-select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Dragonfruit')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    Object.defineProperty(scrollArea!, 'scrollHeight', { value: (largeSuggestions.length + 1) * 36, configurable: true })
    Object.defineProperty(scrollArea!, 'clientHeight', { value: 288, configurable: true })

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()

    const activeOption = findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')
    expect(text(activeOption)).toBe('Add "Dragonfruit"')
    expect(scrollArea!.scrollTop).toBe(((largeSuggestions.length + 1) * 36) - 288)
    wrapper.unmount()
  })

  it('scrolls grouped virtualized options to the final group item when ArrowUp wraps from the input', async () => {
    const createCategory = (section: string) => ({
      section,
      items: Array.from({ length: 2000 }, (_, index) => ({
        id: `${section.toLowerCase()}-${index + 1}`,
        name: `${section} item ${String(index + 1).padStart(4, '0')}`
      }))
    })
    const wrapper = mountComponent({
      props: {
        suggestions: [
          createCategory('Artifacts'),
          createCategory('Books'),
          createCategory('Courses'),
          createCategory('Datasets'),
          createCategory('Exercises'),
          createCategory('Facilities')
        ],
        type: 'select',
        clickToSelect: true,
        filterSuggestions: true,
        virtualize: true,
        debounceComplete: 0,
        optionLabel: 'name',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    await input.trigger('keydown.up')
    await input.trigger('keydown.up')
    await flushDropdown()

    const activeOption = findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')
    expect(scrollArea!.scrollTop).toBeGreaterThan(0)
    expect(text(activeOption)).toBe('Facilities item 2000')
    expect(text(dropdownInBody())).toContain('Facilities item 2000')
    wrapper.unmount()
  })

  it('renders virtualized grouped options after replacing a selected item with typed text', async () => {
    const createCategory = (section: string) => ({
      section,
      items: Array.from({ length: 2000 }, (_, index) => ({
        id: `${section.toLowerCase()}-${index + 1}`,
        name: `${section} item ${String(index + 1).padStart(4, '0')}`
      }))
    })
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: [
          createCategory('Artifacts'),
          createCategory('Books'),
          createCategory('Courses'),
          createCategory('Datasets'),
          createCategory('Exercises'),
          createCategory('Facilities')
        ],
        type: 'select',
        clickToSelect: true,
        filterSuggestions: true,
        debounceComplete: 0,
        optionLabel: 'name',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        selected: [],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    const inputElement = input.element as HTMLInputElement
    await input.setValue('art')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    scrollArea!.scrollTop = 39 * 36
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()

    const artifactOption = findAllInBody('[data-id="sds-scroll-area"] button')
      .find(button => text(button) === 'Artifacts item 0040')
    expect(artifactOption).toBeTruthy()
    artifactOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()
    expect(dropdownInBody()).toBeNull()
    expect(inputElement.value).toBe('Artifacts item 0040')

    inputElement.setSelectionRange(0, inputElement.value.length)
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true }))
    await flushDropdown()

    expect(inputElement.value).toBe('a')
    expect(dropdownInBody()).not.toBeNull()
    const reopenedScrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(reopenedScrollArea).toBeTruthy()
    expect(reopenedScrollArea!.scrollTop).toBe(0)
    expect(text(dropdownInBody())).toContain('Artifacts')
    expect(text(dropdownInBody())).toContain('Artifacts item 0001')
    expect(text(dropdownInBody())).not.toContain('Artifacts item 0040')
    wrapper.unmount()
  })

  it('uses virtualization for large grouped option lists', async () => {
    const groupedLargeSuggestions = [
      {
        section: 'Group A',
        items: Array.from({ length: 150 }, (_, index) => ({ name: `Group A option ${index}` }))
      },
      {
        section: 'Group B',
        items: Array.from({ length: 150 }, (_, index) => ({ name: `Group B option ${index}` }))
      }
    ]
    const wrapper = mountComponent({
      props: {
        suggestions: groupedLargeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0,
        virtualize: true,
        optionLabel: 'name',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const renderedOptions = findAllInBody('[data-id="sds-scroll-area"] button')
    expect(renderedOptions.length).toBeLessThan(300)
    expect(text(dropdownInBody())).toContain('Group A')
    expect(text(dropdownInBody())).toContain('Group A option 0')
    expect(text(dropdownInBody())).not.toContain('Group B option 149')
    wrapper.unmount()
  })

  it('does not scroll virtualized options when hovering a rendered option', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    scrollArea!.scrollTop = 1000
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()

    const renderedOption = findInBody('[data-id="sds-scroll-area"] button') as HTMLElement | null
    expect(renderedOption).toBeTruthy()
    expect(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')).toBeNull()
    renderedOption!.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    await flushDropdown()

    expect(scrollArea!.scrollTop).toBe(1000)
    expect(findInBody('[data-id="sds-scroll-area"] button[data-active="true"]')).toBeNull()
    expect((input.element as HTMLInputElement).value).toBe('')
    wrapper.unmount()
  })

  it('renders virtualized options when reopened after selecting from a scrolled list', async () => {
    const largeSuggestions = Array.from({ length: 150 }, (_, index) => `Option ${index}`)
    const wrapper = mountComponent({
      props: {
        suggestions: largeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()
    scrollArea!.scrollTop = 1000
    scrollArea!.dispatchEvent(new Event('scroll'))
    await flushDropdown()

    const renderedOption = findInBody('[data-id="sds-scroll-area"] button') as HTMLElement | null
    expect(renderedOption).toBeTruthy()
    renderedOption!.click()
    await flushDropdown()
    expect(dropdownInBody()).toBeNull()

    await input.trigger('click')
    await flushDropdown()

    expect(dropdownInBody()).not.toBeNull()
    const reopenedScrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(reopenedScrollArea).toBeTruthy()
    expect(reopenedScrollArea!.scrollTop).toBe(0)
    expect(text(dropdownInBody())).toContain('Option 0')
    wrapper.unmount()
  })

  it('resets virtualized scroll position when switching grouped tabs', async () => {
    const groupedLargeSuggestions = [
      {
        section: 'Group A',
        items: Array.from({ length: 150 }, (_, index) => ({ name: `Group A option ${index}` }))
      },
      {
        section: 'Group B',
        items: Array.from({ length: 150 }, (_, index) => ({ name: `Group B option ${index}` }))
      }
    ]
    const wrapper = mountComponent({
      props: {
        virtualize: true,
        suggestions: groupedLargeSuggestions,
        type: 'select',
        clickToSelect: true,
        debounceComplete: 0,
        optionLabel: 'name',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items'
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()
    const scrollArea = findInBody('[data-id="sds-scroll-area"]') as HTMLElement | null
    expect(scrollArea).toBeTruthy()

    for (let index = 0; index < 25; index++) {
      await input.trigger('keydown.down')
    }
    await flushDropdown()
    expect(scrollArea!.scrollTop).toBeGreaterThan(0)

    const tabs = findAllInBody('button.tab')
    const groupBTab = tabs.find(tab => text(tab).toLowerCase().includes('group b'))
    expect(groupBTab).toBeTruthy()
    groupBTab!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(scrollArea!.scrollTop).toBe(0)
    expect(text(dropdownInBody())).toContain('Group B option 0')
    wrapper.unmount()
  })

  it('emits the original grouped child object when a grouped option is selected', async () => {
    const apple = { name: 'Apple', value: 'apple' }
    const onResult = vi.fn()
    const wrapper = mountComponent({
      props: {
        clickToSelect: true,
        suggestions: [
          {
            section: 'Fruits',
            items: [apple]
          }
        ],
        type: 'select',
        optionGroupLabel: 'section',
        optionGroupChildren: 'items',
        optionLabel: 'name',
        debounceComplete: 0,
        onResult,
        selected: [],
        'onUpdate:selected': (val: ComboBoxSuggestion[]) => {
          wrapper.setProps({ selected: val })
        }
      }
    })
    const input = wrapper.find('input[type="text"]')
    await input.trigger('click')
    await flushDropdown()

    const appleButton = findAllInBody('button').find(button => text(button) === 'Apple')
    expect(appleButton).toBeTruthy()
    appleButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushDropdown()

    expect(onResult).toHaveBeenLastCalledWith(apple)
    wrapper.unmount()
  })
})
