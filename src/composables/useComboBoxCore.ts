import { computed, ref, type Ref } from 'vue'
import { useComboBoxDropdownItems } from './useComboBoxDropdownItems'
import { useComboBoxQuery } from './useComboBoxQuery'
import { useComboBoxSelection } from './useComboBoxSelection'
import { useComboBoxSuggestions, type ComboBoxSuggestion, type ComboBoxSuggestionObject, type ComboBoxType } from './useComboBoxSuggestions'

/**
 * Options for configuring the core ComboBox composable.
 */
interface UseComboBoxCoreOptions {
  suggestions: () => ComboBoxSuggestion[]
  query: Ref<string>
  selected: Ref<ComboBoxSuggestion[]>
  arrowCounter: Ref<number>
  type: () => ComboBoxType
  multiple: () => boolean
  enableSelectAll: () => boolean
  filterSuggestions: () => boolean
  optionLabel: () => string | undefined
  optionValue?: () => string | undefined
  allGroupLabel?: () => string
  optionGroupLabel: () => string | undefined
  optionGroupChildren: () => string | undefined
  disableGroupTabs: () => boolean
  debounceComplete: () => number
  onComplete: (query: string) => void
  onShowDropdown: () => void
}

/**
 * Core composable for the ComboBox component. Composes suggestion filtering,
 * selection management, dropdown item tracking, and query handling into a
 * unified interface consumed by the ComboBox component and its variants.
 *
 * @param options - Configuration for suggestions, selection state, query behavior, and callbacks.
 * @returns Reactive state and methods for managing the full ComboBox interaction model.
 */
export function useComboBoxCore(options: UseComboBoxCoreOptions) {
  const activeGroupKey = ref(-1)
  const isSelectType = computed(() => options.type() === 'select' || options.type() === 'taggable-select')

  const {
    labelKey,
    getLabel,
    getGroupLabel,
    getChildren,
    getHref,
    countVisibleOptions,
    flattenOptions,
    allSuggestionOptions,
    allCount,
    groups,
    groupSuggestionOptions,
    suggestionOptions,
    shouldShowNewSuggestion,
    hasDropdownSuggestion,
    isFlatArray,
    hasCategories,
    hasNoMatches
  } = useComboBoxSuggestions({
    suggestions: options.suggestions,
    query: options.query,
    type: options.type,
    filterSuggestions: options.filterSuggestions,
    optionLabel: options.optionLabel,
    optionGroupLabel: options.optionGroupLabel,
    optionGroupChildren: options.optionGroupChildren,
    disableGroupTabs: options.disableGroupTabs,
    activeGroupKey,
    allGroupLabel: options.allGroupLabel
  })

  const {
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
  } = useComboBoxSelection({
    selected: options.selected,
    suggestions: options.suggestions,
    getLabel,
    getChildren,
    optionGroupChildren: options.optionGroupChildren,
    optionValue: options.optionValue
  })

  const getCurrentGroupOptions = (): ComboBoxSuggestion[] => {
    const visibleOptions = !isFlatArray.value && activeGroupKey.value !== -1
      ? groupSuggestionOptions.value
      : allSuggestionOptions.value

    return flattenOptions(visibleOptions)
  }

  const selectAllVisible = computed(() => isSelectType.value && options.multiple() && options.enableSelectAll() && allCount.value > 1)
  const selectAllRendered = computed(() => selectAllVisible.value && getCurrentGroupOptions().length > 1)

  const addSuggestion = computed<ComboBoxSuggestionObject>(() => {
    const label = options.query.value.trim()
    const valueKey = options.optionValue?.()
    return {
      label,
      name: label,
      value: label,
      [labelKey.value]: label,
      ...(valueKey ? { [valueKey]: label } : {}),
      __cbxCustom: true,
      __cbxIdx: 'add'
    }
  })

  const {
    dropdownItems,
    activeItem,
    getDropdownItem,
    getCurrentSuggestion,
    lastDropdownItemIndex,
    firstItemIndex,
    isDropdownItemActive,
    isAddSuggestionActive
  } = useComboBoxDropdownItems({
    suggestionOptions,
    optionGroupChildren: options.optionGroupChildren,
    selectAllRendered,
    shouldShowNewSuggestion: () => shouldShowNewSuggestion.value && !isSelected(options.query.value),
    addSuggestion,
    arrowCounter: options.arrowCounter
  })

  const selectAllChecked = computed(() => areAllSelected(getCurrentGroupOptions()))
  const selectAllIndeterminate = computed(() => areSomeSelected(getCurrentGroupOptions()))

  const { setQuery, setUserQuery } = useComboBoxQuery({
    query: options.query,
    debounce: options.debounceComplete,
    onComplete: options.onComplete,
    onShowDropdown: options.onShowDropdown
  })

  return {
    activeGroupKey,
    isSelectType,
    labelKey,
    getLabel,
    getGroupLabel,
    getChildren,
    getHref,
    countVisibleOptions,
    flattenOptions,
    allSuggestionOptions,
    allCount,
    groups,
    groupSuggestionOptions,
    suggestionOptions,
    shouldShowNewSuggestion,
    hasDropdownSuggestion,
    isFlatArray,
    hasCategories,
    hasNoMatches,
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
    toggleSelections,
    selectAllVisible,
    selectAllRendered,
    selectAllChecked,
    selectAllIndeterminate,
    addSuggestion,
    dropdownItems,
    activeItem,
    getDropdownItem,
    getCurrentSuggestion,
    lastDropdownItemIndex,
    firstItemIndex,
    isDropdownItemActive,
    isAddSuggestionActive,
    getCurrentGroupOptions,
    setQuery,
    setUserQuery
  }
}