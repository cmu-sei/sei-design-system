import type { Ref } from 'vue'
import type { ComboBoxSuggestion } from './useComboBoxSuggestions'

interface UseComboBoxSelectionOptions {
  selected: Ref<ComboBoxSuggestion[]>;
  suggestions: () => ComboBoxSuggestion[];
  getLabel: (item: ComboBoxSuggestion) => string;
  getChildren?: (item: ComboBoxSuggestion) => ComboBoxSuggestion[];
}

/**
 * Handles ComboBox selected-value lookup, mutation, and emitted-value resolution.
 */
export function useComboBoxSelection(options: UseComboBoxSelectionOptions) {
  const findOriginalSuggestion = (label: string): ComboBoxSuggestion | undefined => {
    const findSuggestion = (suggestions: ComboBoxSuggestion[]): ComboBoxSuggestion | undefined => {
      for (const suggestion of suggestions) {
        if (options.getLabel(suggestion) === label) return suggestion

        const children = options.getChildren?.(suggestion) ?? []
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

  const findSelectedIndex = (label: string): number => {
    return options.selected.value.findIndex(item => options.getLabel(item) === label)
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

  const removeSelectionByLabel = (label: string): void => {
    const index = findSelectedIndex(label)
    if (index !== -1) removeSelectionAt(index)
  }

  const clearSelections = (): void => {
    options.selected.value = []
  }

  const isSelected = (label: string): boolean => {
    return options.selected.value.some(item => options.getLabel(item) === label)
  }

  const resolveSuggestion = (option: ComboBoxSuggestion) => {
    let normalizedOption = option
    let original: ComboBoxSuggestion | undefined

    if (typeof option === 'object' && option !== null) {
      original = findOriginalSuggestion(options.getLabel(option))
      normalizedOption = typeof original === 'string' ? original : stripIdx(option)
    } else {
      original = findOriginalSuggestion(option)
    }

    return {
      normalizedOption,
      emitValue: stripIdx(original ?? option)
    }
  }

  const areAllSelected = (optionsToCheck: ComboBoxSuggestion[]): boolean => {
    return optionsToCheck.length > 0 && optionsToCheck.every(option => isSelected(options.getLabel(option)))
  }

  const areSomeSelected = (optionsToCheck: ComboBoxSuggestion[]): boolean => {
    const selectedCount = optionsToCheck.filter(option => isSelected(options.getLabel(option))).length
    return selectedCount > 0 && selectedCount < optionsToCheck.length
  }

  const toggleSelections = (optionsToToggle: ComboBoxSuggestion[]): void => {
    if (!optionsToToggle.length) return

    if (areAllSelected(optionsToToggle)) {
      const labelsToRemove = new Set(optionsToToggle.map(option => options.getLabel(option)))
      options.selected.value = options.selected.value.filter(option => !labelsToRemove.has(options.getLabel(option)))
      return
    }

    const nextSelected = [...options.selected.value]
    optionsToToggle.forEach((option) => {
      const label = options.getLabel(option)
      if (!nextSelected.some(selectedOption => options.getLabel(selectedOption) === label)) {
        nextSelected.push(stripIdx(findOriginalSuggestion(label) ?? option))
      }
    })
    options.selected.value = nextSelected
  }

  return {
    findOriginalSuggestion,
    stripIdx,
    findSelectedIndex,
    addSelection,
    replaceSelection,
    removeSelectionAt,
    removeSelectionByLabel,
    clearSelections,
    isSelected,
    resolveSuggestion,
    areAllSelected,
    areSomeSelected,
    toggleSelections
  }
}