import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Component from './ComboBox.vue'
import type { ComboBoxSuggestion } from './ComboBox.vue'
import * as resizeObserver from '../../composables/useResizeObserver'

describe('ComboBox usability regressions', () => {
  enableAutoUnmount(afterEach)
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1440)
  })
  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
    vi.restoreAllMocks()
  })
  const flush = async () => {
    await vi.runAllTimersAsync()
    await flushPromises()
    await nextTick()
  }
  const options = () => Array.from(document.body.querySelectorAll<HTMLElement>('[role="listbox"] [role="option"]'))

  it.each([
    { type: 'select', interaction: 'click' },
    { type: 'select', interaction: 'Enter' },
    { type: 'taggable-select', interaction: 'click' },
    { type: 'taggable-select', interaction: 'Enter' }
  ] as const)('does not flash unfiltered $type suggestions after a single selection by $interaction', async ({ type, interaction }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, multiple: false, modelValue: '', selected: [],
        suggestions: ['Apple', 'Banana'], filterSuggestions: true,
        'onUpdate:modelValue': (modelValue: string) => wrapper.setProps({ modelValue }),
        'onUpdate:selected': (selected: ComboBoxSuggestion[]) => wrapper.setProps({ selected })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('Apple')
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Apple'])
    const visibleStates: string[][] = []
    const observer = new MutationObserver(() => {
      visibleStates.push(options().map(option => option.textContent?.trim() ?? ''))
    })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })

    try {
      if (interaction === 'click') options()[0].click()
      else await input.trigger('keyup.enter')
      await flush()
    } finally {
      observer.disconnect()
    }

    expect(wrapper.props('selected')).toEqual(['Apple'])
    expect(visibleStates.flat()).not.toContain('Banana')
    expect(document.querySelector('[role="listbox"]')).toBeNull()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.element.value).toBe('')
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it.each([
    { key: 'ArrowUp', query: '', grouped: false },
    { key: 'ArrowUp', query: '', grouped: true },
    { key: 'ArrowDown', query: 'Option 199', grouped: false }
  ])('reveals the active virtual option when opening with $key, query="$query", grouped=$grouped', async ({ key, query, grouped }) => {
    const suggestions = Array.from({ length: 200 }, (_, index) => `Option ${index}`)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', modelValue: query, selected: [], virtualize: true,
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped
          ? [{ label: 'First', items: suggestions.slice(0, 100) }, { label: 'Second', items: suggestions.slice(100) }]
          : suggestions
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')

    await input.trigger('keydown', { key })
    await flush()

    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    const active = document.getElementById(input.attributes('aria-activedescendant') ?? '')
    expect(active?.textContent?.trim()).toBe('Option 199')
    expect(list?.scrollTop).toBe((200 + (grouped ? 2 : 0)) * 36 - 288)
    expect(input.element.value).toBe('Option 199')
    expect(wrapper.emitted('complete')).toBeUndefined()
  })

  it('reveals the final nonvirtual option when Arrow Up opens the dropdown', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute('role') === 'listbox') return new DOMRect(0, 0, 300, 288)
      if (this.getAttribute('role') === 'option' && this.textContent?.trim() === 'Option 199') {
        const scrollTop = this.closest('[role="listbox"]')?.scrollTop ?? 0
        return new DOMRect(0, 199 * 36 - scrollTop, 300, 36)
      }
      return new DOMRect()
    })
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', modelValue: '', selected: [],
        suggestions: Array.from({ length: 200 }, (_, index) => `Option ${index}`)
      }
    })
    const input = wrapper.get('input[role="combobox"]')

    await input.trigger('keydown', { key: 'ArrowUp' })
    await flush()

    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    const active = document.getElementById(input.attributes('aria-activedescendant') ?? '')
    expect(active?.textContent?.trim()).toBe('Option 199')
    expect(list?.scrollTop).toBe(200 * 36 - 288)
  })

  it.each([150, 199])('reveals option %s after the initially zero-width popup receives its layout', async (index) => {
    const resizeCallbacks: (() => void)[] = []
    const observeResize = resizeObserver.useResizeObserver
    vi.spyOn(resizeObserver, 'useResizeObserver').mockImplementation((target, callback, options) => {
      resizeCallbacks.push(() => {
        const element = target.value
        if (!element) throw new Error('Expected a scroll container')
        callback({
          target: element, contentRect: new DOMRect(0, 0, 300, 288),
          borderBoxSize: [], contentBoxSize: [], devicePixelContentBoxSize: []
        })
      })
      return observeResize(target, callback, options)
    })
    let isLayoutReady = false
    const setScrollTop = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop')?.set
    if (!setScrollTop) throw new Error('Expected the native scrollTop setter')
    vi.spyOn(HTMLElement.prototype, 'scrollTop', 'set').mockImplementation(function (this: HTMLElement, value: number) {
      setScrollTop.call(this, isLayoutReady ? value : 0)
    })
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', modelValue: `Option ${index}`, selected: [], virtualize: true,
        suggestions: Array.from({ length: 200 }, (_, index) => `Option ${index}`)
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    expect(list?.scrollTop).toBe(0)

    isLayoutReady = true
    resizeCallbacks.forEach(callback => callback())
    await flush()

    expect(list?.scrollTop).toBe((index + 1) * 36 - 288)
    expect(document.getElementById(input.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe(`Option ${index}`)
  })

  it.each(['Escape', 'Tab'])('reopens dismissed grouped loading results with a fresh highlight after %s', async (key) => {
    const suggestions = Array.from({ length: 200 }, (_, index) => `Option ${index}`)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', multiple: true, selected: ['Saved'], virtualize: true, virtualizeThreshold: 1,
        optionGroupChildren: 'items',
        suggestions: [{ label: 'First', items: suggestions.slice(0, 100) }, { label: 'Second', items: suggestions.slice(100) }]
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('New')
    await flush()
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[2].click()
    await flush()
    await wrapper.setProps({ pending: true })
    await flush()

    await input.trigger('keydown', { key })
    await flush()
    await wrapper.setProps({ pending: false, suggestions: [{ label: 'Fresh', items: ['Fresh first', 'Fresh last'] }] })
    await flush()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)

    await input.trigger('click')
    await flush()

    const active = document.getElementById(input.attributes('aria-activedescendant') ?? '')
    expect(active?.textContent?.trim()).toBe('Fresh first')
    expect(active?.closest('[role="group"]')?.getAttribute('aria-label')).toBe('Fresh')
    expect(document.querySelector('[role="listbox"]')?.scrollTop).toBe(0)
    expect(input.element.value).toBe('')
    expect(wrapper.props('selected')).toEqual(['Saved'])
    expect(wrapper.emitted('open')).toHaveLength(2)
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('result')).toBeUndefined()
  })

  it.each([false, true])('preserves root and named-group option positions with virtualize=%s', async (virtualize) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', multiple: true, enableSelectAll: true, virtualize, virtualizeThreshold: 1,
        optionGroupChildren: 'items',
        suggestions: [
          'Apple',
          { label: 'Fruit', items: ['Banana', 'Cherry'] },
          'Date',
          { label: 'Vegetables', items: ['Eggplant', 'Fennel'] }
        ]
      }
    })

    await wrapper.get('input[role="combobox"]').setValue('New')
    await flush()

    expect(options().map(option => ({
      label: option.textContent?.trim(),
      position: option.getAttribute('aria-posinset'),
      size: option.getAttribute('aria-setsize'),
      group: option.closest('[role="group"]')?.getAttribute('aria-label')
    }))).toEqual([
      { label: 'Add "New"', position: '1', size: '4', group: undefined },
      { label: 'Select all', position: '2', size: '4', group: undefined },
      { label: 'Apple', position: '3', size: '4', group: undefined },
      { label: 'Banana', position: '1', size: '2', group: 'Fruit' },
      { label: 'Cherry', position: '2', size: '2', group: 'Fruit' },
      { label: 'Date', position: '4', size: '4', group: undefined },
      { label: 'Eggplant', position: '1', size: '2', group: 'Vegetables' },
      { label: 'Fennel', position: '2', size: '2', group: 'Vegetables' }
    ])
  })

  it.each([false, true])('replaces a single selection or toggles a repeated choice with multiple=%s', async (multiple) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple, selected: ['Apple'], suggestions: ['Apple', 'Banana'],
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[1].click()
    await flush()
    expect(wrapper.props('selected')).toEqual(multiple ? ['Apple', 'Banana'] : ['Banana'])

    await input.trigger('click')
    await flush()
    options()[1].click()
    await flush()

    expect(wrapper.props('selected')).toEqual(multiple ? ['Apple'] : ['Banana'])
    expect(wrapper.emitted('result')).toEqual([['Banana'], ['Banana']])
    expect(wrapper.emitted('complete')).toBeUndefined()
  })

  it.each(['text', 'select', 'taggable-select'] as const)('keeps %s open with only a loading view while pending', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple: true, enableSelectAll: true, suggestions: ['Apple', 'Banana'], messages: { loading: 'Searching...' } }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    input.element.focus()
    await input.setValue('New')
    await flush()
    const list = document.querySelector('[role="listbox"]')
    const staleOption = options()[0]
    await wrapper.setProps({ pending: true })
    await flush()
    staleOption.click()
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(document.querySelector('[role="listbox"]')).toBe(list)
    expect(list?.getAttribute('aria-busy')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')?.textContent).toContain('Searching...')
    expect(options()).toHaveLength(0)
    expect(document.querySelector('[data-id="sds-combo-box-categories"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-footer"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    expect(input.element.value).toBe('New')
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it.each(['text', 'select', 'taggable-select'] as const)('opens the loading view when typing into pending %s with no suggestions', async (type) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type, pending: true, suggestions: [] } })
    await wrapper.get('input[role="combobox"]').setValue('New')
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    expect(options()).toHaveLength(0)
    expect(wrapper.get('input[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it.each([false, true])('preserves tags and replaces virtualized options and actions with loading, grouped=%s', async (grouped) => {
    const suggestions = Array.from({ length: 200 }, (_, index) => `Option ${index}`)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', multiple: true, selected: ['Saved'], virtualize: true, enableSelectAll: true,
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped ? [{ label: 'Group', items: suggestions }] : suggestions
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('New')
    await flush()
    expect(document.querySelector('[data-id="sds-combo-box-categories"]') !== null).toBe(grouped)
    expect(document.querySelector('[data-id="sds-combo-box-actions"]')).not.toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-footer"]')).not.toBeNull()
    await wrapper.setProps({ pending: true })
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-categories"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-actions"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-footer"]')).toBeNull()
    expect(options()).toHaveLength(0)
    expect(wrapper.findComponent({ name: 'SdsTag' }).props('label')).toBe('Saved')
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    await wrapper.setProps({ pending: false })
    await flush()

    expect(options()[0]?.textContent?.trim()).toBe('Add "New"')
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('does not offer Add for whitespace after a pending search completes', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', pending: true } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('   ')
    await input.trigger('click')
    await flush()
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    await wrapper.setProps({ pending: false, suggestions: ['Apple'] })
    await flush()

    expect(options().map(option => option.textContent?.trim())).toEqual(['Apple'])
  })

  it('opens pending searches by click or Arrow Down without selecting stale suggestions', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', pending: true, suggestions: [] } })
    const input = wrapper.get('input[role="combobox"]')
    expect(input.attributes('aria-expanded')).toBe('false')
    await input.trigger('click')
    await flush()
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    await input.trigger('keydown', { key: 'Escape' })
    await flush()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    expect(wrapper.emitted('complete')).toBeUndefined()
  })

  it.each([false, true])('waits for search completion before offering Add, with exact match=%s', async (exact) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'taggable-select', multiple: true, pending: true, suggestions: ['Stale'] }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('Fresh')
    await flush()
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(options()).toHaveLength(0)
    expect(wrapper.emitted('result')).toBeUndefined()

    await wrapper.setProps({ pending: false, suggestions: exact ? ['Fresh partial', 'Fresh'] : ['Other'] })
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).toBeNull()
    expect(document.querySelector('[role="listbox"]')?.getAttribute('aria-busy')).toBeNull()
    expect(options().some(option => option.textContent?.trim() === 'Add "Fresh"')).toBe(!exact)
    expect(document.getElementById(input.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe(exact ? 'Fresh' : 'Add "Fresh"')
    expect(wrapper.text()).not.toContain('Loading suggestions.')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(wrapper.emitted('result')?.at(-1)).toEqual([exact ? 'Fresh' : { label: 'Fresh', name: 'Fresh', value: 'Fresh', __cbxCustom: true }])
  })

  it.each(['Escape', 'Tab'])('does not reopen a dismissed pending search after %s', async (key) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', pending: true } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('New')
    await flush()
    await input.trigger('keydown', { key })
    await flush()
    await wrapper.setProps({ pending: false, suggestions: ['New result'] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).toBeNull()
    expect(options()).toHaveLength(0)
  })

  it('replaces loading with the no-matches view after an empty search response', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', pending: true, filterSuggestions: true } })
    await wrapper.get('input[role="combobox"]').setValue('Missing')
    await flush()
    await wrapper.setProps({ pending: false, suggestions: [] })
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "Missing"')
    expect(wrapper.get('input[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it.each(
    (['text', 'select', 'taggable-select'] as const).flatMap(type =>
      [false, true].flatMap(multiple =>
        [false, true].map(grouped => ({ type, multiple, grouped }))
      )
    )
  )('preserves the query after an empty remote $type search, multiple=$multiple, grouped=$grouped', async ({ type, multiple, grouped }) => {
    const selected = multiple ? ['Saved'] : []
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, multiple, selected, pending: true, modelValue: '',
        filterSuggestions: false,
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped ? [{ label: 'Results', items: [] }] : [],
        'onUpdate:modelValue': (modelValue: string) => wrapper.setProps({ modelValue })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    input.element.focus()
    await input.setValue('zek')
    await flush()
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()

    await wrapper.setProps({ pending: false })
    await flush()

    expect(input.element.value).toBe('zek')
    expect(wrapper.props('modelValue')).toBe('zek')
    expect(wrapper.props('selected')).toEqual(selected)
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.emitted('update:modelValue')).toEqual([['zek']])
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('complete')).toEqual([['zek']])

    await input.setValue('Zeke')
    await wrapper.setProps({ pending: true })
    await flush()
    await wrapper.setProps({
      pending: false,
      suggestions: grouped ? [{ label: 'Results', items: ['Zeke'] }] : ['Zeke']
    })
    await flush()

    expect(input.element.value).toBe('Zeke')
    expect(options().map(option => option.textContent?.trim())).toContain('Zeke')
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(wrapper.emitted('complete')).toEqual([['zek'], ['Zeke']])
  })

  it.each([false, true])('preserves the query when suggestions disappear without a loading state, multiple=%s', async (multiple) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple, modelValue: '', suggestions: ['Member', 'Fellow'],
        'onUpdate:modelValue': (modelValue: string) => wrapper.setProps({ modelValue })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('zek')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')

    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.element.value).toBe('zek')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(wrapper.emitted('update:modelValue')).toEqual([['zek']])
  })

  it.each(['Escape', 'Tab'])('still clears an uncommitted select query on explicit %s dismissal after empty results', async (key) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', pending: true, modelValue: '',
        'onUpdate:modelValue': (modelValue: string) => wrapper.setProps({ modelValue })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('zek')
    await flush()
    await wrapper.setProps({ pending: false })
    await flush()
    expect(input.element.value).toBe('zek')

    await input.trigger('keydown', { key })
    await flush()

    expect(input.element.value).toBe('')
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it.each(['disabled', 'readonly'] as const)('still resets the query when an open select becomes %s', async (state) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', modelValue: '', suggestions: ['Member'],
        'onUpdate:modelValue': (modelValue: string) => wrapper.setProps({ modelValue })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('zek')
    await flush()

    await wrapper.setProps({ [state]: true })
    await flush()

    expect(input.element.value).toBe('')
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('clears stale keyboard display while pending and activates the new results on completion', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', suggestions: ['Old one', 'Old two'] } })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(input.element.value).toBe('Old one')
    await wrapper.setProps({ pending: true })
    await flush()
    expect(input.element.value).toBe('')
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.setProps({ pending: false, suggestions: ['New one', 'New two'] })
    await flush()

    expect(document.getElementById(input.attributes('aria-activedescendant') ?? '')?.textContent).toContain('New one')
    await input.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(wrapper.emitted('result')?.at(-1)).toEqual(['New one'])
  })

  it.each(['', ' ', '\t\n', '\u00a0'])('does not offer or add an empty custom value %j', async (query) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: ['Apple'], filterSuggestions: true } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue(query)
    await flush()

    expect(options().some(option => option.textContent?.includes('Add "'))).toBe(false)
    await input.trigger('keyup', { key: 'Enter' })
    await nextTick()
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.text()).toContain('Enter a value that is not empty or only whitespace.')
  })

  it('adds a custom value immediately without waiting for search debounce', async () => {
    const complete = vi.fn()
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', debounceComplete: 250, onComplete: complete } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('New tag')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await nextTick()

    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[{ label: 'New tag', name: 'New tag', value: 'New tag', __cbxCustom: true }]])
    expect(complete).not.toHaveBeenCalled()
    await flush()
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('uses the configured label and value fields for custom tags', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', optionLabel: 'title', optionValue: 'key' } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue(' List<T> ')
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual([{ label: 'List<T>', name: 'List<T>', value: 'List<T>', title: 'List<T>', key: 'List<T>', __cbxCustom: true }])
    expect(wrapper.text()).toContain('List<T>')
    expect(wrapper.get('[data-id="sds-tag"] button').attributes('aria-label')).toBe('Remove List<T>')
  })

  it.each(['id', 'value', 'userId'])('distinguishes duplicate labels using %s and emits the selected record', async (key) => {
    const first = { label: 'Alex', [key]: 1 }
    const second = { label: 'Alex', [key]: 2 }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, suggestions: [first, second], optionValue: key }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    options()[1].click()
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual([second])
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[second]])
    expect(options().map(option => option.getAttribute('aria-selected'))).toEqual(['false', 'true'])
    options()[0].click()
    await flush()
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[second, first]])
  })

  it.each(['id', 'value', 'key'])('keeps custom text distinct from an existing %s after model cloning', async (key) => {
    const existing = { label: 'Alice', [key]: '123' }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', multiple: true, suggestions: [existing],
        optionValue: key,
        'onUpdate:selected': selected => wrapper.setProps({
          selected: selected.map(option => typeof option === 'string' ? option : { ...option })
        })
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('123')
    await flush()
    options()[0].click()
    await flush()

    const custom = { label: '123', name: '123', value: '123', __cbxCustom: true, [key]: '123' }
    expect(wrapper.emitted('result')?.at(-1)).toEqual([custom])
    expect(wrapper.props('selected')).toEqual([custom])
    expect(JSON.parse(JSON.stringify(wrapper.props('selected')))).toEqual([custom])
    expect(options()[0].getAttribute('aria-selected')).toBe('false')
    options()[0].click()
    await flush()
    expect(wrapper.props('selected')).toEqual([custom, existing])
  })

  it('preserves real record identity when its label changes', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionValue: 'id', suggestions: [{ id: 1, label: 'New label' }],
        selected: [{ id: 1, label: 'Old label' }]
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    expect(options()[0].getAttribute('aria-selected')).toBe('true')
  })

  it('does not mark a different search result selected when its positional ID is reused', async () => {
    const original = { id: 'customer-0', label: 'Original customer' }
    const different = { id: 'customer-0', label: 'Different customer' }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', selected: [original], suggestions: [original] }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    await wrapper.setProps({ suggestions: [different] })
    await flush()

    expect(options()[0].getAttribute('aria-selected')).toBe('false')
    options()[0].click()
    await flush()
    expect(wrapper.emitted('result')?.at(-1)).toEqual([different])
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[different]])
  })

  it('marks a restored selection selected despite different wrapper IDs', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select',
        selected: [{ id: 'restored-customer', label: 'Customer' }],
        suggestions: [{ id: 'customer-0', label: 'Customer' }]
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()

    expect(options()[0].getAttribute('aria-selected')).toBe('true')
  })

  it.each(['readonly', 'disabled'] as const)('blocks keyboard opening and stale bulk actions when %s', async (state) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', multiple: true, enableSelectAll: true, suggestions: ['Apple', 'Banana'] } })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    const bulkAction = options()[0]
    await wrapper.setProps({ [state]: true })
    bulkAction.click()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('prefers an exact match over an earlier partial match', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: ['Apple Pie', 'Apple'], filterSuggestions: true } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('apple')
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual(['Apple'])
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([['Apple']])
  })

  it.each([false, true])('prefers a global exact match unless a visible option is explicitly chosen: %s', async (navigate) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', optionGroupChildren: 'items',
        suggestions: [{ label: 'Exact', items: ['Apple'] }, { label: 'Partial', items: ['Apple Pie'] }]
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[2].click()
    await flush()
    await input.setValue('Apple')
    await flush()

    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    if (navigate) await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual([navigate ? 'Apple Pie' : 'Apple'])
  })

  it.each([false, true])('excludes blank suggestions from bulk selection and its selected state with grouped=%s', async (grouped) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple: true, enableSelectAll: true,
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped
          ? [{ label: 'Fruit', items: ['Apple', ' ', 'Banana', { label: '\t', value: 'blank' }] }]
          : ['Apple', ' ', 'Banana', { label: '\t', value: 'blank' }],
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    const selectAll = options().find(option => option.textContent?.trim() === 'Select all')
    if (!selectAll) throw new Error('Expected Select all')
    expect(options().map(option => option.textContent?.trim())).toEqual(['Select all', 'Apple', 'Banana'])
    selectAll.click()
    await flush()

    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([['Apple', 'Banana']])
    expect(selectAll.getAttribute('aria-selected')).toBe('true')
    selectAll.click()
    await flush()
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[]])
  })

  it.each(['select', 'taggable-select'] as const)('does not select an excluded empty group through Enter in %s', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, modelValue: '', selected: [], optionGroupChildren: 'items',
        suggestions: [
          { id: 'empty-group', label: 'Empty', items: [] },
          { label: 'Fruit', items: ['Apple', 'Banana'] }
        ]
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('Empty')
    await flush()
    expect(options().some(option => option.textContent?.trim() === 'Empty')).toBe(false)

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    if (type === 'select') {
      expect(wrapper.emitted('result')).toBeUndefined()
      expect(wrapper.emitted('update:selected')).toBeUndefined()
      expect(wrapper.text()).toContain('Choose an item from the suggestions.')
    } else {
      const custom = { label: 'Empty', name: 'Empty', value: 'Empty', __cbxCustom: true }
      expect(wrapper.emitted('result')?.at(-1)).toEqual([custom])
      expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[custom]])
    }
  })

  it.each(['text', 'select', 'taggable-select'] as const)('does not offer blank options or empty groups in %s mode', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, optionGroupChildren: 'items',
        suggestions: [
          { label: 'Empty group', items: [' ', { label: '' }] },
          { label: 'Fruit', items: ['Apple', '\t', 'Banana'] }
        ]
      }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Apple', 'Banana'])
    expect(document.querySelector('[role="listbox"]')?.textContent).not.toContain('Empty group')

    await wrapper.setProps({ suggestions: [' ', { label: '\t' }] })
    await flush()
    expect(options()).toHaveLength(0)
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('does not select a partial match when the typed custom tag is already selected', async () => {
    const selected = [{ label: 'Apple', name: 'Apple', value: 'Apple', __cbxCustom: true }]
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'taggable-select', multiple: true, suggestions: ['Apple Pie'], selected }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('Apple')
    await flush()
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.props('selected')).toEqual(selected)
    expect(wrapper.text()).toContain('Already added "Apple".')
  })

  it('opens and highlights an option with one Arrow Down and retains focus after Escape', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { suggestions: ['Apple', 'Banana'], type: 'select' } })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    input.element.focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(document.getElementById(input.attributes('aria-activedescendant') ?? '')?.textContent).toContain('Apple')
    await input.trigger('keydown', { key: 'Escape' })
    await flush()
    await input.trigger('keydown', { key: 'Escape' })
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('does not reopen dismissed text suggestions when a debounced request completes', async () => {
    const complete = vi.fn()
    const wrapper = mount(Component, { attachTo: document.body, props: { suggestions: ['Apple'], debounceComplete: 250, onComplete: complete } })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('Ap')
    await input.trigger('keydown', { key: 'Tab' })
    await flush()

    expect(complete).toHaveBeenCalledWith('Ap')
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  const linkModes: ('a' | 'custom')[] = ['a', 'custom']
  const linkClicks: MouseEventInit[] = [{}, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]

  it.each(linkModes.flatMap(optionType => linkClicks.map(modifiers => ({ optionType, modifiers }))))(
    'preserves native link activation without selection for $optionType with $modifiers',
    async ({ optionType, modifiers }) => {
      const wrapper = mount(Component, {
        attachTo: document.body,
        props: { optionType, suggestions: [{ label: 'Apple', href: '#apple' }] },
        slots: { customOption: ({ label }: { label: string }) => h('a', { href: '#apple', tabindex: -1 }, h('span', label)) }
      })
      await wrapper.get('input[role="combobox"]').trigger('click')
      await flush()
      const option = options()[0]
      const target = option.querySelector('span') ?? option
      const mouseDown = new MouseEvent('mousedown', { bubbles: true, cancelable: true, ...modifiers })
      const browserClick = vi.fn((event: Event) => {
        const prevented = event.defaultPrevented
        event.preventDefault()
        return prevented
      })
      document.body.addEventListener('click', browserClick, { once: true })

      target.dispatchEvent(mouseDown)
      target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ...modifiers }))
      document.body.removeEventListener('click', browserClick)
      await flush()

      expect(mouseDown.defaultPrevented).toBe(false)
      expect(browserClick).toHaveReturnedWith(false)
      expect(wrapper.emitted('result')).toBeUndefined()
      expect(wrapper.emitted('update:selected')).toBeUndefined()
    }
  )

  it('does not select again when a custom router link handles navigation', async () => {
    const navigate = vi.fn()
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { optionType: 'custom', suggestions: ['Apple'] },
      slots: {
        customOption: ({ label }: { label: string }) => h('a', {
          href: '#apple',
          onClick: (event: MouseEvent) => {
            event.preventDefault()
            navigate()
          }
        }, label)
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()

    options()[0].querySelector('a')?.click()
    await flush()

    expect(navigate).toHaveBeenCalledOnce()
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it.each(linkModes)('selects a %s link once through Enter from the input', async (optionType) => {
    const navigate = vi.fn()
    const apple = { label: 'Apple', href: '#apple' }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { optionType, suggestions: [apple] },
      slots: { customOption: ({ label }: { label: string }) => h('a', { href: '#apple', onClick: navigate }, label) }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()

    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(navigate).not.toHaveBeenCalled()
    expect(wrapper.emitted('result')).toEqual([[apple]])
    expect(wrapper.emitted('update:selected')).toEqual([[[apple]]])
  })

  it('selects a non-interactive custom option once without an explicit callback', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', optionType: 'custom', suggestions: ['Apple'] },
      slots: { customOption: ({ label }: { label: string }) => h('span', label) }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()

    options()[0].querySelector('span')?.click()
    await flush()

    expect(wrapper.emitted('result')).toEqual([['Apple']])
    expect(wrapper.emitted('update:selected')).toEqual([[['Apple']]])
  })

  it.each([false, true])('preserves modified custom-link clicks when the explicit callback forwards the event: %s', async (forwardEvent) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { optionType: 'custom', suggestions: ['Apple'] },
      slots: {
        customOption: ({ label, onClick }: { label: string; onClick: (event?: Event) => Promise<void> }) => h('a', {
          href: '#apple', onClick: (event: MouseEvent) => onClick(forwardEvent ? event : undefined)
        }, label)
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    const browserClick = vi.fn((event: Event) => {
      const prevented = event.defaultPrevented
      event.preventDefault()
      return prevented
    })
    document.body.addEventListener('click', browserClick, { once: true })

    options()[0].querySelector('a')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true }))
    document.body.removeEventListener('click', browserClick)
    await flush()

    expect(browserClick).toHaveReturnedWith(false)
    expect(wrapper.emitted('result')).toBeUndefined()
  })

  it.each([false, true])('selects a custom link once when its explicit callback forwards the event: %s', async (forwardEvent) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, optionType: 'custom', suggestions: ['Apple'] },
      slots: {
        customOption: ({ label, onClick }: { label: string; onClick: (event?: Event) => Promise<void> }) => h('a', {
          href: '#apple',
          onClick: (event: MouseEvent) => {
            event.preventDefault()
            return onClick(forwardEvent ? event : undefined)
          }
        }, label)
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()

    options()[0].querySelector('a')?.click()
    await flush()

    expect(wrapper.emitted('result')).toEqual([['Apple']])
    expect(wrapper.emitted('update:selected')).toEqual([[['Apple']]])
  })

  it('owns custom option semantics and handles legacy slot click callbacks once', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', optionType: 'custom', suggestions: ['Apple'] },
      slots: { customOption: ({ label, onClick }: { label: string; onClick: (event: Event) => void }) => h('div', { onClick }, label) }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    expect(options()).toHaveLength(1)
    expect(options()[0].id).toBe(input.attributes('aria-activedescendant'))
    expect(options()[0].tabIndex).toBe(-1)
    options()[0].querySelector('div')?.click()
    await flush()
    expect(wrapper.emitted('result')).toEqual([['Apple']])
    expect(wrapper.emitted('update:selected')).toEqual([[['Apple']]])
  })

  it('selects a custom option once when a legacy callback omits the click event', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple: true, optionType: 'custom', suggestions: ['Apple'],
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      },
      slots: { customOption: ({ label, onClick }: { label: string; onClick: () => void }) => h('div', { onClick: () => onClick() }, label) }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    options()[0].querySelector('div')?.click()
    await flush()

    expect(wrapper.emitted('result')).toEqual([['Apple']])
    expect(wrapper.emitted('update:selected')).toEqual([[['Apple']]])
    expect(options()[0].getAttribute('aria-selected')).toBe('true')
  })

  it('provides named option groups without an empty tabbable panel', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionGroupLabel: 'section', optionGroupChildren: 'items',
        suggestions: [{ section: 'Fruit', items: ['Apple', 'Banana'] }, { section: 'Vegetables', items: ['Carrot', 'Celery'] }]
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()

    const group = document.querySelector('[role="listbox"] [role="group"][aria-label="Fruit"]')
    expect(group?.querySelectorAll('[role="option"]')).toHaveLength(2)
    expect(document.querySelector('[role="tabpanel"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-dropdown"] [tabindex="0"]')).toBeNull()
    const categories = document.querySelector('[data-id="sds-combo-box-categories"]')
    expect(categories?.classList.contains('border-b')).toBe(true)
    const filters = Array.from(categories?.querySelectorAll<HTMLButtonElement>('button') ?? [])
    expect(filters[0].classList.contains('tab-underline')).toBe(true)
    expect(filters[0].classList.contains('tab-underline-no-rule')).toBe(false)
    filters[1].click()
    await flush()
    expect(filters.map(filter => filter.getAttribute('aria-pressed'))).toEqual(['false', 'true', 'false'])
  })

  it.each([false, true])('uses consistent Add, Select all, and option spacing with grouped=%s', async (grouped) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', multiple: true, enableSelectAll: true,
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped ? [{ label: 'Fruit', items: ['Apple', 'Banana'] }] : ['Apple', 'Banana']
      }
    })
    await wrapper.get('input[role="combobox"]').setValue('New')
    await flush()

    const actions = document.querySelector('[data-id="sds-combo-box-actions"]')
    expect(actions?.querySelectorAll(':scope > div.py-2')).toHaveLength(2)
    expect(actions?.querySelectorAll(':scope > hr')).toHaveLength(1)
    expect(options().slice(0, 3).map(option => option.textContent?.trim())).toEqual(['Add "New"', 'Select all', 'Apple'])
    for (const option of options().slice(0, 3)) {
      expect(option.classList.contains('p-2')).toBe(true)
      expect(option.classList.contains('mt-2')).toBe(false)
      expect(option.classList.contains('mb-2')).toBe(false)
    }
    expect(document.querySelectorAll('[role="listbox"] hr')).toHaveLength(2)
    expect(document.querySelectorAll('[role="listbox"] hr:not([aria-hidden="true"])')).toHaveLength(0)
    expect(document.querySelectorAll('[role="option"] input')).toHaveLength(0)
    expect(document.querySelectorAll('[data-id="sds-combo-box-checkbox"]')).toHaveLength(3)
  })

  it('keeps virtual active descendants mounted and exposes complete position metadata', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', virtualize: true, suggestions: Array.from({ length: 200 }, (_, index) => `Option ${index}`) } })
    const input = wrapper.get('input[role="combobox"]')
    await input.trigger('click')
    await flush()
    const activeId = input.attributes('aria-activedescendant') ?? ''
    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    if (!list) throw new Error('Expected a listbox')
    list.scrollTop = 1000
    list.dispatchEvent(new Event('scroll'))
    await flush()

    const active = document.getElementById(activeId)
    expect(active?.getAttribute('aria-posinset')).toBe('1')
    expect(active?.getAttribute('aria-setsize')).toBe('200')
    expect(active?.style.height).toBe('36px')
    expect(list.querySelector('.relative')?.classList.contains('overflow-clip')).toBe(true)
    expect(options().length).toBeLessThan(30)
    expect(list.scrollTop).toBe(1000)
  })

  it.each([false, true])('limits virtual scrolling work to the rendered window with grouped=%s', async (grouped) => {
    const suggestions = Array.from({ length: 10000 }, (_, index) => `Option ${index}`)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', virtualize: true, modelValue: 'Option 9999',
        optionGroupChildren: grouped ? 'items' : undefined,
        suggestions: grouped
          ? [{ label: 'First', items: suggestions.slice(0, 5000) }, { label: 'Second', items: suggestions.slice(5000) }]
          : suggestions
      }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    const lookups = vi.spyOn(Map.prototype, 'get')
    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    if (!list) throw new Error('Expected a listbox')

    list.scrollTop = 1000
    list.dispatchEvent(new Event('scroll'))
    await flush()

    const rowLookups = lookups.mock.calls.filter(([key]) =>
      key !== null && typeof key === 'object' && 'kind' in key && key.kind === 'option' && 'key' in key
    )
    expect(rowLookups.length).toBeLessThan(100)
    expect(options().length).toBeLessThan(40)
    expect(document.getElementById(wrapper.get('input[role="combobox"]').attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Option 9999')
    expect(list.scrollTop).toBe(1000)
  })

  describe.each(['text', 'select', 'taggable-select'] as const)('%s form reset', (type) => {
    it.each([false, true])('restores the initial query and selections with the dropdown open=%s', async (isOpen) => {
      const form = document.createElement('form')
      form.id = 'combo-reset-query'
      document.body.append(form)
      const wrapper = mount(Component, {
        attachTo: document.body,
        props: {
          type, form: form.id, modelValue: 'Initial query', selected: ['Apple'], suggestions: ['Apple', 'Banana'],
          'onUpdate:modelValue': value => wrapper.setProps({ modelValue: value }),
          'onUpdate:selected': selected => wrapper.setProps({ selected })
        }
      })
      const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
      await input.setValue('Changed query')
      await wrapper.setProps({ selected: ['Banana'] })
      await flush()
      if (!isOpen) {
        await input.trigger('keydown', { key: 'Escape' })
        await flush()
      }
      expect(input.attributes('aria-expanded')).toBe(String(isOpen))

      form.reset()
      await flush()

      expect(wrapper.props('modelValue')).toBe('Initial query')
      expect(input.element.value).toBe('Initial query')
      expect(wrapper.props('selected')).toEqual(['Apple'])
      expect(input.attributes('aria-expanded')).toBe('false')
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Initial query'])
    })
  })

  it('preserves the current query, selection, and open dropdown when form reset is canceled', async () => {
    const form = document.createElement('form')
    form.id = 'combo-canceled-reset'
    form.addEventListener('reset', event => event.preventDefault())
    document.body.append(form)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', form: form.id, modelValue: 'Initial query', selected: ['Apple'], suggestions: ['Apple', 'Banana'],
        'onUpdate:modelValue': value => wrapper.setProps({ modelValue: value })
      }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('Changed query')
    await wrapper.setProps({ selected: ['Banana'] })
    await flush()

    form.reset()
    await flush()

    expect(wrapper.props('modelValue')).toBe('Changed query')
    expect(input.element.value).toBe('Changed query')
    expect(wrapper.props('selected')).toEqual(['Banana'])
    expect(input.attributes('aria-expanded')).toBe('true')
  })

  it('submits labels by default without inferring IDs or value fields', () => {
    const form = document.createElement('form')
    document.body.append(form)
    mount(Component, {
      attachTo: form,
      props: {
        type: 'select', multiple: true, name: 'customers',
        selected: [{ id: 'customer-0', label: 'Customer' }, { value: 20, label: 'Other customer' }]
      }
    })

    expect(new FormData(form).getAll('customers')).toEqual(['Customer', 'Other customer'])
  })

  it('submits stable values to an external form and restores its initial selection on reset', async () => {
    const form = document.createElement('form')
    form.id = 'native-combo-form'
    document.body.append(form)
    const first = { id: 1, label: 'Alex' }
    const second = { id: 2, label: 'Alex' }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', optionValue: 'id', multiple: true, name: 'people', form: form.id, selected: [first], suggestions: [first, second] }
    })
    await wrapper.get('input[role="combobox"]').trigger('click')
    await flush()
    options()[1].click()
    await flush()
    expect(new FormData(form).getAll('people')).toEqual(['1', '2'])
    form.reset()
    await flush()
    expect(new FormData(form).getAll('people')).toEqual(['1'])
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([[first]])
    await wrapper.setProps({ disabled: true })
    expect(new FormData(form).getAll('people')).toEqual([])
  })

  it('forwards native text-input attributes and permits implicit submission when closed', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      attrs: { inputmode: 'search', enterkeyhint: 'search', autocomplete: 'on', 'aria-errormessage': 'external-error' },
      props: { name: 'query', modelValue: 'List<T>' }
    })
    const input = wrapper.get<HTMLInputElement>('input[role="combobox"]')
    expect(input.element.value).toBe('List<T>')
    expect(input.attributes('name')).toBe('query')
    expect(input.attributes('inputmode')).toBe('search')
    expect(input.attributes('autocomplete')).toBe('on')
    expect(input.attributes('aria-errormessage')).toBe('external-error')
    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    input.element.dispatchEvent(enter)
    expect(enter.defaultPrevented).toBe(false)
  })

  it('localizes action feedback, Add text, and contextual tag-removal names', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'taggable-select', messages: { emptyValue: 'Bitte Text eingeben.', add: label => `Neu: ${label}`, remove: label => `${label} entfernen` } }
    })
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue(' ')
    await input.trigger('keyup', { key: 'Enter' })
    expect(wrapper.text()).toContain('Bitte Text eingeben.')
    await input.setValue('Apple')
    await flush()
    expect(options()[0].textContent).toContain('Neu: Apple')
    await input.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(wrapper.get('[data-id="sds-tag"] button').attributes('aria-label')).toBe('Apple entfernen')
  })

  it('summarizes large selections without reading every label in the input description', () => {
    const selected: ComboBoxSuggestion[] = Array.from({ length: 10 }, (_, index) => `Item ${index}`)
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', multiple: true, selected } })
    const description = wrapper.get('input[role="combobox"]').attributes('aria-describedby')
    expect(document.getElementById(description)?.textContent).toBe('10 items selected.')
  })
})
