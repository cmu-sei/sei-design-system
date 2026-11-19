import { computed, type Ref } from 'vue'
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

  const createIndex = (items: ComboBoxSuggestion[]) => {
    const labels = new Map<string, number>()
    const strings = new Map<string, number>()
    const custom = new Map<string, number>()
    const regular = new Map<string, number>()
    const identities = new Map<string | number, number>()
    const add = (item: ComboBoxSuggestion, index: number) => {
      const label = normalizeString(options.getLabel(item))
      if (!labels.has(label)) labels.set(label, index)
      const labelIndex = typeof item === 'string' ? strings : item.__cbxCustom === true ? custom : regular
      if (!labelIndex.has(label)) labelIndex.set(label, index)
      if (typeof item === 'object' && item.__cbxCustom !== true) {
        const identity = getIdentity(item)
        if (identity !== undefined && !identities.has(identity)) identities.set(identity, index)
      }
    }
    items.forEach(add)
    const find = (item: ComboBoxSuggestion): number => {
      const label = normalizeString(options.getLabel(item))
      if (typeof item === 'string') return labels.get(label) ?? -1
      const identity = item.__cbxCustom !== true && options.optionValue?.() ? getIdentity(item) : undefined
      const candidate = item.__cbxCustom === true
        ? custom.get(label)
        : options.optionValue?.()
          ? identity === undefined ? undefined : identities.get(identity)
          : regular.get(label)
      const stringCandidate = strings.get(label)
      if (candidate === undefined) return stringCandidate ?? -1
      return stringCandidate === undefined ? candidate : Math.min(candidate, stringCandidate)
    }
    return { add, find }
  }

  const selectedIndex = computed(() => createIndex(options.selected.value))
  const originalIndex = computed(() => {
    const items: ComboBoxSuggestion[] = []
    const append = (suggestions: ComboBoxSuggestion[]) => {
      for (const item of suggestions) {
        const children = options.getChildren?.(item) ?? []
        const childrenKey = options.optionGroupChildren?.()
        const isGroup = !!childrenKey && typeof item === 'object' && Array.isArray(item[childrenKey])
        if (!isGroup && !children.length) items.push(item)
        else append(children)
      }
    }
    append(options.suggestions())
    return { items, ...createIndex(items) }
  })

  const findOriginalSuggestion = (option: ComboBoxSuggestion): ComboBoxSuggestion | undefined => {
    if (typeof option === 'object' && option.__cbxCustom === true) return undefined
    return originalIndex.value.items[originalIndex.value.find(option)]
  }

  /**
   * Builds an indexed membership check using the same identity rules as selection.
   * @param items - Options to match against.
   * @returns A predicate indicating whether an option is present.
   */
  const createMatcher = (items: ComboBoxSuggestion[]) => {
    const index = createIndex(items)
    return (option: ComboBoxSuggestion): boolean => index.find(option) !== -1
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
    return selectedIndex.value.find(option)
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
      const matches = createMatcher(optionsToToggle)
      options.selected.value = options.selected.value.filter(option => !matches(option))
      return
    }

    const nextSelected = [...options.selected.value]
    const index = createIndex(nextSelected)
    optionsToToggle.forEach((option) => {
      if (index.find(option) === -1) {
        const original = stripIdx(findOriginalSuggestion(option) ?? option)
        index.add(original, nextSelected.length)
        nextSelected.push(original)
      }
    })
    options.selected.value = nextSelected
  }

  return {
    findOriginalSuggestion,
    getOptionValue,
    sameOption,
    createMatcher,
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