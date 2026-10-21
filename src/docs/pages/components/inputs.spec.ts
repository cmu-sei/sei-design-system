import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createHead } from '@unhead/vue/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ComboBox from '../../../components/ComboBox/ComboBox.vue'
import Page from './inputs.vue'

describe('ComboBox remote-search example', () => {
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
