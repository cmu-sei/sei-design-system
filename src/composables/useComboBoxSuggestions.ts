import { computed, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

export type ComboBoxSuggestionObject = Record<string | number, unknown> & {
  /** Preserved origin marker for custom tags, distinct from existing record identities. */
  __cbxCustom?: boolean;
}
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
  allGroupLabel?: MaybeRefOrGetter<string>;
  pending?: MaybeRefOrGetter<boolean>;
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

  const normalizeSuggestion = (item: ComboBoxSuggestion): ComboBoxSuggestion | undefined => {
    if (typeof item === 'string') return item.trim() ? { [labelKey.value]: item } : undefined

    const optionGroupChildren = toValue(options.optionGroupChildren)
    const normalized = { ...item }
    if (optionGroupChildren && Array.isArray(item[optionGroupChildren])) {
      const children = (item[optionGroupChildren] as ComboBoxSuggestion[]).map(normalizeSuggestion).filter(child => child !== undefined)
      normalized[optionGroupChildren] = children
    } else if (!getLabel(item).trim()) {
      return undefined
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

      if (normalizeString(getLabel(item)).includes(normalizeString(query))) {
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

  const allSuggestions = computed(() => toValue(options.suggestions).map(normalizeSuggestion).filter(suggestion => suggestion !== undefined))

  const groupKeys = new Map<string, number>()
  const suggestionEntries = computed(() => {
    const occurrences = new Map<string, number>()
    const childrenKey = toValue(options.optionGroupChildren)
    return allSuggestions.value.map((option) => {
      if (!childrenKey || typeof option !== 'object' || !Array.isArray(option[childrenKey])) return { option, key: undefined }
      const label = getGroupLabel(option)
      const occurrence = occurrences.get(label) ?? 0
      occurrences.set(label, occurrence + 1)
      const identity = JSON.stringify([label, occurrence])
      if (!groupKeys.has(identity)) groupKeys.set(identity, groupKeys.size)
      return { option, key: groupKeys.get(identity) }
    })
  })

  watch([suggestionEntries, () => toValue(options.pending)], ([entries, pending]) => {
    if (!pending && !entries.some(entry => entry.key === options.activeGroupKey.value)) {
      options.activeGroupKey.value = -1
    }
  })

  const visibleEntries = computed(() => suggestionEntries.value.flatMap((entry) => {
    const option = toValue(options.filterSuggestions) ? filterSuggestionList([entry.option])[0] : entry.option
    return option && countVisibleOptions([option]) > 0 ? [{ ...entry, option }] : []
  }))
  const allSuggestionOptions = computed(() => visibleEntries.value.map(entry => entry.option))
  const allCount = computed(() => countVisibleOptions(allSuggestionOptions.value))

  const groups = computed<ComboBoxGroup[]>(() => {
    const counts = new Map(visibleEntries.value.map(({ option, key }) => [key, countVisibleOptions(getChildren(option))]))
    return [
      { key: -1, label: toValue(options.allGroupLabel) ?? 'All', count: allCount.value },
      ...suggestionEntries.value.flatMap(({ option, key }) => key === undefined ||
        (!counts.has(key) && key !== options.activeGroupKey.value) ? [] : [{
          key, label: getGroupLabel(option), count: counts.get(key) ?? 0
        }])
    ]
  })

  const activeGroupSuggestion = computed(() => {
    if (!toValue(options.optionGroupChildren) || options.activeGroupKey.value === -1) return undefined
    return visibleEntries.value.find(entry => entry.key === options.activeGroupKey.value)?.option
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
    return normalizeString(toValue(options.query)) !== '' && toValue(options.type) === 'taggable-select' && !matchesSuggestion.value
  })

  const hasDropdownSuggestion = computed(() => {
    if (toValue(options.type) === 'taggable-select' && shouldShowNewSuggestion.value) return true
    return countVisibleOptions(suggestionOptions.value) > 0
  })

  const isFlatArray = computed(() => groups.value.length <= 1)

  const hasCategories = computed(() => {
    if (!groups.value.length || isFlatArray.value || toValue(options.disableGroupTabs)) return false
    return allCount.value > 1 || options.activeGroupKey.value !== -1
  })

  const hasNoMatches = computed(() => {
    return !hasDropdownSuggestion.value && toValue(options.query) !== ''
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