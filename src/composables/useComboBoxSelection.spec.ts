import { describe, expect, it } from 'vitest'
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
  it('adds selections without leaking internal ComboBox index fields', () => {
    const selection = createSelection()

    selection.addSelection({ label: 'Dragonfruit', value: 'dragonfruit', __cbxIdx: 'add' })

    expect(selection.selected.value).toEqual([
      { label: 'Dragonfruit', value: 'dragonfruit' }
    ])
  })

  it('resolves emitted values back to the original suggestion object', () => {
    const original = { label: 'Apple', value: 'apple' }
    const selection = createSelection({ suggestions: [original] })

    const resolved = selection.resolveSuggestion({ label: 'Apple', value: 'temporary', __cbxIdx: 1 })

    expect(resolved.normalizedOption).toEqual({ label: 'Apple', value: 'temporary' })
    expect(resolved.emitValue).toEqual(original)
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
