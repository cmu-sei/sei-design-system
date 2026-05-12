import { computed, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

export type ComboBoxSuggestionObject = Record<string | number, unknown>
export type ComboBoxSuggestion = ComboBoxSuggestionObject | string
export type ComboBoxType = 'text' | 'select' | 'taggable-select'

export interface ComboBoxGroup {
  key: number;
  label: string;
  count: number;
}

interface UseComboBoxSuggestionsOptions {
  suggestions: MaybeRefOrGetter<ComboBoxSuggestion[]>;
  query: MaybeRefOrGetter<string>;
  type: MaybeRefOrGetter<ComboBoxType>;
  filterSuggestions: MaybeRefOrGetter<boolean>;
  optionLabel: MaybeRefOrGetter<string | undefined>;
  optionGroupLabel: MaybeRefOrGetter<string | undefined>;
  optionGroupChildren: MaybeRefOrGetter<string | undefined>;
  disableGroupTabs: MaybeRefOrGetter<boolean>;
  activeGroupKey: Ref<number>;
}

const defaultOptionLabel = 'label'

export function removeHtmlFromString(value: string): string {
  if (typeof document === 'undefined') return value
  const div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || ''
}

export function normalizeString(value: string | undefined | null): string {
  return (value ?? '').toString().trim().toLowerCase()
}

/**
 * Normalizes, filters, groups, and matches ComboBox suggestions.
 */
export function useComboBoxSuggestions(options: UseComboBoxSuggestionsOptions) {
  const labelKey = computed(() => toValue(options.optionLabel) ?? defaultOptionLabel)
  const groupLabelKey = computed(() => toValue(options.optionGroupLabel) ?? defaultOptionLabel)

  const getLabel = (item: ComboBoxSuggestion): string => {
    if (typeof item === 'object' && item !== null) {
      return String(item[labelKey.value] ?? '')
    }
    return String(item)
  }

  const getGroupLabel = (item: ComboBoxSuggestion): string => {
    if (typeof item === 'object' && item !== null) {
      return String(item[groupLabelKey.value] ?? '')
    }
    return String(item)
  }

  const getChildren = (item: ComboBoxSuggestion): ComboBoxSuggestion[] => {
    const optionGroupChildren = toValue(options.optionGroupChildren)
    if (typeof item === 'object' && item !== null && optionGroupChildren && Array.isArray(item[optionGroupChildren])) {
      return item[optionGroupChildren] as ComboBoxSuggestion[]
    }
    return []
  }

  const getHref = (item: ComboBoxSuggestion): string | undefined => {
    if (typeof item === 'object' && item !== null && 'href' in item) {
      return item.href as string | undefined
    }
    return undefined
  }

  const normalizeSuggestion = (item: ComboBoxSuggestion): ComboBoxSuggestion => {
    if (typeof item === 'string') return { [labelKey.value]: item }

    const optionGroupChildren = toValue(options.optionGroupChildren)
    const normalized = { ...item }
    if (optionGroupChildren && Array.isArray(item[optionGroupChildren])) {
      normalized[optionGroupChildren] = (item[optionGroupChildren] as ComboBoxSuggestion[]).map(normalizeSuggestion)
    }
    return normalized
  }

  const filterSuggestionList = (suggestions: ComboBoxSuggestion[]): ComboBoxSuggestion[] => {
    const optionGroupChildren = toValue(options.optionGroupChildren)
    const query = toValue(options.query)

    return suggestions.reduce((accumulator: ComboBoxSuggestion[], item: ComboBoxSuggestion) => {
      if (typeof item === 'string') return accumulator

      if (optionGroupChildren && Array.isArray(item[optionGroupChildren])) {
        const children = filterSuggestionList(item[optionGroupChildren] as ComboBoxSuggestion[])
        if (children.length) accumulator.push({ ...item, [optionGroupChildren]: children })
        return accumulator
      }

      if (removeHtmlFromString(getLabel(item)).toLowerCase().includes(query.toLowerCase())) {
        accumulator.push({ ...item })
      }
      return accumulator
    }, [])
  }

  const countVisibleOptions = (suggestions: ComboBoxSuggestion[] | undefined): number => {
    const optionGroupChildren = toValue(options.optionGroupChildren)
    if (!suggestions || !Array.isArray(suggestions)) return 0

    return suggestions.reduce((count, item) => {
      if (typeof item === 'object' && item !== null && optionGroupChildren && Array.isArray(item[optionGroupChildren])) {
        return count + countVisibleOptions(item[optionGroupChildren] as ComboBoxSuggestion[])
      }
      return count + 1
    }, 0)
  }

  const flattenOptions = (suggestions: ComboBoxSuggestion[]): ComboBoxSuggestion[] => {
    return suggestions.flatMap((item) => {
      const children = getChildren(item)
      return children.length ? children : [item]
    })
  }

  const allSuggestions = computed(() => toValue(options.suggestions).map(normalizeSuggestion))

  const allSuggestionOptions = computed(() => {
    if (!toValue(options.filterSuggestions)) return allSuggestions.value
    return filterSuggestionList(allSuggestions.value)
  })

  const allCount = computed(() => countVisibleOptions(allSuggestionOptions.value))

  const groups = computed<ComboBoxGroup[]>(() => {
    let key = -1
    return [
      { key, label: 'All', count: allCount.value },
      ...allSuggestionOptions.value.map((item) => {
        const count = getChildren(item).length
        if (count > 0) key++

        return {
          key,
          label: getGroupLabel(item),
          count
        }
      }).filter((group) => group.count > 0)
    ]
  })

  const activeGroupSuggestion = computed(() => {
    if (!toValue(options.optionGroupChildren) || options.activeGroupKey.value === -1) return undefined
    let key = -1
    return allSuggestionOptions.value.find((item) => {
      if (!getChildren(item).length) return false
      key++
      return key === options.activeGroupKey.value
    })
  })

  const groupSuggestionOptions = computed(() => activeGroupSuggestion.value ? [activeGroupSuggestion.value] : [])
  const suggestionOptions = computed(() => options.activeGroupKey.value === -1 ? allSuggestionOptions.value : groupSuggestionOptions.value)

  const flatSuggestions = computed<string[]>(() => {
    const optionGroupChildren = toValue(options.optionGroupChildren)
    return toValue(options.suggestions).flatMap((suggestion) => {
      if (suggestion && optionGroupChildren && typeof suggestion === 'object' && Array.isArray(suggestion[optionGroupChildren])) {
        return suggestion[optionGroupChildren] as ComboBoxSuggestion[]
      }
      return suggestion
    }).map((suggestion) => getLabel(suggestion as ComboBoxSuggestion)).filter((label) => label.length > 0)
  })

  const suggestionMatchesQuery = (suggestion: ComboBoxSuggestion, query: string): boolean => {
    const optionGroupChildren = toValue(options.optionGroupChildren)
    if (typeof suggestion === 'object' && suggestion !== null && optionGroupChildren && Array.isArray(suggestion[optionGroupChildren])) {
      return (suggestion[optionGroupChildren] as ComboBoxSuggestion[]).some(child => suggestionMatchesQuery(child, query))
    }
    return normalizeString(getLabel(suggestion)) === normalizeString(query)
  }

  const matchesSuggestion = computed(() => {
    const query = toValue(options.query)
    if (toValue(options.type) === 'taggable-select') {
      return toValue(options.suggestions).some(suggestion => suggestionMatchesQuery(suggestion, query))
    }
    return flatSuggestions.value.map(normalizeString).includes(normalizeString(query))
  })

  const shouldShowNewSuggestion = computed(() => {
    return toValue(options.query) !== '' && toValue(options.type) === 'taggable-select' && !matchesSuggestion.value
  })

  const hasDropdownSuggestion = computed(() => {
    if (toValue(options.type) === 'taggable-select' && shouldShowNewSuggestion.value) return true
    return countVisibleOptions(suggestionOptions.value) > 0
  })

  const isFlatArray = computed(() => groups.value.filter(group => group.count > 0).length <= 1)

  const hasCategories = computed(() => {
    if (!groups.value.length || isFlatArray.value || toValue(options.disableGroupTabs)) return false
    return allCount.value > 1
  })

  const hasNoMatches = computed(() => {
    return toValue(options.filterSuggestions) && !hasDropdownSuggestion.value && toValue(options.query) !== ''
  })

  return {
    labelKey,
    groupLabelKey,
    getLabel,
    getGroupLabel,
    getChildren,
    getHref,
    normalizeSuggestion,
    filterSuggestionList,
    countVisibleOptions,
    flattenOptions,
    allSuggestions,
    allSuggestionOptions,
    allCount,
    groups,
    groupSuggestionOptions,
    suggestionOptions,
    flatSuggestions,
    suggestionMatchesQuery,
    matchesSuggestion,
    shouldShowNewSuggestion,
    hasDropdownSuggestion,
    isFlatArray,
    hasCategories,
    hasNoMatches
  }
}