import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ComboBox from '../../../components/ComboBox/ComboBox.vue'
import Page from './inputs.vue'

describe('ComboBox playground examples', () => {
  enableAutoUnmount(afterEach)
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('definePage', vi.fn())
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1440)
  })
  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  const mountRemoteComboBox = () => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const comboBox = page.findAllComponents(ComboBox).find(component =>
      component.props('multiple') && component.props('required') && component.props('size') === 'lg'
    )
    if (!comboBox) throw new Error('Remote-search example not found')
    return comboBox
  }

  it.each(['comboBoxEmptySearch', 'comboBoxClearedSuggestions', 'comboBox2_1'])('associates the visible label with the %s field', (id) => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const field = page.get<HTMLInputElement | HTMLButtonElement>(`#${id}`)

    expect(field.element.labels).toHaveLength(1)
    expect(field.element.labels?.[0].control).toBe(field.element)
    expect(field.element.labels?.[0].textContent?.trim()).not.toBe('')
  })

  it('gives every single-select trigger a name independent of its placeholder or selection', () => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const triggers = page.findAll<HTMLButtonElement>('button[role="combobox"]')

    expect(triggers).toHaveLength(4)
    for (const trigger of triggers) {
      const label = trigger.attributes('aria-label') || trigger.element.labels?.[0]?.textContent?.trim()
      expect(label).toBeTruthy()
    }
  })

  it('restores all optional-search results after clearing the query and pressing Enter', async () => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const example = page.get('[data-id="sds-combo-box-empty-search-example"]')
    const comboBox = example.getComponent(ComboBox)
    const input = comboBox.get<HTMLInputElement>('input[role="combobox"]')
    const results = () => example.findAll('li').map(item => item.text())
    const status = () => example.get('[data-id="sds-combo-box-empty-search-status"]').text()
    expect(input.element.form).toBe(example.element)
    expect(input.element.form?.checkValidity()).toBe(true)
    expect(comboBox.props('required')).toBe(false)
    expect(results()).toEqual(['Jason Chen', 'Morgan Lee', 'Sam Patel'])

    await input.setValue('Jason')
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(Array.from(document.querySelectorAll('[role="listbox"] [role="option"]'), option => option.textContent?.trim()))
      .toEqual(['Jason Chen'])
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(results()).toEqual(['Jason Chen'])
    expect(status()).toContain('Searches submitted: 1.')
    expect(status()).toContain('Last submitted query: "Jason Chen".')

    await comboBox.get('[data-id="sds-combo-box-clear-button"]').trigger('click')
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(input.element.value).toBe('')
    expect(results()).toEqual(['Jason Chen'])
    expect(status()).toContain('Searches submitted: 1.')

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })

    expect(results()).toEqual(['Jason Chen', 'Morgan Lee', 'Sam Patel'])
    expect(status()).toContain('Searches submitted: 2.')
    expect(status()).toContain('Last submitted query: "".')
    expect(input.classes()).not.toContain('animate-shake')
    expect(comboBox.emitted('result')).toEqual([['Jason Chen']])
    expect(comboBox.emitted('enter')).toEqual([['']])
  })

  it('searches when a filtered suggestion is clicked in the optional-search example', async () => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const example = page.get('[data-id="sds-combo-box-empty-search-example"]')
    const comboBox = example.getComponent(ComboBox)
    const input = comboBox.get<HTMLInputElement>('input[role="combobox"]')
    await input.setValue('morgan')
    await vi.runAllTimersAsync()
    await flushPromises()

    const suggestion = document.querySelector<HTMLElement>('[role="listbox"] [role="option"]')
    if (!suggestion) throw new Error('Expected a matching person suggestion')
    expect(suggestion.textContent?.trim()).toBe('Morgan Lee')
    suggestion.click()
    await flushPromises()

    expect(input.element.value).toBe('Morgan Lee')
    expect(comboBox.emitted('result')).toEqual([['Morgan Lee']])
    expect(example.findAll('li').map(item => item.text())).toEqual(['Morgan Lee'])
    expect(example.get('[data-id="sds-combo-box-empty-search-status"]').text())
      .toContain('Searches submitted: 1. Last submitted query: "Morgan Lee".')
  })

  it('demonstrates selection clearing suggestions without hiding a later unsuccessful search', async () => {
    const page = mount(Page, { attachTo: document.body, global: { plugins: [createHead()] } })
    const example = page.get('[data-id="sds-combo-box-cleared-suggestions-example"]')
    const comboBox = example.getComponent(ComboBox)
    const input = comboBox.get('[role="combobox"]')
    await input.trigger('click')
    await vi.runAllTimersAsync()
    await flushPromises()

    const suggestion = document.querySelector<HTMLElement>('[role="listbox"] [role="option"]')
    if (!suggestion) throw new Error('Expected the Apple suggestion')
    expect(suggestion.textContent?.trim()).toBe('Apple')
    suggestion.click()
    await vi.runAllTimersAsync()
    await flushPromises()

    expect(comboBox.props('selected')).toEqual(['Apple'])
    expect(comboBox.props('suggestions')).toEqual([])
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(example.text()).toContain('Suggestions remaining: 0.')

    await input.setValue('Man')
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(Array.from(document.querySelectorAll('[role="listbox"] [role="option"]'), option => option.textContent?.trim()))
      .toEqual(['Mango'])

    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(comboBox.props('selected')).toEqual(['Apple', 'Mango'])
    expect(comboBox.props('suggestions')).toEqual([])
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()

    await input.setValue('Missing')
    await vi.runAllTimersAsync()
    await flushPromises()

    expect(comboBox.props('selected')).toEqual(['Apple', 'Mango'])
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')?.textContent).toContain('No matches for "Missing"')
  })

  it('does not open empty suggestions before the first search', async () => {
    const comboBox = mountRemoteComboBox()
    const input = comboBox.get<HTMLInputElement>('input[role="combobox"]')
    input.element.focus()
    await input.trigger('click')
    await vi.runAllTimersAsync()
    await flushPromises()

    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
    expect(comboBox.emitted('complete')).toBeUndefined()
    expect(comboBox.props('pending')).toBe(false)
  })

  it('shows loading instead of Add throughout debounce and the remote request', async () => {
    const comboBox = mountRemoteComboBox()
    const input = comboBox.get('input[role="combobox"]')
    input.element.focus()
    await input.setValue('a')
    await vi.advanceTimersByTimeAsync(0)
    await flushPromises()

    expect(input.attributes('aria-busy')).toBe('true')
    expect(document.querySelector('[data-id="sds-combo-box-loading"]')).not.toBeNull()
    expect(document.querySelectorAll('[role="listbox"] [role="option"]')).toHaveLength(0)
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('keyup', { key: 'Enter' })
    expect(comboBox.props('selected')).toEqual([])
    await vi.advanceTimersByTimeAsync(comboBox.props('debounceComplete') - 1)
    expect(input.attributes('aria-busy')).toBe('true')
    expect(document.querySelectorAll('[role="listbox"] [role="option"]')).toHaveLength(0)
    await vi.advanceTimersByTimeAsync(1000)
    expect(input.attributes('aria-busy')).toBe('true')
    await vi.advanceTimersByTimeAsync(1)
    await flushPromises()

    expect(input.attributes('aria-busy')).toBeUndefined()
    expect(document.querySelector('[role="listbox"] [role="option"]')?.textContent?.trim()).toBe('Add "a"')
  })

  it('ignores an older response while the next query is still debouncing', async () => {
    const comboBox = mountRemoteComboBox()
    const input = comboBox.get('input[role="combobox"]')
    await input.setValue('a')
    await vi.advanceTimersByTimeAsync(comboBox.props('debounceComplete') + 999)
    await input.setValue('ab')
    await vi.advanceTimersByTimeAsync(1)
    await flushPromises()

    expect(input.attributes('aria-busy')).toBe('true')
    expect(comboBox.props('suggestions')).toEqual([])
    expect(document.querySelectorAll('[role="listbox"] [role="option"]')).toHaveLength(0)
    await vi.runAllTimersAsync()
    await flushPromises()

    expect(input.attributes('aria-busy')).toBeUndefined()
    expect(document.querySelector('[role="listbox"] [role="option"]')?.textContent?.trim()).toBe('Add "ab"')
  })

  it('keeps fetched suggestions available after selecting a result', async () => {
    const comboBox = mountRemoteComboBox()
    const input = comboBox.get('input[role="combobox"]')
    await input.setValue('Apple')
    await vi.runAllTimersAsync()
    await flushPromises()
    const suggestions = [...comboBox.props('suggestions')]
    const apple = Array.from(document.querySelectorAll<HTMLElement>('[role="listbox"] [role="option"]'))
      .find(option => option.textContent?.trim() === 'Apple')
    if (!apple) throw new Error('Expected the fetched Apple suggestion')

    apple.click()
    await vi.runAllTimersAsync()
    await flushPromises()

    expect(comboBox.props('modelValue')).toBe('')
    expect(comboBox.props('suggestions')).toEqual(suggestions)
    expect(comboBox.props('selected')).toEqual([expect.objectContaining({ label: 'Apple' })])
    expect(document.querySelector('[role="listbox"] [role="option"]')?.textContent?.trim()).toBe('Apple')
    expect(document.querySelector('[data-id="sds-combo-box-no-matches"]')).toBeNull()
  })

  it.each(['', '   '])('immediately cancels pending state when the query becomes blank (%j)', async (query) => {
    const comboBox = mountRemoteComboBox()
    const input = comboBox.get('input[role="combobox"]')
    await input.setValue('a')
    await vi.advanceTimersByTimeAsync(comboBox.props('debounceComplete'))
    await input.setValue(query)
    await flushPromises()

    expect(input.attributes('aria-busy')).toBeUndefined()
    await vi.runAllTimersAsync()
    await flushPromises()
    expect(comboBox.props('suggestions')).toEqual([])
    expect(document.querySelectorAll('[role="listbox"] [role="option"]')).toHaveLength(0)
  })
})
