import { computed, ref, type Ref } from 'vue'
import { useComboBoxDropdownItems } from './useComboBoxDropdownItems'
import { useComboBoxQuery } from './useComboBoxQuery'
import { useComboBoxSelection } from './useComboBoxSelection'
import { useComboBoxSuggestions, type ComboBoxSuggestion, type ComboBoxSuggestionObject, type ComboBoxType } from './useComboBoxSuggestions'

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
  optionGroupLabel: () => string | undefined
  optionGroupChildren: () => string | undefined
  disableGroupTabs: () => boolean
  debounceComplete: () => number
  onComplete: (query: string) => void
  onShowDropdown: () => void
}

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
    activeGroupKey
  })

  const {
    findOriginalSuggestion,
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
    getChildren
  })

  const selectAllVisible = computed(() => isSelectType.value && options.multiple() && options.enableSelectAll() && allCount.value > 1)
  const selectAllRendered = computed(() => selectAllVisible.value && countVisibleOptions(suggestionOptions.value) > 1)

  const addSuggestion = computed<ComboBoxSuggestionObject>(() => ({
    label: options.query.value,
    name: options.query.value,
    value: options.query.value,
    __cbxIdx: 'add'
  }))

  const {
    dropdownItems,
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
    shouldShowNewSuggestion,
    addSuggestion,
    arrowCounter: options.arrowCounter
  })

  const getCurrentGroupOptions = (): ComboBoxSuggestion[] => {
    const visibleOptions = !isFlatArray.value && activeGroupKey.value !== -1
      ? groupSuggestionOptions.value
      : allSuggestionOptions.value

    return flattenOptions(visibleOptions)
  }

  const selectAllChecked = computed(() => areAllSelected(getCurrentGroupOptions()))
  const selectAllIndeterminate = computed(() => areSomeSelected(getCurrentGroupOptions()))

  const { setQuery, setUserQuery } = useComboBoxQuery({
    query: options.query,
    debounce: options.debounceComplete,
    onComplete: options.onComplete,
    onShowDropdown: options.onShowDropdown
  })

  const updateQuery = (value: string): void => {
    setQuery(value)
  }

  const updateUserQuery = (value: string): void => {
    setUserQuery(value)
  }

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
    getDropdownItem,
    getCurrentSuggestion,
    lastDropdownItemIndex,
    firstItemIndex,
    isDropdownItemActive,
    isAddSuggestionActive,
    getCurrentGroupOptions,
    setQuery: updateQuery,
    setUserQuery: updateUserQuery
  }
}