import { afterEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useComboBoxQuery } from './useComboBoxQuery'

describe('useComboBoxQuery', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('sanitizes query updates without emitting complete for internal updates', async () => {
    vi.useFakeTimers()
    const query = ref('')
    const onComplete = vi.fn()
    const onShowDropdown = vi.fn()
    const comboBoxQuery = useComboBoxQuery({
      query,
      debounce: 0,
      onComplete,
      onShowDropdown
    })

    comboBoxQuery.setQuery('<strong>Apple</strong>')
    await vi.runAllTimersAsync()

    expect(query.value).toBe('Apple')
    expect(onComplete).not.toHaveBeenCalled()
    expect(onShowDropdown).not.toHaveBeenCalled()
  })

  it('emits complete and opens dropdown for user-entered queries', async () => {
    vi.useFakeTimers()
    const query = ref('')
    const onComplete = vi.fn()
    const onShowDropdown = vi.fn()
    const comboBoxQuery = useComboBoxQuery({
      query,
      debounce: 0,
      onComplete,
      onShowDropdown
    })

    comboBoxQuery.setUserQuery('Banana')
    await vi.runAllTimersAsync()

    expect(onComplete).toHaveBeenCalledWith('Banana')
    expect(onShowDropdown).toHaveBeenCalledOnce()
  })

  it('sanitizes, emits complete, and opens dropdown for external query updates', async () => {
    vi.useFakeTimers()
    const query = ref('')
    const onComplete = vi.fn()
    const onShowDropdown = vi.fn()
    useComboBoxQuery({
      query,
      debounce: 0,
      onComplete,
      onShowDropdown
    })

    query.value = '<strong>Cherry</strong>'
    await vi.runAllTimersAsync()

    expect(query.value).toBe('Cherry')
    expect(onComplete).toHaveBeenCalledWith('Cherry')
    expect(onShowDropdown).toHaveBeenCalledOnce()
  })

  it('does not open dropdown for empty external query updates', async () => {
    vi.useFakeTimers()
    const query = ref('Apple')
    const onComplete = vi.fn()
    const onShowDropdown = vi.fn()
    useComboBoxQuery({
      query,
      debounce: 0,
      onComplete,
      onShowDropdown
    })

    query.value = ''
    await vi.runAllTimersAsync()

    expect(onComplete).toHaveBeenCalledWith('')
    expect(onShowDropdown).not.toHaveBeenCalled()
  })
})
