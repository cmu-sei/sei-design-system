import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useComboBoxDropdownItems } from './useComboBoxDropdownItems'
import type { ComboBoxSuggestion, ComboBoxSuggestionObject } from './useComboBoxSuggestions'

const groupedOptions: ComboBoxSuggestion[] = [
  {
    label: 'Fruits',
    items: [
      { label: 'Apple' },
      { label: 'Banana' }
    ]
  },
  { label: 'Kale' }
]

const createDropdownItems = (overrides: Partial<{
  suggestionOptions: ComboBoxSuggestion[];
  optionGroupChildren: string | undefined;
  selectAllRendered: boolean;
  shouldShowNewSuggestion: boolean;
  addSuggestion: ComboBoxSuggestionObject;
  arrowCounter: number;
}> = {}) => {
  const suggestionOptions = ref<ComboBoxSuggestion[]>(overrides.suggestionOptions ?? groupedOptions)
  const optionGroupChildren = ref<string | undefined>(overrides.optionGroupChildren ?? 'items')
  const selectAllRendered = ref(overrides.selectAllRendered ?? true)
  const shouldShowNewSuggestion = ref(overrides.shouldShowNewSuggestion ?? true)
  const addSuggestion = ref<ComboBoxSuggestionObject>(overrides.addSuggestion ?? { label: 'Dragonfruit', __cbxIdx: 'add' })
  const arrowCounter = ref(overrides.arrowCounter ?? 0)

  return {
    suggestionOptions,
    optionGroupChildren,
    selectAllRendered,
    shouldShowNewSuggestion,
    addSuggestion,
    arrowCounter,
    ...useComboBoxDropdownItems({
      suggestionOptions,
      optionGroupChildren,
      selectAllRendered,
      shouldShowNewSuggestion,
      addSuggestion,
      arrowCounter
    })
  }
}

describe('useComboBoxDropdownItems', () => {
  it('flattens rendered dropdown rows into stable keyboard indexes', () => {
    const dropdown = createDropdownItems()

    expect(dropdown.dropdownItems.value).toEqual([
      { kind: 'select-all', index: 0 },
      { kind: 'option', index: 1, option: { label: 'Apple' } },
      { kind: 'option', index: 2, option: { label: 'Banana' } },
      { kind: 'option', index: 3, option: { label: 'Kale' } },
      { kind: 'add', index: 4, option: { label: 'Dragonfruit', __cbxIdx: 'add' } }
    ])
    expect(dropdown.firstItemIndex.value).toBe(1)
    expect(dropdown.lastDropdownItemIndex()).toBe(4)
  })

  it('returns null for the Select all row and option data for rendered options', () => {
    const dropdown = createDropdownItems()

    expect(dropdown.getCurrentSuggestion()).toBeNull()

    dropdown.arrowCounter.value = 2

    expect(dropdown.getCurrentSuggestion()).toEqual({ label: 'Banana' })
  })

  it('detects active option and Add row state from arrowCounter', () => {
    const apple = { label: 'Apple' }
    const dropdown = createDropdownItems({
      suggestionOptions: [apple],
      optionGroupChildren: undefined,
      arrowCounter: 1
    })

    expect(dropdown.isDropdownItemActive(dropdown.suggestionOptions.value[0])).toBe(true)
    expect(dropdown.isAddSuggestionActive.value).toBe(false)

    dropdown.arrowCounter.value = 2

    expect(dropdown.isAddSuggestionActive.value).toBe(true)
    expect(dropdown.getCurrentSuggestion()).toEqual({ label: 'Dragonfruit', __cbxIdx: 'add' })
  })

  it('starts option indexes at zero when Select all is not rendered', () => {
    const dropdown = createDropdownItems({
      selectAllRendered: false,
      shouldShowNewSuggestion: false,
      optionGroupChildren: undefined,
      suggestionOptions: ['Apple', 'Banana']
    })

    expect(dropdown.dropdownItems.value).toEqual([
      { kind: 'option', index: 0, option: 'Apple' },
      { kind: 'option', index: 1, option: 'Banana' }
    ])
    expect(dropdown.firstItemIndex.value).toBe(0)
    expect(dropdown.lastDropdownItemIndex()).toBe(1)
  })
})