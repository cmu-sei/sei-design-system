import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useComboBoxSelection } from './useComboBoxSelection'
import type { ComboBoxSuggestion } from './useComboBoxSuggestions'

const getLabel = (item: ComboBoxSuggestion): string => {
  if (typeof item === 'object' && item !== null) return String(item.label ?? item.name ?? '')
  return item
}

const createSelection = (overrides: Partial<{
  selected: ComboBoxSuggestion[];
  suggestions: ComboBoxSuggestion[];
  optionGroupChildren: string | undefined;
  optionValue: string | undefined;
}> = {}) => {
  const selected = ref<ComboBoxSuggestion[]>(overrides.selected ?? [])
  const suggestions = ref<ComboBoxSuggestion[]>(overrides.suggestions ?? [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    'Kiwi'
  ])

  return {
    selected,
    suggestions,
    ...useComboBoxSelection({
      selected,
      suggestions: () => suggestions.value,
      getLabel,
      optionValue: () => overrides.optionValue,
      optionGroupChildren: () => overrides.optionGroupChildren,
      getChildren: (item) => {
        if (typeof item === 'object' && item !== null && overrides.optionGroupChildren && Array.isArray(item[overrides.optionGroupChildren])) {
          return item[overrides.optionGroupChildren] as ComboBoxSuggestion[]
        }
        return []
      }
    })
  }
}

describe('useComboBoxSelection', () => {
  it.each(['id', 'value'])('does not infer identity from a reused %s field', (key) => {
    const original = { label: 'Original customer', [key]: 'customer-0' }
    const different = { label: 'Different customer', [key]: 'customer-0' }
    const selection = createSelection({ selected: [original], suggestions: [different] })

    expect(selection.isSelected(different)).toBe(false)
    expect(selection.resolveSuggestion(different).emitValue).toEqual(different)
    expect(selection.getOptionValue(original)).toBe('Original customer')
  })

  it('matches restored selections by label despite different wrapper IDs', () => {
    const restored = { id: 'restored-customer', label: 'Customer' }
    const current = { id: 'customer-0', label: 'Customer' }
    const selection = createSelection({ selected: [restored], suggestions: [current] })

    expect(selection.isSelected(current)).toBe(true)
    expect(selection.resolveSuggestion(restored).emitValue).toEqual(current)
  })

  it('uses only the configured identity field for records with duplicate labels', () => {
    const original = { id: 'customer-0', customerId: 10, label: 'Customer' }
    const different = { id: 'customer-0', customerId: 20, label: 'Customer' }
    const selection = createSelection({
      selected: [original], suggestions: [original, different], optionValue: 'customerId'
    })

    expect(selection.isSelected(different)).toBe(false)
    expect(selection.isSelected({ ...original, id: 'restored-customer', label: 'Updated name' })).toBe(true)
    expect(selection.getOptionValue(original)).toBe('10')
  })

  it.each([undefined, null, {}, NaN, Infinity])('warns without falling back to labels for an invalid configured identity %j', (identity) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const original = { label: 'Customer', customerId: 10 }
      const invalid = { label: 'Customer', customerId: identity }
      const selection = createSelection({
        selected: [original], suggestions: [invalid], optionValue: 'customerId'
      })

      expect(selection.isSelected(invalid)).toBe(false)
      expect(selection.sameOption(invalid, { label: 'Customer', customerId: 20 })).toBe(false)
      expect(warn).toHaveBeenCalledOnce()
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('optionValue="customerId"'), invalid)
    } finally {
      warn.mockRestore()
    }
  })

  it.each(['items', 'children'])('excludes empty groups from exact matches using %s', (childrenKey) => {
    const selection = createSelection({
      optionGroupChildren: childrenKey,
      suggestions: [
        { label: 'Empty', [childrenKey]: [] },
        { label: 'Outer', [childrenKey]: [{ label: 'Nested empty', [childrenKey]: [] }, 'Apple'] }
      ]
    })

    expect(selection.findOriginalSuggestion('Empty')).toBeUndefined()
    expect(selection.findOriginalSuggestion('Nested empty')).toBeUndefined()
    expect(selection.findOriginalSuggestion('Apple')).toBe('Apple')
  })

  it.each(['items', 'children'])('does not let an empty group shadow a real option identity using %s', (childrenKey) => {
    const apple = { id: 1, label: 'Apple' }
    const selection = createSelection({
      optionGroupChildren: childrenKey,
      optionValue: 'id',
      suggestions: [{ id: 1, label: 'Empty', [childrenKey]: [] }, { label: 'Fruit', [childrenKey]: [apple] }]
    })

    expect(selection.resolveSuggestion({ id: 1, label: 'Apple' })).toEqual({
      normalizedOption: apple,
      emitValue: apple
    })
  })

  it('allows a leaf option with an array field that is not configured as group children', () => {
    const option = { label: 'Standalone', items: [] }
    const selection = createSelection({ suggestions: [option] })

    expect(selection.findOriginalSuggestion('Standalone')).toEqual(option)
  })

  it('adds selections without leaking internal ComboBox index fields', () => {
    const selection = createSelection()

    selection.addSelection({ label: 'Dragonfruit', value: 'dragonfruit', __cbxIdx: 'add' })

    expect(selection.selected.value).toEqual([
      { label: 'Dragonfruit', value: 'dragonfruit' }
    ])
  })

  it('does not replace an unknown identity with a different option that has the same label', () => {
    const original = { label: 'Apple', value: 'apple' }
    const selection = createSelection({ suggestions: [original], optionValue: 'value' })

    const resolved = selection.resolveSuggestion({ label: 'Apple', value: 'temporary', __cbxIdx: 1 })

    expect(resolved.normalizedOption).toEqual({ label: 'Apple', value: 'temporary' })
    expect(resolved.emitValue).toEqual({ label: 'Apple', value: 'temporary' })
  })

  it('resolves string suggestions without converting the emitted value to an object', () => {
    const selection = createSelection({ suggestions: ['Kiwi'] })

    const resolved = selection.resolveSuggestion({ label: 'Kiwi', __cbxIdx: 1 })

    expect(resolved.normalizedOption).toBe('Kiwi')
    expect(resolved.emitValue).toBe('Kiwi')
  })

  it('toggles all provided options into and out of the selected list', () => {
    const selection = createSelection()
    const options: ComboBoxSuggestion[] = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]

    selection.toggleSelections(options)

    expect(selection.selected.value).toEqual([
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ])
    expect(selection.areAllSelected(options)).toBe(true)
    expect(selection.areSomeSelected(options)).toBe(false)

    selection.toggleSelections(options)

    expect(selection.selected.value).toEqual([])
  })

  it('replaces and clears selections', () => {
    const selection = createSelection({ selected: ['Apple', 'Banana'] })

    selection.replaceSelection({ label: 'Kiwi', __cbxIdx: 1 })
    expect(selection.selected.value).toEqual([{ label: 'Kiwi' }])

    selection.clearSelections()
    expect(selection.selected.value).toEqual([])
  })

  it('resolves original child suggestions in grouped option data', () => {
    const apple = { label: 'Apple', value: 'apple' }
    const selection = createSelection({
      optionGroupChildren: 'items',
      suggestions: [
        {
          label: 'Fruit',
          items: [apple]
        }
      ]
    })

    expect(selection.findOriginalSuggestion('Apple')).toEqual(apple)
    expect(selection.resolveSuggestion({ label: 'Apple', __cbxIdx: 0 }).emitValue).toEqual(apple)
  })
})
