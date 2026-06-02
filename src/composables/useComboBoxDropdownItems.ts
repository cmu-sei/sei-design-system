import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { ComboBoxSuggestion, ComboBoxSuggestionObject } from './useComboBoxSuggestions'

export type ComboBoxDropdownItem =
  | { kind: 'select-all'; index: number }
  | { kind: 'option'; index: number; option: ComboBoxSuggestion }
  | { kind: 'add'; index: number; option: ComboBoxSuggestionObject }

interface UseComboBoxDropdownItemsOptions {
  suggestionOptions: MaybeRefOrGetter<ComboBoxSuggestion[]>;
  optionGroupChildren: MaybeRefOrGetter<string | undefined>;
  selectAllRendered: MaybeRefOrGetter<boolean>;
  shouldShowNewSuggestion: MaybeRefOrGetter<boolean>;
  addSuggestion: MaybeRefOrGetter<ComboBoxSuggestionObject>;
  arrowCounter: MaybeRefOrGetter<number>;
}

/**
 * Builds the rendered dropdown item model used for active state and keyboard indexes.
 */
export function useComboBoxDropdownItems(options: UseComboBoxDropdownItemsOptions) {
  const dropdownItems = computed<ComboBoxDropdownItem[]>(() => {
    const items: ComboBoxDropdownItem[] = []
    const optionGroupChildren = toValue(options.optionGroupChildren)
    let index = 0

    if (toValue(options.selectAllRendered)) {
      items.push({ kind: 'select-all', index })
      index++
    }

    const collect = (suggestions: ComboBoxSuggestion[]) => {
      suggestions.forEach((suggestion) => {
        if (typeof suggestion === 'object' && suggestion !== null && optionGroupChildren && Array.isArray(suggestion[optionGroupChildren])) {
          collect(suggestion[optionGroupChildren] as ComboBoxSuggestion[])
        } else {
          items.push({ kind: 'option', option: suggestion, index })
          index++
        }
      })
    }

    collect(toValue(options.suggestionOptions))

    if (toValue(options.shouldShowNewSuggestion)) {
      items.push({ kind: 'add', option: toValue(options.addSuggestion), index })
    }

    return items
  })

  const getDropdownItem = (item: ComboBoxSuggestion): ComboBoxDropdownItem | undefined => {
    if (typeof item === 'object' && item !== null && item.__cbxIdx === 'add') {
      return dropdownItems.value.find(dropdownItem => dropdownItem.kind === 'add')
    }

    return dropdownItems.value.find(dropdownItem => dropdownItem.kind === 'option' && dropdownItem.option === item)
  }

  const getCurrentSuggestion = (): ComboBoxSuggestion | null | undefined => {
    const item = dropdownItems.value.find(dropdownItem => dropdownItem.index === toValue(options.arrowCounter))
    if (!item) return undefined
    if (item.kind === 'select-all') return null
    return item.option
  }

  const lastDropdownItemIndex = (): number => {
    return dropdownItems.value.at(-1)?.index ?? -1
  }

  const firstItemIndex = computed(() => {
    return toValue(options.selectAllRendered) ? 1 : 0
  })

  const isDropdownItemActive = (item: ComboBoxSuggestion): boolean => {
    return getDropdownItem(item)?.index === toValue(options.arrowCounter)
  }

  const isAddSuggestionActive = computed(() => {
    return getDropdownItem(toValue(options.addSuggestion))?.index === toValue(options.arrowCounter)
  })

  return {
    dropdownItems,
    getDropdownItem,
    getCurrentSuggestion,
    lastDropdownItemIndex,
    firstItemIndex,
    isDropdownItemActive,
    isAddSuggestionActive
  }
}