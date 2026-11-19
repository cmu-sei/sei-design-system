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
  it('tracks the active action or option and clears it outside the dropdown indexes', () => {
    const dropdown = createDropdownItems({ arrowCounter: 1 })

    expect(dropdown.activeItem.value).toEqual({ kind: 'select-all', index: 1 })
    expect(dropdown.getCurrentSuggestion()).toBeNull()
    dropdown.arrowCounter.value = 0
    expect(dropdown.activeItem.value?.kind).toBe('add')
    dropdown.arrowCounter.value = 3
    expect(dropdown.activeItem.value).toEqual({ kind: 'option', index: 3, option: { label: 'Banana' } })
    dropdown.arrowCounter.value = -1
    expect(dropdown.activeItem.value).toBeUndefined()
    dropdown.arrowCounter.value = 99
    expect(dropdown.activeItem.value).toBeUndefined()
  })

  it('flattens rendered dropdown rows into stable keyboard indexes', () => {
    const dropdown = createDropdownItems()

    expect(dropdown.dropdownItems.value).toEqual([
      { kind: 'add', index: 0, option: { label: 'Dragonfruit', __cbxIdx: 'add' } },
      { kind: 'select-all', index: 1 },
      { kind: 'option', index: 2, option: { label: 'Apple' } },
      { kind: 'option', index: 3, option: { label: 'Banana' } },
      { kind: 'option', index: 4, option: { label: 'Kale' } }
    ])
    expect(dropdown.firstItemIndex.value).toBe(0)
    expect(dropdown.lastDropdownItemIndex()).toBe(4)
  })

  it('returns null for the Select all row and option data for rendered options', () => {
    const dropdown = createDropdownItems({ arrowCounter: 1 })

    expect(dropdown.getCurrentSuggestion()).toBeNull()

    dropdown.arrowCounter.value = 3

    expect(dropdown.getCurrentSuggestion()).toEqual({ label: 'Banana' })
  })

  it('detects active option and Add row state from arrowCounter', () => {
    const apple = { label: 'Apple' }
    const dropdown = createDropdownItems({
      suggestionOptions: [apple],
      optionGroupChildren: undefined,
      arrowCounter: 2
    })

    expect(dropdown.isDropdownItemActive(dropdown.suggestionOptions.value[0])).toBe(true)
    expect(dropdown.isAddSuggestionActive.value).toBe(false)

    dropdown.arrowCounter.value = 0

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

  it('refreshes option lookups when actions and suggestions change', () => {
    const dropdown = createDropdownItems({
      optionGroupChildren: undefined,
      suggestionOptions: [{ label: 'Apple' }]
    })
    const apple = dropdown.suggestionOptions.value[0]

    expect(dropdown.getDropdownItem(apple)?.index).toBe(2)
    dropdown.selectAllRendered.value = false
    expect(dropdown.getDropdownItem(apple)?.index).toBe(1)
    dropdown.shouldShowNewSuggestion.value = false
    expect(dropdown.getDropdownItem(apple)?.index).toBe(0)
    dropdown.suggestionOptions.value = ['Banana', apple]
    expect(dropdown.getDropdownItem(apple)?.index).toBe(1)
    dropdown.suggestionOptions.value = ['Banana']
    expect(dropdown.getDropdownItem(apple)).toBeUndefined()
  })

  it('preserves the first matching index for repeated option references', () => {
    const dropdown = createDropdownItems({
      optionGroupChildren: undefined,
      suggestionOptions: ['Apple', 'Apple'],
      selectAllRendered: false,
      shouldShowNewSuggestion: false
    })

    expect(dropdown.getDropdownItem('Apple')?.index).toBe(0)
  })
})