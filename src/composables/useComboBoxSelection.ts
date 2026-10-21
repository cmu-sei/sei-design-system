import type { Ref } from 'vue'
import type { ComboBoxSuggestion } from './useComboBoxSuggestions'
import { normalizeString } from './useComboBoxSuggestions'

interface UseComboBoxSelectionOptions {
  selected: Ref<ComboBoxSuggestion[]>;
  suggestions: () => ComboBoxSuggestion[];
  getLabel: (item: ComboBoxSuggestion) => string;
  getChildren?: (item: ComboBoxSuggestion) => ComboBoxSuggestion[];
  optionGroupChildren?: () => string | undefined;
  optionValue?: () => string | undefined;
}

/**
 * Handles ComboBox selected-value lookup, mutation, and emitted-value resolution.
 */
export function useComboBoxSelection(options: UseComboBoxSelectionOptions) {
  const invalidIdentities = new WeakSet<object>()
  const getIdentity = (item: ComboBoxSuggestion): string | number | undefined => {
    if (typeof item === 'string') return undefined
    const key = options.optionValue?.()
    if (!key) return undefined
    const value = item[key]
    if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) return value
    if (import.meta.env.DEV && !invalidIdentities.has(item)) {
      invalidIdentities.add(item)
      console.warn(`[SdsComboBox] optionValue="${key}" requires a string or finite numeric value on each option.`, item)
    }
    return undefined
  }

  const getOptionValue = (item: ComboBoxSuggestion): string => String(getIdentity(item) ?? options.getLabel(item))

  const sameOption = (left: ComboBoxSuggestion, right: ComboBoxSuggestion): boolean => {
    const isLeftCustom = typeof left === 'object' && left.__cbxCustom === true
    const isRightCustom = typeof right === 'object' && right.__cbxCustom === true
    if (isLeftCustom || isRightCustom) {
      if (typeof left === 'object' && typeof right === 'object' && isLeftCustom !== isRightCustom) return false
      return normalizeString(options.getLabel(left)) === normalizeString(options.getLabel(right))
    }
    const leftIdentity = getIdentity(left)
    const rightIdentity = getIdentity(right)
    if (options.optionValue?.() && typeof left === 'object' && typeof right === 'object') {
      return leftIdentity !== undefined && rightIdentity !== undefined && leftIdentity === rightIdentity
    }
    return normalizeString(options.getLabel(left)) === normalizeString(options.getLabel(right))
  }

  const findOriginalSuggestion = (option: ComboBoxSuggestion): ComboBoxSuggestion | undefined => {
    if (typeof option === 'object' && option.__cbxCustom === true) return undefined
    const childrenKey = options.optionGroupChildren?.()
    const findSuggestion = (suggestions: ComboBoxSuggestion[]): ComboBoxSuggestion | undefined => {
      for (const suggestion of suggestions) {
        const children = options.getChildren?.(suggestion) ?? []
        const isGroup = !!childrenKey && typeof suggestion === 'object' && Array.isArray(suggestion[childrenKey])
        if (!isGroup && !children.length && sameOption(suggestion, option)) return suggestion
        const childSuggestion = findSuggestion(children)
        if (childSuggestion) return childSuggestion
      }

      return undefined
    }

    return findSuggestion(options.suggestions())
  }

  const stripIdx = (option: ComboBoxSuggestion): ComboBoxSuggestion => {
    if (typeof option === 'object' && option !== null) {
      const { __cbxIdx, ...rest } = option as Record<string, unknown>
      void __cbxIdx
      return { ...rest }
    }
    return option
  }

  const findSelectedIndex = (option: ComboBoxSuggestion): number => {
    return options.selected.value.findIndex(item => sameOption(item, option))
  }

  const addSelection = (option: ComboBoxSuggestion): void => {
    options.selected.value = [...options.selected.value, stripIdx(option)]
  }

  const replaceSelection = (option: ComboBoxSuggestion): void => {
    options.selected.value = [stripIdx(option)]
  }

  const removeSelectionAt = (index: number): void => {
    options.selected.value = options.selected.value.filter((_, selectedIndex) => selectedIndex !== index)
  }

  const clearSelections = (): void => {
    options.selected.value = []
  }

  const isSelected = (option: ComboBoxSuggestion): boolean => {
    return findSelectedIndex(option) !== -1
  }

  const resolveSuggestion = (option: ComboBoxSuggestion) => {
    const original = findOriginalSuggestion(option)
    const normalizedOption = stripIdx(original ?? option)

    return {
      normalizedOption,
      emitValue: stripIdx(original ?? option)
    }
  }

  const areAllSelected = (optionsToCheck: ComboBoxSuggestion[]): boolean => {
    return optionsToCheck.length > 0 && optionsToCheck.every(isSelected)
  }

  const areSomeSelected = (optionsToCheck: ComboBoxSuggestion[]): boolean => {
    const selectedCount = optionsToCheck.filter(isSelected).length
    return selectedCount > 0 && selectedCount < optionsToCheck.length
  }

  const toggleSelections = (optionsToToggle: ComboBoxSuggestion[]): void => {
    if (!optionsToToggle.length) return

    if (areAllSelected(optionsToToggle)) {
      options.selected.value = options.selected.value.filter(option => !optionsToToggle.some(candidate => sameOption(candidate, option)))
      return
    }

    const nextSelected = [...options.selected.value]
    optionsToToggle.forEach((option) => {
      if (!nextSelected.some(selectedOption => sameOption(selectedOption, option))) {
        nextSelected.push(stripIdx(findOriginalSuggestion(option) ?? option))
      }
    })
    options.selected.value = nextSelected
  }

  return {
    findOriginalSuggestion,
    getOptionValue,
    sameOption,
    stripIdx,
    findSelectedIndex,
    addSelection,
    replaceSelection,
    removeSelectionAt,
    clearSelections,
    isSelected,
    resolveSuggestion,
    areAllSelected,
    areSomeSelected,
    toggleSelections
  }
}