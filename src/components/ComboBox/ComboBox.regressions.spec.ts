import { DOMWrapper, enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import axe from 'axe-core'
import Component from './ComboBox.vue'
import Modal from '../Modal/Modal.vue'
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
  const getQueryInput = async (wrapper: VueWrapper) => {
    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    if (!['select', 'taggable-select'].includes(wrapper.props('type')) || wrapper.props('multiple')) return trigger
    if (trigger.attributes('aria-expanded') !== 'true') {
      await trigger.trigger('click')
      await flush()
    }
    const search = document.querySelector<HTMLInputElement>('[data-id="sds-combo-box-filter"]')
    if (!search) throw new Error('Expected the dropdown search field')
    return new DOMWrapper(search)
  }

  it('keeps text-only search closed when suggestions are omitted', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { modelValue: '' }
    })
    const input = wrapper.get('[role="combobox"]')

    await input.trigger('focus')
    await input.setValue('a')
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(document.querySelector('[role="listbox"]')).toBeNull()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['a'])
    expect(wrapper.emitted('open')).toBeUndefined()

    await input.trigger('click')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('enter')?.at(-1)).toEqual(['a'])
  })

  it('shows no-match feedback when text suggestions are explicitly empty', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { modelValue: '', suggestions: [] }
    })
    const input = wrapper.get('[role="combobox"]')

    await input.setValue('missing')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent)
      .toContain('No matches for "missing"')
  })

  it('only announces suggestion loading when a suggestion source is configured', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { modelValue: '', pending: true }
    })
    const input = wrapper.get('[role="combobox"]')
    const status = wrapper.get('[data-id="sds-combo-box-results-status"]')

    await input.setValue('a')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(status.text()).toBe('')

    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(status.text()).toBe('Loading suggestions.')

    await wrapper.setProps({ suggestions: undefined })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(status.text()).toBe('')
  })

  it.each([
    { type: 'text', multiple: false },
    { type: 'select', multiple: false },
    { type: 'select', multiple: true },
    { type: 'taggable-select', multiple: false },
    { type: 'taggable-select', multiple: true }
  ] as const)('does not expose suggestion interactions without a source in $type mode, multiple=$multiple', async ({ type, multiple }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple, modelValue: '' }
    })
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')

    await input.trigger('click')
    if (input.element instanceof HTMLInputElement) await input.setValue('missing')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-autocomplete')).toBe('none')
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-haspopup')).toBeUndefined()
    expect(document.querySelector('[data-id="sds-combo-box-dropdown"]')).toBeNull()
    expect(wrapper.get('[data-id="sds-combo-box-results-status"]').text()).toBe('')
    expect(wrapper.emitted('open')).toBeUndefined()
  })

  it('lets Escape reach the parent after typing without a suggestion source', async () => {
    const onKeydown = vi.fn()
    const wrapper = mount(() => h('div', { onKeydown }, h(Component, { modelValue: '' })), {
      attachTo: document.body
    })
    const input = wrapper.get('[role="combobox"]')
    await input.setValue('a')
    await flush()
    const escape = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })

    input.element.dispatchEvent(escape)

    expect(escape.defaultPrevented).toBe(false)
    expect(onKeydown).toHaveBeenCalledOnce()
  })

  it('keeps no-match feedback for text searches that filter a populated suggestion list', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'text', modelValue: '', suggestions: ['Apple'], filterSuggestions: true }
    })
    const input = wrapper.get('[role="combobox"]')

    await input.setValue('missing')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent)
      .toContain('No matches for "missing"')
  })

  it('keeps empty-result feedback until the parent removes the suggestion source', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'text', modelValue: '', suggestions: ['Apple'] }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.setValue('a')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')

    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent)
      .toContain('No matches for "a"')

    await wrapper.setProps({ suggestions: undefined })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(wrapper.get('[data-id="sds-combo-box-results-status"]').text()).toBe('')

    await wrapper.setProps({ suggestions: ['Apricot'] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(options().map(option => option.textContent?.trim())).toEqual(['Apricot'])
  })

  it.each([false, true])('closes a multiselect when its result handler clears suggestions (in-place: %s)', async (shouldMutate) => {
    const query = ref('')
    const selected = ref<ComboBoxSuggestion[]>([])
    const suggestions = ref<ComboBoxSuggestion[]>(['Apple', 'Banana'])
    const wrapper = mount(() => h(Component, {
      type: 'select',
      multiple: true,
      modelValue: query.value,
      'onUpdate:modelValue': (value: string) => { query.value = value },
      selected: selected.value,
      'onUpdate:selected': (value: ComboBoxSuggestion[]) => { selected.value = value },
      suggestions: suggestions.value,
      onResult: () => {
        if (shouldMutate) suggestions.value.splice(0)
        else suggestions.value = []
      }
    }), { attachTo: document.body })
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')
    await input.trigger('click')
    await flush()

    options()[0].click()
    await flush()

    expect(selected.value).toEqual(['Apple'])
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(document.activeElement).toBe(input.element)
  })

  it.each(['select', 'taggable-select'] as const)('closes %s multiselect when suggestions are cleared later after selection', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple: true, modelValue: '', selected: [], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[0].click()
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')

    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(wrapper.emitted('update:selected')?.at(-1)).toEqual([['Apple']])
  })

  it.each(['select', 'taggable-select'] as const)('closes %s multiselect after keyboard selection from a typed search with a parent-bound query', async (type) => {
    const query = ref('')
    const selected = ref<ComboBoxSuggestion[]>([])
    const suggestions = ref<ComboBoxSuggestion[]>(['Apple', 'Mango'])
    const wrapper = mount(() => h(Component, {
      type,
      multiple: true,
      filterSuggestions: true,
      modelValue: query.value,
      'onUpdate:modelValue': (value: string) => { query.value = value },
      selected: selected.value,
      'onUpdate:selected': (value: ComboBoxSuggestion[]) => { selected.value = value },
      suggestions: suggestions.value,
      onResult: () => { suggestions.value = [] }
    }), { attachTo: document.body })
    const input = wrapper.get('[role="combobox"]')
    await input.setValue('Mango')
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Mango'])

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(selected.value).toEqual(['Mango'])
    expect(query.value).toBe('')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
  })

  it('closes after Select all when the selection update clears suggestions', async () => {
    const selected = ref<ComboBoxSuggestion[]>([])
    const suggestions = ref<ComboBoxSuggestion[]>(['Apple', 'Banana'])
    const wrapper = mount(() => h(Component, {
      type: 'select',
      multiple: true,
      enableSelectAll: true,
      modelValue: '',
      selected: selected.value,
      'onUpdate:selected': (value: ComboBoxSuggestion[]) => {
        selected.value = value
        suggestions.value = []
      },
      suggestions: suggestions.value
    }), { attachTo: document.body })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()

    const selectAll = options().find(option => option.textContent?.trim() === 'Select all')
    if (!selectAll) throw new Error('Expected Select all')
    selectAll.click()
    await flush()

    expect(selected.value).toEqual(['Apple', 'Banana'])
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
  })

  it.each(['Missing', ''])('preserves empty remote-search feedback after an earlier selection with query "%s"', async (query) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, modelValue: '', selected: [], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[0].click()
    await flush()

    await wrapper.setProps({ pending: true, suggestions: [] })
    await input.setValue(query)
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()

    await wrapper.setProps({ pending: false })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent)
      .toContain(query ? `No matches for "${query}"` : 'No options available.')
  })

  it('preserves error feedback when suggestions are cleared after a selection', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, modelValue: '', selected: [], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[0].click()
    await flush()

    await wrapper.setProps({ error: 'Unable to load fruit.', suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-error"]')?.textContent).toContain('Unable to load fruit.')
    await wrapper.setProps({ error: '' })
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).not.toBeNull()
  })

  it('only dismisses after selection when every suggestion group is empty', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple: true, modelValue: '', selected: [], optionGroupChildren: 'items',
        suggestions: [{ label: 'Fruits', items: ['Apple', 'Banana'] }, { label: 'Vegetables', items: ['Carrot'] }]
      }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[1].click()
    await flush()
    options()[0].click()
    await flush()

    await wrapper.setProps({
      suggestions: [{ label: 'Fruits', items: [] }, { label: 'Vegetables', items: ['Carrot'] }]
    })
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).not.toBeNull()

    await wrapper.setProps({
      suggestions: [{ label: 'Fruits', items: [] }, { label: 'Vegetables', items: [] }]
    })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
  })

  it('preserves no-match feedback when a new query empties suggestions after selection', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, modelValue: '', selected: [], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[0].click()
    await flush()

    await input.setValue('Missing')
    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "Missing"')
  })

  it('does not dismiss a new IME search when old suggestions are cleared after selection', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, modelValue: '', selected: [], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')
    await input.trigger('click')
    await flush()
    options()[0].click()
    await flush()

    await input.trigger('compositionstart')
    await input.setValue('new')
    await wrapper.setProps({ suggestions: [] })
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(input.element.value).toBe('new')
    await input.trigger('compositionend')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "new"')
  })

  it.each(['button', 'custom'] as const)('runs an empty text search after clearing a previous query with %s options', async (optionType) => {
    const query = ref('')
    const selected = ref<ComboBoxSuggestion[]>([])
    const suggestions = ref<ComboBoxSuggestion[]>([])
    const search = vi.fn()
    const parent = mount({
      setup: () => () => h('form', { onSubmit: (event: Event) => event.preventDefault() }, [
        h(Component, {
          type: 'text', optionType, optionLabel: 'term', placeholder: 'Search',
          modelValue: query.value, 'onUpdate:modelValue': value => { query.value = value },
          selected: selected.value, 'onUpdate:selected': value => { selected.value = value },
          suggestions: suggestions.value, onEnter: search
        })
      ])
    }, { attachTo: document.body })
    const wrapper = parent.getComponent(Component)
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')
    await input.setValue('jason')
    await flush()
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(search).toHaveBeenLastCalledWith('jason')
    suggestions.value = [{ term: 'Jason', payload: 'previous suggestion' }]
    await nextTick()

    await wrapper.get('[data-id="sds-combo-box-clear-button"]').trigger('click')
    await flush()
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await nextTick()

    expect(search.mock.calls).toEqual([['jason'], ['']])
    expect(query.value).toBe('')
    expect(selected.value).toEqual([])
    expect(input.classes()).not.toContain('animate-shake')
    expect(wrapper.text()).not.toContain('Enter a value that is not empty or only whitespace.')
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
  })

  it.each(['', ' ', '\u00a0'])('submits the literal optional text query %j without creating an empty selection', async (query) => {
    const wrapper = mount(Component, {
      props: { type: 'text', modelValue: query, selected: [], suggestions: [] }
    })
    const input = wrapper.get('[role="combobox"]')

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await nextTick()

    expect(wrapper.emitted('enter')).toEqual([[query]])
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(input.classes()).not.toContain('animate-shake')
  })

  it('still rejects an empty required text search', async () => {
    const wrapper = mount(Component, {
      props: { type: 'text', modelValue: '', selected: [], required: true }
    })
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await nextTick()

    expect(wrapper.emitted('enter')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(input.element.validity.valueMissing).toBe(true)
    expect(input.classes()).toContain('animate-shake')
    expect(wrapper.text()).toContain('Enter a value that is not empty or only whitespace.')
  })

  it.each([
    { type: 'text', multiple: false },
    { type: 'select', multiple: false },
    { type: 'select', multiple: true },
    { type: 'taggable-select', multiple: false },
    { type: 'taggable-select', multiple: true }
  ] as const)('has no WCAG accessibility violations in open $type mode with multiple=$multiple', async ({ type, multiple }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      attrs: { 'aria-label': 'Choose fruit' },
      props: {
        type, multiple, required: true, virtualize: true, virtualizeThreshold: 1,
        optionGroupChildren: 'items',
        suggestions: [{ label: 'Fruit', items: ['Apple', 'Banana'] }]
      }
    })
    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()
    vi.useRealTimers()

    const results = await axe.run(document.body, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      // Contrast requires real browser layout, which jsdom does not provide.
      rules: { 'color-contrast': { enabled: false } }
    })

    expect(results.violations).toEqual([])
  })

  describe.each([
    { type: 'text', multiple: false },
    { type: 'select', multiple: false },
    { type: 'select', multiple: true },
    { type: 'taggable-select', multiple: false },
    { type: 'taggable-select', multiple: true }
  ] as const)('$type search icon with multiple=$multiple', ({ type, multiple }) => {
    it.each(['sm', 'md', 'lg'] as const)('shows the leading search icon at size=%s', (size) => {
      const wrapper = mount(Component, {
        props: { type, multiple, size, modelValue: '', selected: ['Apple'], suggestions: ['Apple'] }
      })

      const searchButton = wrapper.get('[data-id="sds-combo-box-search-button"]')
      const icon = searchButton.get('svg')
      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.classes()).toContain(size === 'lg' ? 'w-5' : 'w-4')
      expect(icon.classes()).toContain(size === 'lg' ? 'h-5' : 'h-4')
      expect(searchButton.element.nextElementSibling?.getAttribute('role')).toBe('combobox')
    })
  })

  it.each([
    { type: 'select', state: 'enabled' },
    { type: 'select', state: 'disabled' },
    { type: 'select', state: 'readonly' },
    { type: 'taggable-select', state: 'enabled' },
    { type: 'taggable-select', state: 'disabled' },
    { type: 'taggable-select', state: 'readonly' }
  ] as const)('keeps the single $type search icon visible and respects $state interaction', async ({ type, state }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, modelValue: '', selected: ['Apple'], suggestions: ['Apple', 'Banana'],
        disabled: state === 'disabled', readonly: state === 'readonly'
      }
    })
    const searchButton = wrapper.get<HTMLButtonElement>('[data-id="sds-combo-box-search-button"]')
    expect(searchButton.get('svg').exists()).toBe(true)
    expect(searchButton.element.disabled).toBe(state !== 'enabled')

    await searchButton.trigger('click')
    await flush()

    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe(String(state === 'enabled'))
    if (state === 'enabled') {
      const popup = document.querySelector('[data-id="sds-combo-box-dropdown"]')
      expect(searchButton.attributes('aria-controls')).toBe(popup?.id)
      expect(document.activeElement).toBe(document.querySelector('[data-id="sds-combo-box-filter"]'))

      searchButton.element.focus()
      await searchButton.trigger('click')
      await flush()

      expect(document.activeElement).toBe(document.querySelector('[data-id="sds-combo-box-filter"]'))
      expect(wrapper.emitted('open')).toHaveLength(1)
    } else {
      expect(document.querySelector('[data-id="sds-combo-box-dropdown"]')).toBeNull()
    }
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('complete')).toBeUndefined()
  })

  it.each(['text', 'select', 'taggable-select'] as const)('retains the loading indicator before restoring the %s search icon', async (type) => {
    const wrapper = mount(Component, {
      props: { type, modelValue: '', selected: [], pending: true }
    })
    expect(wrapper.find('[data-id="sds-combo-box-search-button"]').exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'SdsLoadingSpinner' }).exists()).toBe(true)

    await wrapper.setProps({ pending: false })

    expect(wrapper.get('[data-id="sds-combo-box-search-button"]').find('svg').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'SdsLoadingSpinner' }).exists()).toBe(false)
  })

  it.each(['select', 'taggable-select'] as const)('uses a non-editable %s button while keeping search inside the dropdown', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type, selected: ['Apple'], suggestions: ['Apple', 'Banana'], filterSuggestions: true,
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      }
    })
    const trigger = wrapper.get<HTMLButtonElement>('button[role="combobox"]')
    expect(trigger.text()).toBe('Apple')
    expect(wrapper.find('input[role="combobox"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-combo-box-search-button"]').exists()).toBe(true)

    const search = await getQueryInput(wrapper)
    await search.setValue('Ban')
    await flush()
    expect(trigger.text()).toBe('Apple')
    expect(document.activeElement).toBe(search.element)

    const banana = options().find(option => option.textContent?.trim() === 'Banana')
    if (!banana) throw new Error('Expected the Banana option')
    await new DOMWrapper(banana).trigger('click')
    await flush()

    expect(trigger.text()).toBe('Banana')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    expect(document.querySelector('[data-id="sds-combo-box-filter"]')).toBeNull()
    expect(wrapper.find('input[role="combobox"]').exists()).toBe(false)
  })

  it.each(['select', 'taggable-select'] as const)('toggles the single %s trigger without changing its selection', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, selected: ['Apple'], suggestions: ['Apple', 'Banana'] }
    })
    const trigger = wrapper.get<HTMLButtonElement>('button[role="combobox"]')
    await trigger.trigger('click')
    await flush()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.activeElement).toBe(document.querySelector('[data-id="sds-combo-box-filter"]'))

    await trigger.trigger('click')
    await flush()

    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-dropdown"]')).toBeNull()
    expect(document.activeElement).toBe(trigger.element)
    expect(trigger.text()).toBe('Apple')
    expect(wrapper.props('selected')).toEqual(['Apple'])
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('complete')).toBeUndefined()
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('close')).toHaveLength(1)

    await trigger.trigger('click')
    await flush()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.emitted('open')).toHaveLength(2)
  })

  it('reopens on the saved single selection and preserves it when Enter is pressed', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', selected: ['Banana'], suggestions: ['Apple', 'Banana'] }
    })
    const search = await getQueryInput(wrapper)

    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Banana')
    await search.trigger('keydown', { key: 'Enter' })
    await search.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual(['Banana'])
  })

  it.each([
    { type: 'select', multiple: false },
    { type: 'select', multiple: true },
    { type: 'taggable-select', multiple: false },
    { type: 'taggable-select', multiple: true }
  ] as const)('toggles the $type caret with multiple=$multiple and returns focus to the field', async ({ type, multiple }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple, selected: ['Apple'], suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    const caret = wrapper.get<HTMLButtonElement>('[data-id="sds-combo-box-select-caret"]')
    await caret.trigger('click')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')

    caret.element.focus()
    await caret.trigger('click')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(caret.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-dropdown"]')).toBeNull()
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.props('selected')).toEqual(['Apple'])
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    expect(wrapper.emitted('complete')).toBeUndefined()

    await caret.trigger('click')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(caret.attributes('aria-expanded')).toBe('true')
  })

  it('can close and reopen a single-select dropdown before its opening finishes', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Apple', 'Banana'] }
    })
    const trigger = wrapper.get('[role="combobox"]')
    await trigger.trigger('click')
    await trigger.trigger('click')
    await flush()

    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-dropdown"]')).toBeNull()

    await trigger.trigger('click')
    await flush()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.activeElement).toBe(document.querySelector('[data-id="sds-combo-box-filter"]'))
    expect(wrapper.emitted('result')).toBeUndefined()
  })

  it.each(['select', 'taggable-select'] as const)('does not toggle the %s caret during IME composition', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple: true, suggestions: ['Apple', 'Banana'] }
    })
    const input = wrapper.get('input[role="combobox"]')
    const caret = wrapper.get('[data-id="sds-combo-box-select-caret"]')
    await input.trigger('click')
    await flush()
    await input.trigger('compositionstart')

    await caret.trigger('click')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('true')
    expect(wrapper.emitted('close')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
    await input.trigger('compositionend')
    await caret.trigger('click')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it.each(['disabled', 'readonly'] as const)('does not reopen or steal focus after %s is removed', async (prop) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Apple', 'Banana'] }
    })
    await getQueryInput(wrapper)
    await wrapper.setProps({ [prop]: true })
    await flush()
    const other = document.createElement('button')
    document.body.append(other)
    other.focus()

    await wrapper.setProps({ [prop]: false })
    await flush()

    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(other)
    expect(wrapper.emitted('open')).toHaveLength(1)
  })

  it('forwards query attributes and input events without blurring the component when search opens', async () => {
    const input = vi.fn()
    const blur = vi.fn()
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Apple'] },
      attrs: { inputmode: 'numeric', enterkeyhint: 'search', onInput: input, onBlur: blur }
    })
    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    trigger.element.focus()
    const search = await getQueryInput(wrapper)

    await search.setValue('12')
    await flush()

    expect(search.attributes('inputmode')).toBe('numeric')
    expect(search.attributes('enterkeyhint')).toBe('search')
    expect(input).toHaveBeenCalledOnce()
    expect(blur).not.toHaveBeenCalled()
    const other = document.createElement('button')
    document.body.append(other)
    other.focus()
    expect(blur).toHaveBeenCalledOnce()
  })

  it.each([false, true])('emits blur once when focus leaves a popup action with multiple=%s', async (multiple) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple, suggestions: [], error: 'Unavailable.', onRetry: vi.fn() }
    })
    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    trigger.element.focus()
    await trigger.trigger('click')
    await flush()
    const retry = document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-error"] button')
    if (!retry) throw new Error('Expected the retry button')
    const outside = document.createElement('button')
    document.body.append(outside)
    retry.focus()
    expect(wrapper.emitted('blur')).toBeUndefined()
    expect(wrapper.emitted('focus')).toHaveLength(1)

    outside.focus()

    expect(wrapper.emitted('blur')).toHaveLength(1)
    expect(wrapper.emitted('focus')).toHaveLength(1)
  })

  it('shows no-results feedback for an empty remote response', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: [], filterSuggestions: false }
    })
    const search = await getQueryInput(wrapper)

    await search.setValue('missing')
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "missing"')
  })

  it('dismisses only the popup on Escape and lets a subsequent Escape close its modal', async () => {
    const visible = ref(true)
    const parent = mount({
      setup: () => () => h(Modal, {
        modelValue: visible.value, 'onUpdate:modelValue': value => { visible.value = value }, title: 'Choose fruit'
      }, { default: () => h(Component, { type: 'select', suggestions: ['Apple', 'Banana'] }) })
    }, { attachTo: document.body })
    await flush()
    const wrapper = parent.getComponent(Component)
    const search = await getQueryInput(wrapper)

    await search.trigger('keydown', { key: 'Escape' })
    await flush()
    await wrapper.get('[role="combobox"]').trigger('keyup', { key: 'Escape' })
    await flush()

    expect(visible.value).toBe(true)
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('false')
    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'Escape' })
    await wrapper.get('[role="combobox"]').trigger('keyup', { key: 'Escape' })
    await flush()
    expect(visible.value).toBe(false)
  })

  it('moves Tab focus inside the modal when ComboBox is its final field', async () => {
    const parent = mount({
      setup: () => () => h(Modal, { modelValue: true, title: 'Choose fruit' }, {
        default: () => h(Component, { type: 'select', suggestions: ['Apple'] })
      })
    }, { attachTo: document.body })
    await flush()
    const wrapper = parent.getComponent(Component)
    const search = await getQueryInput(wrapper)

    await search.trigger('keydown', { key: 'Tab' })
    await flush()

    expect(document.activeElement?.closest('[data-id="sds-modal"]')).not.toBeNull()
    expect(document.activeElement).toBe(document.querySelector('[data-id="sds-modal"] button[aria-label="close"]'))
    expect(document.activeElement).not.toBe(search.element)
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('false')
  })

  it('keeps every tag visible by default and offers compact selection display only when configured', async () => {
    const form = document.createElement('form')
    document.body.append(form)
    const selected = ['Apple', 'Banana', 'Cherry', 'Date']
    const wrapper = mount(Component, {
      attachTo: form,
      props: { type: 'select', multiple: true, name: 'fruit', selected, suggestions: selected }
    })
    expect(wrapper.findAll('[data-id="sds-tag"]')).toHaveLength(4)

    await wrapper.setProps({ maxVisibleTags: 2 })
    expect(wrapper.findAll('[data-id="sds-tag"]')).toHaveLength(2)
    const toggle = wrapper.get('[data-id="sds-combo-box-tags-toggle"]')
    expect(toggle.text()).toBe('+2 more')
    expect(new FormData(form).getAll('fruit')).toEqual(selected)
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('[data-id="sds-tag"]')).toHaveLength(4)
    await toggle.trigger('click')
    expect(wrapper.findAll('[data-id="sds-tag"]')).toHaveLength(2)
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it('distinguishes initial empty options from an unsuccessful search', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', suggestions: [] } })
    await getQueryInput(wrapper)

    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent?.trim()).toBe('No options available.')
  })

  it('shows remote failures instead of stale results and supports keyboard-accessible retry', async () => {
    const retry = vi.fn()
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Stale result'], error: 'Could not load fruit.', onRetry: retry }
    })
    const search = await getQueryInput(wrapper)
    await search.setValue('Apple')
    await flush()
    const error = document.querySelector<HTMLElement>('[data-id="sds-combo-box-error"]')
    const button = error?.querySelector('button')
    expect(error?.textContent).toContain('Could not load fruit.')
    expect(error?.closest('[role="listbox"]')).toBeNull()
    expect(options()).toHaveLength(0)
    expect(search.attributes('aria-activedescendant')).toBeUndefined()
    expect(search.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-footer"]')).toBeNull()

    await search.trigger('keydown', { key: 'Tab' })
    expect(document.activeElement).toBe(button)
    button?.click()
    expect(retry).toHaveBeenCalledWith('Apple')
    await search.trigger('keyup', { key: 'Enter' })
    expect(wrapper.emitted('result')).toBeUndefined()

    await wrapper.setProps({ error: undefined, suggestions: ['Apple'] })
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Apple'])
  })

  it('does not offer an unhandled retry action and supports custom error feedback', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: [], error: 'Unavailable.' }
    })

    await getQueryInput(wrapper)
    expect(document.querySelector('[data-id="sds-combo-box-error"] button')).toBeNull()
    wrapper.unmount()

    const custom = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: [], error: 'Unavailable.' },
      slots: { error: ({ message }) => h('p', { role: 'alert' }, `Custom: ${message}`) }
    })
    await getQueryInput(custom)
    expect(document.querySelector('[data-id="sds-combo-box-error"]')?.textContent).toContain('Custom: Unavailable.')
  })

  it('clears stale result announcements when an open search fails without entering loading', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Apple', 'Banana'] }
    })
    await getQueryInput(wrapper)
    await flush()
    const status = wrapper.get('[data-id="sds-combo-box-results-status"]')
    expect(status.text()).toBe('2 suggestions available.')

    await wrapper.setProps({ error: 'Search unavailable.' })
    await flush()

    expect(status.text()).toBe('')
    await wrapper.setProps({ error: undefined })
    await flush()
    expect(status.text()).toBe('2 suggestions available.')
  })

  it.each(['text', 'select', 'taggable-select'] as const)('allows keyboard retry and onward navigation in editable %s mode', async (type) => {
    const host = document.createElement('div')
    const following = document.createElement('button')
    document.body.append(host, following)
    const wrapper = mount(Component, {
      attachTo: host,
      props: {
        type, multiple: type !== 'text', modelValue: 'Apple', suggestions: [],
        error: 'Could not load fruit.', onRetry: vi.fn()
      }
    })
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')
    input.element.focus()
    await input.trigger('click')
    await flush()
    const retry = document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-error"] button')
    if (!retry) throw new Error('Expected the retry button')

    await input.trigger('keydown', { key: 'Tab' })

    expect(document.activeElement).toBe(retry)
    retry.click()
    expect(wrapper.emitted('retry')).toEqual([['Apple']])

    await new DOMWrapper(retry).trigger('keydown', { key: 'Tab' })
    await flush()

    expect(document.activeElement).toBe(following)
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it.each(['text', 'select', 'taggable-select'] as const)('returns from retry to the editable %s query with Shift+Tab', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple: type !== 'text', suggestions: [], error: 'Unavailable.', onRetry: vi.fn() }
    })
    const input = wrapper.get<HTMLInputElement>('[role="combobox"]')
    await input.trigger('click')
    await flush()
    const retry = document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-error"] button')
    if (!retry) throw new Error('Expected the retry button')
    retry.focus()

    await new DOMWrapper(retry).trigger('keydown', { key: 'Tab', shiftKey: true })
    await flush()

    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-expanded')).toBe('true')
  })

  it.each([false, true])('keeps focus in the query when retry starts loading with multiple=%s', async (multiple) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple, suggestions: [], error: 'Unavailable.',
        onRetry: () => wrapper.setProps({ pending: true })
      }
    })
    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()
    const query = await getQueryInput(wrapper)
    const retry = document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-error"] button')
    if (!retry) throw new Error('Expected the retry button')
    retry.focus()

    retry.click()
    await flush()

    expect(document.activeElement).toBe(query.element)
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('true')
    expect(wrapper.emitted('blur')).toBeUndefined()
  })

  it('does not treat the Enter that activates retry as a new query submission', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple: true, suggestions: [], error: 'Unavailable.',
        onRetry: () => wrapper.setProps({ pending: true })
      }
    })
    const query = wrapper.get<HTMLInputElement>('[role="combobox"]')
    await query.trigger('click')
    await flush()
    const retry = document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-error"] button')
    if (!retry) throw new Error('Expected the retry button')
    retry.focus()

    await new DOMWrapper(retry).trigger('keydown', { key: 'Enter' })
    retry.click()
    await nextTick()
    await query.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('retry')).toHaveLength(1)
    expect(query.element.classList.contains('animate-shake')).toBe(false)
    expect(wrapper.get('p[role="status"]').text()).toBe('')

    await query.trigger('keydown', { key: 'Enter' })
    await query.trigger('keyup', { key: 'Enter' })
    expect(wrapper.get('p[role="status"]').text()).toBe('Loading suggestions.')
  })

  it('skips controls inside hidden ancestors when tabbing out of dropdown search', async () => {
    const host = document.createElement('div')
    const following = document.createElement('div')
    following.innerHTML = '<div style="display:none"><button>Hidden</button></div><button id="after-combo">After</button>'
    document.body.append(host, following)
    const wrapper = mount(Component, { attachTo: host, props: { type: 'select', suggestions: ['Apple'] } })
    const search = await getQueryInput(wrapper)

    await search.trigger('keydown', { key: 'Tab' })
    await flush()

    expect(document.activeElement).toBe(document.getElementById('after-combo'))
  })

  it('navigates filtered categories by their stable keys without scrolling the document', async () => {
    const scrollY = window.scrollY
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', filterSuggestions: true, optionGroupChildren: 'items',
        suggestions: [
          { label: 'Fruits', items: ['Apple'] },
          { label: 'Vegetables', items: ['Carrot'] },
          { label: 'Animals', items: ['Cat'] }
        ]
      }
    })
    const search = await getQueryInput(wrapper)
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[2]?.click()
    await search.setValue('Ca')
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Carrot'])

    await search.trigger('keydown', { key: 'ArrowRight', altKey: true })
    await flush()

    expect(options().map(option => option.textContent?.trim())).toEqual(['Cat'])
    expect(window.scrollY).toBe(scrollY)
  })

  it('returns to All when a remote response removes the active category', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionGroupChildren: 'items', selected: ['Apple'],
        suggestions: [{ label: 'Fruits', items: ['Apple', 'Banana'] }]
      }
    })
    await getQueryInput(wrapper)
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[1]?.click()
    await flush()

    await wrapper.setProps({
      suggestions: [{ label: 'Vegetables', items: ['Carrot', 'Daikon'] }]
    })
    await flush()

    expect(options().map(option => option.textContent?.trim())).toEqual(['Carrot', 'Daikon'])
    expect(document.querySelector('[data-id="sds-combo-box-categories"] button[aria-pressed="true"]')?.textContent).toContain('All')
    expect(wrapper.get('[role="combobox"]').text()).toBe('Apple')
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it.each([
    { multiple: false, clearSuggestions: false },
    { multiple: true, clearSuggestions: false },
    { multiple: false, clearSuggestions: true },
    { multiple: true, clearSuggestions: true }
  ])('preserves the active remote category through loading with multiple=$multiple and clearSuggestions=$clearSuggestions', async ({ multiple, clearSuggestions }) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', multiple, optionGroupChildren: 'items',
        suggestions: [
          { label: 'Fruits', items: ['Apple', 'Banana'] },
          { label: 'Vegetables', items: ['Carrot', 'Daikon'] }
        ]
      }
    })
    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[2].click()
    await flush()

    await wrapper.setProps({ pending: true, ...(clearSuggestions ? { suggestions: [] } : {}) })
    await flush()
    await wrapper.setProps({
      pending: false,
      suggestions: [
        { label: 'Vegetables', items: ['Carrot', 'Celery'] },
        { label: 'Fruits', items: ['Cherry'] }
      ]
    })
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-categories"] button[aria-pressed="true"]')?.textContent).toContain('Vegetables')
    expect(options().map(option => option.textContent?.trim())).toEqual(['Carrot', 'Celery'])
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('returns to All when loading finishes without restoring the active category', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionGroupChildren: 'items',
        suggestions: [{ label: 'Fruits', items: ['Apple', 'Banana'] }]
      }
    })
    await getQueryInput(wrapper)
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[1].click()
    await flush()
    await wrapper.setProps({ pending: true, suggestions: [] })
    await flush()
    await wrapper.setProps({ pending: false })
    await flush()

    await wrapper.setProps({ suggestions: [{ label: 'Vegetables', items: ['Carrot', 'Daikon'] }] })
    await flush()

    expect(options().map(option => option.textContent?.trim())).toEqual(['Carrot', 'Daikon'])
    expect(document.querySelector('[data-id="sds-combo-box-categories"] button[aria-pressed="true"]')?.textContent).toContain('All')
  })

  it('keeps an active empty remote category available without rendering its label as an option', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionGroupChildren: 'items',
        suggestions: [
          { label: 'Fruits', items: ['Apple', 'Banana'] },
          { label: 'Vegetables', items: ['Carrot'] }
        ]
      }
    })
    await getQueryInput(wrapper)
    document.querySelectorAll<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')[1].click()
    await flush()

    await wrapper.setProps({
      suggestions: [
        { label: 'Fruits', items: [] },
        { label: 'Vegetables', items: ['Carrot'] }
      ]
    })
    await flush()

    expect(options()).toHaveLength(0)
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No options available.')
    expect(document.querySelector('[data-id="sds-combo-box-categories"] button[aria-pressed="true"]')?.textContent).toContain('Fruits')
    document.querySelector<HTMLButtonElement>('[data-id="sds-combo-box-categories"] button')?.click()
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Carrot'])
  })

  it.each(['text', 'select', 'taggable-select'] as const)('waits for a search before showing empty feedback in editable %s mode', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, multiple: type !== 'text', suggestions: [] }
    })
    const input = wrapper.get('[role="combobox"]')

    await input.trigger('click')
    await flush()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(input.attributes('aria-expanded')).toBe('false')
    await wrapper.setProps({ pending: true })
    await input.trigger('click')
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    await wrapper.setProps({ pending: false })
    await flush()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No options available.')
  })

  it('supports page navigation while preserving Home and End text editing in the search field', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: Array.from({ length: 30 }, (_, index) => `Option ${index}`) }
    })
    const search = await getQueryInput(wrapper)

    await search.trigger('keydown', { key: 'PageDown' })
    await flush()
    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Option 8')
    await search.trigger('keydown', { key: 'PageUp' })
    await flush()
    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Option 0')
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true })
    search.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('opens at the final option with End on the read-only trigger', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: ['Apple', 'Banana', 'Cherry'] }
    })

    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'End' })
    await flush()
    const search = await getQueryInput(wrapper)

    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Cherry')
  })

  it.each(['select', 'taggable-select'] as const)('keeps the single %s selection visible while searching and navigating in the dropdown', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, selected: [{ name: 'Apple' }], optionLabel: 'name', suggestions: [{ name: 'Apple' }, { name: 'Banana' }] }
    })
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    expect(input.element.value).toBe('Apple')
    expect(wrapper.find('[data-id="sds-tag"]').exists()).toBe(false)

    await input.trigger('click')
    await flush()
    expect(input.element.value).toBe('Apple')
    const search = document.querySelector<HTMLInputElement>('[data-id="sds-combo-box-filter"]')
    expect(search).not.toBeNull()
    if (!search) throw new Error('Expected the dropdown search field')
    expect(document.activeElement).toBe(search)
    search.value = 'Ban'
    search.dispatchEvent(new Event('input', { bubbles: true }))
    await flush()
    expect(input.element.value).toBe('Apple')
    expect(search.value).toBe('Ban')
    search.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await flush()
    expect(input.element.value).toBe('Apple')
    expect(search.value).toBe('Ban')
    expect(wrapper.emitted('update:selected')).toBeUndefined()

    search.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
    await flush()
    expect(input.element.value).toBe('Apple')
    expect(input.attributes('aria-expanded')).toBe('false')

    await wrapper.setProps({ selected: [{ name: 'Banana' }] })
    expect(input.element.value).toBe('Banana')
  })

  it.each(['Enter', ' ', 'ArrowDown', 'ArrowUp'])('opens single-select search with %j without committing a selection', async (key) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', selected: ['Apple'], suggestions: ['Apple', 'Banana'] }
    })
    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    trigger.element.focus()

    await trigger.trigger('keydown', { key })
    await flush()
    const search = await getQueryInput(wrapper)
    if (key === 'Enter') await search.trigger('keyup', { key })

    expect(document.activeElement).toBe(search.element)
    expect(trigger.element.value).toBe('Apple')
    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-activedescendant')).toBeUndefined()
    expect(document.getElementById(trigger.attributes('aria-controls') ?? '')?.getAttribute('role')).toBe('dialog')
    expect(search.attributes('aria-controls')).toBe(document.querySelector('[role="listbox"]')?.id)
    expect(wrapper.emitted('result')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it('focuses and refocuses dropdown search with Alt+Down without scrolling the surrounding page', async () => {
    const focus = vi.spyOn(HTMLElement.prototype, 'focus')
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', selected: ['Apple'], suggestions: ['Apple', 'Banana'] }
    })
    const trigger = wrapper.get('[role="combobox"]')
    const search = await getQueryInput(wrapper)

    await trigger.trigger('keydown', { key: 'ArrowDown', altKey: true })
    await flush()

    const searchFocusCalls = focus.mock.calls.filter((_, index) => focus.mock.contexts[index] === search.element)
    expect(searchFocusCalls).toEqual([
      [{ preventScroll: true }],
      [{ preventScroll: true }]
    ])
    expect(document.activeElement).toBe(search.element)
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it.each(['select', 'taggable-select'] as const)('starts %s searches by typing on the trigger without replacing its selected label', async (type) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type, selected: ['Apple'], suggestions: ['Apple', 'Banana'], filterSuggestions: true, debounceComplete: 0 }
    })
    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')

    await trigger.trigger('keydown', { key: 'B' })
    await flush()
    const search = await getQueryInput(wrapper)

    expect(trigger.element.value).toBe('Apple')
    expect(search.element.value).toBe('B')
    expect(document.activeElement).toBe(search.element)
    expect(options().some(option => option.textContent?.trim() === 'Banana')).toBe(true)
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['B'])
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it.each(['Backspace', 'Delete'])('does not clear the saved selection when %s is pressed in an empty dropdown search', async (key) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', selected: ['Apple'], suggestions: ['Apple', 'Banana'] }
    })
    const search = await getQueryInput(wrapper)

    await search.trigger('keydown', { key })

    expect(wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]').element.value).toBe('Apple')
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it('creates a custom single selection from dropdown search and restores trigger focus', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'taggable-select', selected: ['Apple'], suggestions: ['Apple'], filterSuggestions: true,
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      }
    })
    const search = await getQueryInput(wrapper)

    await search.setValue('Dragonfruit')
    await flush()
    await search.trigger('keydown', { key: 'Enter' })
    await search.trigger('keyup', { key: 'Enter' })
    await flush()

    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    expect(trigger.element.value).toBe('Dragonfruit')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    expect(wrapper.emitted('result')?.at(-1)).toEqual([{ label: 'Dragonfruit', name: 'Dragonfruit', value: 'Dragonfruit', __cbxCustom: true }])
  })

  it('validates and submits only the saved single selection, not the dropdown query', async () => {
    const form = document.createElement('form')
    form.id = 'combo-single-selection'
    document.body.append(form)
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', required: true, form: form.id, name: 'fruit', selected: ['Apple'], suggestions: ['Apple', 'Banana'],
        'onUpdate:selected': selected => wrapper.setProps({ selected })
      }
    })
    const search = await getQueryInput(wrapper)
    await search.setValue('Banana')
    await flush()
    expect(form.checkValidity()).toBe(true)
    expect(new FormData(form).getAll('fruit')).toEqual(['Apple'])

    await wrapper.get('[data-id="sds-combo-box-clear-button"]').trigger('click')
    await flush()
    expect(form.checkValidity()).toBe(false)
    await nextTick()
    expect(wrapper.get('[role="alert"]').text()).toBe('Please select an item from the suggestions.')
    expect(document.activeElement).toBe(wrapper.get('[role="combobox"]').element)
    expect(new FormData(form).getAll('fruit')).toEqual([])

    const reopenedSearch = await getQueryInput(wrapper)
    await reopenedSearch.setValue('Banana')
    await flush()
    expect(form.checkValidity()).toBe(false)
    await reopenedSearch.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(form.checkValidity()).toBe(true)
    expect(new FormData(form).getAll('fruit')).toEqual(['Banana'])
  })

  it('preserves the selected label and query during IME composition in dropdown search', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'taggable-select', selected: ['Apple'], suggestions: [], debounceComplete: 0 }
    })
    const search = await getQueryInput(wrapper)

    await search.trigger('compositionstart')
    await search.setValue('\u65e5\u672c')
    await search.trigger('keydown', { key: 'Escape', isComposing: true })
    await search.trigger('keyup', { key: 'Enter', isComposing: true })
    await flush()

    const trigger = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    expect(trigger.element.value).toBe('Apple')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(search.element.value).toBe('\u65e5\u672c')
    expect(wrapper.emitted('complete')).toBeUndefined()
    expect(wrapper.emitted('update:selected')).toBeUndefined()

    await search.trigger('compositionend')
    await search.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['\u65e5\u672c'])
    expect(wrapper.emitted('update:selected')).toBeUndefined()
  })

  it('localizes the dropdown search field independently of the trigger placeholder', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', suggestions: [], placeholder: 'Choose a fruit', messages: { searchSuggestions: 'Frucht suchen' } }
    })

    const search = await getQueryInput(wrapper)

    expect(search.attributes('placeholder')).toBe('Frucht suchen')
    expect(search.attributes('aria-label')).toBe('Frucht suchen')
    expect(wrapper.get('[role="combobox"]').text()).toBe('Choose a fruit')
  })

  it.each([false, true])('truncates default virtual option labels with multiple=%s', async (multiple) => {
    const label = 'A long option label that should stay on one line in a virtualized list'
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple, virtualize: true, virtualizeThreshold: 1, suggestions: [label] }
    })

    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()

    const option = options()[0]
    const content = option.querySelector('[title]')
    expect(content?.textContent).toBe(label)
    expect(content?.classList.contains('truncate')).toBe(true)
    expect(content?.getAttribute('title')).toBe(label)
    expect(content?.classList.contains('min-w-0')).toBe(true)
    expect(content?.classList.contains('flex-1')).toBe(true)
    expect(option.style.height).toBe('36px')

    await wrapper.setProps({ virtualize: false })
    await flush()
    expect(options()[0].querySelector('.truncate')).toBeNull()
    expect(options()[0].querySelector('.wrap-anywhere')?.textContent).toBe(label)
  })

  it.each([
    { optionType: 'button', multiple: false },
    { optionType: 'button', multiple: true },
    { optionType: 'a', multiple: false },
    { optionType: 'a', multiple: true }
  ] as const)('truncates slotted virtual $optionType labels with multiple=$multiple', async ({ optionType, multiple }) => {
    const label = '23015-196-5003875 - 23-00112-SA-000 Erie - a long charge string description'
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        type: 'select', optionType, multiple, modelValue: '', selected: [],
        virtualize: true, virtualizeThreshold: 1, suggestions: [label]
      },
      slots: { option: ({ label }: { label: string }) => h('span', label) }
    })

    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()

    const option = options()[0]
    const content = option.querySelector('.min-w-0.flex-1')
    expect(content?.classList.contains('truncate')).toBe(true)
    expect(content?.getAttribute('title')).toBe(label)
    expect(content?.textContent).toBe(label)
    expect(option.style.height).toBe('36px')
    expect(option.classList.contains('overflow-hidden')).toBe(true)

    await wrapper.setProps({ virtualize: false })
    await flush()

    expect(options()[0].querySelector('.truncate')).toBeNull()
    expect(options()[0].querySelector('[title]')).toBeNull()
    expect(options()[0].querySelector('.min-w-0.flex-1')?.textContent).toBe(label)
  })

  it('allows the option slot to replace truncation with a custom fixed-height virtual layout', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', virtualize: true, virtualizeThreshold: 1, virtualItemHeight: 64, suggestions: ['Apple'] },
      slots: {
        option: ({ label }: { label: string }) => h('span', { class: 'whitespace-normal', 'data-custom-option': '' }, [
          h('strong', label), h('span', { class: 'block' }, 'Extra detail')
        ])
      }
    })

    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()

    const option = options()[0]
    expect(option.style.height).toBe('64px')
    expect(option.querySelector('.min-w-0.flex-1')?.classList.contains('truncate')).toBe(true)
    expect(option.querySelector('[data-custom-option]')?.classList.contains('whitespace-normal')).toBe(true)
    expect(option.querySelector('[data-custom-option]')?.textContent).toBe('AppleExtra detail')
    option.click()
    await flush()
    expect(wrapper.emitted('result')?.at(-1)).toEqual(['Apple'])
    expect(wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]').element.value).toBe('Apple')
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')

    await input.trigger('keydown', { key })
    await flush()

    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    const search = await getQueryInput(wrapper)
    const active = document.getElementById(search.attributes('aria-activedescendant') ?? '')
    expect(active?.textContent?.trim()).toBe('Option 199')
    expect(list?.scrollTop).toBe((200 + (grouped ? 2 : 0)) * 36 - 288)
    expect(input.element.value).toBe('')
    expect(search.element.value).toBe(query)
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
    const input = wrapper.get('[role="combobox"]')

    await input.trigger('keydown', { key: 'ArrowUp' })
    await flush()

    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    const search = await getQueryInput(wrapper)
    const active = document.getElementById(search.attributes('aria-activedescendant') ?? '')
    expect(active?.textContent?.trim()).toBe('Option 199')
    expect(list?.scrollTop).toBe(200 * 36 - 288)
  })

  it.each([
    { index: 150, height: 288, saved: false }, { index: 199, height: 288, saved: false },
    { index: 199, height: 164, saved: false }, { index: 199, height: 164, saved: true }
  ])('reveals option $index after layout settles at $height pixels tall, saved=$saved', async ({ index, height, saved }) => {
    const resizeCallbacks: (() => void)[] = []
    const observeResize = resizeObserver.useResizeObserver
    vi.spyOn(resizeObserver, 'useResizeObserver').mockImplementation((target, callback, options) => {
      resizeCallbacks.push(() => {
        const element = target.value
        if (!element) throw new Error('Expected a scroll container')
        callback({
          target: element, contentRect: new DOMRect(0, 0, 300, height),
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
        type: 'select', modelValue: saved ? '' : `Option ${index}`, selected: saved ? [`Option ${index}`] : [], virtualize: true,
        suggestions: Array.from({ length: 200 }, (_, index) => `Option ${index}`)
      }
    })
    const input = wrapper.get('[role="combobox"]')
    await input.trigger(saved ? 'click' : 'keydown', { key: 'ArrowDown' })
    await flush()
    const list = document.querySelector<HTMLElement>('[role="listbox"]')
    expect(list?.scrollTop).toBe(0)

    isLayoutReady = true
    resizeCallbacks.forEach(callback => callback())
    await flush()

    expect(list?.scrollTop).toBe((index + 1) * 36 - height)
    const search = await getQueryInput(wrapper)
    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe(`Option ${index}`)
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
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

    await wrapper.get('[role="combobox"]').setValue('New')
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
    const input = wrapper.get('[role="combobox"]')
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
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
    await (await getQueryInput(wrapper)).setValue('New')
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    expect(options()).toHaveLength(0)
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('true')
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
    const input = wrapper.get('[role="combobox"]')
    await input.setValue('New')
    await flush()
    expect(document.querySelector('[data-id="sds-combo-box-categories"]') !== null).toBe(grouped)
    expect(document.querySelector('[data-id="sds-combo-box-actions"]')).not.toBeNull()
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
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: [], pending: true } })
    const input = await getQueryInput(wrapper)
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
    const input = wrapper.get('[role="combobox"]')
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
    const input = wrapper.get('[role="combobox"]')
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
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: [], pending: true } })
    const input = await getQueryInput(wrapper)
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
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', suggestions: [], pending: true, filterSuggestions: true } })
    await (await getQueryInput(wrapper)).setValue('Missing')
    await flush()
    await wrapper.setProps({ pending: false, suggestions: [] })
    await flush()

    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "Missing"')
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it('clears stale keyboard display while pending and activates the new results on completion', async () => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', suggestions: ['Old one', 'Old two'] } })
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    const search = await getQueryInput(wrapper)
    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent).toContain('Old one')
    await wrapper.setProps({ pending: true })
    await flush()
    expect(input.element.value).toBe('')
    expect(search.attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.setProps({ pending: false, suggestions: ['New one', 'New two'] })
    await flush()

    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent).toContain('New one')
    await search.trigger('keyup', { key: 'Enter' })
    await flush()
    expect(wrapper.emitted('result')?.at(-1)).toEqual(['New one'])
  })

  it.each(['', ' ', '\t\n', '\u00a0'])('does not offer or add an empty custom value %j', async (query) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: [], filterSuggestions: true } })
    const input = await getQueryInput(wrapper)
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
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: [], debounceComplete: 250, onComplete: complete } })
    const input = await getQueryInput(wrapper)
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
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'taggable-select', suggestions: [], optionLabel: 'title', optionValue: 'key' } })
    const input = await getQueryInput(wrapper)
    await input.setValue(' List<T> ')
    await input.trigger('keyup', { key: 'Enter' })
    await flush()

    expect(wrapper.emitted('result')?.at(-1)).toEqual([{ label: 'List<T>', name: 'List<T>', value: 'List<T>', title: 'List<T>', key: 'List<T>', __cbxCustom: true }])
    expect(wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]').element.value).toBe('List<T>')
    expect(wrapper.find('[data-id="sds-tag"]').exists()).toBe(false)
  })

  it.each(['id', 'value', 'userId'])('distinguishes duplicate labels using %s and emits the selected record', async (key) => {
    const first = { label: 'Alex', [key]: 1 }
    const second = { label: 'Alex', [key]: 2 }
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'select', multiple: true, suggestions: [first, second], optionValue: key }
    })
    await wrapper.get('[role="combobox"]').trigger('click')
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
    const input = wrapper.get('[role="combobox"]')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
    await flush()

    expect(options()[0].getAttribute('aria-selected')).toBe('true')
  })

  it.each(['readonly', 'disabled'] as const)('blocks keyboard opening and stale bulk actions when %s', async (state) => {
    const wrapper = mount(Component, { attachTo: document.body, props: { type: 'select', multiple: true, enableSelectAll: true, suggestions: ['Apple', 'Banana'] } })
    const input = wrapper.get('[role="combobox"]')
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
    const input = await getQueryInput(wrapper)
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
    const input = await getQueryInput(wrapper)
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    const input = await getQueryInput(wrapper)
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
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    expect(options().map(option => option.textContent?.trim())).toEqual(['Apple', 'Banana'])
    expect(document.querySelector('[role="listbox"]')?.textContent).not.toContain('Empty group')

    await wrapper.setProps({ suggestions: [' ', { label: '\t' }] })
    await flush()
    expect(options()).toHaveLength(0)
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No options available.')
  })

  it('does not select a partial match when the typed custom tag is already selected', async () => {
    const selected = [{ label: 'Apple', name: 'Apple', value: 'Apple', __cbxCustom: true }]
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { type: 'taggable-select', multiple: true, suggestions: ['Apple Pie'], selected }
    })
    const input = wrapper.get('[role="combobox"]')
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    input.element.focus()
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    const search = await getQueryInput(wrapper)
    expect(document.getElementById(search.attributes('aria-activedescendant') ?? '')?.textContent).toContain('Apple')
    await search.trigger('keydown', { key: 'Escape' })
    await flush()
    await input.trigger('keydown', { key: 'Escape' })
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  it('does not reopen dismissed text suggestions when a debounced request completes', async () => {
    const complete = vi.fn()
    const wrapper = mount(Component, { attachTo: document.body, props: { suggestions: ['Apple'], debounceComplete: 250, onComplete: complete } })
    const input = wrapper.get('[role="combobox"]')
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
      await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    const input = wrapper.get('[role="combobox"]')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    expect(options()).toHaveLength(1)
    expect(options()[0].id).toBe((await getQueryInput(wrapper)).attributes('aria-activedescendant'))
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    await wrapper.get('[role="combobox"]').setValue('New')
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
    const input = wrapper.get('[role="combobox"]')
    await input.trigger('click')
    await flush()
    const activeId = (await getQueryInput(wrapper)).attributes('aria-activedescendant') ?? ''
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    expect(document.getElementById((await getQueryInput(wrapper)).attributes('aria-activedescendant') ?? '')?.textContent?.trim()).toBe('Option 9999')
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
      const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
      await (await getQueryInput(wrapper)).setValue('Changed query')
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
      expect(input.element.value).toBe(type === 'text' ? 'Initial query' : 'Apple')
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
    const search = await getQueryInput(wrapper)
    await search.setValue('Changed query')
    await wrapper.setProps({ selected: ['Banana'] })
    await flush()

    form.reset()
    await flush()

    expect(wrapper.props('modelValue')).toBe('Changed query')
    expect(input.element.value).toBe('Banana')
    expect(search.element.value).toBe('Changed query')
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
    await wrapper.get('[role="combobox"]').trigger('click')
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
    const input = wrapper.get<HTMLInputElement | HTMLButtonElement>('[role="combobox"]')
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
      props: { type: 'taggable-select', multiple: true, suggestions: [], messages: { emptyValue: 'Bitte Text eingeben.', add: label => `Neu: ${label}`, remove: label => `${label} entfernen` } }
    })
    const input = wrapper.get('[role="combobox"]')
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
    const description = wrapper.get('[role="combobox"]').attributes('aria-describedby')
    expect(document.getElementById(description)?.textContent).toBe('10 items selected.')
  })
})
